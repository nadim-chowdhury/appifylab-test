# Social Media Application

A full-stack social media application built with Next.js, NestJS, and PostgreSQL. This application features user authentication, post creation with privacy controls, comments, replies, and a comprehensive like system.

## 🚀 Features

### Authentication & Authorization

- **JWT-based authentication** with secure token management
- **Session persistence** with refresh token support
- User registration with email and password
- Secure login with bcrypt password hashing
- Protected routes requiring authentication

### Feed & Posts

- **Create posts** with text and optional images
- **Privacy controls**: Public or Private posts
  - Public posts: Visible to all users
  - Private posts: Visible only to the author
- **Real-time feed** displaying posts from all users (newest first)
- **Like/Unlike** posts with visual feedback
- **View who liked** each post
- **Delete your own posts**

### Comments & Replies

- **Comment on posts** with text content
- **Reply to comments** creating threaded discussions
- **Like/Unlike** comments and replies independently
- **View who liked** comments and replies
- **Nested display** showing comment hierarchy

### User Experience

- **Responsive design** optimized for all screen sizes (mobile, tablet, desktop)
- **Loading states** for better user feedback
- **Error handling** with user-friendly messages
- **Modern UI** with TailwindCSS and Radix UI components

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: TailwindCSS 4
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **TypeScript**: Full type safety

### Backend

- **Framework**: NestJS 11
- **Database**: PostgreSQL
- **ORM**: Prisma 5
- **Authentication**: Passport.js with JWT strategy
- **Validation**: class-validator
- **API Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate limiting (Throttler)

## 📁 Project Structure

```
appifylab-test/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app router pages
│   │   ├── (private)/      # Protected routes
│   │   │   └── feed/       # Main feed page
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── feed/          # Feed-related components
│   │   ├── common/        # Shared components
│   │   ├── providers/     # Context providers
│   │   └── ui/            # UI component library
│   ├── store/             # Redux store configuration
│   │   ├── services/      # RTK Query API services
│   │   └── slices/        # Redux slices
│   ├── hooks/             # Custom React hooks
│   └── public/            # Static assets
│
└── backend/                # NestJS backend application
    ├── src/
    │   ├── auth/          # Authentication module
    │   ├── users/         # User management
    │   ├── posts/         # Posts module
    │   ├── comments/      # Comments module
    │   ├── replies/       # Replies module
    │   ├── likes/         # Likes module
    │   ├── common/        # Shared utilities
    │   └── prisma/        # Prisma service
    └── prisma/            # Database schema and migrations
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Store user credentials and profile information
- **Posts**: User-generated content with privacy settings
- **Comments**: Comments on posts
- **Replies**: Replies to comments
- **PostLikes**: Likes on posts
- **CommentLikes**: Likes on comments
- **ReplyLikes**: Likes on replies

All relationships use cascading deletes for data integrity.

## 🔐 Security Features

1. **Password Security**

   - Bcrypt hashing with salt rounds
   - No plain text password storage

2. **JWT Authentication**

   - Access tokens for API requests (15 minutes expiry)
   - Refresh tokens for session persistence (7 days expiry)
   - Token validation and rotation

3. **API Security**

   - Helmet for HTTP headers security
   - CORS configuration (localhost and 127.0.0.1)
   - Rate limiting to prevent abuse (100 requests per 15 minutes)
   - Input validation on all endpoints

4. **Authorization**
   - Route guards for protected endpoints
   - User ownership validation for mutations
   - Privacy controls for content visibility

## ⚡ Performance Optimizations

1. **Database**

   - Indexed fields for faster queries (email, userId, createdAt, isPrivate, etc.)
   - Efficient query patterns with Prisma
   - Pagination for large datasets (20 posts per page)

2. **Frontend**

   - RTK Query caching and invalidation
   - Optimistic updates for better UX
   - Code splitting with Next.js
   - Image optimization with Next.js Image component
   - Responsive images for different screen sizes

3. **Backend**
   - Compression middleware
   - Efficient database queries with selective field loading
   - Connection pooling
   - Response transformation interceptor

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd appifylab-test
```

2. **Backend Setup**

```bash
cd backend
npm install

# Create .env file with your configuration
# DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, PORT, etc.

# Run database migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

The backend will run on `http://localhost:5000`

3. **Frontend Setup**

