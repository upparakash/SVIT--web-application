// SVIT Technologies E-commerce Platform JavaScript - Fixed Version

// Application Data
const appData = {
  company: {
    name: "SVIT Technologies",
    tagline: "Security & Access Solutions",
    description: "Leading provider of CCTV cameras and biometric systems",
    phone: "+91 98765 43210",
    email: "info@svittech.com",
    address: "123 Tech Park, Electronic City, Bangalore, Karnataka 560100",
    established: "2015",
    certifications: ["ISO 9001:2015", "CE Certified", "FCC Approved"]
  },
  categories: [
    {
      id: "cctv-cameras",
      name: "CCTV Cameras",
      description: "Professional surveillance cameras for security monitoring",
      icon: "camera"
    },
    {
      id: "biometric-systems",
      name: "Biometric Systems", 
      description: "Advanced biometric authentication and access control",
      icon: "fingerprint"
    },
    {
      id: "access-control",
      name: "Access Control",
      description: "Electronic door locks and security access systems",
      icon: "lock"
    },
    {
      id: "accessories",
      name: "Security Accessories",
      description: "Supporting hardware and installation accessories",
      icon: "settings"
    }
  ],
  products: [
    {
      id: 1,
      name: "Hikvision DS-2CE16D0T-IR Bullet Camera",
      brand: "Hikvision",
      category: "cctv-cameras",
      price: 2500,
      originalPrice: 3000,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.5,
      reviews: 128,
      stock: 45,
      sku: "HIK-BUL-2MP-001",
      warranty: "2 Years",
      features: ["2MP Resolution", "Night Vision 20m", "Weatherproof IP66", "HD-TVI Technology"],
      specifications: {
        "Resolution": "1920×1080 (2MP)",
        "Lens": "3.6mm Fixed",
        "IR Range": "Up to 20m",
        "Power": "12V DC",
        "Operating Temperature": "-40°C to 60°C"
      },
      description: "Professional bullet camera with superior image quality and advanced night vision capabilities. Perfect for outdoor surveillance applications."
    },
    {
      id: 2,
      name: "Dahua HAC-HFW1200SP Dome Camera",
      brand: "Dahua",
      category: "cctv-cameras",
      price: 3200,
      originalPrice: 3800,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.3,
      reviews: 95,
      stock: 32,
      sku: "DAH-DOM-2MP-001", 
      warranty: "3 Years",
      features: ["2MP HDCVI", "Smart IR", "Vandal Resistant", "Wide Dynamic Range"],
      specifications: {
        "Resolution": "1920×1080 (2MP)",
        "Lens": "2.8mm Fixed",
        "IR Range": "Up to 30m", 
        "Power": "12V DC",
        "IP Rating": "IP67"
      },
      description: "High-definition dome camera with smart IR technology and vandal-resistant housing for reliable indoor and outdoor monitoring."
    },
    {
      id: 3,
      name: "CP Plus Wireless CCTV Camera",
      brand: "CP Plus",
      category: "cctv-cameras", 
      price: 4500,
      originalPrice: 5200,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.2,
      reviews: 76,
      stock: 28,
      sku: "CPP-WIR-2MP-001",
      warranty: "2 Years",
      features: ["Wireless Connectivity", "Mobile App Support", "Cloud Storage", "Motion Detection"],
      specifications: {
        "Resolution": "1920×1080 (2MP)",
        "Connectivity": "Wi-Fi 802.11n",
        "Storage": "MicroSD up to 128GB",
        "Power": "12V DC / PoE",
        "View Angle": "90° Diagonal"
      },
      description: "Easy-to-install wireless camera with mobile app integration and cloud storage capabilities for modern security needs."
    },
    {
      id: 4,
      name: "ZKTeco Fingerprint Scanner F18",
      brand: "ZKTeco",
      category: "biometric-systems",
      price: 6500,
      originalPrice: 7500,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.7,
      reviews: 142,
      stock: 18,
      sku: "ZKT-FP-F18-001",
      warranty: "3 Years", 
      features: ["High-Resolution Scanner", "Fast Recognition", "USB Interface", "SDK Available"],
      specifications: {
        "Sensor Type": "Optical",
        "Resolution": "500 DPI",
        "Recognition Time": "<1 Second",
        "Interface": "USB 2.0",
        "Operating System": "Windows/Linux/Android"
      },
      description: "Professional fingerprint scanner with high accuracy and fast recognition for attendance and access control systems."
    },
    {
      id: 5,
      name: "Suprema Face Recognition FaceStation 2",
      brand: "Suprema",
      category: "biometric-systems",
      price: 25000,
      originalPrice: 28000,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"], 
      rating: 4.8,
      reviews: 67,
      stock: 12,
      sku: "SUP-FACE-FS2-001",
      warranty: "5 Years",
      features: ["AI Face Recognition", "Touchless Operation", "Multi-Modal Authentication", "Mobile Credential"],
      specifications: {
        "Recognition Method": "Face, Fingerprint, Card, PIN",
        "Users": "100,000 faces",
        "Display": "4.3-inch Touchscreen",
        "Communication": "TCP/IP, WiFi, Bluetooth",
        "Operating Temperature": "-20°C to 60°C"
      },
      description: "Advanced AI-powered face recognition terminal with multi-modal authentication for high-security access control."
    },
    {
      id: 6,
      name: "Electronic Door Lock System DL-500",
      brand: "SVIT Tech",
      category: "access-control",
      price: 7500,
      originalPrice: 8500,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.4,
      reviews: 89,
      stock: 25,
      sku: "SVT-DL-500-001",
      warranty: "3 Years",
      features: ["Keypad Entry", "Card Access", "Remote Control", "Battery Backup"],
      specifications: {
        "Power": "12V DC with Battery Backup",
        "Users": "Up to 2000",
        "Cards": "RFID 125KHz",
        "Installation": "Surface/Mortise Mount",
        "Material": "Stainless Steel"
      },
      description: "Robust electronic door lock with multiple access methods and reliable battery backup for critical security applications."
    },
    {
      id: 7,
      name: "Hikvision 4MP Network Camera DS-2CD2043G0-I",
      brand: "Hikvision", 
      category: "cctv-cameras",
      price: 8900,
      originalPrice: 10200,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.6,
      reviews: 156,
      stock: 38,
      sku: "HIK-NET-4MP-001",
      warranty: "3 Years",
      features: ["4MP Ultra HD", "Smart Detection", "PoE+", "H.265+ Compression"],
      specifications: {
        "Resolution": "2688×1520 (4MP)",
        "Lens": "2.8mm Fixed",
        "IR Range": "Up to 30m",
        "Power": "PoE+ (High PoE)",
        "Analytics": "Line Crossing, Intrusion Detection"
      },
      description: "Professional 4MP network camera with advanced analytics and intelligent detection for comprehensive security monitoring."
    },
    {
      id: 8,
      name: "eSSL Biometric Attendance System X990",
      brand: "eSSL",
      category: "biometric-systems",
      price: 8500,
      originalPrice: 9800,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.3,
      reviews: 203,
      stock: 22,
      sku: "ESS-ATT-X990-001",
      warranty: "2 Years",
      features: ["Fingerprint & Face Recognition", "Color Display", "Battery Backup", "Web Server"],
      specifications: {
        "Users": "3000 Fingerprints, 500 Faces",
        "Records": "100,000 Transactions",
        "Display": "2.8-inch Color TFT",
        "Communication": "TCP/IP, USB Host",
        "Power": "12V DC with Backup Battery"
      },
      description: "Advanced biometric attendance system with dual recognition technology and comprehensive reporting features."
    },
    {
      id: 9,
      name: "RFID Card Access Control System AC-200",
      brand: "SVIT Tech",
      category: "access-control",
      price: 5200,
      originalPrice: 6000,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.1,
      reviews: 134,
      stock: 35,
      sku: "SVT-RFID-AC200-001",
      warranty: "2 Years",
      features: ["RFID Technology", "Standalone Operation", "Wiegand Output", "LED Indicators"],
      specifications: {
        "Card Type": "125KHz RFID/EM Cards",
        "Users": "Up to 1000 Cards",
        "Operating Voltage": "12V DC",
        "Current": "100mA (Standby)",
        "Operating Distance": "3-8cm"
      },
      description: "Reliable RFID-based access control system for secure entry management with standalone operation capabilities."
    },
    {
      id: 10,
      name: "Dahua 8CH DVR System DHI-XVR5108HS-4KL-X",
      brand: "Dahua",
      category: "cctv-cameras",
      price: 12000,
      originalPrice: 14500,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.5,
      reviews: 87,
      stock: 15,
      sku: "DAH-DVR-8CH-001",
      warranty: "3 Years",
      features: ["8 Channel Support", "4K Resolution", "AI Analytics", "Cloud Connectivity"],
      specifications: {
        "Channels": "8CH Video + 2CH IP",
        "Resolution": "Up to 4K (8MP)",
        "Storage": "2× SATA (up to 20TB)",
        "Network": "RJ45 Ethernet",
        "Remote Access": "Mobile App & Web"
      },
      description: "Professional 8-channel DVR system with 4K support and AI-powered analytics for comprehensive surveillance management."
    },
    {
      id: 11,
      name: "Turnstile Gate System TG-300",
      brand: "SVIT Tech",
      category: "access-control",
      price: 45000,
      originalPrice: 52000,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.7,
      reviews: 34,
      stock: 8,
      sku: "SVT-TG-300-001",
      warranty: "5 Years",
      features: ["Tripod Turnstile", "Card Reader Integration", "Direction Control", "Emergency Release"],
      specifications: {
        "Material": "Stainless Steel 304",
        "Power": "24V DC",
        "Passage Width": "550mm",
        "Throughput": "25-30 persons/minute",
        "Integration": "Access Control Systems"
      },
      description: "Professional turnstile gate system for high-traffic areas with robust construction and seamless access control integration."
    },
    {
      id: 12,
      name: "Time & Attendance Terminal TA-100",
      brand: "ZKTeco", 
      category: "biometric-systems",
      price: 4800,
      originalPrice: 5500,
      images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
      rating: 4.2,
      reviews: 167,
      stock: 42,
      sku: "ZKT-TA-100-001",
      warranty: "2 Years",
      features: ["Fingerprint Recognition", "RFID Support", "Large Display", "USB Download"],
      specifications: {
        "Users": "1500 Fingerprints",
        "Records": "50,000 Transactions",
        "Display": "2.8-inch TFT",
        "Communication": "TCP/IP, RS485, USB",
        "Power": "12V DC"
      },
      description: "Compact time and attendance terminal with fingerprint recognition and comprehensive employee management features."
    }
  ],
  testimonials: [
    {
      name: "Rajesh Sharma",
      company: "Bangalore IT Park",
      message: "SVIT Technologies provided excellent CCTV solutions for our entire campus. Professional service and quality products.",
      rating: 5
    },
    {
      name: "Priya Nair", 
      company: "Metro Corporate Solutions",
      message: "The biometric attendance system has streamlined our HR processes completely. Highly recommended!",
      rating: 5
    },
    {
      name: "Amit Patel",
      company: "Secure Industries Ltd",
      message: "Outstanding access control solutions with excellent after-sales support. Very satisfied with the installation.",
      rating: 4
    }
  ],
  shippingMethods: [
    {
      id: "standard",
      name: "Standard Delivery",
      duration: "5-7 business days",
      cost: 150
    },
    {
      id: "express", 
      name: "Express Delivery",
      duration: "2-3 business days", 
      cost: 300
    },
    {
      id: "installation",
      name: "Delivery + Installation",
      duration: "3-5 business days",
      cost: 500
    }
  ]
};

