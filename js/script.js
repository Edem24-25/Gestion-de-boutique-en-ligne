// Script vide - Les fonctionnalités sont gérées par Bootstrap
// Aucun JavaScript personnalisé requis
const API_URL = 'http://localhost:3000/api';

// Données de démonstration
const demoData = {
    orders: [
        { id: 2451, client: 'Jean Dupont', total: 259.99, status: 'pending', date: '26 fév 2026' },
        { id: 2450, client: 'Marie Martin', total: 189.50, status: 'confirmed', date: '25 fév 2026' },
        { id: 2449, client: 'Pierre Lefevre', total: 425.00, status: 'shipped', date: '24 fév 2026' }
    ],
    inventory: [
        { sku: 'LHP-001', name: 'Laptop HP 15', stock: 2, minStock: 5, price: 899.99 },
        { sku: 'MSL-002', name: 'Souris Logitech', stock: 45, minStock: 10, price: 29.99 },
        { sku: 'KBM-003', name: 'Clavier Mécanique', stock: 8, minStock: 5, price: 149.99 }
    ]
};

// ================================
// DATE ET HEURE
// ================================

function initializeDateDisplay() {
    const updateDate = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('fr-FR', options);
        const elements = document.querySelectorAll('#currentDate');
        elements.forEach(el => {
            el.textContent = formattedDate;
        });
    };

    updateDate();
    setInterval(updateDate, 1000);
}

// ================================
// INITIALISATION DASHBOARD
// ================================

function initializeDashboard() {
    initializeDateDisplay();
    loadDashboardCharts();
    loadRecentOrders();
}

function loadDashboardCharts() {
    // Graphique des ventes par jour
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [{
                    label: 'Ventes (€)',
                    data: [1200, 1900, 1500, 2200, 2500, 1800, 2100],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '€';
                            }
                        }
                    }
                }
            }
        });
    }

    // Graphique de distribution des statuts
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['En attente', 'Confirmée', 'Expédiée', 'Livrée', 'Annulée'],
                datasets: [{
                    data: [12, 45, 38, 120, 10],
                    backgroundColor: [
                        '#ffc107',
                        '#17a2b8',
                        '#198754',
                        '#0dcaf0',
                        '#dc3545'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
}

function loadRecentOrders() {
    const ordersTable = document.getElementById('recentOrdersTable');
    if (ordersTable) {
        // Les données sont déjà dans le HTML
        console.log('Recent orders loaded');
    }
}

// ================================
// GESTION DES COMMANDES
// ================================

function filterOrders() {
    const status = document.getElementById('filterStatus')?.value || '';
    const period = document.getElementById('filterPeriod')?.value || '';
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';

    console.log('Filtres appliqués:', { status, period, search });
    showNotification('Filtres appliqués avec succès', 'success');
}

function resetFilters() {
    document.querySelectorAll('[id^="filter"]').forEach(el => {
        el.value = '';
    });
    document.getElementById('searchInput').value = '';
    showNotification('Filtres réinitialisés', 'info');
}

function viewOrder(orderId) {
    console.log('Affichage de la commande:', orderId);
    const order = demoData.orders.find(o => o.id === orderId);
    if (order) {
        document.getElementById('orderID').textContent = '#' + orderId;
        document.getElementById('orderClientName').textContent = order.client;
        document.getElementById('orderClientEmail').textContent = 'email@example.com';
        document.getElementById('orderClientAddress').textContent = '123 Rue de Paris, 75000';
        document.getElementById('orderStatus').textContent = translateStatus(order.status);
        document.getElementById('orderDate').textContent = order.date;
        document.getElementById('orderTotal').textContent = order.total.toFixed(2) + ' €';
    }
}

function editOrder(orderId) {
    showNotification('Modification de la commande #' + orderId, 'info');
}

function deleteOrder(orderId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande?')) {
        showNotification('Commande #' + orderId + ' supprimée', 'success');
    }
}

function createOrder() {
    const client = document.getElementById('clientSelect')?.value;
    const product = document.getElementById('productSelect')?.value;
    const quantity = document.getElementById('quantity')?.value;

    if (!client || !product || !quantity) {
        showNotification('Veuillez remplir tous les champs', 'warning');
        return;
    }

    showNotification('Commande créée avec succès', 'success');
    
    // Réinitialiser le formulaire
    document.getElementById('newOrderForm').reset();
    
    // Fermer le modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('newOrderModal'));
    if (modal) modal.hide();
}

// ================================
// GESTION DE L'INVENTAIRE
// ================================

function filterInventory() {
    const category = document.getElementById('filterCategory')?.value || '';
    const stock = document.getElementById('filterStock')?.value || '';
    const search = document.getElementById('searchProduct')?.value.toLowerCase() || '';

    console.log('Filtres inventaire appliqués:', { category, stock, search });
    showNotification('Inventaire filtré', 'success');
}

function editProduct(sku) {
    showNotification('Édition du produit ' + sku, 'info');
}

function deleteProduct(sku) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
        showNotification('Produit ' + sku + ' supprimé', 'success');
    }
}

