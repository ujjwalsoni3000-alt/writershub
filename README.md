# WritersHub

A platform for writers to publish stories, follow each other, and engage through likes and comments. This repository currently contains the **backend REST API**, built with Express and MongoDB (Mongoose).

## Features

- Email and password signup and login with JWT authentication (7-day tokens)
- Publish stories with a title, content, genre, tags, and cover image
- Browse the latest stories and open a single story with its author and comments
- Like and unlike stories
- Comment on stories
- User profiles, plus follow and unfollow

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Framework | Express 4 |
| Database | MongoDB with Mongoose 8 |
| Auth | JSON Web Tokens, bcryptjs |
| Other | cors, dotenv, multer, nodemon (dev) |

## Project Structure

```
writershub/
└── backend/
    ├── server.js          # App entry point, DB connection
    ├── middleware/
    │   └── auth.js        # JWT verification
    ├── models/
    │   ├── User.js
    │   ├── Story.js
    │   └── Comment.js
    └── routes/
        ├── auth.js        # /api/auth
        ├── stories.js     # /api/stories
        └── users.js       # /api/users
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A MongoDB instance (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Installation

```bash
git clone https://github.com/ujjwalsoni3000-alt/writershub.git
cd writershub/backend
npm install
```

### Environment variables

Create a `backend/.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/writershub
JWT_SECRET=replace-with-a-long-random-string
```

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret used to sign tokens. Use a long random value. |
| `PORT` | No | Server port (default `5000`) |

### Run

```bash
npm run dev     # development, auto-restarts with nodemon
npm start       # production
```

Check that it works:

```bash
curl http://localhost:5000/api/health
# {"ok":true}
```

## API Reference

Base URL: `http://localhost:5000/api`

Endpoints marked **Auth** need the header `Authorization: Bearer <token>`.

### Auth

| Method | Endpoint | Auth | Body |
| --- | --- | --- | --- |
| POST | `/auth/signup` | | `name`, `email`, `password` |
| POST | `/auth/login` | | `email`, `password` |

Both return `{ user: { id, name, email }, token }`.

### Stories

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/stories/latest` | | 20 most recent stories |
| GET | `/stories/:id` | | One story with author and comments |
| POST | `/stories` | Yes | Create a story: `title`, `content`, `genre`, `tags`, `coverImage` |
| POST | `/stories/:id/like` | Yes | Toggle like; returns `{ likesCount }` |
| POST | `/stories/:id/comments` | Yes | Add a comment: `text` |

### Users

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/users/me` | Yes | Your own profile |
| GET | `/users/:id` | | A public profile |
| POST | `/users/:id/follow` | Yes | Toggle follow; returns `{ following, followers }` |

### Example

```bash
# Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha","email":"asha@example.com","password":"secret123"}'

# Publish a story
curl -X POST http://localhost:5000/api/stories \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My first story","content":"Once upon a time...","genre":"Fantasy","tags":["intro"]}'
```

## Roadmap

- [ ] Edit and delete stories and comments
- [ ] Pagination for stories and comments
- [ ] Image upload for covers and profile pictures
- [ ] Feed of stories from followed writers
- [ ] Search and filtering by genre or tag
- [ ] Frontend client
- [ ] Automated tests and CI

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss larger changes.

## License

No license has been chosen yet. Add a `LICENSE` file (for example MIT) to state how others may use this code.
