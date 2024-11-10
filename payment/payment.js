// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if a payment method is selected
        const selectedMethodElement = document.querySelector('input[name="payment-method"]:checked');
        if (selectedMethodElement) {
            const selectedMethod = selectedMethodElement.value;

            // Show an initial confirmation alert
            const confirmed = confirm(`You selected ${selectedMethod}. Do you confirm your payment?`);

            if (confirmed) {
                alert("Thank you! Your payment has been completed.");

                // Clear the cart in localStorage (or sessionStorage)
                localStorage.removeItem('cartItems');

                // Redirect to the main menu or homepage after successful payment
                window.location.href = '/menu/Menu.html'; // Ensure this path is correct
            }
        } else {
            // Show an alert if no payment method is selected
            alert('Please select a payment method before proceeding.');
        }
    });
});
