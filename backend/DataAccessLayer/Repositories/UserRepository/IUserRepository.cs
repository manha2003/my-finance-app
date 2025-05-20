using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User> GetByUserNameAsync(string username);
        Task<List<User>> GetAllUserAsync();
        Task<User> GetByUserEmailAsync(string email);
        Task<User> GetByUserIdAsync(Guid userId);
        Task AddUserAsync(User user);
        Task DeleteAsync(string userName);
        Task<User> GetByEmailAndTokenAsync(string email, string token);
        Task UpdateUserAsync(User user);
        bool IsEmailUnique(string email);
    }
}
