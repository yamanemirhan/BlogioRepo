using Blogio.Common;

namespace Blogio.Features.Auth
{
    public interface IAuthRepository
    {
        Task<ApiResponse<object>> RegisterAsync(RegisterRequest request);
        Task<ApiResponse<object>> LoginAsync(LoginRequest request);
    }
}
