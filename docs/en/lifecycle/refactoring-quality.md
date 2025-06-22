# Refactoring & Code Quality with AI

Code refactoring is the art of improving code structure without changing its functionality. With AI assistance, refactoring becomes more systematic, comprehensive, and guided by best practices. AI can identify code smells, suggest architectural improvements, and help transform legacy code into modern, maintainable solutions.

## IDE's Automated Refactoring Tools

Before leveraging AI, master your IDE's built-in refactoring capabilities. These tools provide safe, automated transformations that preserve functionality while improving code structure.

### Essential IDE Refactoring Commands

#### Universal Refactoring Shortcuts:
```
F2 - Rename Symbol (works across all files)
Ctrl+R, Ctrl+M - Extract Method
Ctrl+R, Ctrl+V - Extract Variable
Ctrl+R, Ctrl+F - Extract Field
Ctrl+R, Ctrl+I - Extract Interface
```

#### VS Code Refactoring Examples:

**Extract Method:**
```typescript
// Before: Complex function doing too much
function processUserOrder(user: User, items: CartItem[], paymentInfo: PaymentInfo) {
  // Validation logic (select this block)
  if (!user || !user.email) {
    throw new Error('Invalid user');
  }
  if (!items || items.length === 0) {
    throw new Error('Cart is empty');
  }
  for (const item of items) {
    if (item.quantity <= 0 || item.price < 0) {
      throw new Error('Invalid item data');
    }
  }
  
  // Select validation block and press Ctrl+Shift+R
  // VS Code will suggest extracting to a new method
  
  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Process payment
  const payment = processPayment(paymentInfo, total);
  
  return { orderId: generateOrderId(), payment, total };
}

// After extraction:
function validateOrderData(user: User, items: CartItem[]) {
  if (!user || !user.email) {
    throw new Error('Invalid user');
  }
  if (!items || items.length === 0) {
    throw new Error('Cart is empty');
  }
  for (const item of items) {
    if (item.quantity <= 0 || item.price < 0) {
      throw new Error('Invalid item data');
    }
  }
}

function processUserOrder(user: User, items: CartItem[], paymentInfo: PaymentInfo) {
  validateOrderData(user, items);
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const payment = processPayment(paymentInfo, total);
  
  return { orderId: generateOrderId(), payment, total };
}
```

#### IntelliJ IDEA Advanced Refactoring:

**Safe Delete with Dependency Analysis:**
```java
// IntelliJ can safely delete methods/classes and show what depends on them
public class UserService {
    @Deprecated
    public void oldMethod() {
        // This method is deprecated but might still be used
    }
    
    // Alt+Delete on oldMethod shows all usages before deletion
    // IntelliJ prevents deletion if it would break code
}
```

**Change Signature:**
```java
// Before
public User createUser(String name, String email) {
    return new User(name, email);
}

// After using "Change Signature" refactoring (Ctrl+F6)
public User createUser(String name, String email, UserRole role, boolean isActive) {
    return new User(name, email, role, isActive);
}

// IntelliJ automatically updates all callers with default values
```

## AI as Your Code Review Partner

AI excels at identifying patterns, suggesting improvements, and catching issues that might be missed in manual code reviews.

### Comprehensive Code Analysis

#### AI-Powered Code Review Prompt:
```
Review this Python function for:
- Code smells and design issues
- Performance problems
- Security vulnerabilities
- Pythonic improvements
- Error handling
- Type safety

```python
def process_user_data(data):
    results = []
    
    for item in data:
        if item['type'] == 'user':
            user_info = {}
            user_info['id'] = item['id']
            user_info['name'] = item['name'].strip().title()
            user_info['email'] = item['email'].lower()
            
            # Validate email
            if '@' in user_info['email'] and '.' in user_info['email']:
                user_info['email_valid'] = True
            else:
                user_info['email_valid'] = False
            
            # Calculate age
            if 'birth_date' in item:
                try:
                    birth_year = int(item['birth_date'].split('-')[0])
                    current_year = 2025
                    user_info['age'] = current_year - birth_year
                except:
                    user_info['age'] = None
            
            # Get user permissions
            permissions = []
            if item.get('is_admin'):
                permissions.append('admin')
            if item.get('is_editor'):
                permissions.append('editor')
            if item.get('can_view'):
                permissions.append('viewer')
            user_info['permissions'] = permissions
            
            results.append(user_info)
    
    return results
