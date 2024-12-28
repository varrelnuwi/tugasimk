document.addEventListener('DOMContentLoaded', function () {
    const transactionDate = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
    document.getElementById('transaction-date').textContent = transactionDate;

    let totalPembayaran = parseFloat(localStorage.getItem('totalPembayaran'));
    let serviceFee = parseFloat(localStorage.getItem('serviceFee'));
    let totalBill = totalPembayaran + serviceFee;
    let paymentMethod = localStorage.getItem('paymentMethod');
    let buyerName = localStorage.getItem('buyerName');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

    const backToHomeButton = document.getElementById('back-to-home');
    backToHomeButton.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Clearing cart data...');
        localStorage.removeItem('cart');
        localStorage.removeItem('cartItems'); // Clear cart items
        localStorage.removeItem('totalPembayaran');
        localStorage.removeItem('serviceFee');
        localStorage.removeItem('totalBill');
        localStorage.removeItem('paymentMethod');
        localStorage.removeItem('buyerName');
        console.log('Cart data cleared.');
        window.location.href = '/menu/Menu.html';
    });
});
