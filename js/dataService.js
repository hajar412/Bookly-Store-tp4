const loadJSON = async (path) => {

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Impossible de charger ${path}`);
    }

    return await response.json();
};

export const fetchCustomers = () => loadJSON("data/customers.json");
export const fetchProducts = () => loadJSON("data/products.json");
export const fetchOrders = () => loadJSON("data/orders.json");