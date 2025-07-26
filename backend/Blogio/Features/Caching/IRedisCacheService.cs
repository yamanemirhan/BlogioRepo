namespace Blogio.Features.Caching
{
    public interface IRedisCacheService
    {
        void SetData<T>(string key, T value, TimeSpan? expiration = null);
        T? GetData<T>(string key);
    }
}
