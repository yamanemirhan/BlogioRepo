using Blogio.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Blogio.Features.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByClerkId(string clerkId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.ClerkId == clerkId);
        }
    }
}
