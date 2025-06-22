# The Art of AI-Assisted Coding

AI-assisted coding is not about replacing the developer—it's about amplifying human creativity and productivity. The best developers of 2025 are those who've mastered the art of human-AI collaboration, creating code faster and with higher quality than ever before.

## Universal AI Coding Techniques

### Code Generation from Comments

The most fundamental AI coding technique is **comment-driven development**. Write what you want in plain English, and let AI generate the implementation.

#### Basic Function Generation:
```typescript
// Create a function that validates password strength
// Requirements:
// - At least 8 characters long
// - Contains uppercase and lowercase letters
// - Contains at least one number
// - Contains at least one special character
// - Returns an object with isValid boolean and error messages array

// AI will generate:
function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

### Intelligent Code Completion

Modern AI doesn't just complete the current line—it understands context and generates entire code blocks.

#### Example: JWT Token Management
```typescript
class AuthService {
  private secretKey: string;
  
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  
  // AI understands the context and generates complete methods:
  generateToken(payload: any, expiresIn: string = '24h'): string {
    // AI generates complete JWT token creation logic
  }
  
  verifyToken(token: string): any {
    // AI generates complete JWT verification logic
  }
  
  refreshToken(oldToken: string): string {
    // AI generates token refresh logic
  }
}
```

### Code Explanation and Learning

Use AI to understand complex code and learn new patterns.

#### Understanding Complex Code:
```typescript
// Select this complex code and ask AI: "Explain what this code does"
const result = await Promise.allSettled([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
]).then(results => {
  return results.reduce((acc, result, index) => {
    const keys = ['users', 'posts', 'comments'];
    if (result.status === 'fulfilled') {
      acc[keys[index]] = result.value;
    } else {
      acc[keys[index]] = { error: result.reason };
    }
    return acc;
  }, {} as Record<string, any>);
});

// AI Explanation:
// This code performs concurrent API calls to fetch users, posts, and comments.
// It uses Promise.allSettled to ensure all requests complete regardless of individual failures.
// The results are then transformed into an object with keys 'users', 'posts', 'comments'.
// If a request succeeds, the data is stored; if it fails, an error object is stored instead.
```

## Frontend Development with AI

### Vue 3 Composition API with AI

#### AI-Generated Vue Component:

**Prompt:**
```
Create a Vue 3 component using Composition API for a user profile card with:
- Props: user object with id, name, email, avatar, role
- Emits: edit and delete events
- Slots: for custom actions
- TypeScript support
- Responsive design with Tailwind CSS
- Loading and error states
```

**AI Generated Component:**
```vue
<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
      <div class="h-4 bg-gray-300 rounded mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-600">
      <svg class="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>
      <p>{{ error }}</p>
    </div>
    
    <!-- Content -->
    <div v-else class="text-center">
      <!-- Avatar -->
      <img 
        :src="user.avatar || defaultAvatar" 
        :alt="`${user.name}'s avatar`"
        class="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
        @error="handleImageError"
      />
      
      <!-- User Info -->
      <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ user.name }}</h3>
      <p class="text-gray-600 mb-2">{{ user.email }}</p>
      
      <!-- Role Badge -->
      <span 
        class="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4"
        :class="roleClasses"
      >
        {{ user.role }}
      </span>
      
      <!-- Actions -->
      <div class="flex gap-2 justify-center">
        <button 
          @click="handleEdit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
        <button 
          @click="handleDelete"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
        
        <!-- Custom Actions Slot -->
        <slot name="actions" :user="user"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'moderator'
}

interface Props {
  user: User
  loading?: boolean
  error?: string
}

interface Emits {
  edit: [user: User]
  delete: [userId: string]
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: ''
})

const emit = defineEmits<Emits>()

const defaultAvatar = ref('https://via.placeholder.com/80?text=User')

const roleClasses = computed(() => {
  const baseClasses = 'inline-block px-3 py-1 text-xs font-medium rounded-full'
  const roleVariants = {
    admin: 'bg-red-100 text-red-800',
    moderator: 'bg-yellow-100 text-yellow-800',
    user: 'bg-green-100 text-green-800'
  }
  return `${baseClasses} ${roleVariants[props.user.role]}`
})

const handleEdit = () => {
  emit('edit', props.user)
}

const handleDelete = () => {
  emit('delete', props.user.id)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = defaultAvatar.value
}
</script>
```

#### AI-Generated React Hook:

**Prompt:**
```
Create a custom React hook for managing form state with:
- TypeScript support
- Validation using Zod schema
- Async submission handling
- Loading and error states
- Reset functionality
```

**AI Generated Hook:**
```typescript
import { useState, useCallback } from 'react'
import { z } from 'zod'

