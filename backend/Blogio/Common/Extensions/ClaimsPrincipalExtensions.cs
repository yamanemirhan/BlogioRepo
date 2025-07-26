using System.Security.Claims;

namespace Blogio.Common.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserClerkId(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        }

        public static string GetSessionId(this ClaimsPrincipal user)
        {
            return user.FindFirstValue("sid") ?? string.Empty;
        }

        public static string GetAuthorizedParty(this ClaimsPrincipal user)
        {
            return user.FindFirstValue("azp") ?? string.Empty;
        }

        public static bool IsAuthenticated(this ClaimsPrincipal user)
        {
            return user?.Identity != null && user.Identity.IsAuthenticated;
        }
    }
}
