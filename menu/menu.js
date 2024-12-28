// Event listener untuk navigasi berdasarkan tombol filter
document.querySelectorAll('.filter-buttons button').forEach((button, index) => {
    button.addEventListener('click', () => {
        // Tentukan URL berdasarkan tombol yang diklik
        switch (index) {
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

// Array untuk menyimpan item di cart
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Fungsi untuk memperbarui jumlah item
function updateQuantity(button, change) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity = Math.max(1, currentQuantity + change); // Pastikan jumlah tidak kurang dari 1
    quantityElement.textContent = currentQuantity;
}

// Fungsi untuk menambahkan item ke cart
function addToCart(name, price) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const quantityElement = document.querySelector(`.pizza-item:has(img[alt="${name}"]) .quantity`);
    const quantity = parseInt(quantityElement.textContent);
    const image = document.querySelector(`.pizza-item:has(img[alt="${name}"]) img`).src;

    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ name, price, quantity, image });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

// Fungsi untuk memperbarui jumlah item di cart
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

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount(); // Update jumlah item di menu
});