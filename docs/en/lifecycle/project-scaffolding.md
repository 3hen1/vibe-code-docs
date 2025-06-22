# Project Scaffolding & Design with AI

The project initialization phase sets the foundation for your entire development experience. With AI assistance and modern tooling, you can create well-structured, production-ready project scaffolds in minutes rather than hours.

## Using IDE Terminals & Modern Scaffolding Tools

Modern development starts with powerful scaffolding tools that generate optimized project structures. Your IDE's integrated terminal makes this process seamless.

### Frontend Project Scaffolding

#### React with TypeScript & Modern Tooling

**Using Vite (Recommended for 2025):**
```bash
# Create a new React project with TypeScript
npm create vite@latest my-react-app -- --template react-ts

# Navigate to project
cd my-react-app

# Install dependencies
npm install

# Add additional tools
npm install -D tailwindcss postcss autoprefixer @types/node
npm install react-router-dom @tanstack/react-query zustand

# Initialize Tailwind CSS
npx tailwindcss init -p
```

**Using Next.js for Full-Stack:**
```bash
# Create Next.js app with TypeScript and App Router
npx create-next-app@latest my-nextjs-app --typescript --tailwind --eslint --app

# Add additional dependencies
npm install @prisma/client prisma
npm install @auth/prisma-adapter next-auth
npm install zod react-hook-form @hookform/resolvers
```

#### Vue 3 with Composition API:
```bash
# Create Vue 3 project
npm create vue@latest my-vue-app

# Choose options:
# ✅ TypeScript
# ✅ Router
# ✅ Pinia (state management)
# ✅ Vitest (testing)
# ✅ ESLint + Prettier

cd my-vue-app
npm install
```

### Backend Project Scaffolding

#### Spring Boot (Java):
```bash
# Using Spring Initializr CLI
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,postgresql,security,validation \
  -d javaVersion=17 \
  -d type=gradle-project \
  -d groupId=com.example \
  -d artifactId=my-spring-app \
  -o my-spring-app.zip

unzip my-spring-app.zip && cd my-spring-app
```

**Or use your IDE's Spring Initializr integration:**
- **IntelliJ IDEA:** File → New → Project → Spring Initializr
- **VS Code:** Install "Spring Initializr Java Support" extension

#### Go Web Service:
```bash
# Initialize Go module
go mod init github.com/username/my-go-api

# Create project structure
mkdir -p cmd/server internal/{handler,service,repository} pkg/database

# Install common dependencies
go get github.com/gin-gonic/gin
go get github.com/lib/pq
go get github.com/golang-migrate/migrate/v4
go get github.com/joho/godotenv
```

#### Node.js with Express:
```bash
# Create package.json with modern defaults
npm init -y

# Install core dependencies
npm install express cors helmet morgan dotenv
npm install -D typescript @types/node @types/express
npm install -D nodemon ts-node concurrently

# Initialize TypeScript
npx tsc --init
```

## AI-Assisted Project Initialization

AI can generate sophisticated project configurations, Docker setups, and boilerplate code that would take hours to write manually.

### AI-Generated Configuration Files

#### Advanced package.json with AI:

**Prompt:**
```
Create a package.json for a React TypeScript project with:
- Vite for bundling
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- Jest and React Testing Library for testing
- ESLint and Prettier for code quality
- Husky for git hooks
- Include useful scripts for development, build, test, and linting
```

**AI Generated Result:**
```json
{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@tanstack/react-query": "^4.24.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0",
    "typescript": "^4.9.3",
    "tailwindcss": "^3.2.0",
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.21",
    "@typescript-eslint/eslint-plugin": "^5.51.0",
    "@typescript-eslint/parser": "^5.51.0",
    "eslint": "^8.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "prettier": "^2.8.4",
    "husky": "^8.0.3",
    "lint-staged": "^13.1.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "jest": "^29.4.0",
    "@types/jest": "^29.4.0"
  }
}
```

#### Dockerfile Generation with AI:

**Prompt:**
```
Generate a production-ready Dockerfile for a Node.js Express application with:
- Node.js 18 Alpine base image
- Multi-stage build for optimization
- Non-root user for security
- Proper layer caching for dependencies
- Health check endpoint
- Environment variable support
```

**AI Generated Result:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM node:18-alpine AS production

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeapp -u 1001

WORKDIR /app

# Copy dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodeapp:nodejs . .

