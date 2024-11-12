function toggleMenu() {
    document.querySelector('.navbar-container').classList.toggle('active');
}

document.getElementById('menu-icon').addEventListener('click', toggleMenu);
