A demo project using Next.js and Clerk for authentication, syncing users to a custom PostgreSQL database via webhooks.  
Redis is used for basic data caching. PostgreSQL, Redis, and RedisInsight run via Docker.

## Features
- Next.js frontend with Clerk authentication
- Webhook-based user sync to PostgreSQL
- Redis used for simple data caching
- Dockerized PostgreSQL, Redis, and RedisInsight services
- Ngrok used for local tunnel (example command: `ngrok http --url=your-ngrok-url.ngrok-free.app 3000`)

## Planned Enhancements
- More resilient webhook handling (retry logic, error queue, consistency management if local DB fails)
- RBAC and ABAC