interface UseFormOptions<T> {
  schema: z.ZodSchema<T>
  onSubmit: (data: T) => Promise<void>
  initialValues: T
}

interface UseFormReturn<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  isLoading: boolean
  isSubmitting: boolean
  setValue: (field: keyof T, value: any) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  reset: () => void
  clearErrors: () => void
}

export function useForm<T extends Record<string, any>>({
  schema,
  onSubmit,
  initialValues
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])

  const validateForm = useCallback((): boolean => {
    try {
      schema.parse(values)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Partial<Record<keyof T, string>> = {}
        
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof T
          if (field) {
            formErrors[field] = err.message
          }
        })
        
        setErrors(formErrors)
      }
      return false
    }
  }, [values, schema])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setIsLoading(true)

    try {
      await onSubmit(values)
      setErrors({})
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ submit: error.message } as any)
      }
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }, [values, validateForm, onSubmit])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setIsLoading(false)
    setIsSubmitting(false)
  }, [initialValues])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    values,
    errors,
    isLoading,
    isSubmitting,
    setValue,
    handleSubmit,
    reset,
    clearErrors
  }
}

// Usage example:
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

function LoginForm() {
  const {
    values,
    errors,
    isSubmitting,
    setValue,
    handleSubmit
  } = useForm({
    schema: loginSchema,
    initialValues: { email: '', password: '' },
    onSubmit: async (data) => {
      // Handle login logic
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={values.email}
        onChange={(e) => setValue('email', e.target.value)}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email}</span>}
      
      <input
        type="password"
        value={values.password}
        onChange={(e) => setValue('password', e.target.value)}
        placeholder="Password"
      />
      {errors.password && <span>{errors.password}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

## Backend Development with AI

### Java Spring Boot with AI

#### AI-Generated REST Controller:

**Prompt:**
```
Create a Spring Boot REST controller for Product entity with:
- Full CRUD operations
- Request/Response DTOs
- Validation annotations
- Exception handling
- Pagination support
- Search functionality
- Swagger documentation
```

**AI Generated Controller:**
```java
package com.example.ecommerce.controller;

import com.example.ecommerce.dto.ProductCreateDto;
import com.example.ecommerce.dto.ProductResponseDto;
import com.example.ecommerce.dto.ProductUpdateDto;
import com.example.ecommerce.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Product Management", description = "Operations for managing products")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "Get all products", description = "Retrieve a paginated list of products with optional search")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved products"),
        @ApiResponse(responseCode = "400", description = "Invalid pagination parameters")
    })
    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> getAllProducts(
            @Parameter(description = "Search term for product name or description")
            @RequestParam(value = "search", required = false) String search,
            
            @Parameter(description = "Category filter")
            @RequestParam(value = "category", required = false) String category,
            
            @Parameter(description = "Minimum price filter")
            @RequestParam(value = "minPrice", required = false) Double minPrice,
            
            @Parameter(description = "Maximum price filter")
            @RequestParam(value = "maxPrice", required = false) Double maxPrice,
            
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        
        Page<ProductResponseDto> products = productService.findAll(
            search, category, minPrice, maxPrice, pageable
        );
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "Get product by ID", description = "Retrieve a specific product by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product found"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProductById(
            @Parameter(description = "Product ID", required = true)
            @PathVariable UUID id) {
        
        ProductResponseDto product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @Operation(summary = "Create new product", description = "Create a new product")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Product created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "409", description = "Product with this SKU already exists")
    })
    @PostMapping
    public ResponseEntity<ProductResponseDto> createProduct(
            @Parameter(description = "Product creation data", required = true)
            @Valid @RequestBody ProductCreateDto createDto) {
        
        ProductResponseDto createdProduct = productService.create(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @Operation(summary = "Update product", description = "Update an existing product")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> updateProduct(
            @Parameter(description = "Product ID", required = true)
            @PathVariable UUID id,
            
            @Parameter(description = "Product update data", required = true)
            @Valid @RequestBody ProductUpdateDto updateDto) {
        
        ProductResponseDto updatedProduct = productService.update(id, updateDto);
        return ResponseEntity.ok(updatedProduct);
    }

    @Operation(summary = "Delete product", description = "Delete a product by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Product deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @Parameter(description = "Product ID", required = true)
            @PathVariable UUID id) {
        
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get products by category", description = "Retrieve products filtered by category")
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<ProductResponseDto>> getProductsByCategory(
            @Parameter(description = "Category name", required = true)
            @PathVariable String category,
            
            @PageableDefault(size = 20, sort = "name", direction = Sort.Direction.ASC)
            Pageable pageable) {
        
        Page<ProductResponseDto> products = productService.findByCategory(category, pageable);
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "Update product inventory", description = "Update product stock quantity")
    @PatchMapping("/{id}/inventory")
    public ResponseEntity<ProductResponseDto> updateInventory(
            @Parameter(description = "Product ID", required = true)
            @PathVariable UUID id,
            
            @Parameter(description = "New stock quantity", required = true)
            @RequestParam("quantity") Integer quantity) {
        
        ProductResponseDto updatedProduct = productService.updateInventory(id, quantity);
        return ResponseEntity.ok(updatedProduct);
    }
}
```

### Go Web Service with AI

#### AI-Generated Go HTTP Handler:

**Prompt:**
```
Create a Go HTTP handler for user management with:
- Gin framework
- PostgreSQL database integration using pgx
- JWT authentication middleware
- Request validation using validator
- Error handling
- Logging with structured logs
- Rate limiting
```

**AI Generated Handler:**
```go
package handlers

import (
    "context"
    "database/sql"
    "net/http"
    "strconv"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
    "github.com/jackc/pgx/v5/pgxpool"
    "github.com/sirupsen/logrus"
    "golang.org/x/time/rate"
    
    "github.com/yourapp/internal/models"
    "github.com/yourapp/internal/services"
    "github.com/yourapp/pkg/auth"
    "github.com/yourapp/pkg/utils"
)

type UserHandler struct {
    db       *pgxpool.Pool
    logger   *logrus.Logger
    validate *validator.Validate
    limiter  *rate.Limiter
    userSvc  *services.UserService
}

type CreateUserRequest struct {
    Email     string `json:"email" validate:"required,email"`
    Password  string `json:"password" validate:"required,min=8"`
    FirstName string `json:"first_name" validate:"required,min=2"`
    LastName  string `json:"last_name" validate:"required,min=2"`
    Role      string `json:"role" validate:"required,oneof=user admin moderator"`
}

type UpdateUserRequest struct {
    Email     *string `json:"email,omitempty" validate:"omitempty,email"`
    FirstName *string `json:"first_name,omitempty" validate:"omitempty,min=2"`
    LastName  *string `json:"last_name,omitempty" validate:"omitempty,min=2"`
    Role      *string `json:"role,omitempty" validate:"omitempty,oneof=user admin moderator"`
    IsActive  *bool   `json:"is_active,omitempty"`
}

type UserResponse struct {
    ID        int       `json:"id"`
    Email     string    `json:"email"`
    FirstName string    `json:"first_name"`
    LastName  string    `json:"last_name"`
    Role      string    `json:"role"`
    IsActive  bool      `json:"is_active"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}

func NewUserHandler(db *pgxpool.Pool, logger *logrus.Logger) *UserHandler {
    return &UserHandler{
        db:       db,
        logger:   logger,
        validate: validator.New(),
        limiter:  rate.NewLimiter(rate.Every(time.Minute), 60), // 60 requests per minute
        userSvc:  services.NewUserService(db, logger),
    }
}

// Rate limiting middleware
func (h *UserHandler) RateLimitMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        if !h.limiter.Allow() {
            h.logger.WithField("ip", c.ClientIP()).Warn("Rate limit exceeded")
            c.JSON(http.StatusTooManyRequests, gin.H{
                "error": "Rate limit exceeded. Please try again later.",
            })
            c.Abort()
            return
        }
        c.Next()
    }
}

