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
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Fungsi untuk memperbarui jumlah item
    function updateQuantity(button, change) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        currentQuantity = Math.max(1, currentQuantity + change);
        quantityElement.textContent = currentQuantity;
    }

    // Fungsi untuk menambahkan item ke cart
    function addToCart(pizzaName, price) {
        const pizzaItem = event.target.parentElement;
        const quantityElement = pizzaItem.querySelector('.quantity');
        const quantity = parseInt(quantityElement.textContent);

        const existingItem = cartItems.find(item => item.name === pizzaName);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ name: pizzaName, price: price, quantity: quantity });
        }

        alert(`Added ${quantity} ${pizzaName}(s) to the cart!`);
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Simpan ke localStorage
        updateCartCount();
    }

    // Fungsi untuk memperbarui jumlah item di cart
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

        if (totalQuantity > 0) {
            cartCountElement.style.display = 'inline'; // Tampilkan cart count
            cartCountElement.textContent = totalQuantity;
        } else {
            cartCountElement.style.display = 'none'; // Sembunyikan cart count jika kosong
        }
    }

    // Panggil fungsi saat halaman dimuat
    document.addEventListener("DOMContentLoaded", () => {
        updateCartCount(); // Update jumlah item di menu
    });
