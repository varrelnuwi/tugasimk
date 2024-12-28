document.addEventListener('DOMContentLoaded', function () {
    const transactionDate = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
    document.getElementById('transaction-date').textContent = transactionDate;

    const totalPembayaran = parseFloat(localStorage.getItem('totalPembayaran'));
    const serviceFee = parseFloat(localStorage.getItem('serviceFee')); // Retrieve service fee from localStorage
    const totalBill = totalPembayaran + serviceFee;
    const paymentMethod = localStorage.getItem('paymentMethod');
    const buyerName = localStorage.getItem('buyerName');
    const cart = JSON.parse(localStorage.getItem('cart'));

    document.getElementById('total-payment').textContent = `Rp ${totalPembayaran.toLocaleString('id-ID')}`;
    document.getElementById('service-fee').textContent = `Rp ${serviceFee.toLocaleString('id-ID')}`;
    document.getElementById('total-bill').textContent = `Rp ${totalBill.toLocaleString('id-ID')}`;
    document.getElementById('payment-method').textContent = paymentMethod;
    document.getElementById('buyer-name').textContent = buyerName;

    const productDetailsContainer = document.getElementById('product-details');
    cart.forEach(item => {
        const productDetail = document.createElement('div');
        productDetail.classList.add('flex', 'justify-between', 'items-center');
        productDetail.innerHTML = `
            <div class="flex items-center">
                <img src="${item.image}" alt="Product" class="w-16 h-16 rounded-lg mr-4"/>
                <div>
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-400">${item.description}</p>
                </div>
            </div>
            <span>${item.quantity}x</span>
        `;
        productDetailsContainer.appendChild(productDetail);
    });

    // Clear local storage after displaying the data
    localStorage.removeItem('cart');
    localStorage.removeItem('totalPembayaran');
    localStorage.removeItem('serviceFee'); // Clear service fee from localStorage
    localStorage.removeItem('totalBill');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('buyerName');

    // Reset cart on home page
    if (window.opener) {
        window.opener.localStorage.removeItem('cart');
    }

    // Add event listener to "Back to Home" button
    const backToHomeButton = document.querySelector('.back-to-home');
    backToHomeButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default navigation
        localStorage.removeItem('cart'); // Clear cart data
        if (window.opener) {
            window.opener.localStorage.removeItem('cart'); // Clear cart on home page
        }
        window.location.href = '/menu/Menu.html'; // Redirect to home page
    });
});
