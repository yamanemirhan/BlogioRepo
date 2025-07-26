using Blogio.Features.UserRoles;

namespace Blogio.Features.Users
{
    public class User
    {
        public Guid Id { get; set; }
        public string ClerkId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsBanned { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