// Application State
let appState = {
  currentPage: 'home',
  cart: [],
  wishlist: [],
  filteredProducts: [...appData.products],
  currentProduct: null,
  currentFilters: {
    category: '',
    priceRange: '',
    brand: '',
    sort: 'name'
  },
  checkoutStep: 1,
  currentAccountTab: 'profile',
  currentAdminTab: 'overview'
};

// Utility Functions
function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(price);
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Page Navigation - FIXED
function showPage(pageName) {
  console.log('Showing page:', pageName);
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  const selectedPage = document.getElementById(pageName);
  if (selectedPage) {
    selectedPage.classList.add('active');
    appState.currentPage = pageName;
    
    // Load page-specific content
    switch (pageName) {
      case 'home':
        loadHomePage();
        break;
      case 'shop':
        loadShopPage();
        break;
      case 'cart':
        loadCartPage();
        break;
      case 'checkout':
        loadCheckoutPage();
        break;
      case 'account':
        loadAccountPage();
        break;
      case 'admin':
        loadAdminPage();
        break;
      case 'contact':
        // Contact page is static, no loading needed
        break;
    }
  } else {
    console.error('Page not found:', pageName);
  }
  
  // Close mobile menu if open
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav && !mobileNav.classList.contains('hidden')) {
    mobileNav.classList.add('hidden');
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav) {
    mobileNav.classList.toggle('hidden');
  }
}