```
```

**AI Analysis & Improvements:**
```python
from dataclasses import dataclass
from datetime import datetime
from email_validator import validate_email, EmailNotValidError
from typing import List, Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

@dataclass
class UserPermissions:
    is_admin: bool = False
    is_editor: bool = False
    can_view: bool = False
    
    def to_list(self) -> List[str]:
        """Convert permissions to list of strings."""
        permissions = []
        if self.is_admin:
            permissions.append('admin')
        if self.is_editor:
            permissions.append('editor')
        if self.can_view:
            permissions.append('viewer')
        return permissions

@dataclass
class ProcessedUser:
    id: str
    name: str
    email: str
    email_valid: bool
    age: Optional[int]
    permissions: List[str]

class UserDataProcessor:
    """Processes raw user data into structured format."""
    
    def __init__(self, current_year: int = None):
        self.current_year = current_year or datetime.now().year
    
    def process_user_data(self, data: List[Dict[str, Any]]) -> List[ProcessedUser]:
        """
        Process list of user data dictionaries into ProcessedUser objects.
        
        Args:
            data: List of dictionaries containing user information
            
        Returns:
            List of ProcessedUser objects
            
        Raises:
            ValueError: If data is invalid or empty
        """
        if not data:
            raise ValueError("Data cannot be empty")
        
        if not isinstance(data, list):
            raise ValueError("Data must be a list")
        
        results = []
        
        for index, item in enumerate(data):
            try:
                if not isinstance(item, dict):
                    logger.warning(f"Skipping non-dict item at index {index}")
                    continue
                
                if item.get('type') != 'user':
                    continue
                
                processed_user = self._process_single_user(item)
                if processed_user:
                    results.append(processed_user)
                    
            except Exception as e:
                logger.error(f"Error processing item at index {index}: {e}")
                continue
        
        return results
    
    def _process_single_user(self, item: Dict[str, Any]) -> Optional[ProcessedUser]:
        """Process a single user dictionary."""
        # Validate required fields
        required_fields = ['id', 'name', 'email']
        for field in required_fields:
            if field not in item or not item[field]:
                logger.warning(f"Missing required field '{field}', skipping user")
                return None
        
        try:
            return ProcessedUser(
                id=str(item['id']),
                name=self._clean_name(item['name']),
                email=self._clean_email(item['email']),
                email_valid=self._validate_email(item['email']),
                age=self._calculate_age(item.get('birth_date')),
                permissions=self._extract_permissions(item).to_list()
            )
        except Exception as e:
            logger.error(f"Error creating ProcessedUser: {e}")
            return None
    
    def _clean_name(self, name: str) -> str:
        """Clean and format user name."""
        if not isinstance(name, str):
            raise ValueError("Name must be a string")
        return name.strip().title()
    
    def _clean_email(self, email: str) -> str:
        """Clean and format email address."""
        if not isinstance(email, str):
            raise ValueError("Email must be a string")
        return email.strip().lower()
    
    def _validate_email(self, email: str) -> bool:
        """Validate email address using proper email validation."""
        try:
            validate_email(email)
            return True
        except EmailNotValidError:
            return False
    
    def _calculate_age(self, birth_date: Optional[str]) -> Optional[int]:
        """Calculate age from birth date string."""
        if not birth_date:
            return None
        
        try:
            # Handle different date formats
            if '-' in birth_date:
                birth_year = int(birth_date.split('-')[0])
            elif '/' in birth_date:
                parts = birth_date.split('/')
                # Assume MM/DD/YYYY or DD/MM/YYYY format
                birth_year = int(parts[-1])
            else:
                # Try to parse as year only
                birth_year = int(birth_date)
            
            if birth_year < 1900 or birth_year > self.current_year:
                logger.warning(f"Invalid birth year: {birth_year}")
                return None
            
            age = self.current_year - birth_year
            return age if 0 <= age <= 150 else None
            
        except (ValueError, IndexError) as e:
            logger.warning(f"Could not parse birth date '{birth_date}': {e}")
            return None
    
    def _extract_permissions(self, item: Dict[str, Any]) -> UserPermissions:
        """Extract user permissions from item dictionary."""
        return UserPermissions(
            is_admin=bool(item.get('is_admin', False)),
            is_editor=bool(item.get('is_editor', False)),
            can_view=bool(item.get('can_view', False))
        )

# Usage example
def process_users_from_api(raw_data: List[Dict[str, Any]]) -> List[ProcessedUser]:
    """High-level function to process user data from API."""
    processor = UserDataProcessor()
    return processor.process_user_data(raw_data)

# Example with error handling
if __name__ == "__main__":
    sample_data = [
        {
            'type': 'user',
            'id': '123',
            'name': '  john doe  ',
            'email': 'JOHN@EXAMPLE.COM',
            'birth_date': '1990-05-15',
            'is_admin': True,
            'can_view': True
        }
    ]
    
    try:
        users = process_users_from_api(sample_data)
        for user in users:
            print(f"Processed user: {user}")
    except Exception as e:
        logger.error(f"Failed to process users: {e}")
```

