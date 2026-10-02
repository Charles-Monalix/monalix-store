const storeConfig = {
  name: "MONALIX",

  activities: {
    commerce: {
      name: "Commerce",
      description: "Boutique, magasin et supermarché",

      productLabel: "Produit",
      productLabelPlural: "Produits",

      menu: [
        {
          id: "dashboard",
          label: "Tableau de bord",
          icon: "LayoutDashboard",
          color: "blue",
        },
        {
          id: "sales",
          label: "Caisse / Ventes",
          icon: "ShoppingCart",
          color: "green",
        },
        {
          id: "products",
          label: "Produits",
          icon: "Package",
          color: "purple",
        },
        {
          id: "supplies",
          label: "Approvisionnements",
          icon: "Truck",
          color: "orange",
        },
        {
          id: "clients",
          label: "Clients",
          icon: "Users",
          color: "cyan",
        },
        {
          id: "reports",
          label: "Rapports",
          icon: "BarChart3",
          color: "red",
        },
        {
          id: "invoices",
          label: "Factures",
          icon: "FileText",
          color: "blue",
        },
      ],

      productFields: [
        "name",
        "category",
        "barcode",
        "priceUSD",
        "priceFC",
        "stock",
        "minimumStock",
      ],
    },

    restaurant: {
      name: "Restaurant",
      description: "Restaurant, café et restauration",

      productLabel: "Plat",
      productLabelPlural: "Plats",

      menu: [
        {
          id: "dashboard",
          label: "Tableau de bord",
          icon: "LayoutDashboard",
          color: "blue",
        },
        {
          id: "sales",
          label: "Commandes / Caisse",
          icon: "ShoppingCart",
          color: "green",
        },
        {
          id: "products",
          label: "Menu / Plats",
          icon: "Utensils",
          color: "purple",
        },
        {
          id: "tables",
          label: "Tables",
          icon: "Store",
          color: "orange",
        },
        {
          id: "kitchen",
          label: "Cuisine",
          icon: "Utensils",
          color: "red",
        },
        {
          id: "supplies",
          label: "Approvisionnements",
          icon: "Truck",
          color: "orange",
        },
        {
          id: "clients",
          label: "Clients",
          icon: "Users",
          color: "cyan",
        },
        {
          id: "reports",
          label: "Rapports",
          icon: "BarChart3",
          color: "red",
        },
        {
          id: "invoices",
          label: "Factures",
          icon: "FileText",
          color: "blue",
        },
      ],

      productFields: [
        "name",
        "category",
        "priceUSD",
        "priceFC",
        "ingredients",
        "stock",
        "available",
      ],
    },

    habillement: {
      name: "Habillement",
      description: "Mode, vêtements et accessoires",

      productLabel: "Article",
      productLabelPlural: "Articles",

      menu: [
        {
          id: "dashboard",
          label: "Tableau de bord",
          icon: "LayoutDashboard",
          color: "blue",
        },
        {
          id: "sales",
          label: "Caisse / Ventes",
          icon: "ShoppingCart",
          color: "green",
        },
        {
          id: "products",
          label: "Articles",
          icon: "Shirt",
          color: "purple",
        },
        {
          id: "stock",
          label: "Stocks",
          icon: "Package",
          color: "orange",
        },
        {
          id: "supplies",
          label: "Approvisionnements",
          icon: "Truck",
          color: "red",
        },
        {
          id: "clients",
          label: "Clients",
          icon: "Users",
          color: "cyan",
        },
        {
          id: "promotions",
          label: "Promotions",
          icon: "BarChart3",
          color: "pink",
        },
        {
          id: "invoices",
          label: "Factures",
          icon: "FileText",
          color: "blue",
        },
        {
          id: "reports",
          label: "Rapports",
          icon: "BarChart3",
          color: "red",
        },
      ],

      productFields: [
        "name",
        "category",
        "brand",
        "size",
        "color",
        "barcode",
        "priceUSD",
        "priceFC",
        "stock",
        "minimumStock",
      ],
    },
  },
};

export default storeConfig;