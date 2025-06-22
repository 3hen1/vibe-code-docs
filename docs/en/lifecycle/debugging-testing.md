# Intelligent Debugging & Testing with AI

Debugging and testing are often the most time-consuming parts of development. AI transforms these processes from tedious detective work into intelligent, guided problem-solving sessions. Modern AI can analyze stack traces, suggest fixes, and even generate comprehensive test suites.

## Mastering the IDE Debugger

Before leveraging AI, you need to be proficient with your IDE's debugging capabilities. The combination of traditional debugging skills with AI assistance creates an unstoppable problem-solving toolkit.

### Essential Debugging Techniques

#### Breakpoints & Conditional Logic

**VS Code Debugging:**
```javascript
// Set breakpoints strategically
function calculateOrderTotal(items, taxRate, discountCode) {
  let subtotal = 0;
  
  // Breakpoint here to inspect items array
  for (const item of items) {
    subtotal += item.price * item.quantity; // Breakpoint on complex calculations
  }
  
  // Conditional breakpoint: only break when discountCode is applied
  // Condition: discountCode !== null && discountCode !== undefined
  const discount = calculateDiscount(subtotal, discountCode);
  
  const tax = subtotal * taxRate;
  const total = subtotal - discount + tax;
  
  return {
    subtotal,
    discount,
    tax,
    total
  };
}
```

**Advanced Breakpoint Types:**
```javascript
// Logpoints - print without stopping execution
console.log(`Processing item: ${item.name}, Price: ${item.price}`);

// Hit count breakpoints - break after N hits
// Useful for debugging loops with many iterations

// Exception breakpoints - break when exceptions are thrown
// Configure in VS Code: Run → New Breakpoint → Exception Breakpoint
```

#### Watch Expressions & Call Stack Navigation

**Effective Watch Expressions:**
```javascript
// Instead of watching primitive values, watch complex expressions
items.filter(item => item.price > 100).length
user?.permissions?.includes('admin')
state.cart.items.reduce((sum, item) => sum + item.total, 0)

// Watch for state changes in React components
React.useState() // Current state value
React.useEffect() // Effect dependencies
```

### IDE-Specific Debugging Features

#### IntelliJ IDEA / WebStorm Advanced Debugging:
```java
// Evaluate expressions during debugging
// Alt+F8 to open expression evaluator

public List<User> findActiveUsers(List<User> users) {
    return users.stream()
        .filter(user -> user.isActive()) // Set breakpoint here
        .filter(user -> user.getLastLogin().isAfter(LocalDate.now().minusDays(30)))
        .collect(Collectors.toList());
}

// During debugging, evaluate:
// users.size()
// users.stream().filter(User::isActive).count()
// LocalDate.now().minusDays(30)
```

## AI-Powered Debugging

AI excels at pattern recognition and can quickly identify common bug patterns, suggest fixes, and explain complex error messages.

### The Golden Rule: Stack Trace Analysis

When you encounter an error, immediately paste the complete stack trace into your AI assistant.

#### Example: React Error Analysis

**Error:**
```
Warning: Can't perform a React state update on an unmounted component. 
This is a no-op, but it indicates a memory leak in your application. 
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

    at UserProfile (UserProfile.jsx:23)
    at Router (react-router-dom/Router.js:42)
```

**AI Prompt:**
```
I'm getting this React warning in my UserProfile component. Here's the relevant code:

```javascript
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

Can you identify the issue and provide a fix?
```

**AI Analysis & Solution:**
```javascript
// The issue is that the async operation continues even after the component unmounts.
// Here's the fixed version with proper cleanup:

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status
    
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        
        // Only update state if component is still mounted
        if (isMounted) {
          setUser(userData);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

// Alternative solution using AbortController for fetch cancellation:
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal
        });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching user:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      abortController.abort();
    };
  }, [userId]);

  // ... rest of component
};
```

### Complex Error Debugging

#### Backend Error Analysis

**Java Spring Boot Error:**
```
2025-06-22 10:30:45.123 ERROR 12345 --- [nio-8080-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet] : 
Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception 
[Request processing failed; nested exception is org.springframework.dao.DataIntegrityViolationException: 
could not execute statement; SQL [n/a]; constraint [uk_user_email]; nested exception is 
org.hibernate.exception.ConstraintViolationException: could not execute statement] with root cause

