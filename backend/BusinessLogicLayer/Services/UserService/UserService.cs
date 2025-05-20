using System;
using System.Collections.Generic;
using System.Linq;
using BusinessLogicLayer.Dtos;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.UserRepository;
using BusinessLogicLayer.Helpers;
using AutoMapper;
using BusinessLogicLayer.Services.EmailService;
using BusinessLogicLayer.Validator.UserValidator;
using BusinessLogicLayer.Validator;


namespace BusinessLogicLayer.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IUserValidator _userValidator;
        private string errorMessage;

        public UserService(IUserRepository userRepository, IPasswordHasher passwordHasher, IUserValidator userValidator, IEmailService emailService, IMapper mapper)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _userValidator = userValidator;
            _emailService = emailService;
            _mapper = mapper;

        }

        public async Task RegisterAsync(UserAddDto userDto)
        {
            var user = await _userRepository.GetByUserNameAsync(userDto.UserName);
            if (user != null)
            {
                throw new InvalidOperationException($"User '{userDto.UserName}' existed.");
            }
            if (!_userValidator.ValidateEmail(userDto.Email, out string errorMessage))
            {
                throw new InvalidOperationException(errorMessage);
            }
            var hashedPassword = _passwordHasher.HashPassword(userDto.Password);

            var userEntity = _mapper.Map<User>(userDto);
            userEntity.PasswordHash = hashedPassword;
            userEntity.IsEmailConfirmed = false;
            userEntity.EmailConfirmationToken = _emailService.GenerateEmailConfirmationToken();
            await _userRepository.AddUserAsync(userEntity);

            var confirmationLink = GenerateEmailConfirmationLink(userEntity.Email, userEntity.EmailConfirmationToken);
            var mailRequest = new MailRequest
            {
                ToEmail = userDto.Email,
                Subject = "Confirm your email for new account ",
                Body = GetHtmlcontent(userEntity.Username, confirmationLink)
            };

            try
            {
                await _emailService.SendEmailAsync(mailRequest);
            }
            catch (Exception ex)
            {
                
                throw new InvalidOperationException("Failed to send confirmation email. Please try again later.", ex);
            }
        }


        public async Task<bool> LoginAsync(LoginDto loginUserDto)

        {
            var user = await _userRepository.GetByUserNameAsync(loginUserDto.UserName);
            if (user == null)
            {
                throw new InvalidOperationException("Login failed. Please check your username and password.");

            }

            var result = _passwordHasher.VerifyPassword(loginUserDto.Password, user.PasswordHash);
            if (!result)
            {
                throw new InvalidOperationException("Login failed. Please check your username and password.");

            }

             if (!user.IsEmailConfirmed)
            {
                throw new InvalidOperationException("Login failed. Please confirm your email before login.");
            }

            return result;

        }

        public async Task<bool> ConfirmEmailAsync(string email, string token)
        {
            var user = await _userRepository.GetByEmailAndTokenAsync(email, token);
            if (user == null || user.IsEmailConfirmed)
            {
                return false;
            }

            user.IsEmailConfirmed = true;
            user.EmailConfirmationToken = null;
            await _userRepository.UpdateUserAsync(user);

            return true;
        }

        private string GenerateEmailConfirmationLink(string email, string token)
        {
            
            return $"https://localhost:7142/api/Users/ConfirmEmail?token={token}&email={email}";
        }


        public async Task<UserDto> GetUserByUserNameAsync(string userName)
        {
            var userEntity = await _userRepository.GetByUserNameAsync(userName);
            if (userEntity == null)
            {
                throw new KeyNotFoundException($"UserName '{userName}' not found.");
            }
            return _mapper.Map<UserDto>(userEntity);

        }

        public async Task UpdateUser(UpdateUserDto userDto)
        {
            var existingUser = await _userRepository.GetByUserNameAsync(userDto.UserName);
            if (existingUser == null)
            {
                throw new KeyNotFoundException($"User '{userDto.UserName}' not found.");
            }

            if (!_userValidator.ValidatePhoneNumber(userDto.PhoneNumber, out string errorMessage))
            {
                throw new InvalidOperationException(errorMessage);
            }

            existingUser.FirstName = userDto.FirstName;
            existingUser.LastName = userDto.LastName;
            existingUser.PhoneNumber = userDto.PhoneNumber;
            existingUser.Address = userDto.Address;

           
            await _userRepository.UpdateUserAsync(existingUser);

        }

        private string GetHtmlcontent(string username, string confirmationLink)
        {

            string response = "<div style=\"width:100%;text-align:center;margin:10px\">";
            response += "<h1>Welcome to Smart Money</h1>";
            response += "<img src=\"https://mma.prnewswire.com/media/1633444/Welcome_Logo.jpg?p=facebook\" style=\"max-width:550px;\" />"; // Corrected the closing of the style attribute
            response += "<h2>Your Account:</h2>";
            response += $"<p>Username: {username}</p>";
            response += $"Please confirm your email by clicking <a href='{confirmationLink}'>here</a>.";
            response += "</div>";
            return response;
        }
    }
}