### Advanced Refactoring with AI

#### Legacy Code Modernization

**AI Prompt for Legacy Java to Modern Java:**
```
Modernize this legacy Java code to use:
- Modern Java features (records, sealed classes, pattern matching)
- Proper exception handling
- Stream API where appropriate
- Optional for null handling
- Immutable design patterns

```java
public class LegacyOrderProcessor {
    private List orders;
    private Map customerCache;
    
    public LegacyOrderProcessor() {
        this.orders = new ArrayList();
        this.customerCache = new HashMap();
    }
    
    public String processOrder(Object orderData) {
        if (orderData == null) {
            return "ERROR: No order data";
        }
        
        Map order = (Map) orderData;
        String customerId = (String) order.get("customerId");
        List items = (List) order.get("items");
        
        if (customerId == null || items == null) {
            return "ERROR: Missing required fields";
        }
        
        Object customer = customerCache.get(customerId);
        if (customer == null) {
            customer = loadCustomer(customerId);
            if (customer == null) {
                return "ERROR: Customer not found";
            }
            customerCache.put(customerId, customer);
        }
        
        double total = 0;
        for (Object item : items) {
            Map itemMap = (Map) item;
            Double price = (Double) itemMap.get("price");
            Integer quantity = (Integer) itemMap.get("quantity");
            
            if (price != null && quantity != null) {
                total += price * quantity;
            }
        }
        
        String orderId = generateOrderId();
        orders.add(order);
        
        return "SUCCESS: Order " + orderId + " processed for total: $" + total;
    }
    
    private Object loadCustomer(String customerId) {
        // Simulate database call
        if ("123".equals(customerId)) {
            Map customer = new HashMap();
            customer.put("id", customerId);
            customer.put("name", "John Doe");
            return customer;
        }
        return null;
    }
    
    private String generateOrderId() {
        return "ORD-" + System.currentTimeMillis();
    }
}
```
```

