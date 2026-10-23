import { state } from "./state.js";


// Relations : retrouver une entité grâce à son id (find)
export const getCustomer = (customerId) =>
    state.customers.find(customer => customer.id === customerId);

export const getProduct = (productId) =>
    state.products.find(product => product.id === productId);

// Calcul

// Montant d'une ligne = prix du produit x quantité
export const getLineTotal = (item) => {
    const product = getProduct(item.productId);
    return product ? product.price * item.quantity : 0;
};

// Montant total d'une commande 
export const getOrderTotal = (order) => {
    let total = 0;
    order.items.forEach(item => {
        total += getLineTotal(item);
    });

    return total;
};

// Montant cumulé d'une liste de commandes 
export const getTotalAmount = (orders) => {
    let total = 0;
    orders.forEach(order => {
        total += getOrderTotal(order);
    });

    return total;
};

// Catégories sans doublon 
export const getCategories = () => {
    const categories = [];
    state.products.forEach(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    return categories;
};


// Une commande contient-elle un produit de cette catégorie ?
// commande -> items -> productId -> produit -> catégorie
const orderHasCategory = (order, category) =>
    order.items.some(item => {
        const product = getProduct(item.productId);
        return product && product.category === category;
    });


// Filtrage : recherche + statut + catégorie, en même temps
export const getVisibleOrders = () => {
    return state.orders.filter(order => {
        const customer = getCustomer(order.customerId);
        const customerName = customer ? customer.name.toLowerCase() : "";
        const matchesSearch =
            customerName.includes(state.search.toLowerCase());
        const matchesStatus =
            state.status === "all"
            ||
            order.status === state.status;
        const matchesCategory =
            state.category === "all"
            ||
            orderHasCategory(order, state.category);

        return matchesSearch && matchesStatus && matchesCategory;
    });
}

// Une ligne du tableau par commande
export const getOrderRows = (orders) =>
    orders.map(order => {
        const customer = getCustomer(order.customerId);

        return {
            id: order.id,
            customerName: customer ? customer.name : "Client inconnu",
            date: order.date,
            status: order.status,
            total: getOrderTotal(order)
        };
    });

// Le détail complet d'une commande 
export const getOrderDetails = (orderId) => {
    const order = state.orders.find(order => order.id === orderId);
    if (!order) return null;
    const customer = getCustomer(order.customerId);
    const lines = order.items.map(item => {
        const product = getProduct(item.productId);

        return {
            name: product ? product.name : "Produit inconnu",
            price: product ? product.price : 0,
            quantity: item.quantity,
            total: getLineTotal(item)
        };
    });

    return {
        id: order.id,
        customerName: customer ? customer.name : "Client inconnu",
        city: customer ? customer.city : "-",
        date: order.date,
        status: order.status,
        lines,
        total: getOrderTotal(order)
    };
};

// Indicateurs
export const getStats = () => ({
    customers: state.customers.length,
    products: state.products.length,
    orders: state.orders.length,
    amount: getTotalAmount(state.orders)
});