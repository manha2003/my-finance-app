using System;
using BusinessLogicLayer.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.UserService
{
    public interface IUserService
    {
        Task RegisterAsync(UserAddDto userDto);
        Task<bool> LoginAsync(LoginDto userDto);
        Task<bool> ConfirmEmailAsync(string email, string token);
        Task<UserDto> GetUserByUserNameAsync(string userName);
        
        Task UpdateUser(UpdateUserDto userDto);
    }
}