**AI Modernized Version:**
```java
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

// Modern records for data transfer
public record OrderItem(
    String id,
    BigDecimal price,
    int quantity
) {
    public OrderItem {
        if (price == null || price.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Price must be non-negative");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
    }
    
    public BigDecimal getTotal() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}

public record Customer(
    String id,
    String name,
    String email
) {
    public Customer {
        Objects.requireNonNull(id, "Customer ID cannot be null");
        Objects.requireNonNull(name, "Customer name cannot be null");
    }
}

public record OrderRequest(
    String customerId,
    List<OrderItem> items
) {
    public OrderRequest {
        Objects.requireNonNull(customerId, "Customer ID cannot be null");
        Objects.requireNonNull(items, "Items list cannot be null");
        if (items.isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }
    }
}

// Sealed class for result types
public sealed interface OrderResult 
    permits OrderResult.Success, OrderResult.Failure {
    
    record Success(
        String orderId, 
        BigDecimal total, 
        LocalDateTime processedAt
    ) implements OrderResult {}
    
    record Failure(
        String errorCode, 
        String message, 
        Exception cause
    ) implements OrderResult {}
}

// Modern exception hierarchy
public class OrderProcessingException extends Exception {
    public OrderProcessingException(String message) {
        super(message);
    }
    
    public OrderProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class CustomerNotFoundException extends OrderProcessingException {
    public CustomerNotFoundException(String customerId) {
        super("Customer not found: " + customerId);
    }
}

// Main processor class
public class ModernOrderProcessor {
    private final Map<String, Customer> customerCache = new ConcurrentHashMap<>();
    private final List<OrderRequest> processedOrders = new ArrayList<>();
    private final CustomerRepository customerRepository;
    
    public ModernOrderProcessor(CustomerRepository customerRepository) {
        this.customerRepository = Objects.requireNonNull(customerRepository);
    }
    
    public OrderResult processOrder(OrderRequest orderRequest) {
        try {
            // Validate input
            Objects.requireNonNull(orderRequest, "Order request cannot be null");
            
            // Load customer with caching
            Customer customer = loadCustomerWithCaching(orderRequest.customerId())
                .orElseThrow(() -> new CustomerNotFoundException(orderRequest.customerId()));
            
            // Calculate total using streams
            BigDecimal total = calculateTotal(orderRequest.items());
            
            // Generate order ID
            String orderId = generateOrderId();
            
            // Store processed order
            processedOrders.add(orderRequest);
            
            return new OrderResult.Success(
                orderId, 
                total, 
                LocalDateTime.now()
            );
            
        } catch (OrderProcessingException e) {
            return new OrderResult.Failure(
                "PROCESSING_ERROR", 
                e.getMessage(), 
                e
            );
        } catch (Exception e) {
            return new OrderResult.Failure(
                "UNEXPECTED_ERROR", 
                "An unexpected error occurred while processing the order", 
                e
            );
        }
    }
    
    private Optional<Customer> loadCustomerWithCaching(String customerId) 
            throws OrderProcessingException {
        return Optional.ofNullable(
            customerCache.computeIfAbsent(customerId, id -> {
                try {
                    return customerRepository.findById(id).orElse(null);
                } catch (Exception e) {
                    throw new RuntimeException("Failed to load customer: " + id, e);
                }
            })
        );
    }
    
    private BigDecimal calculateTotal(List<OrderItem> items) {
        return items.stream()
            .map(OrderItem::getTotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add)
            .setScale(2, RoundingMode.HALF_UP);
    }
    
    private String generateOrderId() {
        return "ORD-" + System.currentTimeMillis() + "-" + 
               UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    // Pattern matching for result handling (Java 17+)
    public String formatResult(OrderResult result) {
        return switch (result) {
            case OrderResult.Success(var orderId, var total, var processedAt) -> 
                String.format("SUCCESS: Order %s processed for total: $%.2f at %s", 
                    orderId, total, processedAt);
                    
            case OrderResult.Failure(var errorCode, var message, var cause) -> 
                String.format("FAILED [%s]: %s", errorCode, message);
        };
    }
    
    // Get statistics using streams
    public OrderStatistics getStatistics() {
        var totalOrders = processedOrders.size();
        var totalValue = processedOrders.stream()
            .flatMap(order -> order.items().stream())
            .map(OrderItem::getTotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
            
        var averageOrderValue = totalOrders > 0 
            ? totalValue.divide(BigDecimal.valueOf(totalOrders), 2, RoundingMode.HALF_UP)
            : BigDecimal.ZERO;
            
        return new OrderStatistics(totalOrders, totalValue, averageOrderValue);
    }
}

public record OrderStatistics(
    int totalOrders,
    BigDecimal totalValue,
    BigDecimal averageOrderValue
) {}

// Repository interface for dependency injection
public interface CustomerRepository {
    Optional<Customer> findById(String id);
}

// Usage example with proper error handling
public class OrderProcessorExample {
    public static void main(String[] args) {
        CustomerRepository repository = customerId -> {
            if ("123".equals(customerId)) {
                return Optional.of(new Customer("123", "John Doe", "john@example.com"));
            }
            return Optional.empty();
        };
        
        ModernOrderProcessor processor = new ModernOrderProcessor(repository);
        
        OrderRequest request = new OrderRequest(
            "123",
            List.of(
                new OrderItem("item1", new BigDecimal("29.99"), 2),
                new OrderItem("item2", new BigDecimal("15.50"), 1)
            )
        );
        
        OrderResult result = processor.processOrder(request);
        System.out.println(processor.formatResult(result));
        
        // Pattern matching for different result types
        switch (result) {
            case OrderResult.Success success -> {
                System.out.println("Order processed successfully!");
                System.out.println("Order ID: " + success.orderId());
                System.out.println("Total: $" + success.total());
            }
            case OrderResult.Failure failure -> {
                System.err.println("Order processing failed: " + failure.message());
                if (failure.cause() != null) {
                    failure.cause().printStackTrace();
                }
            }
        }
    }
}
```

