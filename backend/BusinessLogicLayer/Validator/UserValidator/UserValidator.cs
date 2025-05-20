using System;
using System.Collections.Generic;
using System.Linq;
using DataAccessLayer.Repositories.UserRepository;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Validator.UserValidator
{
    public class UserValidator : IUserValidator
    {
        private readonly IUserRepository _userRepository;

        public UserValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;

        }

        public bool ValidateEmail(string email, out string errorMessage)
        {
            errorMessage = null;
            if (string.IsNullOrEmpty(email))
            {
                errorMessage = "Email is Required";
                return false;
            }
            if (!email.EndsWith("@gmail.com", StringComparison.OrdinalIgnoreCase))
            {
                errorMessage = "Email must be in the format '@gmail.com'";
                return false;
            }
            if (_userRepository.IsEmailUnique(email))
            {
                errorMessage = "This Email has been taken";
                return false;
            }
            return true;
        
        }

       

        public bool ValidatePhoneNumber(string phoneNumber, out string errorMessage)
        {
            errorMessage = string.Empty;

            if (string.IsNullOrEmpty(phoneNumber))
            {
                errorMessage = "Phone number is required.";
                return false;
            }

            if (phoneNumber[0] != '0')
            {
                errorMessage = "Phone number must start with '0'.";
                return false;
            }

            if (!phoneNumber.Skip(1).All(char.IsDigit))
            {
                errorMessage = "Phone number must contain only digits after the initial '0'.";
                return false;
            }

            return true;
        }
    }
}