# Switch to non-root user
USER nodeapp

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["node", "server.js"]
```

### AI-Generated Project Structures

#### Spring Boot Microservice Structure:

**Prompt:**
```
Create a well-structured Spring Boot project layout for a microservice with:
- Clean Architecture principles
- Domain-driven design
- Proper separation of concerns
- Configuration for PostgreSQL
- Docker support
- Comprehensive testing structure
```

**AI Generated Structure:**
```
src/
├── main/
│   ├── java/com/example/userservice/
│   │   ├── UserServiceApplication.java
│   │   ├── config/
│   │   │   ├── DatabaseConfig.java
│   │   │   ├── SecurityConfig.java
│   │   │   └── SwaggerConfig.java
│   │   ├── controller/
│   │   │   ├── UserController.java
│   │   │   └── HealthController.java
│   │   ├── service/
│   │   │   ├── UserService.java
│   │   │   └── impl/UserServiceImpl.java
│   │   ├── repository/
│   │   │   └── UserRepository.java
│   │   ├── domain/
│   │   │   ├── User.java
│   │   │   └── UserRole.java
│   │   ├── dto/
│   │   │   ├── UserCreateDto.java
│   │   │   ├── UserResponseDto.java
│   │   │   └── UserUpdateDto.java
│   │   ├── exception/
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── UserNotFoundException.java
│   │   │   └── ValidationException.java
│   │   └── util/
│   │       └── ValidationUtils.java
│   └── resources/
│       ├── application.yml
│       ├── application-dev.yml
│       ├── application-prod.yml
│       └── db/migration/
│           └── V1__Create_user_table.sql
└── test/
    └── java/com/example/userservice/
        ├── controller/
        │   └── UserControllerTest.java
        ├── service/
        │   └── UserServiceTest.java
        ├── repository/
        │   └── UserRepositoryTest.java
        └── integration/
            └── UserIntegrationTest.java
```

### Environment Configuration with AI

#### Comprehensive .env Template:

**Prompt:**
```
Generate a comprehensive .env template for a full-stack application with:
- Database configuration (PostgreSQL)
- Redis for caching
- JWT authentication
- Email service (SendGrid)
- File storage (AWS S3)
- Monitoring (Sentry)
- Development and production variations
```

**AI Generated .env:**
```bash
# ==============================================
# APPLICATION CONFIGURATION
# ==============================================
NODE_ENV=development
PORT=3000
API_VERSION=v1

# ==============================================
# DATABASE CONFIGURATION
# ==============================================
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp_dev
DB_USER=postgres
DB_PASSWORD=your_password_here
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# ==============================================
# REDIS CONFIGURATION
# ==============================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_URL=redis://${REDIS_HOST}:${REDIS_PORT}

# ==============================================
# AUTHENTICATION
# ==============================================
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=30d

# ==============================================
# EMAIL SERVICE
# ==============================================
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourapp.com
FROM_NAME=Your App Name

# ==============================================
# FILE STORAGE (AWS S3)
# ==============================================
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-app-bucket

# ==============================================
# MONITORING & LOGGING
# ==============================================
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=debug

# ==============================================
# FRONTEND URLS
# ==============================================
FRONTEND_URL=http://localhost:3001
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# ==============================================
# RATE LIMITING
# ==============================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Automated Project Setup Scripts

### AI-Generated Setup Script:

**Prompt:**
```
Create a setup script that:
- Initializes a new full-stack project
- Sets up database with Docker
- Installs all dependencies
- Configures environment variables
- Runs initial migrations
- Starts development servers
```

**AI Generated setup.sh:**
```bash
#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    command -v node >/dev/null 2>&1 || { print_error "Node.js is required but not installed. Aborting."; exit 1; }
    command -v docker >/dev/null 2>&1 || { print_error "Docker is required but not installed. Aborting."; exit 1; }
    command -v docker-compose >/dev/null 2>&1 || { print_error "Docker Compose is required but not installed. Aborting."; exit 1; }
    
    print_status "All dependencies are installed."
}

# Setup database with Docker
setup_database() {
    print_status "Setting up database with Docker..."
    
    if [ ! -f "docker-compose.yml" ]; then
        cat > docker-compose.yml << EOL
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
EOL
    fi
    
    docker-compose up -d
    print_status "Database services are running."
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Backend dependencies
    if [ -d "backend" ]; then
        cd backend
        npm install
        cd ..
    fi
    
    # Frontend dependencies
    if [ -d "frontend" ]; then
        cd frontend
        npm install
        cd ..
    fi
    
    print_status "Dependencies installed successfully."
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_warning "Please update .env file with your actual configuration values."
    fi
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    if [ -d "backend" ]; then
        cd backend
        npm run migrate
        cd ..
    fi
}

# Start development servers
start_dev_servers() {
    print_status "Starting development servers..."
    
    # Start backend in background
    if [ -d "backend" ]; then
        cd backend
        npm run dev &
        BACKEND_PID=$!
        cd ..
    fi
    
    # Start frontend in background
    if [ -d "frontend" ]; then
        cd frontend
        npm run dev &
        FRONTEND_PID=$!
        cd ..
    fi
    
    print_status "Development servers are running."
    print_status "Backend: http://localhost:3000"
    print_status "Frontend: http://localhost:3001"
    
    # Wait for user input to stop servers
    read -p "Press Enter to stop development servers..."
    
    # Kill background processes
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID
    fi
}

# Main execution
main() {
    print_status "Starting project setup..."
    
    check_dependencies
    setup_database
    install_dependencies
    setup_environment
    run_migrations
    start_dev_servers
    
    print_status "Project setup completed successfully!"
}

# Run main function
main
```

---

**Your project is now scaffolded and ready for development.**

> **Next:** Learn AI-assisted coding techniques that will transform how you write code in [The Art of AI-Assisted Coding](./ai-coding.md).