## Architectural Refactoring with AI

### Microservices Decomposition

**AI Prompt for Monolith to Microservices:**
```
Help me decompose this monolithic service into microservices. Identify:
- Service boundaries based on domain concepts
- Data ownership and database splitting
- Communication patterns between services
- Shared concerns (authentication, logging, etc.)
- Migration strategy

```typescript
// Current monolithic e-commerce service
class ECommerceService {
  // User management
  async createUser(userData: any) { /* ... */ }
  async authenticateUser(credentials: any) { /* ... */ }
  async updateUserProfile(userId: string, data: any) { /* ... */ }
  
  // Product catalog
  async addProduct(productData: any) { /* ... */ }
  async updateProduct(productId: string, data: any) { /* ... */ }
  async searchProducts(criteria: any) { /* ... */ }
  async getProductRecommendations(userId: string) { /* ... */ }
  
  // Inventory management
  async updateInventory(productId: string, quantity: number) { /* ... */ }
  async checkAvailability(productId: string) { /* ... */ }
  async reserveItems(items: any[]) { /* ... */ }
  
  // Order processing
  async createOrder(orderData: any) { /* ... */ }
  async processPayment(paymentData: any) { /* ... */ }
  async updateOrderStatus(orderId: string, status: string) { /* ... */ }
  async calculateShipping(orderData: any) { /* ... */ }
  
  // Notifications
  async sendOrderConfirmation(orderId: string) { /* ... */ }
  async sendShippingNotification(orderId: string) { /* ... */ }
  async sendMarketingEmail(userId: string, campaign: any) { /* ... */ }
}
```
```

