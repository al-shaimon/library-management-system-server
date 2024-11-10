# Library Management System API

A robust backend API for managing library operations including book management, member management,
borrowing, and returns.

## Technology Stack

### Core Technologies

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

### Key Packages

- cors
- dotenv
- express
- http-status
- prisma
- typescript

## Features

### 1. Book Management

- Create new books
- List all books
- Get book details
- Update book information
- Delete books
- Handle duplicate book entries

### 2. Member Management

- Register new members
- View all members
- Get member details
- Update member information
- Delete members
- Prevent deletion of members with active borrows

### 3. Borrowing System

- Borrow books
- Track available copies
- Manage return dates
- Handle multiple copies

### 4. Return System

- Process book returns
- Update book availability
- Track return history

## Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/al-shaimon/library-management-system-server.git

cd library-management-system-server 
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
env
DATABASE_URL="postgresql://username:password@localhost:5432/library_db"
```

4. Run Prisma migrations

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run dev
```

## API Endpoints

### Books
- POST /api/books - Create a new book
- GET /api/books - Get all books
- GET /api/books/:bookId - Get book by ID
- PUT /api/books/:bookId - Update book
- DELETE /api/books/:bookId - Delete book

### Members
- POST /api/members - Register new member
- GET /api/members - Get all members
- GET /api/members/:memberId - Get member by ID
- PUT /api/members/:memberId - Update member
- DELETE /api/members/:memberId - Delete member

### Borrow
- POST /api/borrow - Borrow a book
- GET /api/borrow/overdue - Get overdue books

### Return
- POST /api/return - Return a book

## Error Handling

The API implements comprehensive error handling for:
- Duplicate entries
- Not found resources
- Invalid operations
- Foreign key constraints
- Server errors

## Known Issues

1. Database connection timeout needs better handling
2. Need to implement pagination for large data sets
3. Rate limiting not yet implemented

## Future Improvements

1. Add authentication and authorization
2. Implement book reservation system
3. Add fine calculation for overdue books
4. Add book categories and search functionality
5. Implement caching for frequently accessed data
