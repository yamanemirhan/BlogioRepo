using Blogio.Common;

namespace Blogio.Features.Users
{
    public interface IUserRepository
    {
        Task<User?> GetUserByClerkId(string clerkId);
    }
}
