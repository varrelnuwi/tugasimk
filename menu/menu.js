// Ambil setiap tombol berdasarkan urutannya
document.querySelectorAll('.filter-buttons button').forEach((button, index) => {
    button.addEventListener('click', () => {
        // Tentukan URL berdasarkan tombol yang diklik
        switch(index) {
            case 0:
                window.location.href = 'Menu.html'; // Menuju halaman Pizza
                break;
            case 1:
                window.location.href = 'Drink.html'; // Menuju halaman Drink
                break;
            case 2:
                window.location.href = 'Lasagna.html'; // Menuju halaman Lasagna
                break;
            case 3:
                window.location.href = 'Dessert.html'; // Menuju halaman Dessert
                break;
        }
    });
});
