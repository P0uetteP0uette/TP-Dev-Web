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

    /* --- AUTO-REMPLISSAGE DES DATA-LABEL (Pour le responsive) --- */
    
    // 1. On récupère tous les tableaux de la page
    const tables = document.querySelectorAll('table');

    tables.forEach(table => {
        // 2. On récupère les titres (th)
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());

        // 3. On récupère toutes les lignes du corps (tbody tr)
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            // 4. On récupère les cellules de la ligne
            const cells = row.querySelectorAll('td');

            cells.forEach((cell, index) => {
                // 5. Si on a un titre correspondant à cet index, on l'ajoute
                if (headers[index]) {
                    cell.setAttribute('data-label', headers[index]);
                }
            });
        });
    });

    console.log("Les tableaux sont prêts pour le mobile ! 📱");

});