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
    const soldOutItems = JSON.parse(localStorage.getItem('soldOutItems')) || [];
    if (soldOutItems.includes(name)) {
        alert(`${name} is sold out and cannot be added to the cart.`);
        return;
    }

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

// Fungsi untuk menandai item sebagai habis
function markItemsAsSoldOut() {
    const soldOutItems = JSON.parse(localStorage.getItem('soldOutItems')) || [];
    soldOutItems.forEach(name => {
        const itemElement = document.querySelector(`.pizza-item:has(img[alt="${name}"])`);
        if (itemElement) {
            itemElement.classList.add('sold-out');
            const addToCartButton = itemElement.querySelector('.cart-button');
            if (addToCartButton) {
                addToCartButton.disabled = true;
            }
        }
    });
}

// Fungsi untuk mereset menu agar tersedia kembali
// Fungsi untuk mereset menu agar tersedia kembali
function resetMenu() {
    const soldOutItems = document.querySelectorAll('.pizza-item.sold-out');
    soldOutItems.forEach(item => {
        item.classList.remove('sold-out');
        const addToCartButton = item.querySelector('.cart-button');
        if (addToCartButton) {
            addToCartButton.disabled = false;
        }
    });
    localStorage.removeItem('soldOutItems');
    updateCartCount();
    location.reload(); // Reload halaman tanpa delay
}

// Simulasi pembayaran berhasil
function simulatePaymentSuccess() {
    // ...kode pembayaran...
    markItemsAsSoldOut();
}

// Event listener untuk tombol reset menu
document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById('reset-menu-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetMenu);
    }
    updateCartCount(); // Update jumlah item di menu
    markItemsAsSoldOut(); // Tandai item yang sudah habis
});