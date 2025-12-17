let cart = [];

// === 1. ADD TO CART ===
function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCartUI();
    
    // Auto-open cart to show user it was added
    const modal = document.getElementById('cart-modal');
    if (modal.classList.contains('hidden')) {
        toggleCart();
    }
}

// === 2. REMOVE FROM CART ===
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// === 3. UPDATE UI ===
function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>₹${item.price}</small>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
            `;
            cartList.appendChild(div);
        });
    }

    cartCount.innerText = cart.length;
    cartTotal.innerText = total;
}

// === 4. TOGGLE CART VISIBILITY ===
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-overlay');
    
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

// === 5. CHECKOUT (Copy to Clipboard + Open Instagram) ===
async function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some cakes first.");
        return;
    }

    // A. Build the message
    let message = "Hello! I would like to place an order:\n\n";
    let total = 0;

    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} - ₹${item.price}\n`;
        total += item.price;
    });

    message += `\n*Total Estimate: ₹${total}*`;
    message += "\n\nPlease confirm availability!";

    // B. Copy text to clipboard
    try {
        await navigator.clipboard.writeText(message);
        
        // C. Alert user and Open Instagram
        setTimeout(() => {
            const confirmAction = confirm("Order details copied to clipboard! \n\nClick OK to open Instagram, then PASTE the message in the chat.");
            
            if (confirmAction) {
                const instagramUser = "thekhammaghannikkes"; 
                const url = `https://ig.me/m/${instagramUser}`;
                window.open(url, '_blank');
            }
        }, 100);

    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert("Could not copy text automatically. Please take a screenshot of your cart!");
    }
}


// === 6. FILTER LOGIC ===
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'bestseller') {
                    if (card.querySelector('.badge')) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});