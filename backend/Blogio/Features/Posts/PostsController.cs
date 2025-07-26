using Blogio.Common;
using Blogio.Common.Extensions;
using Blogio.Features.Caching;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blogio.Features.Posts
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IRedisCacheService _redisCacheService;

        public PostsController(IPostRepository postRepository, IRedisCacheService redisCacheService)
        {
            _postRepository = postRepository;
            _redisCacheService = redisCacheService;
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] PostRequest request)
        {
            var clerkId = User.GetUserClerkId();
            if (string.IsNullOrEmpty(clerkId))
            {
                var response = ApiResponse<object>.Fail("Unauthorized access. Please log in again.", statusCode: 401);
                return StatusCode(response.StatusCode, response);
            }

            var result = await _postRepository.CreatePostAsync(request, clerkId);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("all")]
        [Authorize]
        public async Task<IActionResult> GetAllPosts()
        {
            var clerkId = User.GetUserClerkId();
            if (string.IsNullOrEmpty(clerkId))
            {
                var response = ApiResponse<object>.Fail("Unauthorized access. Please log in again.", statusCode: 401);
                return StatusCode(response.StatusCode, response);
            }

            var posts = _redisCacheService.GetData<List<Post>>("posts");
            if(posts is not null)
            {
                var response = ApiResponse<List<Post>>.Success(posts, "Posts retrieved from cache.");
                return StatusCode(response.StatusCode, response);
            }

            var result = await _postRepository.GetAllPostsAsync();

            //_redisCacheService.SetData("posts", result.Data, TimeSpan.FromMinutes(1));
            _redisCacheService.SetData("posts", result.Data, TimeSpan.FromMinutes(5));

            return StatusCode(result.StatusCode, result);
        }
    }
}
