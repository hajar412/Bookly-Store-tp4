// 1. Imports
import { state } from "./state.js";
import { fetchCustomers, fetchProducts, fetchOrders } from "./dataService.js";
import {
    getCategories,
    getVisibleOrders,
    getOrderRows,
    getOrderDetails,
    getStats
} from "./selectors.js";
import {
    renderStats,
    renderCategories,
    renderActiveStatus,
    renderOrders,
    openOrderModal
} from "./view.js";


// 2. Éléments HTML utilisés pour les événements
const searchInput = document.querySelector("#searchInput");
const btnAll = document.querySelector("#btnAll");
const statusButtons = document.querySelectorAll(".status-btn");
const categoryFilter = document.querySelector("#categoryFilter");
const ordersTableBody = document.querySelector("#ordersTableBody");
const errorMessage = document.querySelector("#errorMessage");


// 3. Rendu : lit le state et met la page à jour
const render = () => {
    renderStats(getStats());
    renderActiveStatus(state.status);
    renderOrders(getOrderRows(getVisibleOrders()));
};

// 4. Événements : modifier le state, puis render()

// Recherche par nom du client
searchInput.addEventListener("input", event => {

    state.search = event.target.value.trim();

    render();
});

// Bouton "Toutes"
btnAll.addEventListener("click", () => {

    state.status = "all";

    render();
});

// Boutons de statut (forEach)
statusButtons.forEach(button => {

    button.addEventListener("click", () => {

        state.status = button.dataset.status;

        render();
    });
});

// Liste déroulante des catégories
categoryFilter.addEventListener("change", event => {

    state.category = event.target.value;

    render();
});

// Bouton "Détails" (délégation d'événements)
ordersTableBody.addEventListener("click", event => {

    // 1. Quel bouton a été cliqué ?
    const button = event.target.closest(".details-btn");

    if (!button) {
        return;
    }

    // 2. Récupérer l'identifiant (data-id est du texte)
    const orderId = Number(button.dataset.id);

    // 3. Retrouver et préparer la commande (find dans selectors.js)
    const details = getOrderDetails(orderId);

    // 4. Afficher son détail dans le modal
    if (details) {
        openOrderModal(details);
    }
});


// 5. Initialisation : charger, puis premier rendu
const init = async () => {

    try {
        // Chargement des trois sources dans le state
        state.customers = await fetchCustomers();
        state.products = await fetchProducts();
        state.orders = await fetchOrders();

        // Liste déroulante remplie avec les catégories des produits
        renderCategories(getCategories());

        // Premier rendu, seulement après le chargement
        render();

    } catch (error) {

        console.error(error);

        errorMessage.classList.remove("d-none");
    }
};

init();