// Home Page Functions
function loadHomePage() {
  loadFeaturedProducts();
  loadTestimonials();
}

function loadFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;
  
  const featuredProducts = appData.products.slice(0, 8);
  container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function loadTestimonials() {
  const container = document.getElementById('testimonialsContainer');
  if (!container) return;
  
  container.innerHTML = appData.testimonials.map(testimonial => `
    <div class="testimonial-card">
      <div class="testimonial-text">"${testimonial.message}"</div>
      <div class="testimonial-rating">${generateStars(testimonial.rating)}</div>
      <div class="testimonial-author">${testimonial.name}</div>
      <div class="testimonial-company">${testimonial.company}</div>
    </div>
  `).join('');
}

// Product Card Component
function createProductCard(product) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  return `
    <div class="product-card">
      <div class="product-image" onclick="showProductDetail(${product.id})">
        <div class="placeholder-text">Product Image<br/>${product.name}</div>
        ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
      </div>
      <div class="product-info">
        <div class="product-brand">${product.brand}</div>
        <div class="product-title" onclick="showProductDetail(${product.id})">${product.name}</div>
        <div class="product-price">
          <span class="current-price">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-rating">
          <span class="stars">${generateStars(product.rating)}</span>
          <span class="rating-text">(${product.reviews} reviews)</span>
        </div>
        <div class="product-actions">
          <button class="btn btn--primary btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
          <button class="btn-wishlist" onclick="toggleWishlist(${product.id})">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Shop Page Functions - FIXED
function loadShopPage() {
  console.log('Loading shop page');
  
  // Reset filters if coming from category filter
  setTimeout(() => {
    applyFilters();
    updateProductCount();
  }, 50);
}

function applyFilters() {
  console.log('Applying filters');
  
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const brandFilter = document.getElementById('brandFilter');
  const sortFilter = document.getElementById('sortFilter');
  
  const categoryValue = categoryFilter ? categoryFilter.value : '';
  const priceValue = priceFilter ? priceFilter.value : '';
  const brandValue = brandFilter ? brandFilter.value : '';
  const sortValue = sortFilter ? sortFilter.value : 'name';
  
  let filtered = [...appData.products];
  
  // Apply category filter
  if (categoryValue) {
    filtered = filtered.filter(product => product.category === categoryValue);
  }
  
  // Apply price filter
  if (priceValue) {
    const [min, max] = priceValue.split('-').map(p => p.replace('+', ''));
    filtered = filtered.filter(product => {
      if (max) {
        return product.price >= parseInt(min) && product.price <= parseInt(max);
      } else {
        return product.price >= parseInt(min);
      }
    });
  }
  
  // Apply brand filter
  if (brandValue) {
    filtered = filtered.filter(product => product.brand === brandValue);
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    switch (sortValue) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });
  
  appState.filteredProducts = filtered;
  displayProducts(filtered);
  updateProductCount();
}

function displayProducts(products) {
  const container = document.getElementById('shopProducts');
  if (!container) return;
  
  container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function updateProductCount() {
  const countElement = document.getElementById('productCount');
  if (countElement) {
    countElement.textContent = `${appState.filteredProducts.length} products found`;
  }
}

function filterByCategory(category) {
  console.log('Filtering by category:', category);
  showPage('shop');
  setTimeout(() => {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
      categoryFilter.value = category;
      applyFilters();
    }
  }, 100);
}

// Product Detail Functions - FIXED
function showProductDetail(productId) {
  console.log('Showing product detail for ID:', productId);
  
  const product = appData.products.find(p => p.id === productId);
  if (!product) {
    console.error('Product not found:', productId);
    return;
  }
  
  appState.currentProduct = product;
  showPage('product-detail');
  
  const breadcrumb = document.getElementById('productBreadcrumb');
  if (breadcrumb) {
    breadcrumb.textContent = product.name;
  }
  
  const container = document.getElementById('productDetailContent');
  if (container) {
    container.innerHTML = `
      <div class="product-gallery">
        <div class="main-image">
          <div class="placeholder-text">Main Product Image<br/>${product.name}</div>
        </div>
        <div class="thumbnail-images">
          ${product.images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}">
              <div style="width:100%;height:100%;background:var(--color-bg-${(index % 8) + 1});border-radius:var(--radius-base);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--color-text-secondary);">Img ${index + 1}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="product-details">
        <div class="product-brand">${product.brand}</div>
        <h1>${product.name}</h1>
        <div class="product-price">
          <span class="current-price">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-rating">
          <span class="stars">${generateStars(product.rating)}</span>
          <span class="rating-text">(${product.reviews} reviews)</span>
        </div>
        <div class="stock-status">
          <span class="in-stock">✓ In Stock (${product.stock} available)</span>
        </div>
        
        <div class="features-list">
          <h3>Key Features</h3>
          <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="quantity-selector">
          <label>Quantity:</label>
          <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}" id="quantityInput">
        </div>
        
        <div class="product-actions">
          <button class="btn btn--primary btn--lg" onclick="addToCartWithQuantity(${product.id})">Add to Cart</button>
          <button class="btn btn--secondary" onclick="toggleWishlist(${product.id})">Add to Wishlist</button>
        </div>
        
        <div class="specifications">
          <h3>Technical Specifications</h3>
          <table class="specs-table">
            ${Object.entries(product.specifications).map(([key, value]) => `
              <tr>
                <th>${key}</th>
                <td>${value}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        
        <div class="product-info-tabs">
          <h3>Product Information</h3>
          <p>${product.description}</p>
          <div class="warranty-info">
            <strong>Warranty:</strong> ${product.warranty}<br>
            <strong>SKU:</strong> ${product.sku}
          </div>
        </div>
      </div>
    `;
  }
}

