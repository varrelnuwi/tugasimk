// JavaScript untuk mengelola interaksi
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

document.addEventListener('DOMContentLoaded', function () {
    const paymentMethodButtons = document.querySelectorAll('.payment-method button');
    const completePaymentButtons = document.querySelectorAll('.complete-payment button');
    const orderTypeButtons = document.querySelectorAll('.order-type button');
    const nomorMejaField = document.querySelector('.nomor-meja-field');
    const qrisButton = document.querySelector('.complete-payment button:nth-child(2)');
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
                    button.classList.remove('active');
                } else {
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
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
            completePaymentButtons.forEach(btn => btn.style.display = 'none');
            qrisButton.style.display = 'flex';
        } else {
            completePaymentButtons.forEach(btn => btn.style.display = 'flex');
        }
    });

    addClickEffect(completePaymentButtons);
    addClickEffect(orderTypeButtons, function (button) {
        if (button.textContent.includes('Bawa Pulang')) {
            nomorMejaField.style.display = 'none';
        } else {
            nomorMejaField.style.display = 'block';
        }
    });

    const totalPrice = localStorage.getItem('totalPrice');
    if (totalPrice) {
        totalPembayaranElement.textContent = `$${totalPrice}`;
    }

    bayarButton.addEventListener('click', function (event) {
        const namaLengkap = document.querySelector('input[placeholder="Nama Lengkap"]').value;
        const email = document.querySelector('input[placeholder="Email"]').value;
        const nomorHP = document.querySelector('input[placeholder="Nomor HP"]').value;
        const nomorMeja = document.querySelector('input[placeholder="Nomor Meja"]').value;

        if (!namaLengkap || !email || !nomorHP || (!nomorMeja && nomorMejaField.style.display !== 'none')) {
            alert('Harap isi semua informasi pembayaran.');
            event.preventDefault();
        }
    });
});

let paymentMethod = '';

function selectQris() {
    paymentMethod = 'qris';
}

function proceedToPayment() {
    if (paymentMethod === 'qris') {
        const totalPembayaran = document.querySelector('.total-pembayaran').textContent;
        localStorage.setItem('totalPembayaran', totalPembayaran);
        window.location.href = '/payment/MethodQris.html';
    } else {
        // Handle other payment methods
    }
}
