## WritersHub Backend

Setup

1. Copy .env.example to .env and set values
2. Install deps: `npm install`
3. Start dev server: `npm run dev`

Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/stories/latest`
- `POST /api/stories` (auth)
- `POST /api/stories/:id/like` (auth)
- `POST /api/stories/:id/comments` (auth)
- `GET /api/stories/:id`
- `GET /api/users/me` (auth)
- `GET /api/users/:id`
- `POST /api/users/:id/follow` (auth)




