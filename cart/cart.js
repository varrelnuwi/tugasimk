// Function to display items in the cart
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Ambil data dari localStorage
    const soldOutItems = JSON.parse(localStorage.getItem('soldOutItems')) || []; // Ambil data sold out dari localStorage

    cartContainer.innerHTML = ""; // Kosongkan tampilan sebelumnya
    let total = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `<li class="empty-cart">Your cart is empty.</li>`;
        totalPriceElement.textContent = `Total: Rp 0`;
        return;
    }

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement("li");
        itemElement.classList.add("cart-item");
        if (soldOutItems.includes(item.name)) {
            itemElement.classList.add('sold-out');
        }
        itemElement.innerHTML = `
            <div class="cart-item-content">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <span>${item.name}</span>
                    <span>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</span>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(itemElement);

        // Hitung total harga
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`; // Tampilkan total harga
    localStorage.setItem('totalPrice', total.toFixed(2)); // Simpan total harga ke localStorage

    // Tambahkan event listener untuk tombol remove
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
    cartItems.splice(index, 1); // Hapus item berdasarkan indeks
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Perbarui localStorage
    displayCart(); // Refresh tampilan keranjang
    updateCartCount(); // Perbarui jumlah item di ikon
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
function redirectToPayment() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert("Your cart is empty! Please add items to proceed.");
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    const serviceFee = 5000; // Example service fee
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    localStorage.setItem('serviceFee', serviceFee); // Simpan service fee ke localStorage
    window.location.href = '/payment/pay.html'; // Sesuaikan path ke lokasi file pembayaran Anda
}

// Call displayCart and updateCartCount when the page loads
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount();
    document.getElementById('order-now').addEventListener('click', redirectToPayment);
});

// Clear cart data after reaching the payment success page
if (window.location.pathname.includes('PembayaranBerhasil.html')) {
    console.log('Payment successful. Clearing cart...');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('serviceFee');
    console.log('Cart has been reset after payment success.');
}