// @Summary Get all users
// @Description Retrieve a paginated list of users
// @Tags users
// @Accept json
// @Produce json
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(20)
// @Security BearerAuth
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1/users [get]
func (h *UserHandler) GetUsers(c *gin.Context) {
    // Extract pagination parameters
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
    
    if page < 1 {
        page = 1
    }
    if limit < 1 || limit > 100 {
        limit = 20
    }
    
    offset := (page - 1) * limit
    
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    
    h.logger.WithFields(logrus.Fields{
        "page":  page,
        "limit": limit,
        "user":  c.GetString("user_id"),
    }).Info("Fetching users")
    
    // Get users from database
    users, total, err := h.userSvc.GetUsers(ctx, limit, offset)
    if err != nil {
        h.logger.WithError(err).Error("Failed to fetch users")
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to retrieve users",
        })
        return
    }
    
    // Convert to response format
    userResponses := make([]UserResponse, len(users))
    for i, user := range users {
        userResponses[i] = UserResponse{
            ID:        user.ID,
            Email:     user.Email,
            FirstName: user.FirstName,
            LastName:  user.LastName,
            Role:      user.Role,
            IsActive:  user.IsActive,
            CreatedAt: user.CreatedAt,
            UpdatedAt: user.UpdatedAt,
        }
    }
    
    c.JSON(http.StatusOK, gin.H{
        "users": userResponses,
        "pagination": gin.H{
            "page":        page,
            "limit":       limit,
            "total":       total,
            "total_pages": (total + limit - 1) / limit,
        },
    })
}

