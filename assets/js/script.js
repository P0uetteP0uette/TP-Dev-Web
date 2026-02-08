/* ===============================================================
   1. GESTION DU MENU MOBILE (Déjà existant)
   =============================================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // On cible les éléments
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    // Si les éléments existent sur la page (sécurité)
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            // On ajoute/enlève la classe 'open' définie dans le CSS
            sidebar.classList.toggle('open');
        });

        // Fermer le menu si on clique en dehors (optionnel mais sympa)
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !menuBtn.contains(event.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }

    /* ===============================================================
       2. SYSTÈME DE NOTIFICATIONS (Toast)
       =============================================================== */
    // Fonction réutilisable pour afficher un message
    window.showNotification = function(message, type = 'success') {
        // Création de la div
        const notification = document.createElement('div');
        notification.className = `notification ${type}`; // ex: notification success
        notification.innerText = message;

        // Style rapide via JS (ou mieux : mettre dans le CSS)
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '9999',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            opacity: '0',
            transition: 'opacity 0.5s ease',
            backgroundColor: type === 'success' ? '#22c55e' : '#ef4444' // Vert ou Rouge
        });

        // Ajout au corps de la page
        document.body.appendChild(notification);

        // Animation d'apparition
        setTimeout(() => { notification.style.opacity = '1'; }, 10);

        // Disparition automatique après 3 secondes
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => { notification.remove(); }, 500); // Supprime du DOM
        }, 3000);
    };

    /* ===============================================================
       3. FILTRES DES TICKETS (Page tickets.html)
       =============================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const ticketRows = document.querySelectorAll('tbody tr'); // Toutes les lignes du tableau

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Gérer la classe active sur les boutons (visuel)
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // 2. Récupérer le filtre cliqué (ex: 'all', 'facturable', 'inclus')
                const filterValue = button.getAttribute('data-filter');

                // 3. Boucler sur chaque ligne du tableau
                ticketRows.forEach(row => {
                    // On récupère le type du ticket via un attribut data-type (à ajouter dans le HTML)
                    const rowType = row.getAttribute('data-type');

                    if (filterValue === 'all' || rowType === filterValue) {
                        row.style.display = ''; // Affiche la ligne (valeur par défaut)
                    } else {
                        row.style.display = 'none'; // Cache la ligne
                    }
                });
            });
        });
    }

    /* ===============================================================
       4. VALIDATION FORMULAIRE (Page ticket-create.html)
       =============================================================== */
    const ticketForm = document.getElementById('createTicketForm');

    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault(); // EMPÊCHE le rechargement de la page (très important)

            let isValid = true;
            
            // Récupération des champs
            const titleInput = document.getElementById('title');
            const projectSelect = document.getElementById('project');
            const descriptionInput = document.getElementById('description');

            // --- Règle 1 : Le titre doit faire au moins 5 caractères
            if (titleInput.value.trim().length < 5) {
                showNotification("Le sujet est trop court (min 5 caractères)", "error");
                titleInput.style.borderColor = "red";
                isValid = false;
            } else {
                titleInput.style.borderColor = "#ccc"; // Remet en gris si c'est bon
            }

            // --- Règle 2 : Un projet doit être sélectionné
            if (projectSelect.value === "") {
                if(isValid) showNotification("Veuillez sélectionner un projet", "error"); // Affiche l'erreur seulement si la précédente n'a pas déjà affiché
                projectSelect.style.borderColor = "red";
                isValid = false;
            } else {
                projectSelect.style.borderColor = "#ccc";
            }

            // --- Si tout est bon
            if (isValid) {
                showNotification("Ticket créé avec succès !", "success");
                ticketForm.reset(); // Vide le formulaire
                
                // Simulation d'une redirection après 1.5 secondes
                setTimeout(() => {
                    window.location.href = 'tickets.html';
                }, 1500);
            }
        });
    }

});