// Cart Functions - FIXED
function addToCart(productId, quantity = 1) {
  console.log('Adding to cart:', productId, quantity);
  
  const product = appData.products.find(p => p.id === productId);
  if (!product) {
    console.error('Product not found for cart:', productId);
    return;
  }
  
  const existingItem = appState.cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    appState.cart.push({
      productId: productId,
      quantity: quantity,
      price: product.price
    });
  }
  
  updateCartCount();
  showToast(`${product.name} added to cart!`, 'success');
}

function addToCartWithQuantity(productId) {
  const quantityInput = document.getElementById('quantityInput');
  const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
  addToCart(productId, quantity);
}

function updateCartCount() {
  const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const countElement = document.querySelector('.cart-count');
  if (countElement) {
    countElement.textContent = totalItems;
  }
}

function loadCartPage() {
  console.log('Loading cart page, items:', appState.cart.length);
  
  const container = document.getElementById('cartContent');
  if (!container) return;
  
  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <i class="fas fa-shopping-cart" style="font-size: 64px; color: var(--color-text-secondary); margin-bottom: 20px;"></i>
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items to your cart.</p>
        <button class="btn btn--primary" onclick="showPage('shop')">Continue Shopping</button>
      </div>
    `;
    return;
  }
  
  const cartItems = appState.cart.map(item => {
    const product = appData.products.find(p => p.id === item.productId);
    return { ...item, product };
  });
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 10000 ? 0 : 150; // Free shipping over ₹10,000
  const total = subtotal + tax + shipping;
  
  container.innerHTML = `
    <div class="cart-items">
      ${cartItems.map(item => `
        <div class="cart-item">
          <div class="cart-item-image">
            <div style="width:100%;height:100%;background:var(--color-bg-1);border-radius:var(--radius-base);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--color-text-secondary);">Image</div>
          </div>
          <div class="cart-item-info">
            <h3>${item.product.name}</h3>
            <div class="cart-item-brand">${item.product.brand}</div>
            <div class="cart-item-sku">SKU: ${item.product.sku}</div>
          </div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-quantity">
            <button onclick="updateCartQuantity(${item.productId}, ${item.quantity - 1})" class="btn btn--sm">-</button>
            <span style="padding: 0 10px;">${item.quantity}</span>
            <button onclick="updateCartQuantity(${item.productId}, ${item.quantity + 1})" class="btn btn--sm">+</button>
          </div>
          <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
          <button class="btn btn--outline btn--sm" onclick="removeFromCart(${item.productId})">Remove</button>
        </div>
      `).join('')}
    </div>
    
    <div class="cart-summary">
      <h3>Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>GST (18%):</span>
        <span>${formatPrice(tax)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping:</span>
        <span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
      </div>
      <div class="summary-row summary-total">
        <span>Total:</span>
        <span>${formatPrice(total)}</span>
      </div>
      
      <button class="btn btn--primary btn--full-width" onclick="showPage('checkout')">Proceed to Checkout</button>
      <button class="btn btn--secondary btn--full-width" onclick="showPage('shop')" style="margin-top: 10px;">Continue Shopping</button>
    </div>
  `;
}

function updateCartQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const item = appState.cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = newQuantity;
    updateCartCount();
    loadCartPage();
  }
}

function removeFromCart(productId) {
  appState.cart = appState.cart.filter(item => item.productId !== productId);
  updateCartCount();
  loadCartPage();
  showToast('Item removed from cart', 'info');
}

// Checkout Functions
function loadCheckoutPage() {
  if (appState.cart.length === 0) {
    showPage('cart');
    return;
  }
  
  const container = document.getElementById('checkoutForm');
  if (!container) return;
  
  switch (appState.checkoutStep) {
    case 1:
      container.innerHTML = `
        <h3>Customer Information</h3>
        <form class="checkout-form-step" onsubmit="nextCheckoutStep(event)">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email *</label>
            <input type="email" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone *</label>
            <input type="tel" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Billing Address *</label>
            <textarea class="form-control" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn--primary">Continue to Shipping</button>
        </form>
      `;
      break;
      
    case 2:
      container.innerHTML = `
        <h3>Shipping Information</h3>
        <form class="checkout-form-step" onsubmit="nextCheckoutStep(event)">
          <div class="form-group">
            <label class="form-label">Shipping Address *</label>
            <textarea class="form-control" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Shipping Method *</label>
            <select class="form-control" required>
              ${appData.shippingMethods.map(method => `
                <option value="${method.id}">${method.name} - ${formatPrice(method.cost)} (${method.duration})</option>
              `).join('')}
            </select>
          </div>
          <div class="checkout-actions">
            <button type="button" class="btn btn--secondary" onclick="prevCheckoutStep()">Back</button>
            <button type="submit" class="btn btn--primary">Continue to Payment</button>
          </div>
        </form>
      `;
      break;
      
    case 3:
      container.innerHTML = `
        <h3>Payment Information</h3>
        <form class="checkout-form-step" onsubmit="completeOrder(event)">
          <div class="form-group">
            <label class="form-label">Payment Method *</label>
            <select class="form-control" required>
              <option value="razorpay">Razorpay (Cards, UPI, Net Banking)</option>
              <option value="cod">Cash on Delivery</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" required> I agree to the Terms and Conditions
            </label>
          </div>
          <div class="checkout-actions">
            <button type="button" class="btn btn--secondary" onclick="prevCheckoutStep()">Back</button>
            <button type="submit" class="btn btn--primary">Place Order</button>
          </div>
        </form>
      `;
      break;
  }
  
  updateCheckoutSteps();
}

function nextCheckoutStep(event) {
  event.preventDefault();
  appState.checkoutStep++;
  loadCheckoutPage();
}

function prevCheckoutStep() {
  appState.checkoutStep--;
  loadCheckoutPage();
}

function updateCheckoutSteps() {
  document.querySelectorAll('.step').forEach((step, index) => {
    if (index + 1 <= appState.checkoutStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}

function completeOrder(event) {
  event.preventDefault();
  const orderId = 'SVIT' + Date.now();
  
  // Clear cart
  appState.cart = [];
  updateCartCount();
  
  // Reset checkout step
  appState.checkoutStep = 1;
  
  showToast(`Order placed successfully! Order ID: ${orderId}`, 'success');
  showPage('account');
  setTimeout(() => showAccountTab('orders'), 500);
}

// Wishlist Functions
function toggleWishlist(productId) {
  const product = appData.products.find(p => p.id === productId);
  if (!product) return;
  
  const index = appState.wishlist.findIndex(item => item === productId);
  
  if (index > -1) {
    appState.wishlist.splice(index, 1);
    showToast(`${product.name} removed from wishlist!`, 'info');
  } else {
    appState.wishlist.push(productId);
    showToast(`${product.name} added to wishlist!`, 'success');
  }
}

// Account Functions
function showAccountTab(tabName) {
  // Update navigation
  document.querySelectorAll('.account-nav a').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`[onclick="showAccountTab('${tabName}')"]`);
  if (activeLink) activeLink.classList.add('active');
  
  // Update content
  document.querySelectorAll('.account-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  const activeTab = document.getElementById(`${tabName}-tab`);
  if (activeTab) activeTab.classList.add('active');
  
  appState.currentAccountTab = tabName;
  
  // Load specific content
  if (tabName === 'wishlist') {
    loadWishlist();
  } else if (tabName === 'orders') {
    loadOrderHistory();
  }
}

function loadAccountPage() {
  showAccountTab(appState.currentAccountTab);
}

function loadWishlist() {
  const container = document.getElementById('wishlistItems');
  if (!container) return;
  
  const wishlistProducts = appData.products.filter(product => 
    appState.wishlist.includes(product.id)
  );
  
  if (wishlistProducts.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <i class="fas fa-heart" style="font-size: 48px; color: var(--color-text-secondary); margin-bottom: 16px;"></i>
        <h3>Your wishlist is empty</h3>
        <p>Save products you love to keep track of them.</p>
      </div>
    `;
  } else {
    container.innerHTML = wishlistProducts.map(product => createProductCard(product)).join('');
  }
}

