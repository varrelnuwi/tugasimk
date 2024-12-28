document.addEventListener('DOMContentLoaded', function () {
    const paymentMethodButtons = document.querySelectorAll('.payment-method button');
    const completePaymentSection = document.querySelector('.complete-payment');
    const completePaymentButtons = document.querySelectorAll('.complete-payment button');
    const orderTypeButtons = document.querySelectorAll('.order-type button');
    const nomorMejaField = document.querySelector('.nomor-meja-field');
    const qrisButton = document.querySelector('.complete-payment button:nth-child(2)');
    const otherPaymentButtons = document.querySelectorAll('.complete-payment button:not(:nth-child(2))');
    const totalPembayaranElement = document.querySelector('.total-pembayaran');
    const bayarButton = document.querySelector('.bg-custom');

    function addHoverEffect(buttons) {
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function () {
                if (!button.classList.contains('active')) {
                    button.classList.add('hover');
                }
            });
            button.addEventListener('mouseleave', function () {
                button.classList.remove('hover');
            });
        });
    }

    function addClickEffect(buttons, callback) {
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                if (button.classList.contains('active')) {
                    button.classList.remove('active', 'hover');
                    if (buttons === paymentMethodButtons) {
                        completePaymentSection.style.display = 'none';
                    }
                } else {
                    buttons.forEach(btn => btn.classList.remove('active', 'hover'));
                    button.classList.add('active', 'hover');
                    if (buttons === paymentMethodButtons) {
                        completePaymentSection.style.display = 'block';
                    }
                    if (callback) callback(button);
                }
            });
        });
    }

    addHoverEffect(paymentMethodButtons);
    addHoverEffect(completePaymentButtons);
    addHoverEffect(orderTypeButtons);

    addClickEffect(paymentMethodButtons, function (button) {
        if (button.textContent.includes('Pembayaran Online')) {
            qrisButton.style.display = 'flex';
            otherPaymentButtons.forEach(btn => btn.style.display = 'none');
        } else {
            qrisButton.style.display = 'flex';
            otherPaymentButtons.forEach(btn => btn.style.display = 'flex');
        }
    });

    addClickEffect(completePaymentButtons, function (button) {
        if (button.textContent.includes('Cash')) {
            paymentMethod = 'cash';
        } else if (button.textContent.includes('QRIS')) {
            paymentMethod = 'qris';
        } else if (button.textContent.includes('Credit Card/Debit')) {
            paymentMethod = 'Credit Card/Debit';
        } else {
            paymentMethod = '';
        }
    });

    addClickEffect(orderTypeButtons, function (button) {
        if (button.textContent.includes('Bawa Pulang')) {
            nomorMejaField.style.display = 'none';
        } else {
            nomorMejaField.style.display = 'block';
        }
    });

    const totalPrice = localStorage.getItem('totalPrice');
    if (totalPrice) {
        totalPembayaranElement.textContent = `Rp ${parseFloat(totalPrice).toLocaleString('id-ID')}`;
    }

    bayarButton.addEventListener('click', function (event) {
        proceedToPayment();
    });

    document.querySelectorAll('.payment-option').forEach((button) => {
        button.addEventListener('click', function () {
            // Hapus status aktif dari semua tombol
            document.querySelectorAll('.payment-option').forEach(btn => {
                btn.classList.remove('border-blue-500', 'bg-blue-50');
            });

            // Tambahkan status aktif ke tombol yang diklik
            this.classList.add('border-blue-500', 'bg-blue-50');

            // Tampilkan metode pembayaran yang dipilih
            const selectedMethod = this.getAttribute('data-method');
            document.getElementById('selected-method').textContent = `Metode pembayaran dipilih: ${selectedMethod}`;
        });
    });
});

let paymentMethod = '';
let orderType = '';

function selectQris() {
    paymentMethod = 'qris';
}

function selectOrderType(type) {
    const nomorMejaField = document.querySelector('.nomor-meja-field');
    const namaLengkapField = document.querySelector('input[placeholder="Nama Lengkap"]').parentElement.parentElement;
    const emailField = document.querySelector('input[placeholder="Email"]').parentElement.parentElement;
    const nomorHPField = document.querySelector('input[placeholder="Nomor HP"]').parentElement.parentElement;

    const showFields = (showNomorMeja, showNamaLengkap, showEmail, showNomorHP) => {
        nomorMejaField.style.display = showNomorMeja ? 'block' : 'none';
        namaLengkapField.style.display = showNamaLengkap ? 'block' : 'none';
        emailField.style.display = showEmail ? 'block' : 'none';
        nomorHPField.style.display = showNomorHP ? 'block' : 'none';
    };

    if (orderType === type) {
        // Reset to default state
        orderType = '';
        showFields(true, true, true, true);
    } else {
        orderType = type;
        if (type === 'dine-in') {
            showFields(true, true, false, false);
        } else if (type === 'takeaway') {
            showFields(false, true, true, true);
        }
    }
}

function proceedToPayment() {
    const namaLengkap = document.querySelector('input[placeholder="Nama Lengkap"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const nomorHP = document.querySelector('input[placeholder="Nomor HP"]').value;
    const nomorMeja = document.querySelector('input[placeholder="Nomor Meja"]').value;

    if (!orderType) {
        alert('Harap pilih tipe pesanan.');
        return;
    }

    if (!paymentMethod) {
        alert('Harap pilih metode pembayaran.');
        return;
    }

    if (orderType === 'dine-in' && !nomorMeja) {
        alert('Harap isi nomor meja untuk pesanan makan di tempat.');
        return;
    }

    if (orderType === 'takeaway' && (!namaLengkap || !email || !nomorHP)) {
        alert('Harap isi semua informasi pembayaran.');
        return;
    }

    const totalPembayaran = parseFloat(document.querySelector('.total-pembayaran').textContent.replace('Rp', '').replace(/\./g, '').replace(',', '.'));
    const serviceFee = parseFloat(localStorage.getItem('serviceFee'));
    const totalBill = totalPembayaran + serviceFee;

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    localStorage.setItem('cart', JSON.stringify(cartItems));

    localStorage.setItem('totalPembayaran', totalPembayaran.toFixed(2));
    localStorage.setItem('serviceFee', serviceFee.toFixed(2));
    localStorage.setItem('totalBill', totalBill.toFixed(2));
    localStorage.setItem('paymentMethod', paymentMethod);
    localStorage.setItem('buyerName', namaLengkap);

    if (paymentMethod === 'qris') {
        window.location.href = '/payment/MethodQris.html';
    } else if (paymentMethod === 'cash' || paymentMethod === 'Credit Card/Debit') {
        window.location.href = '/payment/PembayaranBerhasil.html';
    } else {
        // Handle other payment methods
    }
}