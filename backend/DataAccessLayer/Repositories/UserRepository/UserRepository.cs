using System;
using DataAccessLayer.Data;
using System.Collections.Generic;
using DataAccessLayer.Models;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace DataAccessLayer.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly OnlineExpenseTrackingDbContext _context;

        public UserRepository(OnlineExpenseTrackingDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUserAsync()
        {
            return await _context.Users

            .ToListAsync();
        }
        public async Task<User> GetByUserNameAsync(string username)
        {
            return await _context.Users

                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> GetByUserIdAsync(Guid userId)
        {
            return await _context.Users

                .FirstOrDefaultAsync(u => u.UserId == userId);

        }

        public async Task<User> GetByUserEmailAsync(string email)
        {
            return await _context.Users

                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(string userName)
        {
            var user = await GetByUserNameAsync(userName);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<User> GetByEmailAndTokenAsync(string email, string token)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email && u.EmailConfirmationToken == token);
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }


        public bool IsEmailUnique(string email)
        {

            return _context.Users.Any(u => u.Email == email);
        }

    }
}
