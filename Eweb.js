 // Product data
 const products = [{
         id: 1,
         name: "Sony WH-1000XM4 Wireless Headphones",
         price: 24999,
         image: "headphone.jpeg"
     },
     {
         id: 2,
         name: "iPhone 15 Pro Max",
         price: 99999,
         image: "iphone.png"
     },
     {
         id: 3,
         name: "MacBook Air M2",
         price: 114900,
         image: "mac.jpeg"
     },
     {
         id: 4,
         name: "Apple Watch Series 9",
         price: 41900,
         image: "watch.png"
     },
     {
         id: 5,
         name: "PlayStation 5 Console",
         price: 54990,
         image: "playstation.jpeg"
     },
     {
         id: 6,
         name: "JBL Charge 5 Bluetooth Speaker",
         price: 14999,
         image: "jblspeaker.jpeg"
     }
 ];

 // Shopping cart
 let cart = [];

 // Load products
 function loadProducts() {
     const grid = document.getElementById('productsGrid');
     grid.innerHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" />
                    </div>
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `).join('');
 }

 // Add to cart
 function addToCart(productId) {
     const product = products.find(p => p.id === productId);
     const existingItem = cart.find(item => item.id === productId);

     if (existingItem) {
         existingItem.quantity += 1;
     } else {
         cart.push({...product, quantity: 1 });
     }

     updateCartCount();
     animateCartIcon();
 }

 // Update cart count
 function updateCartCount() {
     const count = cart.reduce((total, item) => total + item.quantity, 0);
     document.getElementById('cartCount').textContent = count;
 }

 // Animate cart icon
 function animateCartIcon() {
     const cartIcon = document.querySelector('.cart-icon');
     cartIcon.style.transform = 'scale(1.1)';
     setTimeout(() => {
         cartIcon.style.transform = 'scale(1)';
     }, 200);
 }

 // Open cart modal
 function openCart() {
     document.getElementById('cartModal').style.display = 'block';
     displayCartItems();
 }

 // Close cart modal
 function closeCart() {
     document.getElementById('cartModal').style.display = 'none';
 }

 // Display cart items
 function displayCartItems() {
     const cartItemsContainer = document.getElementById('cartItems');
     const cartTotal = document.getElementById('cartTotal');

     if (cart.length === 0) {
         cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
         cartTotal.textContent = 'Total: ₹0';
         return;
     }

     cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="item-info">
                        <strong>${item.name}</strong><br>
                        <span>₹${item.price.toLocaleString('en-IN')} each</span>
                    </div>
                    <div class="item-controls">
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `).join('');

     const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
     cartTotal.textContent = `Total: ₹${total.toLocaleString('en-IN')}`;
 }

 // Change quantity
 function changeQuantity(productId, change) {
     const item = cart.find(item => item.id === productId);
     if (item) {
         item.quantity += change;
         if (item.quantity <= 0) {
             removeFromCart(productId);
         } else {
             displayCartItems();
             updateCartCount();
         }
     }
 }

 // Remove from cart
 function removeFromCart(productId) {
     cart = cart.filter(item => item.id !== productId);
     displayCartItems();
     updateCartCount();
 }

 // Checkout
 function checkout() {
     if (cart.length === 0) {
         alert('Your cart is empty!');
         return;
     }

     const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
     alert(`Thank you for your purchase!\nTotal: ₹${total.toLocaleString('en-IN')}\n\nThis is a demo checkout. In a real store, you would be redirected to a payment processor like Razorpay or PayU.`);

     // Clear cart after checkout
     cart = [];
     updateCartCount();
     closeCart();
 }

 // Close modal when clicking outside
 window.onclick = function(event) {
     const modal = document.getElementById('cartModal');
     if (event.target === modal) {
         closeCart();
     }
 }

 // Smooth scrolling for navigation links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
             target.scrollIntoView({
                 behavior: 'smooth',
                 block: 'start'
             });
         }
     });
 });

 // Initialize the store
 document.addEventListener('DOMContentLoaded', function() {
     loadProducts();
 });