function loadOrderHistory() {
  const container = document.getElementById('orderHistory');
  if (!container) return;
  
  // Sample order data
  container.innerHTML = `
    <div class="order-item" style="background: var(--color-surface); padding: 20px; border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--color-card-border);">
      <div class="order-header" style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Order #SVIT1234567890</strong>
        <span class="status status--success">Delivered</span>
      </div>
      <div class="order-details">
        <p>Date: September 1, 2025</p>
        <p>Total: ₹12,500</p>
        <p>Items: Hikvision Camera, ZKTeco Scanner</p>
      </div>
    </div>
    <div class="order-item" style="background: var(--color-surface); padding: 20px; border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--color-card-border);">
      <div class="order-header" style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Order #SVIT1234567891</strong>
        <span class="status status--warning">Processing</span>
      </div>
      <div class="order-details">
        <p>Date: August 28, 2025</p>
        <p>Total: ₹8,900</p>
        <p>Items: Electronic Door Lock</p>
      </div>
    </div>
  `;
}

// Admin Functions - FIXED
function showAdminTab(tabName) {
  console.log('Showing admin tab:', tabName);
  
  // Update navigation
  document.querySelectorAll('.admin-nav a').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`[onclick="showAdminTab('${tabName}')"]`);
  if (activeLink) activeLink.classList.add('active');
  
  // Update content
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  const activeTab = document.getElementById(`${tabName}-tab`);
  if (activeTab) activeTab.classList.add('active');
  
  appState.currentAdminTab = tabName;
  
  // Load specific content
  if (tabName === 'overview') {
    setTimeout(loadSalesChart, 100);
  } else if (tabName === 'products') {
    loadAdminProducts();
  } else if (tabName === 'orders') {
    loadAdminOrders();
  }
}