org.postgresql.util.PSQLException: ERROR: duplicate key value violates unique constraint "uk_user_email"
  Detail: Key (email)=(john.doe@example.com) already exists.
```

**AI Prompt & Solution:**
```
I'm getting this database constraint violation error in my Spring Boot application:

[paste error above]

Here's my User entity and service code:

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    // getters and setters
}

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public User createUser(UserCreateRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        
        return userRepository.save(user);
    }
}
```

How should I handle this error properly?
```

**AI Analysis & Solution:**
```java
// The error occurs because you're trying to create a user with an email that already exists.
// Here's how to handle this properly:

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    // Option 1: Check before saving
    public User createUser(UserCreateRequest request) {
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException(
                "User with email " + request.getEmail() + " already exists"
            );
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        
        return userRepository.save(user);
    }
    
    // Option 2: Handle the exception
    public User createUserWithExceptionHandling(UserCreateRequest request) {
        try {
            User user = new User();
            user.setEmail(request.getEmail());
            user.setName(request.getName());
            
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("uk_user_email")) {
                throw new UserAlreadyExistsException(
                    "User with email " + request.getEmail() + " already exists"
                );
            }
            throw e; // Re-throw if it's a different constraint violation
        }
    }
}

// Custom exception
@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}

// Global exception handler
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExists(
            UserAlreadyExistsException e) {
        ErrorResponse error = new ErrorResponse(
            "USER_ALREADY_EXISTS",
            e.getMessage(),
            System.currentTimeMillis()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
    
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(
            DataIntegrityViolationException e) {
        ErrorResponse error = new ErrorResponse(
            "DATA_INTEGRITY_VIOLATION",
            "A database constraint was violated",
            System.currentTimeMillis()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}

// Repository method needed
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

## AI-Assisted Test Generation

AI can generate comprehensive test suites that cover edge cases you might not think of.

### React Component Testing

**AI Prompt:**
```
Generate comprehensive unit tests for this React component using Jest and React Testing Library. Include tests for:
- All user interactions
- Edge cases and error scenarios
- Accessibility
- Different prop combinations

```jsx
const SearchableUserList = ({ 
  users, 
  onUserSelect, 
  onUserDelete, 
  isLoading, 
  error,
  allowDelete = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUsers(prev => 
      prev.includes(user.id) 
        ? prev.filter(id => id !== user.id)
        : [...prev, user.id]
    );
    onUserSelect?.(user);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onUserDelete?.(userId);
    }
  };

  if (isLoading) return <div data-testid="loading">Loading users...</div>;
  if (error) return <div data-testid="error" role="alert">{error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        data-testid="search-input"
        aria-label="Search users"
      />
      
      <ul data-testid="user-list" role="list">
        {filteredUsers.map(user => (
          <li 
            key={user.id}
            onClick={() => handleUserClick(user)}
            className={selectedUsers.includes(user.id) ? 'selected' : ''}
            data-testid={`user-item-${user.id}`}
            role="listitem"
          >
            <span>{user.name}</span>
            <span>{user.email}</span>
            {allowDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteUser(user.id);
                }}
                data-testid={`delete-user-${user.id}`}
                aria-label={`Delete user ${user.name}`}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
      
      {filteredUsers.length === 0 && searchTerm && (
        <div data-testid="no-results">No users found matching "{searchTerm}"</div>
      )}
    </div>
  );
};
```
```

**AI Generated Test Suite:**
```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchableUserList from './SearchableUserList';

// Mock window.confirm
const mockConfirm = jest.spyOn(window, 'confirm');

