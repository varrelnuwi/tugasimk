document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    const bankTransferModal = document.getElementById('bank-transfer-modal');
    const totalAmountElement = document.getElementById('total-amount');
    const countdownTimerElement = document.getElementById('countdown-timer');
    const closeModalButton = document.getElementById('close-modal');
    const finishPaymentButton = document.getElementById('finish-payment');

    // Retrieve and display the total amount from the cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    totalAmountElement.textContent = `$${totalAmount}`;

    // Handle payment form submission
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (selectedPaymentMethod.value === "bank-transfer") {
            // Open the bank transfer modal with QR code and countdown timer
            openModal();
            generateQRCode(`Total Amount: $${totalAmount}`);
            startCountdown(10); // Set a 10-minute countdown
            simulatePaymentSuccess(); // Simulate a real-time payment notification
        } else {
            // For other payment methods, process payment, clear cart, and redirect
            alert(`Payment confirmed with ${selectedPaymentMethod.value}. Thank you for your payment!`);
            localStorage.removeItem('cartItems'); // Clear cart items
            window.location.href = '/menu/Menu.html'; // Redirect to menu or confirmation page
        }
    });

    // Function to open the modal
    function openModal() {
        bankTransferModal.style.display = 'flex';
    }

    // Function to close the modal
    closeModalButton.addEventListener('click', closeModal);
    function closeModal() {
        bankTransferModal.style.display = 'none';
        clearCountdown();
    }

    // Function to finish the payment, clear cart, and redirect
    finishPaymentButton.addEventListener('click', finishPayment);
    function finishPayment() {
        alert("Thank you for completing your payment!");
        localStorage.removeItem('cartItems'); // Clear cart items
        closeModal(); // Close modal
        window.location.href = '/menu/Menu.html'; // Redirect to menu or confirmation page
    }

    // Function to generate QR code
    function generateQRCode(text) {
        const qrCodeElement = document.getElementById('qr-code');
        qrCodeElement.innerHTML = ''; // Clear any existing QR code
        new QRCode(qrCodeElement, {
            text: text,
            width: 128,
            height: 128,
        });
    }

    // Countdown timer function
    function startCountdown(minutes) {
        let timeRemaining = minutes * 60; // Convert minutes to seconds
        countdownTimerElement.textContent = `${minutes}:00`; // Initial time display

        const countdownInterval = setInterval(() => {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            countdownTimerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (timeRemaining > 0) {
                timeRemaining--;
            } else {
                clearInterval(countdownInterval);
                alert("Time expired! Please start the payment process again.");
                closeModal();
            }
        }, 1000);

        // Store interval ID for clearing later
        countdownTimerElement.setAttribute('data-interval-id', countdownInterval);
    }

    // Clear countdown timer if modal is closed or payment is finished
    function clearCountdown() {
        const intervalId = countdownTimerElement.getAttribute('data-interval-id');
        if (intervalId) {
            clearInterval(intervalId);
            countdownTimerElement.removeAttribute('data-interval-id');
        }
    }

    // Simulate a real-time payment notification
    function simulatePaymentSuccess() {
        // This function mimics real-time behavior; replace with actual real-time logic as needed
        setTimeout(() => {
            alert("Payment Successful! Thank you for your payment.");
            closeModal();
            localStorage.removeItem('cartItems'); // Clear cart items
            window.location.href = '/menu/Menu.html'; // Redirect to menu or confirmation page
        }, 5000); // Simulated 5-second delay for payment success
    }
});
