document.addEventListener('DOMContentLoaded', function() {
    
    // On récupère le bouton et la sidebar
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');

    // Si le bouton existe (donc on est sur mobile ou le code est bien là)
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', function() {
            // On ajoute ou on enlève la classe "open"
            sidebar.classList.toggle('open');
        });
    }

    // Optionnel : Fermer le menu si on clique sur le contenu principal
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.addEventListener('click', function() {
            // Si le menu est ouvert, on le ferme
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }
});