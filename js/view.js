// Éléments HTML
const totalCustomers = document.querySelector("#totalCustomers");
const totalProducts = document.querySelector("#totalProducts");
const totalOrders = document.querySelector("#totalOrders");
const totalAmount = document.querySelector("#totalAmount");

const categoryFilter = document.querySelector("#categoryFilter");
const btnAll = document.querySelector("#btnAll");
const statusButtons = document.querySelectorAll(".status-btn");

const resultCount = document.querySelector("#resultCount");
const ordersTableBody = document.querySelector("#ordersTableBody");

const modalTitle = document.querySelector("#modalTitle");
const modalCustomer = document.querySelector("#modalCustomer");
const modalCity = document.querySelector("#modalCity");
const modalDate = document.querySelector("#modalDate");
const modalStatus = document.querySelector("#modalStatus");
const modalItems = document.querySelector("#modalItems");
const modalTotal = document.querySelector("#modalTotal");

const orderModal = new bootstrap.Modal(document.querySelector("#orderModal"));


// Outils d'affichage
const formatMAD = (amount) => `${amount.toLocaleString("fr-FR")} MAD`;

const statusLabels = {
    "Livree": "Livrée",
    "En attente": "En attente",
    "Annulee": "Annulée"
};

const getStatusClass = (status) => {
    if (status === "Livree") return "status-delivered";
    if (status === "En attente") return "status-pending";
    return "status-cancelled";
};

const statusBadge = (status) => `
    <span class="status ${getStatusClass(status)}">${statusLabels[status]}</span>
`;


// Indicateurs

export const renderStats = (stats) => {
    totalCustomers.textContent = stats.customers;
    totalProducts.textContent = stats.products;
    totalOrders.textContent = stats.orders;
    totalAmount.textContent = formatMAD(stats.amount);
};


// Liste déroulante des catégories 
export const renderCategories = (categories) => {
    const options = categories
        .map(category => `<option value="${category}">${category}</option>`)
        .join("");

    categoryFilter.innerHTML =
        `<option value="all">Toutes les catégories</option>${options}`;
};


// Bouton de statut actif

export const renderActiveStatus = (status) => {
    btnAll.classList.toggle("active", status === "all");
    statusButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.status === status);
    });
};


// Tableau des commandes    
const createOrderRow = (row) => `
    <tr>
        <td>#${row.id}</td>
        <td>${row.customerName}</td>
        <td>${row.date}</td>
        <td>${statusBadge(row.status)}</td>
        <td class="text-end">${formatMAD(row.total)}</td>
        <td class="text-end">
            <button class="btn btn-sm btn-outline-dark details-btn" data-id="${row.id}">
                Détails
            </button>
        </td>
    </tr>
`;

export const renderOrders = (rows) => {
    resultCount.textContent = `${rows.length} commande(s) affichée(s)`;
    if (rows.length === 0) {
        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    Aucune commande trouvée.
                </td>
            </tr>
        `;
        return;
    }
    ordersTableBody.innerHTML = rows.map(createOrderRow).join("");
};


// Modal : détail d'une commande 
const createLineRow = (line) => `
    <tr>
        <td>${line.name}</td>
        <td class="text-end">${formatMAD(line.price)}</td>
        <td class="text-end">${line.quantity}</td>
        <td class="text-end">${formatMAD(line.total)}</td>
    </tr>
`;

export const openOrderModal = (details) => {

    modalTitle.textContent = `Commande #${details.id}`;
    modalCustomer.textContent = details.customerName;
    modalCity.textContent = details.city;
    modalDate.textContent = details.date;
    modalStatus.innerHTML = statusBadge(details.status);
    modalItems.innerHTML = details.lines.map(createLineRow).join("");
    modalTotal.textContent = formatMAD(details.total);

    orderModal.show();
};