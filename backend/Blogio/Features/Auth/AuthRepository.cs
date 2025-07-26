using Blogio.Common;
using Blogio.Features.Users;
using Blogio.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Blogio.Features.Auth
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatabaseContext _context;

        public AuthRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<object>> RegisterAsync(RegisterRequest request)
        {
            var userExists = await _context.Users.AnyAsync(u =>
                        u.Email == request.Email || u.Username == request.Username);
            if (userExists)
                return ApiResponse<object>.Fail("This email or username is already registered.", statusCode: 409);


            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username,
                Email = request.Email,
                ClerkId = request.ClerkId,
                CreatedDate = DateTime.UtcNow,
                IsBanned = false,
                IsDeleted = false,
                IsActive = true
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return ApiResponse<object>.Success(null, "Registration successful.", 201);
        }

        public async Task<ApiResponse<object>> LoginAsync(LoginRequest request)
        {
            return ApiResponse<object>.Success(null, "Login successful.", 200);
        }
    }
}