**AI Microservices Decomposition:**
```typescript
// 1. User Service - Handles authentication and user management
interface UserService {
  createUser(userData: CreateUserRequest): Promise<User>;
  authenticateUser(credentials: AuthCredentials): Promise<AuthToken>;
  updateUserProfile(userId: string, data: UpdateUserRequest): Promise<User>;
  getUserById(userId: string): Promise<User>;
  validateToken(token: string): Promise<TokenValidation>;
}

// 2. Product Catalog Service - Manages product information
interface ProductCatalogService {
  addProduct(productData: CreateProductRequest): Promise<Product>;
  updateProduct(productId: string, data: UpdateProductRequest): Promise<Product>;
  getProduct(productId: string): Promise<Product>;
  searchProducts(criteria: SearchCriteria): Promise<SearchResult>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
}

// 3. Recommendation Service - Handles product recommendations
interface RecommendationService {
  getProductRecommendations(userId: string): Promise<Recommendation[]>;
  updateUserPreferences(userId: string, preferences: UserPreferences): Promise<void>;
  trackUserInteraction(userId: string, interaction: UserInteraction): Promise<void>;
}

// 4. Inventory Service - Manages stock and availability
interface InventoryService {
  updateInventory(productId: string, quantity: number): Promise<InventoryUpdate>;
  checkAvailability(productId: string): Promise<AvailabilityStatus>;
  reserveItems(items: ReservationRequest[]): Promise<ReservationResult>;
  releaseReservation(reservationId: string): Promise<void>;
  getInventoryStatus(productIds: string[]): Promise<InventoryStatus[]>;
}

// 5. Order Service - Handles order lifecycle
interface OrderService {
  createOrder(orderData: CreateOrderRequest): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
  getOrder(orderId: string): Promise<Order>;
  getUserOrders(userId: string): Promise<Order[]>;
  cancelOrder(orderId: string): Promise<CancelationResult>;
}

// 6. Payment Service - Handles all payment processing
interface PaymentService {
  processPayment(paymentData: PaymentRequest): Promise<PaymentResult>;
  refundPayment(paymentId: string, amount: number): Promise<RefundResult>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
  updatePaymentMethod(userId: string, paymentMethod: PaymentMethod): Promise<void>;
}

// 7. Shipping Service - Calculates shipping and handles logistics
interface ShippingService {
  calculateShipping(orderData: ShippingCalculationRequest): Promise<ShippingOptions>;
  createShipment(shipmentData: CreateShipmentRequest): Promise<Shipment>;
  trackShipment(trackingNumber: string): Promise<TrackingInfo>;
  updateShipmentStatus(shipmentId: string, status: ShipmentStatus): Promise<void>;
}

// 8. Notification Service - Handles all communications
interface NotificationService {
  sendOrderConfirmation(orderId: string): Promise<NotificationResult>;
  sendShippingNotification(orderId: string): Promise<NotificationResult>;
  sendMarketingEmail(userId: string, campaign: MarketingCampaign): Promise<NotificationResult>;
  sendSMS(userId: string, message: string): Promise<NotificationResult>;
  createNotificationTemplate(template: NotificationTemplate): Promise<void>;
}

// Service Communication Patterns
// 1. Synchronous communication for immediate consistency
class OrderOrchestrator {
  constructor(
    private userService: UserService,
    private productService: ProductCatalogService,
    private inventoryService: InventoryService,
    private paymentService: PaymentService,
    private eventBus: EventBus
  ) {}

  async createOrder(orderRequest: CreateOrderRequest): Promise<OrderResult> {
    try {
      // 1. Validate user
      const user = await this.userService.getUserById(orderRequest.userId);
      
      // 2. Validate products and get pricing
      const products = await Promise.all(
        orderRequest.items.map(item => 
          this.productService.getProduct(item.productId)
        )
      );
      
      // 3. Reserve inventory
      const reservation = await this.inventoryService.reserveItems(
        orderRequest.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      );
      
      if (!reservation.success) {
        throw new InsufficientInventoryError(reservation.unavailableItems);
      }
      
      // 4. Process payment
      const payment = await this.paymentService.processPayment({
        amount: orderRequest.total,
        paymentMethod: orderRequest.paymentMethod,
        userId: orderRequest.userId
      });
      
      if (!payment.success) {
        // Rollback inventory reservation
        await this.inventoryService.releaseReservation(reservation.reservationId);
        throw new PaymentFailedError(payment.error);
      }
      
      // 5. Create order
      const order = await this.orderService.createOrder({
        ...orderRequest,
        paymentId: payment.paymentId,
        reservationId: reservation.reservationId
      });
      
      // 6. Publish order created event
      await this.eventBus.publish(new OrderCreatedEvent(order));
      
      return { success: true, order };
      
    } catch (error) {
      // Handle rollbacks and error scenarios
      await this.handleOrderCreationError(error, orderRequest);
      throw error;
    }
  }
}

// 2. Event-driven communication for eventual consistency
interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe<T extends DomainEvent>(
    eventType: string, 
    handler: (event: T) => Promise<void>
  ): void;
}

// Domain Events
abstract class DomainEvent {
  constructor(
    public readonly eventId: string = uuid(),
    public readonly timestamp: Date = new Date(),
    public readonly version: number = 1
  ) {}
}

class OrderCreatedEvent extends DomainEvent {
  constructor(public readonly order: Order) {
    super();
  }
}

class PaymentProcessedEvent extends DomainEvent {
  constructor(
    public readonly orderId: string,
    public readonly paymentId: string,
    public readonly amount: number
  ) {
    super();
  }
}

// Event Handlers
class NotificationEventHandler {
  constructor(private notificationService: NotificationService) {}
  
  @EventHandler(OrderCreatedEvent)
  async handleOrderCreated(event: OrderCreatedEvent): Promise<void> {
    await this.notificationService.sendOrderConfirmation(event.order.id);
  }
  
  @EventHandler(PaymentProcessedEvent)
  async handlePaymentProcessed(event: PaymentProcessedEvent): Promise<void> {
    await this.notificationService.sendPaymentConfirmation(
      event.orderId, 
      event.paymentId
    );
  }
}

// Database Design per Service
interface ServiceDatabases {
  // User Service - PostgreSQL for ACID compliance
  userDatabase: {
    users: UserTable;
    user_profiles: UserProfileTable;
    user_sessions: SessionTable;
  };
  
  // Product Catalog - PostgreSQL with search capabilities
  productDatabase: {
    products: ProductTable;
    categories: CategoryTable;
    product_attributes: AttributeTable;
  };
  
  // Inventory - PostgreSQL for consistency
  inventoryDatabase: {
    inventory: InventoryTable;
    reservations: ReservationTable;
    inventory_movements: MovementTable;
  };
  
  // Recommendations - MongoDB for flexible schema
  recommendationDatabase: {
    user_preferences: UserPreferenceDocument;
    interaction_history: InteractionDocument;
    recommendation_models: ModelDocument;
  };
  
  // Orders - PostgreSQL for transactional integrity
  orderDatabase: {
    orders: OrderTable;
    order_items: OrderItemTable;
    order_status_history: StatusHistoryTable;
  };
}

// API Gateway Configuration
class APIGateway {
  private routes = new Map<string, ServiceRoute>();
  
  constructor() {
    this.setupRoutes();
  }
  
  private setupRoutes(): void {
    // User Service routes
    this.routes.set('POST /api/users', {
      service: 'user-service',
      endpoint: '/users',
      auth: false
    });
    
    this.routes.set('GET /api/users/:id', {
      service: 'user-service',
      endpoint: '/users/:id',
      auth: true
    });
    
    // Product routes
    this.routes.set('GET /api/products', {
      service: 'product-catalog-service',
      endpoint: '/products',
      auth: false,
      cache: { ttl: 300 } // 5 minutes
    });
    
    // Order routes
    this.routes.set('POST /api/orders', {
      service: 'order-orchestrator',
      endpoint: '/orders',
      auth: true,
      rateLimit: { max: 10, window: 60000 } // 10 requests per minute
    });
  }
}

// Migration Strategy
class MigrationStrategy {
  // Phase 1: Extract User Service
  async phase1_ExtractUserService(): Promise<void> {
    // 1. Create new user service
    // 2. Implement database replication
    // 3. Route authentication through new service
    // 4. Migrate user management endpoints
    // 5. Validate data consistency
  }
  
  // Phase 2: Extract Product Catalog
  async phase2_ExtractProductCatalog(): Promise<void> {
    // 1. Create product catalog service
    // 2. Migrate product data
    // 3. Update product management endpoints
    // 4. Implement product search
  }
  
  // Continue for each service...
}
```

---

**Your code is now maintainable, scalable, and follows modern architectural patterns.**

> **Next:** Learn how to integrate databases and data analysis tools in [Data Integration](./data-integration.md).