function loadAdminPage() {
  console.log('Loading admin page');
  showAdminTab(appState.currentAdminTab);
}

function loadSalesChart() {
  const ctx = document.getElementById('salesChart');
  if (!ctx) {
    console.error('Sales chart canvas not found');
    return;
  }
  
  console.log('Loading sales chart');
  
  try {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Sales Revenue (₹)',
          data: [85000, 92000, 78000, 105000, 98000, 87000, 112000, 125000, 138000],
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₹' + (value / 1000) + 'K';
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error loading chart:', error);
  }
}

function loadAdminProducts() {
  const container = document.getElementById('adminProductsList');
  if (!container) return;
  
  container.innerHTML = `
    <div class="admin-table">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: var(--color-bg-1);">
            <th style="padding: 12px; text-align: left;">Product</th>
            <th style="padding: 12px; text-align: left;">Category</th>
            <th style="padding: 12px; text-align: left;">Price</th>
            <th style="padding: 12px; text-align: left;">Stock</th>
            <th style="padding: 12px; text-align: left;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${appData.products.slice(0, 8).map(product => `
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 12px;">${product.name}</td>
              <td style="padding: 12px;">${product.category}</td>
              <td style="padding: 12px;">${formatPrice(product.price)}</td>
              <td style="padding: 12px;">${product.stock}</td>
              <td style="padding: 12px;">
                <button class="btn btn--sm btn--outline">Edit</button>
                <button class="btn btn--sm btn--outline" style="margin-left: 8px;">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function loadAdminOrders() {
  const container = document.getElementById('adminOrdersList');
  if (!container) return;
  
  container.innerHTML = `
    <div class="admin-table">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: var(--color-bg-1);">
            <th style="padding: 12px; text-align: left;">Order ID</th>
            <th style="padding: 12px; text-align: left;">Customer</th>
            <th style="padding: 12px; text-align: left;">Total</th>
            <th style="padding: 12px; text-align: left;">Status</th>
            <th style="padding: 12px; text-align: left;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;">SVIT1234567890</td>
            <td style="padding: 12px;">Rajesh Kumar</td>
            <td style="padding: 12px;">₹12,500</td>
            <td style="padding: 12px;"><span class="status status--success">Delivered</span></td>
            <td style="padding: 12px;"><button class="btn btn--sm btn--outline">View</button></td>
          </tr>
          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;">SVIT1234567891</td>
            <td style="padding: 12px;">Priya Sharma</td>
            <td style="padding: 12px;">₹8,900</td>
            <td style="padding: 12px;"><span class="status status--warning">Processing</span></td>
            <td style="padding: 12px;"><button class="btn btn--sm btn--outline">View</button></td>
          </tr>
          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;">SVIT1234567892</td>
            <td style="padding: 12px;">Amit Patel</td>
            <td style="padding: 12px;">₹25,000</td>
            <td style="padding: 12px;"><span class="status status--info">Shipped</span></td>
            <td style="padding: 12px;"><button class="btn btn--sm btn--outline">View</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// Search Functions - FIXED
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    console.log('Setting up search functionality');
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch(event);
      }
    });
  }
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  console.log('Searching for:', query);
  
  if (query.length < 2) {
    if (appState.currentPage === 'shop') {
      appState.filteredProducts = [...appData.products];
      displayProducts(appState.filteredProducts);
      updateProductCount();
    }
    return;
  }
  
  const results = appData.products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.features.some(feature => feature.toLowerCase().includes(query))
  );
  
  if (appState.currentPage === 'shop') {
    appState.filteredProducts = results;
    displayProducts(results);
    updateProductCount();
  } else {
    // Redirect to shop page with results
    showPage('shop');
    setTimeout(() => {
      appState.filteredProducts = results;
      displayProducts(results);
      updateProductCount();
    }, 100);
  }
}

// Modal Functions
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Form Handlers
function handleContactForm(event) {
  event.preventDefault();
  showToast('Thank you for your message! We will get back to you soon.', 'success');
  event.target.reset();
}

function handleNewsletterForm(event) {
  event.preventDefault();
  showToast('Thank you for subscribing to our newsletter!', 'success');
  event.target.reset();
}

// Initialize Application - ENHANCED
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing SVIT Technologies E-commerce Platform');
  
  // Setup event listeners
  setupSearch();
  
  // Setup form handlers
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', handleContactForm);
  });
  
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', handleNewsletterForm);
  });
  
  // Load initial page
  loadHomePage();
  updateCartCount();
  
  // Close modals when clicking outside
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.classList.add('hidden');
    }
  });
  
  console.log('Application initialized successfully');
});

// Expose functions to global scope for onclick handlers
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.showProductDetail = showProductDetail;
window.addToCart = addToCart;
window.addToCartWithQuantity = addToCartWithQuantity;
window.toggleWishlist = toggleWishlist;
window.filterByCategory = filterByCategory;
window.applyFilters = applyFilters;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.nextCheckoutStep = nextCheckoutStep;
window.prevCheckoutStep = prevCheckoutStep;
window.completeOrder = completeOrder;
window.showAccountTab = showAccountTab;
window.showAdminTab = showAdminTab;
window.closeModal = closeModal;