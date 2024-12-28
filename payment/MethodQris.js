function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    const countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdown);
            display.textContent = "00:00";
        }
    }, 1000);
}

function checkPaymentStatus() {
    // Simulate checking payment status
    const paymentStatus = true; // Replace with actual status check

    if (paymentStatus) {
        window.location.href = '/payment/PembayaranBerhasil.html';
    } else {
        alert('Payment not completed yet.');
    }
}

// Modify the existing redirectToPay function to check payment status
function redirectToPay() {
    checkPaymentStatus();
}

window.onload = function () {
    const display = document.querySelector('#timer');
    const minutes = 9;
    const seconds = 51;
    startTimer(minutes * 60 + seconds, display);

    const totalPembayaran = localStorage.getItem('totalPembayaran');
    if (totalPembayaran) {
        document.querySelector('#payment-total').textContent = 'Rp' + parseInt(totalPembayaran).toLocaleString('id-ID');
    }

    const qr = new QRious({
        element: document.getElementById('qris-qr-code'),
        value: 'https://example.com/payment', // Replace with actual payment URL
        size: 250
    });
};