describe('SearchableUserList', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@test.com' },
  ];

  const defaultProps = {
    users: mockUsers,
    onUserSelect: jest.fn(),
    onUserDelete: jest.fn(),
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfirm.mockImplementation(() => true);
  });

  afterAll(() => {
    mockConfirm.mockRestore();
  });

  describe('Rendering', () => {
    it('renders search input and user list', () => {
      render(<SearchableUserList {...defaultProps} />);
      
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByTestId('user-list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    it('renders loading state', () => {
      render(<SearchableUserList {...defaultProps} isLoading={true} />);
      
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByText('Loading users...')).toBeInTheDocument();
      expect(screen.queryByTestId('user-list')).not.toBeInTheDocument();
    });

    it('renders error state', () => {
      const errorMessage = 'Failed to load users';
      render(<SearchableUserList {...defaultProps} error={errorMessage} />);
      
      const errorElement = screen.getByTestId('error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(errorMessage);
      expect(errorElement).toHaveAttribute('role', 'alert');
      expect(screen.queryByTestId('user-list')).not.toBeInTheDocument();
    });

    it('renders user information correctly', () => {
      render(<SearchableUserList {...defaultProps} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('does not render delete buttons when allowDelete is false', () => {
      render(<SearchableUserList {...defaultProps} allowDelete={false} />);
      
      expect(screen.queryByTestId('delete-user-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('delete-user-2')).not.toBeInTheDocument();
    });

    it('renders delete buttons when allowDelete is true', () => {
      render(<SearchableUserList {...defaultProps} allowDelete={true} />);
      
      expect(screen.getByTestId('delete-user-1')).toBeInTheDocument();
      expect(screen.getByTestId('delete-user-2')).toBeInTheDocument();
      expect(screen.getByTestId('delete-user-3')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('filters users by name', async () => {
      const user = userEvent.setup();
      render(<SearchableUserList {...defaultProps} />);
      
      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'John');
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
    });

    it('filters users by email', async () => {
      const user = userEvent.setup();
      render(<SearchableUserList {...defaultProps} />);
      
      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'test.com');
      
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('is case insensitive', async () => {
      const user = userEvent.setup();
      render(<SearchableUserList {...defaultProps} />);
      
      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'JANE');
      
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('shows no results message when no users match search', async () => {
      const user = userEvent.setup();
      render(<SearchableUserList {...defaultProps} />);
      
      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'nonexistent');
      
      expect(screen.getByTestId('no-results')).toBeInTheDocument();
      expect(screen.getByText('No users found matching "nonexistent"')).toBeInTheDocument();
    });

    it('clears search and shows all users', async () => {
      const user = userEvent.setup();
      render(<SearchableUserList {...defaultProps} />);
      
      const searchInput = screen.getByTestId('search-input');
      await user.type(searchInput, 'John');
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      
      await user.clear(searchInput);
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
  });

  describe('User Interaction', () => {
    it('calls onUserSelect when user is clicked', async () => {
      const onUserSelect = jest.fn();
      render(<SearchableUserList {...defaultProps} onUserSelect={onUserSelect} />);
      
      const userItem = screen.getByTestId('user-item-1');
      fireEvent.click(userItem);
      
      expect(onUserSelect).toHaveBeenCalledWith(mockUsers[0]);
    });

    it('toggles user selection state', async () => {
      render(<SearchableUserList {...defaultProps} />);
      
      const userItem = screen.getByTestId('user-item-1');
      expect(userItem).not.toHaveClass('selected');
      
      fireEvent.click(userItem);
      expect(userItem).toHaveClass('selected');
      
      fireEvent.click(userItem);
      expect(userItem).not.toHaveClass('selected');
    });

    it('handles multiple user selections', async () => {
      render(<SearchableUserList {...defaultProps} />);
      
      const userItem1 = screen.getByTestId('user-item-1');
      const userItem2 = screen.getByTestId('user-item-2');
      
      fireEvent.click(userItem1);
      fireEvent.click(userItem2);
      
      expect(userItem1).toHaveClass('selected');
      expect(userItem2).toHaveClass('selected');
    });
  });

  describe('Delete Functionality', () => {
    it('calls onUserDelete when delete button is clicked and confirmed', async () => {
      const onUserDelete = jest.fn();
      render(
        <SearchableUserList 
          {...defaultProps} 
          onUserDelete={onUserDelete} 
          allowDelete={true} 
        />
      );
      
      const deleteButton = screen.getByTestId('delete-user-1');
      fireEvent.click(deleteButton);
      
      expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete this user?');
      expect(onUserDelete).toHaveBeenCalledWith(1);
    });

    it('does not call onUserDelete when delete is cancelled', async () => {
      mockConfirm.mockImplementation(() => false);
      const onUserDelete = jest.fn();
      render(
        <SearchableUserList 
          {...defaultProps} 
          onUserDelete={onUserDelete} 
          allowDelete={true} 
        />
      );
      
      const deleteButton = screen.getByTestId('delete-user-1');
      fireEvent.click(deleteButton);
      
      expect(mockConfirm).toHaveBeenCalled();
      expect(onUserDelete).not.toHaveBeenCalled();
    });

    it('does not trigger user selection when delete button is clicked', async () => {
      const onUserSelect = jest.fn();
      render(
        <SearchableUserList 
          {...defaultProps} 
          onUserSelect={onUserSelect} 
          allowDelete={true} 
        />
      );
      
      const deleteButton = screen.getByTestId('delete-user-1');
      fireEvent.click(deleteButton);
      
      expect(onUserSelect).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<SearchableUserList {...defaultProps} allowDelete={true} />);
      
      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toHaveAttribute('aria-label', 'Search users');
      
      const deleteButton = screen.getByTestId('delete-user-1');
      expect(deleteButton).toHaveAttribute('aria-label', 'Delete user John Doe');
    });

    it('has proper roles', () => {
      render(<SearchableUserList {...defaultProps} />);
      
      expect(screen.getByTestId('user-list')).toHaveAttribute('role', 'list');
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    it('error message has alert role', () => {
      render(<SearchableUserList {...defaultProps} error="Test error" />);
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty user list', () => {
      render(<SearchableUserList {...defaultProps} users={[]} />);
      
      expect(screen.getByTestId('user-list')).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    it('handles undefined onUserSelect callback', () => {
      render(<SearchableUserList {...defaultProps} onUserSelect={undefined} />);
      
      const userItem = screen.getByTestId('user-item-1');
      expect(() => fireEvent.click(userItem)).not.toThrow();
    });

    it('handles undefined onUserDelete callback', () => {
      render(
        <SearchableUserList 
          {...defaultProps} 
          onUserDelete={undefined} 
          allowDelete={true} 
        />
      );
      
      const deleteButton = screen.getByTestId('delete-user-1');
      expect(() => fireEvent.click(deleteButton)).not.toThrow();
    });

    it('handles users without id property gracefully', () => {
      const usersWithoutId = [{ name: 'Test User', email: 'test@example.com' }];
      
      expect(() => 
        render(<SearchableUserList {...defaultProps} users={usersWithoutId} />)
      ).not.toThrow();
    });
  });
});
```

### Go Table-Driven Tests

**AI Prompt:**
```
Generate comprehensive table-driven tests for this Go function that calculates shipping costs:

```go
package shipping

import (
    "errors"
    "math"
)

type ShippingZone string

const (
    ZoneDomestic     ShippingZone = "domestic"
    ZoneInternational ShippingZone = "international"
    ZoneExpress      ShippingZone = "express"
)

type Package struct {
    Weight   float64 // in kg
    Dimensions struct {
        Length float64 // in cm
        Width  float64
        Height float64
    }
    Value float64 // in USD
}

func CalculateShippingCost(pkg Package, zone ShippingZone, isPriority bool) (float64, error) {
    if pkg.Weight <= 0 {
        return 0, errors.New("weight must be positive")
    }
    
    if pkg.Value < 0 {
        return 0, errors.New("value cannot be negative")
    }
    
    // Calculate volume in cubic meters
    volume := (pkg.Dimensions.Length * pkg.Dimensions.Width * pkg.Dimensions.Height) / 1000000
    
    var baseCost float64
    var weightMultiplier float64
    var volumeMultiplier float64
    
    switch zone {
    case ZoneDomestic:
        baseCost = 5.0
        weightMultiplier = 2.0
        volumeMultiplier = 10.0
    case ZoneInternational:
        baseCost = 15.0
        weightMultiplier = 5.0
        volumeMultiplier = 25.0
    case ZoneExpress:
        baseCost = 25.0
        weightMultiplier = 8.0
        volumeMultiplier = 40.0
    default:
        return 0, errors.New("invalid shipping zone")
    }
    
    cost := baseCost + (pkg.Weight * weightMultiplier) + (volume * volumeMultiplier)
    
    // Priority shipping adds 50%
    if isPriority {
        cost *= 1.5
    }
    
    // Insurance for high-value packages
    if pkg.Value > 1000 {
        cost += pkg.Value * 0.01 // 1% insurance
    }
    
    // Round to 2 decimal places
    return math.Round(cost*100) / 100, nil
}
```
```

**AI Generated Test Suite:**
```go
package shipping

import (
    "math"
    "testing"
)

func TestCalculateShippingCost(t *testing.T) {
    tests := []struct {
        name        string
        pkg         Package
        zone        ShippingZone
        isPriority  bool
        expected    float64
        expectError bool
        errorMsg    string
    }{
        // Basic valid cases
        {
            name: "domestic standard small package",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: 100,
            },
            zone:       ZoneDomestic,
            isPriority: false,
            expected:   7.01, // 5 + (1*2) + (0.001*10) = 7.01
        },
        {
            name: "international standard package",
            pkg: Package{
                Weight: 2.5,
                Dimensions: struct {
                    Length, Width, Height float64
                }{20, 15, 10},
                Value: 500,
            },
            zone:       ZoneInternational,
            isPriority: false,
            expected:   42.75, // 15 + (2.5*5) + (0.003*25) = 27.575 ≈ 27.58
        },
        {
            name: "express priority package",
            pkg: Package{
                Weight: 3.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{30, 20, 15},
                Value: 800,
            },
            zone:       ZoneExpress,
            isPriority: true,
            expected:   121.5, // (25 + (3*8) + (0.009*40)) * 1.5 = 81 * 1.5 = 121.5
        },
        {
            name: "high value package with insurance",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: 1500,
            },
            zone:       ZoneDomestic,
            isPriority: false,
            expected:   22.01, // 7.01 + (1500*0.01) = 22.01
        },
        {
            name: "high value priority express with insurance",
            pkg: Package{
                Weight: 5.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{50, 40, 30},
                Value: 2000,
            },
            zone:       ZoneExpress,
            isPriority: true,
            expected:   232.5, // ((25 + 40 + 60) * 1.5) + 20 = 187.5 + 20 = 207.5
        },
        
        // Edge cases
        {
            name: "minimum weight package",
            pkg: Package{
                Weight: 0.01,
                Dimensions: struct {
                    Length, Width, Height float64
                }{1, 1, 1},
                Value: 1,
            },
            zone:       ZoneDomestic,
            isPriority: false,
            expected:   5.02, // 5 + (0.01*2) + (0.000001*10) = 5.02
        },
        {
            name: "very large package",
            pkg: Package{
                Weight: 100.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{100, 100, 100},
                Value: 5000,
            },
            zone:       ZoneInternational,
            isPriority: false,
            expected:   615.0, // 15 + (100*5) + (1*25) + (5000*0.01) = 15 + 500 + 25 + 50 = 590
        },
        {
            name: "zero value package",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: 0,
            },
            zone:       ZoneDomestic,
            isPriority: false,
            expected:   7.01,
        },
        {
            name: "exactly 1000 value (boundary)",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: 1000,
            },
            zone:       ZoneDomestic,
            isPriority: false,
            expected:   7.01, // No insurance for exactly 1000
        },
        {
            name: "just over 1000 value (boundary + 1)",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: 1000.01,
            },
            zone:       ZoneDomestic,
            isPriority: false,
            expected:   17.01, // 7.01 + (1000.01*0.01) = 17.01
        },
        
        // Error cases
        {
            name: "zero weight",
            pkg: Package{
                Weight: 0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: 100,
            },
            zone:        ZoneDomestic,
            isPriority:  false,
            expectError: true,
            errorMsg:    "weight must be positive",
        },
        {
            name: "negative weight",
            pkg: Package{
                Weight: -1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: 100,
            },
            zone:        ZoneDomestic,
            isPriority:  false,
            expectError: true,
            errorMsg:    "weight must be positive",
        },
        {
            name: "negative value",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: -100,
            },
            zone:        ZoneDomestic,
            isPriority:  false,
            expectError: true,
            errorMsg:    "value cannot be negative",
        },
        {
            name: "invalid shipping zone",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 10},
                Value: 100,
            },
            zone:        "invalid",
            isPriority:  false,
            expectError: true,
            errorMsg:    "invalid shipping zone",
        },
        
        // Special dimension cases
        {
            name: "zero dimensions",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{0, 0, 0},
                Value: 100,
            },
            zone:       ZoneDomestic,
            isPriority: false,
            expected:   7.0, // 5 + (1*2) + (0*10) = 7.0
        },
        {
            name: "one zero dimension",
            pkg: Package{
                Weight: 1.0,
                Dimensions: struct {
                    Length, Width, Height float64
                }{10, 10, 0},
                Value: 100,
            },
            zone:       ZoneDomestic,
            isPriority: false,
            expected:   7.0, // 5 + (1*2) + (0*10) = 7.0
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result, err := CalculateShippingCost(tt.pkg, tt.zone, tt.isPriority)
            
            if tt.expectError {
                if err == nil {
                    t.Errorf("expected error but got none")
                    return
                }
                if err.Error() != tt.errorMsg {
                    t.Errorf("expected error message %q, got %q", tt.errorMsg, err.Error())
                }
                return
            }
            
            if err != nil {
                t.Errorf("unexpected error: %v", err)
                return
            }
            
            if math.Abs(result-tt.expected) > 0.01 {
                t.Errorf("expected %.2f, got %.2f", tt.expected, result)
            }
        })
    }
}

// Benchmark tests
func BenchmarkCalculateShippingCost(b *testing.B) {
    pkg := Package{
        Weight: 2.5,
        Dimensions: struct {
            Length, Width, Height float64
        }{20, 15, 10},
        Value: 500,
    }
    
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        _, _ = CalculateShippingCost(pkg, ZoneInternational, false)
    }
}

// Example test for documentation
func ExampleCalculateShippingCost() {
    pkg := Package{
        Weight: 1.0,
        Dimensions: struct {
            Length, Width, Height float64
        }{10, 10, 10},
        Value: 100,
    }
    
    cost, err := CalculateShippingCost(pkg, ZoneDomestic, false)
    if err != nil {
        panic(err)
    }
    
    println(cost) // Output: 7.01
}

// Helper test for zone validation
func TestShippingZoneConstants(t *testing.T) {
    zones := []ShippingZone{ZoneDomestic, ZoneInternational, ZoneExpress}
    expected := []string{"domestic", "international", "express"}
    
    for i, zone := range zones {
        if string(zone) != expected[i] {
            t.Errorf("expected zone %q, got %q", expected[i], string(zone))
        }
    }
}
```

---

**You now have the tools to debug efficiently and generate comprehensive tests with AI assistance.**

> **Next:** Learn how to maintain code quality through AI-powered refactoring in [Refactoring & Code Quality](./refactoring-quality.md).
