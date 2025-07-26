﻿
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace Blogio.Features.Caching
{
    public class RedisCacheService : IRedisCacheService
    {
        private readonly IDistributedCache _cache;

        public RedisCacheService(IDistributedCache cache)
        {
            _cache = cache;
        }
        public void SetData<T>(string key, T value, TimeSpan? expiration = null)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiration ?? TimeSpan.FromMinutes(5),
                //SlidingExpiration = expiration ?? TimeSpan.FromMinutes(1)
            };

            _cache.SetString(key, JsonSerializer.Serialize(value), options);
        }

        public T? GetData<T>(string key)
        {
            var data = _cache.GetString(key);

            if (data == null)
                return default;

            return JsonSerializer.Deserialize<T>(data);
        }
    }
}
