const hamburgerBtn = document.getElementById('hamburgerBtn');
const desktopMenu = document.getElementById('desktopMenu');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const closeMenuBtn = document.getElementById('closeMenuBtn');

// Funzione per controllare se siamo su mobile
function isMobile() {
    return window.innerWidth <= 1024;
}

// Funzione per aprire/chiudere il menu
function toggleMenu() {
    if (isMobile()) {
        // Comportamento mobile - sidebar
        const isOpen = mobileMenu.classList.contains('active');

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    } else {
        // Comportamento desktop - espansione verso il basso
        desktopMenu.classList.toggle('active');
    }
}

// Funzioni per il menu mobile
function openMobileMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
hamburgerBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

// CORREZIONE: Selettori corretti per i menu
// Menu mobile - usa nav_menu (con underscore)
const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav_menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMobile()) {
            closeMobileMenu();
        }
    });
});

// Menu desktop - usa nav-menu (con trattino)
const desktopMenuLinks = document.querySelectorAll('.desktop-menu .nav-menu a');
desktopMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!isMobile()) {
            desktopMenu.classList.remove('active');
        }
    });
});

// Gestisci il ridimensionamento della finestra
window.addEventListener('resize', () => {
    desktopMenu.classList.remove('active');
    closeMobileMenu();
});

// Chiudi menu desktop quando si clicca fuori
document.addEventListener('click', (e) => {
    if (!isMobile() &&
        !hamburgerBtn.contains(e.target) &&
        !desktopMenu.contains(e.target)) {
        desktopMenu.classList.remove('active');
    }
});