function adjustStock(sku) {
    const newQuantity = prompt('Nouvelle quantité:');
    if (newQuantity !== null) {
        showNotification('Stock du produit ' + sku + ' ajusté à ' + newQuantity, 'success');
    }
}

function addProduct() {
    const sku = document.getElementById('sku')?.value;
    const name = document.getElementById('productName')?.value;
    const category = document.getElementById('category')?.value;
    const price = document.getElementById('price')?.value;
    const quantity = document.getElementById('quantity')?.value;
    const minStock = document.getElementById('minStock')?.value;

    if (!sku || !name || !category || !price || !quantity || !minStock) {
        showNotification('Veuillez remplir tous les champs', 'warning');
        return;
    }

    showNotification('Produit ' + name + ' ajouté avec succès', 'success');
    document.getElementById('addProductForm').reset();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
    if (modal) modal.hide();
}

// ================================
// GESTION DES CLIENTS
// ================================

function filterClients() {
    const status = document.getElementById('filterStatus')?.value || '';
    const region = document.getElementById('filterRegion')?.value || '';
    const search = document.getElementById('searchClient')?.value.toLowerCase() || '';

    console.log('Filtres clients appliqués:', { status, region, search });
    showNotification('Clients filtrés', 'success');
}

function viewClient(clientId) {
    console.log('Affichage du client:', clientId);
    document.getElementById('clientName').textContent = 'Jean Dupont';
    document.getElementById('clientEmail').textContent = 'jean.dupont@email.com';
    document.getElementById('clientPhone').textContent = '+33 6 12 34 56 78';
    document.getElementById('clientAddress').textContent = '123 Rue de Paris, 75000 Paris';
}

function editClient(clientId) {
    showNotification('Édition du client #' + clientId, 'info');
}

function deleteClient(clientId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client?')) {
        showNotification('Client supprimé', 'success');
    }
}

function addClient() {
    const name = document.getElementById('clientNewName')?.value;
    const email = document.getElementById('clientNewEmail')?.value;
    const phone = document.getElementById('clientNewPhone')?.value;
    const address = document.getElementById('clientNewAddress')?.value;

    if (!name || !email || !phone || !address) {
        showNotification('Veuillez remplir tous les champs', 'warning');
        return;
    }

    showNotification('Client ' + name + ' ajouté avec succès', 'success');
    document.getElementById('addClientForm').reset();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addClientModal'));
    if (modal) modal.hide();
}

// ================================
// RAPPORTS
// ================================

function changeReport() {
    const reportType = document.getElementById('reportType')?.value || 'sales';
    
    // Masquer tous les rapports
    document.getElementById('salesReport').style.display = 'none';
    document.getElementById('inventoryReport').style.display = 'none';
    document.getElementById('logisticsReport').style.display = 'none';

    // Afficher le rapport sélectionné
    if (reportType === 'sales') {
        document.getElementById('salesReport').style.display = 'block';
    } else if (reportType === 'inventory') {
        document.getElementById('inventoryReport').style.display = 'block';
    } else if (reportType === 'logistics') {
        document.getElementById('logisticsReport').style.display = 'block';
    }
}

function generateReport() {
    const type = document.getElementById('reportType')?.value || 'sales';
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;

    if (!startDate || !endDate) {
        showNotification('Veuillez sélectionner une période', 'warning');
        return;
    }

    showNotification('Rapport ' + type + ' généré avec succès', 'success');
}

// ================================
// PARAMÈTRES
// ================================

function saveSettings(tab) {
    showNotification('Paramètres de ' + tab + ' enregistrés', 'success');
}

