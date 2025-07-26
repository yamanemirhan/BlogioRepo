using Blogio.Common;

namespace Blogio.Features.Posts
{
    public interface IPostRepository
    {
        Task<ApiResponse<object>> CreatePostAsync(PostRequest request, string clerkId);
        Task<ApiResponse<List<Post>>> GetAllPostsAsync();
    }
}