```bash
cd frontend
npm install

# Create .env.local file
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

4. **Access the application**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/v1
- **API Documentation**: http://localhost:5000/api/docs

## 📝 Environment Variables

### Backend (.env)

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/social_media_app"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
JWT_REFRESH_EXPIRES_IN="7d"

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## 🧪 Testing

### Backend

```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage report
```

### Manual Testing

1. Register a new user
2. Login with credentials
3. Create public and private posts
4. Like/unlike posts
5. Add comments and replies
6. Test privacy controls
7. Logout and verify redirect

## 📦 Deployment

### Backend Deployment

1. **Build the application**

```bash
cd backend
npm run build
```

2. **Run migrations**

```bash
npx prisma migrate deploy
```

3. **Start production server**

```bash
npm run start:prod
```

### Frontend Deployment

1. **Build the application**

```bash
cd frontend
npm run build
```

2. **Start production server**

```bash
npm start
```

### Recommended Platforms

- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, AWS EC2, DigitalOcean
- **Database**: Supabase, Railway, AWS RDS, DigitalOcean Managed Databases

## 🎯 Design Decisions

### Architecture

- **Monorepo structure**: Separate frontend and backend for clear separation of concerns
- **RESTful API**: Simple, well-understood API design with `/api/v1` prefix
- **JWT Authentication**: Stateless authentication for scalability
- **Redux Toolkit**: Centralized state management with built-in best practices

### Database Design

- **UUID primary keys**: Better for distributed systems and security
- **Cascading deletes**: Automatic cleanup of related data
- **Indexes**: Optimized for common query patterns
- **Timestamps**: Track creation and updates for all entities
- **Unique constraints**: Prevent duplicate likes

### Frontend Architecture

- **App Router**: Modern Next.js routing with server components where beneficial
- **RTK Query**: Automatic caching, loading states, and data synchronization
- **Component composition**: Reusable, maintainable component structure
- **Type safety**: Full TypeScript coverage for reliability
- **Protected Routes**: Middleware for authentication checks

### Scalability Considerations

- **Pagination**: Prevents loading excessive data
- **Caching**: RTK Query caches reduce unnecessary API calls
- **Database indexes**: Fast queries even with millions of records
- **Stateless backend**: Easy horizontal scaling

## 🔄 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/validate` - Validate JWT token
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh` - Refresh access token

### Posts

- `GET /api/v1/posts` - Get paginated posts (query: page, limit)
- `POST /api/v1/posts` - Create new post
- `GET /api/v1/posts/:id` - Get single post with comments
- `PATCH /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post

### Comments

- `GET /api/v1/comments/post/:postId` - Get comments for a post
- `POST /api/v1/comments` - Create comment
- `DELETE /api/v1/comments/:id` - Delete comment

### Replies

- `POST /api/v1/replies` - Create reply
- `DELETE /api/v1/replies/:id` - Delete reply

### Likes

- `POST /api/v1/likes/posts/:postId` - Toggle post like
- `POST /api/v1/likes/comments/:commentId` - Toggle comment like
- `POST /api/v1/likes/replies/:replyId` - Toggle reply like

## 🐛 Troubleshooting

### Common Issues

**401 Unauthorized Error**

- Ensure you're logged in
- Check if token is stored in localStorage
- Verify CORS configuration allows your frontend URL

**CORS Errors**

- Backend accepts both `localhost:3000` and `127.0.0.1:3000`
- Check `FRONTEND_URL` in backend `.env`

**Database Connection Errors**

- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Run `npx prisma migrate dev`

**Port Already in Use**

- Frontend default: 3000
- Backend default: 5000
- Change ports in `.env` if needed

## 👥 Contributing

This is a test project for AppifyLab. For production use, consider:

- Adding comprehensive test coverage
- Implementing CI/CD pipelines
- Adding monitoring and logging (Sentry, New Relic)
- Implementing rate limiting per user
- Adding image upload functionality (AWS S3, Cloudinary)
- Implementing real-time updates with WebSockets
- Adding user profiles and avatars
- Implementing search functionality
- Adding email verification

## 📄 License

This project is created as a technical assessment for AppifyLab.

## 🙏 Acknowledgments

- Design inspiration from modern social media platforms
- Built with best practices from NestJS and Next.js communities
- UI components from Radix UI and shadcn/ui

---

**Built with ❤️ for AppifyLab Technical Assessment**
