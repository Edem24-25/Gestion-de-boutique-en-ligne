# Système de Gestion Logistique - Boutique en Ligne

Un système complet et moderne de gestion logistique pour boutique en ligne, développé avec HTML5, CSS3 et Bootstrap 5.

## 🎯 Fonctionnalités

### 1. **Tableau de Bord** (`index.html`)
- Vue d'ensemble des métriques principales
- Affichage des commandes récentes
- Indicateurs de stocks faibles
- Graphiques de ventes et distribution des statuts

### 2. **Gestion des Commandes** (`orders.html`)
- Liste complète de toutes les commandes
- Filtrage par statut, période et recherche
- Création de nouvelles commandes
- Affichage détaillé des commandes
- Gestion (édition, suppression)

### 3. **Gestion de l'Inventaire** (`inventory.html`)
- Vue d'ensemble des stocks
- Filtrage par catégorie et état du stock
- Recherche de produits
- Ajout de nouveaux produits
- Ajustement des quantités

### 4. **Gestion des Clients** (`customers.html`)
- Base de données clients complète
- Filtrage par statut et région
- Affichage des profils clients
- Historique des commandes
- Ajout de nouveaux clients

### 5. **Rapports** (`reports.html`)
- Rapports de ventes avec statistiques
- Analyse d'inventaire
- Rapports logistiques
- Sélection de périodes personnalisées
- Graphiques interactifs

### 6. **Paramètres** (`settings.html`)
- Paramètres généraux de l'entreprise
- Configuration de la boutique
- Gestion des transporteurs
- Gestion des utilisateurs
- Paramètres de sécurité

## 📁 Structure du Projet

```
Gestion_de_boutique_en_ligne/
├── index.html              # Tableau de bord
├── orders.html             # Gestion des commandes
├── inventory.html          # Gestion de l'inventaire
├── customers.html          # Gestion des clients
├── reports.html            # Rapports
├── settings.html           # Paramètres
├── css/
│   └── style.css           # Feuille de styles personnalisée
├── js/
│   └── script.js           # Logique JavaScript
└── README.md               # Ce fichier
```

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS
- **Bootstrap 5.3** : Framework CSS responsive
- **Bootstrap Icons** : Icônes vectorielles
- **Chart.js 4.4** : Graphiques interactifs
- **JavaScript ES6+** : Logique et interactivité

## 🚀 Démarrage Rapide

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un serveur web local (optionnel, mais recommandé pour les tests)

### Installation

1. **Télécharger les fichiers** dans votre répertoire de projet
2. **Ouvrir index.html** dans votre navigateur
   - Directement : `file:///chemin/du/projet/index.html`
   - Ou avec un serveur local : `http://localhost/projet/index.html`

### Utilisation

#### Navigation
- Utilisez la **sidebar** pour naviguer entre les différentes sections
- La **barre supérieure** affiche la date actuelle
- Les **boutons** créent/modifient/suppriment les données

#### Tableau de Bord
1. Cliquez sur le logo pour revenir à l'accueil
2. Consultez les métriques clés
3. Visualisez les commandes récentes et stocks faibles

#### Gestion des Commandes
1. Cliquez sur "Nouvelle Commande" pour ajouter une commande
2. Utilisez les filtres pour rechercher des commandes
3. Cliquez sur "Voir" pour afficher les détails

#### Gestion de l'Inventaire
1. Consultez la liste des produits
2. Cliquez sur "Ajouter Produit" pour un nouveau produit
3. Utilisez "Ajuster Stock" pour modifier les quantités

#### Gestion des Clients
1. Visualisez tous les clients
2. Cliquez sur "Ajouter Client" pour un nouveau client
3. Cliquez sur "Voir" pour l'historique des commandes

#### Rapports
1. Sélectionnez le type de rapport
2. Choisissez une période
3. Cliquez sur "Générer" pour les statistiques

#### Paramètres
1. Configurez les infos de l'entreprise (Général)
2. Gérez les catégories (Boutique)
3. Configurez les transporteurs (Logistique)
4. Gérez les utilisateurs
5. Mettez à jour la sécurité

## 📊 Données Démo

Le système inclut des données de démonstration :
- **5 commandes** d'exemple
- **6 produits** en inventaire
- **5 clients** avec historique
- **Graphiques** avec données réalistes

Toutes les données sont stockées en mémoire (localStorage peut être ajouté).

## 🎨 Personnalisation

### Changer les Couleurs
Modifiez les variables CSS dans `css/style.css` :

```css
:root {
    --primary-color: #0d6efd;    /* Bleu principal */
    --secondary-color: #6c757d;  /* Gris secondaire */
    --success-color: #198754;    /* Vert succès */
    /* ... etc ... */
}
```

### Ajouter des Icônes
Les icônes proviennent de Bootstrap Icons. Trouvez d'autres icônes sur :
https://icons.getbootstrap.com/

### Modifier le Contenu
Tous les fichiers HTML sont bien commentés et faciles à modifier.

## 🔒 Sécurité

Recommandations pour la production :
1. Implémenter une **authentification** réelle
2. Ajouter une **validation** serveur
3. Utiliser **HTTPS**
4. Stocker les données en **base de données**
5. Implémenter des **permissions** d'accès
6. Ajouter une **protection CSRF**

## 📱 Responsivité

L'application est **100% responsive** :
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## ⚙️ Configuration Avancée

### Ajouter une Nouvelle Page

1. Créez un nouveau fichier HTML
2. Copiez la structure de navigation
3. Ajoutez le lien dans la sidebar
4. Créez les fonctionnalités en JavaScript

### Intégrer une Base de Données

1. Créez une API backend (Node.js, PHP, Python, etc.)
2. Modifiez `js/script.js` pour appeler les endpoints API
3. Implémentez les opérations CRUD

Exemple :
```javascript
const API_URL = 'http://localhost:3000/api';

async function getOrders() {
    const response = await fetch(`${API_URL}/orders`);
    return await response.json();
}
```

### Ajouter Dark Mode

Le CSS inclut déjà un support de dark mode optimisé via media query :
```css
@media (prefers-color-scheme: dark) {
    /* styles dark mode */
}
```

## 🐛 Dépannage

### Les icônes ne s'affichent pas
- Vérifiez que Bootstrap Icons CDN est accessible
- Vérifiez la connexion internet

### Les graphiques ne s'affichent pas
- Vérifiez que Chart.js CDN est chargé
- Vérifiez qu'il y a un élément canvas avec l'ID correct

### Les modales ne s'ouvrent pas
- Vérifiez que Bootstrap JS est chargé
- Vérifiez les IDs des modales

### Les données ne se sauvegardent pas
- Les données de démo sont en mémoire (session)
- Pour la persistance, utilisez localStorage ou une API

## 📈 Améliorations Futures

- [ ] Authentification utilisateur
- [ ] Stockage persistant (localStorage/API)
- [ ] Export PDF/Excel
- [ ] Notifications temps réel
- [ ] Dashboard personnalisable
- [ ] Système de droits d'accès
- [ ] Audit logs
- [ ] Multi-langue
- [ ] Mode hors ligne
- [ ] Intégration paiement

## 📝 License

Ce projet est gratuit et peut être utilisé librement.

## 👤 Support

Pour toute question ou problème, consultez la documentation du code ou modifiez directement les fichiers.

---

**Créé avec ❤️ pour les boutiques en ligne**

Version: 1.0.0  
Dernière mise à jour: 26 février 2026
