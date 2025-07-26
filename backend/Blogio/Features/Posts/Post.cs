using Blogio.Features.Users;

namespace Blogio.Features.Posts
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public Guid AuthorId { get; set; }

        public User Author { get; set; }
    }
}
