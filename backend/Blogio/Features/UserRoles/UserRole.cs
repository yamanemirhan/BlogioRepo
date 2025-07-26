using Blogio.Features.Roles;
using Blogio.Features.Users;

namespace Blogio.Features.UserRoles
{
    public class UserRole
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }

        public User User { get; set; }
        public Role Role { get; set; }
    }
}