function changePassword() {
    const oldPassword = document.getElementById('oldPassword')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;

    if (!oldPassword || !newPassword || !confirmPassword) {
        showNotification('Veuillez remplir tous les champs', 'warning');
        return;
    }

    if (newPassword !== confirmPassword) {
        showNotification('Les mots de passe ne correspondent pas', 'danger');
        return;
    }

    showNotification('Mot de passe changé avec succès', 'success');
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function addCategory() {
    const categoryName = document.getElementById('newCategory')?.value;
    if (!categoryName) {
        showNotification('Veuillez entrer un nom de catégorie', 'warning');
        return;
    }

    showNotification('Catégorie "' + categoryName + '" ajoutée', 'success');
    document.getElementById('newCategory').value = '';
}

function addCarrier() {
    showNotification('Ajout d\'un nouveau transporteur', 'info');
}

function addUser() {
    const name = document.getElementById('userName')?.value;
    const email = document.getElementById('userEmail')?.value;
    const role = document.getElementById('userRole')?.value;

    if (!name || !email || !role) {
        showNotification('Veuillez remplir tous les champs', 'warning');
        return;
    }

    showNotification('Utilisateur ' + name + ' ajouté', 'success');
    document.getElementById('addUserForm').reset();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    if (modal) modal.hide();
}

function logoutAllSessions() {
    if (confirm('Êtes-vous sûr de vouloir déconnecter toutes les autres sessions?')) {
        showNotification('Toutes les autres sessions ont été fermées', 'success');
    }
}

// ================================
// UTILITAIRES
// ================================

function translateStatus(status) {
    const translations = {
        'pending': 'En attente',
        'confirmed': 'Confirmée',
        'shipped': 'Expédiée',
        'delivered': 'Livrée',
        'cancelled': 'Annulée'
    };
    return translations[status] || status;
}

function logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
        showNotification('Déconnexion en cours...', 'info');
        // Redirection après 1 seconde
        setTimeout(() => {
            // window.location.href = 'login.html';
            showNotification('Déconnexion réussie', 'success');
        }, 1000);
    }
}

function showNotification(message, type = 'info') {
    // Créer un élément de notification
    const notification = document.createElement('div');
    const bgClass = {
        'success': 'bg-success',
        'danger': 'bg-danger',
        'warning': 'bg-warning',
        'info': 'bg-info'
    }[type] || 'bg-info';

    notification.className = `alert alert-${type === 'danger' ? 'danger' : type} fixed-top mx-2 mt-2`;
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '500px';
    notification.style.animation = 'slideIn 0.3s ease-out';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function exportToCSV(data, filename = 'export.csv') {
    const csv = convertToCSV(data);
    downloadCSV(csv, filename);
}

function convertToCSV(data) {
    if (!Array.isArray(data) || data.length === 0) return '';

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
        Object.values(obj).join(',')
    );

    return [headers, ...rows].join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
}

// ================================
// INITIALISATION DU DOCUMENT
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la date
    initializeDateDisplay();

    // Initialiser le dashboard si on est sur la page d'accueil
    if (document.getElementById('salesChart') || document.getElementById('recentOrdersTable')) {
        initializeDashboard();
    }

    // Initialiser le rapport si on est sur la page des rapports
    if (document.getElementById('reportType')) {
        changeReport();
    }

    // Ajouter les événements
    setupEventListeners();
});

function setupEventListeners() {
    // Événements des formulaires
    const newOrderForm = document.getElementById('newOrderForm');
    if (newOrderForm) {
        newOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createOrder();
        });
    }

    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addProduct();
        });
    }

    const addClientForm = document.getElementById('addClientForm');
    if (addClientForm) {
        addClientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addClient();
        });
    }

    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addUser();
        });
    }
}

// ================================
// EXPORT DES FONCTIONS
// ================================

// Rendre les fonctions accessibles globalement
window.filterOrders = filterOrders;
window.resetFilters = resetFilters;
window.viewOrder = viewOrder;
window.editOrder = editOrder;
window.deleteOrder = deleteOrder;
window.createOrder = createOrder;
window.filterInventory = filterInventory;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.adjustStock = adjustStock;
window.addProduct = addProduct;
window.filterClients = filterClients;
window.viewClient = viewClient;
window.editClient = editClient;
window.deleteClient = deleteClient;
window.addClient = addClient;
window.changeReport = changeReport;
window.generateReport = generateReport;
window.saveSettings = saveSettings;
window.changePassword = changePassword;
window.addCategory = addCategory;
window.addCarrier = addCarrier;
window.addUser = addUser;
window.logoutAllSessions = logoutAllSessions;
window.logout = logout;
window.showNotification = showNotification;
