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
                    <p class="text-gray-400">Rp ${item.price.toLocaleString('id-ID')}</p>
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
         // Reload halaman setelah menghapus data cart
    });

    // Tandai item sebagai habis setelah pembayaran berhasil
    markItemsAsSoldOut();
});

// Fungsi untuk menandai item sebagai habis
function markItemsAsSoldOut() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const soldOutItems = JSON.parse(localStorage.getItem('soldOutItems')) || [];

    cartItems.forEach(item => {
        if (!soldOutItems.includes(item.name)) {
            soldOutItems.push(item.name);
        }
    });

    localStorage.setItem('soldOutItems', JSON.stringify(soldOutItems));
}
// Tambahkan kode ini di PembayaranBerhasil.js
class ReceiptPDFGenerator {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const downloadButton = document.getElementById('download-receipt');
        if (downloadButton) {
            downloadButton.addEventListener('click', () => this.generateReceipt());
        }
    }

    async generateReceipt() {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Set font untuk mendukung karakter khusus
            doc.setFont('helvetica', 'normal');

            // Header
            doc.setFontSize(16);
            doc.text("Bukti Pembayaran", 20, 20);

            // Informasi transaksi
            doc.setFontSize(12);
            doc.text("No. Transaksi: TRX123456789", 20, 30);
            doc.text("Tanggal Transaksi: " + document.getElementById('transaction-date').textContent, 20, 40);

            // Detail produk
            doc.text("Detail Produk:", 20, 50);
            let yPos = 60;

            // Ambil detail produk dari cart
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.forEach(item => {
                doc.text(`${item.name} - ${item.quantity}x - Rp ${item.price.toLocaleString('id-ID')}`, 25, yPos);
                yPos += 10;
            });

            // Informasi pembayaran
            yPos += 10;
            doc.text("Total Pembayaran: " + document.getElementById('total-payment').textContent, 20, yPos);
            yPos += 10;
            doc.text("Biaya Layanan: " + document.getElementById('service-fee').textContent, 20, yPos);
            yPos += 10;
            doc.text("Total Tagihan: " + document.getElementById('total-bill').textContent, 20, yPos);
            yPos += 10;
            doc.text("Metode Pembayaran: " + document.getElementById('payment-method').textContent, 20, yPos);
            yPos += 10;
            doc.text("Nama Pembeli: " + document.getElementById('buyer-name').textContent, 20, yPos);

            // Footer dengan timestamp
            doc.setFontSize(8);
            const timestamp = new Date().toLocaleString('id-ID');
            doc.text(`Dicetak pada: ${timestamp}`, 20, 280);

            // Simpan PDF
            doc.save('Bukti_Pembayaran.pdf');

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
        }
    }
}

// Inisialisasi PDF generator setelah DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi generator PDF
    new ReceiptPDFGenerator();
});
