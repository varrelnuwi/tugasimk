// Function to display items in the cart
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartContainer.innerHTML = ""; // Clear current cart display
    let total = 0;

    // Populate the cart with items
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement("li");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(itemElement);

        // Update the total price
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to each remove button
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeItem(index);
        });
    });
}

// Function to remove an item from the cart
function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1); // Remove item by index
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
    displayCart(); // Refresh cart display
    updateCartCount(); // Update the cart item count
}

// Update the cart item count for cart page
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');

    if (totalQuantity > 0) {
        cartCountElement.style.display = 'inline';
        cartCountElement.textContent = totalQuantity;
    } else {
        cartCountElement.style.display = 'none';
    }
}

// Redirect to payment page when "Pesan Sekarang" is clicked
document.getElementById('order-now').addEventListener('click', () => {
    window.location.href = '/payment/payment.html'; // Adjust the path to the actual location of payment.html
});

// Call displayCart and updateCartCount when the page loads
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount();
});
