using Blogio.Common;
using Blogio.Features.Users;
using Blogio.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Blogio.Features.Posts
{
    public class PostRepository : IPostRepository
    {
        private readonly DatabaseContext _context;
        private readonly IUserRepository _userRepository;

        public PostRepository(DatabaseContext context, IUserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;
        }

        public async Task<ApiResponse<object>> CreatePostAsync(PostRequest request, string clerkId)
        {   
            var user = await _userRepository.GetUserByClerkId(clerkId);

            if (user == null)
            {
                return ApiResponse<object>.Fail("User not found", statusCode: 404);
            }

            var post = new Post
            {
               AuthorId = user.Id,
               Title = request.Title,
               Content = request.Content,
               CreatedDate = DateTime.UtcNow,
               IsDeleted = false,
               Id = Guid.NewGuid()
            };

            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();

            return ApiResponse<object>.Success(null, "Post created successfully.", 201);
        }

        public async Task<ApiResponse<List<Post>>> GetAllPostsAsync()
        {
            var posts = await _context.Posts.Where(p => !p.IsDeleted).Include(p => p.Author).ToListAsync();
            return ApiResponse<List<Post>>.Success(posts, "All posts retrieved successfully.", 200);
        }
    }
}
