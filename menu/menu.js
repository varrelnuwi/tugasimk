// Ambil setiap tombol berdasarkan urutannya
document.querySelectorAll('.filter-buttons button').forEach((button, index) => {
    button.addEventListener('click', () => {
        // Tentukan URL berdasarkan tombol yang diklik
        switch(index) {
            case 0:
                window.location.href = 'Menu.html'; // Menuju halaman Pizza
                break;
            case 1:
                window.location.href = 'Drink.html'; // Menuju halaman Drink
                break;
            case 2:
                window.location.href = 'Lasagna.html'; // Menuju halaman Lasagna
                break;
            case 3:
                window.location.href = 'Dessert.html'; // Menuju halaman Dessert
                break;
        }
    });
});

//hide angka 0
// Array untuk menyimpan item di cart
// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    // Get existing cart items from localStorage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if item is already in the cart
    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        // If item exists, increase its quantity
        existingItem.quantity += 1;
    } else {
        // If item doesn't exist, add it as a new item
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the cart count displayed in the menu
    updateCartCount();
}

// Function to update the cart item count in the menu
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

// Call the function on page load to initialize the cart count
document.addEventListener('DOMContentLoaded', updateCartCount);
