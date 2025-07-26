namespace Blogio.Features.Auth
{
    public class LoginRequest
    {
        public string ClerkId { get; set; } 
        public string Email { get; set; }
        public string Username { get; set; }
        public bool IsBanned { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
    }
}