// @Summary Get user by ID
// @Description Retrieve a specific user by ID
// @Tags users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Security BearerAuth
// @Success 200 {object} UserResponse
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1/users/{id} [get]
func (h *UserHandler) GetUserByID(c *gin.Context) {
    userID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid user ID",
        })
        return
    }
    
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    
    h.logger.WithFields(logrus.Fields{
        "user_id":    userID,
        "requester":  c.GetString("user_id"),
    }).Info("Fetching user by ID")
    
    user, err := h.userSvc.GetUserByID(ctx, userID)
    if err != nil {
        if err == sql.ErrNoRows {
            c.JSON(http.StatusNotFound, gin.H{
                "error": "User not found",
            })
            return
        }
        
        h.logger.WithError(err).Error("Failed to fetch user")
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to retrieve user",
        })
        return
    }
    
    response := UserResponse{
        ID:        user.ID,
        Email:     user.Email,
        FirstName: user.FirstName,
        LastName:  user.LastName,
        Role:      user.Role,
        IsActive:  user.IsActive,
        CreatedAt: user.CreatedAt,
        UpdatedAt: user.UpdatedAt,
    }
    
    c.JSON(http.StatusOK, response)
}

// @Summary Create new user
// @Description Create a new user account
// @Tags users
// @Accept json
// @Produce json
// @Param user body CreateUserRequest true "User creation data"
// @Security BearerAuth
// @Success 201 {object} UserResponse
// @Failure 400 {object} map[string]string
// @Failure 409 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1/users [post]
func (h *UserHandler) CreateUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid request body",
        })
        return
    }
    
    // Validate request
    if err := h.validate.Struct(req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": utils.FormatValidationErrors(err),
        })
        return
    }
    
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    
    h.logger.WithFields(logrus.Fields{
        "email":      req.Email,
        "role":       req.Role,
        "creator":    c.GetString("user_id"),
    }).Info("Creating new user")
    
    // Hash password
    hashedPassword, err := utils.HashPassword(req.Password)
    if err != nil {
        h.logger.WithError(err).Error("Failed to hash password")
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to process password",
        })
        return
    }
    
    // Create user
    user := &models.User{
        Email:     req.Email,
        Password:  hashedPassword,
        FirstName: req.FirstName,
        LastName:  req.LastName,
        Role:      req.Role,
        IsActive:  true,
    }
    
    createdUser, err := h.userSvc.CreateUser(ctx, user)
    if err != nil {
        if utils.IsUniqueViolationError(err) {
            c.JSON(http.StatusConflict, gin.H{
                "error": "User with this email already exists",
            })
            return
        }
        
        h.logger.WithError(err).Error("Failed to create user")
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to create user",
        })
        return
    }
    
    response := UserResponse{
        ID:        createdUser.ID,
        Email:     createdUser.Email,
        FirstName: createdUser.FirstName,
        LastName:  createdUser.LastName,
        Role:      createdUser.Role,
        IsActive:  createdUser.IsActive,
        CreatedAt: createdUser.CreatedAt,
        UpdatedAt: createdUser.UpdatedAt,
    }
    
    h.logger.WithField("user_id", createdUser.ID).Info("User created successfully")
    c.JSON(http.StatusCreated, response)
}

// RegisterRoutes registers all user routes
func (h *UserHandler) RegisterRoutes(r *gin.RouterGroup) {
    users := r.Group("/users")
    users.Use(h.RateLimitMiddleware())
    users.Use(auth.RequireAuth()) // JWT authentication middleware
    
    users.GET("", h.GetUsers)
    users.GET("/:id", h.GetUserByID)
    users.POST("", auth.RequireRole("admin"), h.CreateUser)
    users.PUT("/:id", auth.RequireRole("admin"), h.UpdateUser)
    users.DELETE("/:id", auth.RequireRole("admin"), h.DeleteUser)
}
```

---

**You've now mastered AI-assisted coding for both frontend and backend development.**

> **Next:** Learn how to leverage AI for intelligent debugging and testing in [Intelligent Debugging & Testing](./debugging-testing.md).
