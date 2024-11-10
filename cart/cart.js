function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartContainer.innerHTML = ""; 
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement("li");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    totalPrice.textContent = `Total: $${total}`;

    // Tambahkan event listener ke semua tombol hapus
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeItem(index);
        });
    });
}

// Fungsi untuk menghapus item dari cart
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1); // Hapus item berdasarkan index
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Perbarui localStorage
    displayCart(); // Tampilkan ulang cart
    updateCartCount(); // Perbarui jumlah item di cart
}

// Fungsi untuk memperbarui jumlah item di cart count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (totalQuantity > 0) {
        cartCountElement.style.display = 'inline'; // Tampilkan cart count
        cartCountElement.textContent = totalQuantity;
    } else {
        cartCountElement.style.display = 'none'; // Sembunyikan cart count jika kosong
    }
}

// Fungsi checkout (implementasi sederhana)
function checkout() {
    alert("Thank you for your purchase!");
    localStorage.removeItem('cartItems'); // Hapus semua item di cart
    displayCart(); // Tampilkan ulang cart kosong
    updateCartCount(); // Perbarui jumlah item di cart count
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount();
});