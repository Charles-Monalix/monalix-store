import React, { useMemo, useState, useEffect, useRef } from "react";

import {
  LayoutDashboard,
  ShoppingCart,
  Store,
  UtensilsCrossed,
  Shirt,
  Package,
  Warehouse,
  Truck,
  BarChart3,
  Settings,
  Search,
  ScanLine,
  Plus,
  Minus,
  Trash2,
  DollarSign,
  Banknote,
  CreditCard,
  Smartphone,
  RefreshCw,
  Lock,
  ArrowLeft,
  ArrowUpRight,
  Wallet,
  CheckCircle2,
  CircleDollarSign,
  Building2,
  TrendingUp,
  CalendarDays,
  Eye,
  ShoppingBasket,
  ChevronDown,
  Users,
  Pencil,
  Receipt,
  Printer,
  Clock,
  CircleDot,
  X,
  CreditCard as PaymentIcon,
  User,
  Table2,
  Pill,
  Thermometer,
  Syringe,
  Droplets,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Coffee,
  CakeSlice,
  Beef,
  Pizza,
  ShoppingBag,
  Laptop,
  Monitor,
  Headphones,
  Footprints,
  Apple,
  Fish,
  Cookie,
  Milk,
  WashingMachine,
  KeyRound,
  MonitorSmartphone,
  Shield,
} from "lucide-react";

import { supabase } from "./lib/supabase";

import "./App.css";
/* =========================================================
   ACTIVITÉS
========================================================= */

const activities = [
  {
    id: "commerce",
    label: "Commerce",
    description: "Ventes, stocks et magasins",
    icon: Store,
    services: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        icon: LayoutDashboard,
      },
      {
        id: "caisse",
        label: "Caisse / Ventes",
        icon: ShoppingCart,
      },
      {
        id: "produits",
        label: "Articles & Produits",
        icon: Package,
      },
      {
        id: "stocks",
        label: "Gestion des stocks",
        icon: Warehouse,
      },
      {
        id: "approvisionnement",
        label: "Approvisionnement",
        icon: Truck,
      },
      {
        id: "rapports",
        label: "Rapports",
        icon: BarChart3,
      },
      {
        id: "parametres",
        label: "Administration",
        icon: Settings,
      },
    ],
  },

  {
    id: "restaurant",
    label: "Restaurant",
    description: "Tables, commandes et caisse",
    icon: UtensilsCrossed,
    services: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        icon: LayoutDashboard,
      },
      {
        id: "caisse",
        label: "Tables & Commandes",
        icon: UtensilsCrossed,
      },
      {
        id: "produits",
        label: "Menu & Produits",
        icon: Package,
      },
      {
        id: "stocks",
        label: "Stock Restaurant",
        icon: Warehouse,
      },
      {
        id: "rapports",
        label: "Rapports",
        icon: BarChart3,
      },
      {
        id: "parametres",
        label: "Administration",
        icon: Settings,
      },
    ],
  },

  {
    id: "habillement",
    label: "Habillement",
    description: "Articles, collections et ventes",
    icon: Shirt,
    services: [
      {
        id: "dashboard",
        label: "Tableau de bord",
        icon: LayoutDashboard,
      },
      {
        id: "caisse",
        label: "Caisse / Ventes",
        icon: ShoppingCart,
      },
      {
        id: "produits",
        label: "Articles",
        icon: Shirt,
      },
      {
        id: "stocks",
        label: "Gestion du stock",
        icon: Warehouse,
      },
      {
        id: "rapports",
        label: "Rapports",
        icon: BarChart3,
      },
      {
        id: "parametres",
        label: "Administration",
        icon: Settings,
      },
    ],
  },

  {
    id: "pharmacie",
    label: "Pharmacie",
    description: "Médicaments, produits de santé et ventes",
    icon: Pill,
    services: [
      { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
      { id: "caisse", label: "Caisse / Ventes", icon: ShoppingCart },
      { id: "produits", label: "Médicaments & Produits", icon: Pill },
      { id: "stocks", label: "Gestion des stocks", icon: Warehouse },
      { id: "rapports", label: "Rapports", icon: BarChart3 },
      { id: "parametres", label: "Administration", icon: Settings },
    ],
  },

  {
    id: "pressing",
    label: "Pressing",
    description: "Dépôt, suivi et retrait des vêtements",
    icon: WashingMachine,
    services: [
      { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
      { id: "caisse", label: "Caisse / Dépôt", icon: Receipt },
      { id: "pressing", label: "Commandes Pressing", icon: WashingMachine },
      { id: "rapports", label: "Rapports", icon: BarChart3 },
      { id: "parametres", label: "Administration", icon: Settings },
    ],
  },
];

/* =========================================================
   ÉTABLISSEMENTS
========================================================= */

const establishmentsByActivity = {
  commerce: [
    "Magasin Golf",
    "Magasin Centre-ville",
    "Magasin Likasi",
    "Magasin Kolwezi",
  ],

  restaurant: [
    "Restaurant Golf",
    "Restaurant Centre-ville",
    "Restaurant Likasi",
    "Restaurant Kolwezi",
  ],

  habillement: [
    "Boutique Golf",
    "Boutique Centre-ville",
    "Boutique Likasi",
    "Boutique Kolwezi",
  ],

  pharmacie: [
    "Pharmacie Golf",
    "Pharmacie Centre-ville",
    "Pharmacie Likasi",
    "Pharmacie Kolwezi",
  ],

  pressing: [
    "Pressing Golf",
    "Pressing Centre-ville",
    "Pressing Likasi",
    "Pressing Kolwezi",
  ],
};

/* =========================================================
   CAISSIERS
========================================================= */

const cashiers = [
  "Charles Monalix",
  "Jean Kumbo",
  "Stéphane Kitabu",
  "Sarah Kap",
  "Papy Mukaz",
];
/* =====================================================
   UTILISATEURS MONALIX
===================================================== */

const DEFAULT_PASSWORD_HASH =
  "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

const defaultMonalixUsers = [
  {
    id: "user-admin",
    username: "admin",
    name: "Administrateur",
    role: "admin",
    passwordHash: DEFAULT_PASSWORD_HASH,
    active: true,
    mustChangePassword: false,
    activities: ["commerce", "restaurant", "habillement", "pharmacie", "pressing"],
    branches: [],
  },
  {
    id: "user-caissier",
    username: "caissier",
    name: "Caissier",
    role: "caissier",
    passwordHash: DEFAULT_PASSWORD_HASH,
    active: true,
    mustChangePassword: false,
    activities: ["commerce", "restaurant", "habillement", "pharmacie", "pressing"],
    branches: [],
  },
];

/* =========================================================
   TABLES RESTAURANT
========================================================= */

const restaurantTables = [
  {
    id: "table-1",
    name: "Table 1",
    number: "01",
    seats: 4,
    zone: "Salle principale",
  },
  {
    id: "table-2",
    name: "Table 2",
    number: "02",
    seats: 4,
    zone: "Salle principale",
  },
  {
    id: "table-3",
    name: "Table 3",
    number: "03",
    seats: 6,
    zone: "Salle principale",
  },
  {
    id: "table-4",
    name: "Table 4",
    number: "04",
    seats: 4,
    zone: "Salle principale",
  },
  {
    id: "table-5",
    name: "Table 5",
    number: "05",
    seats: 2,
    zone: "Salle principale",
  },
  {
    id: "table-6",
    name: "Table 6",
    number: "06",
    seats: 4,
    zone: "Salle principale",
  },
  {
    id: "table-7",
    name: "Table 7",
    number: "07",
    seats: 6,
    zone: "Salle principale",
  },
  {
    id: "table-8",
    name: "Table 8",
    number: "08",
    seats: 4,
    zone: "Salle principale",
  },
  {
    id: "terrasse-1",
    name: "Terrasse 1",
    number: "T1",
    seats: 4,
    zone: "Terrasse",
  },
  {
    id: "terrasse-2",
    name: "Terrasse 2",
    number: "T2",
    seats: 6,
    zone: "Terrasse",
  },
];

/* =========================================================
   PRODUITS
   STRUCTURE PROFESSIONNELLE MONALIX
========================================================= */

const productsByActivity = {
  /* =======================================================
     COMMERCE
  ======================================================= */

  commerce: [
    {
      id: "c1",

      name: "Coca-Cola 50 cl",

      category: "Boissons",

      code: "5449000000996",

      /* PRIX */
      purchasePrice: 1.00,
      price: 1.50,

      /* STOCK */
      stock: 24,
      minStock: 5,

      /* UNITÉ */
      unit: "Pièce",

      /* ICÔNE */
      icon: "🥤",
    },

    {
      id: "c2",

      name: "Fanta Orange",

      category: "Boissons",

      code: "5449000011222",

      /* PRIX */
      purchasePrice: 1.00,
      price: 1.50,

      /* STOCK */
      stock: 18,
      minStock: 5,

      /* UNITÉ */
      unit: "Pièce",

      /* ICÔNE */
      icon: "🥤",
    },

    {
      id: "c3",

      name: "Eau minérale 1L",

      category: "Boissons",

      code: "6001000002455",

      /* PRIX */
      purchasePrice: 0.60,
      price: 1.00,

      /* STOCK */
      stock: 32,
      minStock: 5,

      /* UNITÉ */
      unit: "Pièce",

      /* ICÔNE */
      icon: "💧",
    },

    {
      id: "c4",

      name: "Jus Mangue",

      category: "Boissons",

      code: "4567891234567",

      /* PRIX */
      purchasePrice: 1.30,
      price: 2.00,

      /* STOCK */
      stock: 28,
      minStock: 5,

      /* UNITÉ */
      unit: "Pièce",

      /* ICÔNE */
      icon: "🧃",
    },

    {
      id: "c5",

      name: "Pain complet",

      category: "Alimentation",

      code: "8901234567890",

      /* PRIX */
      purchasePrice: 1.20,
      price: 2.00,

      /* STOCK */
      stock: 15,
      minStock: 5,

      /* UNITÉ */
      unit: "Pièce",

      /* ICÔNE */
      icon: "🍞",
    },

    {
      id: "c6",

      name: "Riz 5 Kg",

      category: "Alimentation",

      code: "9876543210000",

      /* PRIX */
      purchasePrice: 6.50,
      price: 8.50,

      /* STOCK */
      stock: 12,
      minStock: 5,

      /* UNITÉ */
      unit: "Sac",

      /* ICÔNE */
      icon: "🍚",
    },

    {
      id: "c7",

      name: "Margarine",

      category: "Alimentation",

      code: "MON-COM-0007",

      /* PRIX */
      purchasePrice: 2.00,
      price: 2.50,

      /* STOCK */
      stock: 20,
      minStock: 5,

      /* UNITÉ */
      unit: "Boîte",

      /* ICÔNE */
      icon: "🧈",
    },
  ],


  /* =======================================================
     RESTAURANT
  ======================================================= */

  restaurant: [
    {
      id: "r1",

      name: "Poulet rôti",

      category: "Plats",

      code: "REST001",

      purchasePrice: 5.00,
      price: 8.00,

      stock: 20,
      minStock: 5,

      unit: "Pièce",

      icon: "🍗",
    },

    {
      id: "r2",

      name: "Pizza Margherita",

      category: "Plats",

      code: "REST002",

      purchasePrice: 6.00,
      price: 10.00,

      stock: 15,
      minStock: 5,

      unit: "Pièce",

      icon: "🍕",
    },

    {
      id: "r3",

      name: "Burger MONALIX",

      category: "Plats",

      code: "REST003",

      purchasePrice: 4.00,
      price: 7.00,

      stock: 18,
      minStock: 5,

      unit: "Pièce",

      icon: "🍔",
    },

    {
      id: "r4",

      name: "Poisson grillé",

      category: "Plats",

      code: "REST004",

      purchasePrice: 8.00,
      price: 12.00,

      stock: 12,
      minStock: 5,

      unit: "Pièce",

      icon: "🐟",
    },

    {
      id: "r5",

      name: "Jus naturel",

      category: "Boissons",

      code: "REST005",

      purchasePrice: 1.50,
      price: 3.00,

      stock: 30,
      minStock: 5,

      unit: "Verre",

      icon: "🧃",
    },

    {
      id: "r6",

      name: "Coca-Cola",

      category: "Boissons",

      code: "REST006",

      purchasePrice: 1.00,
      price: 2.00,

      stock: 35,
      minStock: 5,

      unit: "Pièce",

      icon: "🥤",
    },
  ],


  /* =======================================================
     HABILLEMENT
  ======================================================= */

  habillement: [
    {
      id: "h1",

      name: "T-Shirt Premium",

      category: "Hommes",

      code: "HAB001",

      purchasePrice: 9.00,
      price: 15.00,

      stock: 12,
      minStock: 5,

      unit: "Pièce",

      icon: "👕",
    },

    {
      id: "h2",

      name: "Chemise Classique",

      category: "Hommes",

      code: "HAB002",

      purchasePrice: 16.00,
      price: 25.00,

      stock: 10,
      minStock: 5,

      unit: "Pièce",

      icon: "👔",
    },

    {
      id: "h3",

      name: "Pantalon Classique",

      category: "Hommes",

      code: "HAB003",

      purchasePrice: 16.00,
      price: 25.00,

      stock: 18,
      minStock: 5,

      unit: "Pièce",

      icon: "👖",
    },

    {
      id: "h4",

      name: "Robe Élégance",

      category: "Femmes",

      code: "HAB004",

      purchasePrice: 23.00,
      price: 35.00,

      stock: 8,
      minStock: 5,

      unit: "Pièce",

      icon: "👗",
    },
  ],

  pharmacie: [
    { id: "p1", name: "Paracétamol 500 mg", category: "Antalgique", code: "PHAR001", purchasePrice: 0.03, price: 0.05, stock: 500, minStock: 50, unit: "Comprimé", icon: "pill" },
    { id: "p2", name: "Amoxicilline 500 mg", category: "Antibiotique", code: "PHAR002", purchasePrice: 0.08, price: 0.12, stock: 300, minStock: 40, unit: "Capsule", icon: "pill" },
    { id: "p3", name: "Ibuprofène 400 mg", category: "Antalgique", code: "PHAR003", purchasePrice: 0.05, price: 0.08, stock: 250, minStock: 40, unit: "Comprimé", icon: "pill" },
    { id: "p4", name: "Sirop contre la toux 100 ml", category: "Sirop", code: "PHAR004", purchasePrice: 1.50, price: 2.50, stock: 80, minStock: 15, unit: "Flacon", icon: "bottle" },
    { id: "p5", name: "Vitamine C 1000 mg", category: "Vitamines", code: "PHAR005", purchasePrice: 2.00, price: 3.00, stock: 100, minStock: 20, unit: "Boîte", icon: "vitamin" },
    { id: "p6", name: "Thermomètre médical", category: "Matériel médical", code: "PHAR006", purchasePrice: 3.00, price: 5.00, stock: 30, minStock: 5, unit: "Pièce", icon: "thermometer" },
    { id: "p7", name: "Seringue stérile 5 ml", category: "Matériel médical", code: "PHAR007", purchasePrice: 0.30, price: 0.50, stock: 200, minStock: 30, unit: "Pièce", icon: "syringe" },
    { id: "p8", name: "Compresses stériles", category: "Pansement", code: "PHAR008", purchasePrice: 1.00, price: 1.80, stock: 100, minStock: 20, unit: "Paquet", icon: "medical" },
  ],


  pressing: [],
};

/* =========================================================
   UNITÉS PAR ACTIVITÉ
========================================================= */
const MONALIX_UNIT_OPTIONS_BY_ACTIVITY = {

  commerce: [
    "Pièce", "Unité", "Kg", "g", "Litre", "ml", "cl",
    "Carton", "Paquet", "Sac", "Boîte", "Douzaine",
  ],

  restaurant: [
    "Portion", "Assiette", "Verre", "Bouteille", "Service",
    "Pièce", "Unité", "Kg", "Litre", "ml", "cl",
  ],

  habillement: [
    "Pièce", "Paire", "Unité", "Douzaine", "Carton",
  ],

  pharmacie: [
    "Boîte", "Comprimé", "Capsule", "Gélule", "Plaquette",
    "Flacon", "Ampoule", "Sachet", "Tube", "Pot",
    "Pièce", "Unité",
  ],

  pressing: [
    "Pièce", "Chemise", "Pantalon", "Robe", "Costume",
    "Veste", "Manteau", "Couverture", "Rideau", "Paire",
  ],

};

const getActivityUnitOptions = (activity) => {
  const key = String(activity || "commerce").toLowerCase().trim();
  return MONALIX_UNIT_OPTIONS_BY_ACTIVITY[key] ||
    MONALIX_UNIT_OPTIONS_BY_ACTIVITY.commerce;
};

const normalizeProductUnit = (activity, unit) => {
  const options = getActivityUnitOptions(activity);
  const candidate = String(unit || "").trim();
  return options.includes(candidate) ? candidate : options[0];
};

/* =========================================================
   ICÔNES PRODUITS — PROFESSIONNELLES
========================================================= */

const getProductIconComponent = (product) => {
  const name = String(product?.name || "").toLowerCase();
  const category = String(product?.category || "").toLowerCase();
  const activity = String(product?.activity || "").toLowerCase();
  const key = String(product?.icon || "").toLowerCase();

  if (
    key === "pill" ||
    name.includes("paracétamol") ||
    name.includes("amoxicilline") ||
    name.includes("ibuprofène") ||
    name.includes("comprimé") ||
    name.includes("capsule") ||
    category.includes("antibiot")
  ) return Pill;

  if (key === "thermometer" || name.includes("thermomètre")) return Thermometer;
  if (key === "syringe" || name.includes("seringue")) return Syringe;
  if (key === "medical" || name.includes("compresse") || category.includes("pansement")) return ShieldCheck;
  if (key === "bottle" || name.includes("sirop") || name.includes("flacon")) return Droplets;
  if (key === "vitamin" || category.includes("vitamine")) return HeartPulse;
  if (activity === "pharmacie" || category.includes("médicament") || category.includes("pharmacie")) return Stethoscope;

  if (name.includes("smartphone") || name.includes("iphone") || name.includes("téléphone") || name.includes("android")) return Smartphone;
  if (name.includes("ordinateur") || name.includes("laptop") || name.includes("pc")) return Laptop;
  if (name.includes("écran") || name.includes("moniteur") || name.includes("tv")) return Monitor;
  if (name.includes("casque") || name.includes("écouteur")) return Headphones;

  if (name.includes("t-shirt") || name.includes("chemise") || name.includes("robe") || name.includes("pantalon") || category.includes("homme") || category.includes("femme")) return Shirt;
  if (name.includes("chaussure") || name.includes("sandale") || name.includes("basket")) return Footprints;

  if (name.includes("coca") || name.includes("fanta") || name.includes("jus") || category.includes("boisson") || name.includes("eau")) return Droplets;
  if (name.includes("pain")) return Package;
  if (name.includes("riz") || name.includes("farine") || name.includes("céréale")) return ShoppingBasket;
  if (name.includes("pomme") || name.includes("fruit")) return Apple;
  if (name.includes("poisson")) return Fish;
  if (name.includes("biscuit")) return Cookie;
  if (name.includes("lait")) return Milk;

  if (name.includes("pizza")) return Pizza;
  if (name.includes("burger") || name.includes("poulet")) return Beef;
  if (name.includes("café") || name.includes("coffee")) return Coffee;
  if (name.includes("gâteau") || name.includes("cake")) return CakeSlice;
  if (activity === "restaurant" || category.includes("plat") || category.includes("menu")) return UtensilsCrossed;
  if (name.includes("sac") || name.includes("cartable")) return ShoppingBag;

  return Package;
};

const getProductIconTone = (activity) => {
  const key = String(activity || "").toLowerCase();
  if (key === "pharmacie") return { background: "#e8f7ff", color: "#087cff", border: "1px solid #bfe8ff" };
  if (key === "restaurant") return { background: "#fff5e8", color: "#d78300", border: "1px solid #ffe0ad" };
  if (key === "habillement") return { background: "#f2edff", color: "#6b4eff", border: "1px solid #ddd2ff" };
  return { background: "#eaf4ff", color: "#075bff", border: "1px solid #c7e1ff" };
};

/* =========================================================
   APPLICATION
========================================================= */

export default function App() {  useEffect(() => {
    const testSupabase = async () => {
      const { data, error } = await supabase
        .from("mon_orgs")
        .select("*")
        .limit(1);

      if (error) {
        console.error("❌ Supabase :", error);
        return;
      }

      console.log("✅ MONALIX connecté à Supabase :", data);
    };

    testSupabase();
  }, []);
 /* =====================================================
   PRODUITS MODIFIABLES
===================================================== */

const [products, setProducts] = useState(() => {
  try {
    const savedProducts =
      localStorage.getItem("monalix_products");

    const saved =
      savedProducts
        ? JSON.parse(savedProducts)
        : {};

    /* ===================================================
       PRÉPARATION DES PRODUITS PAR MAGASIN
    =================================================== */

    const prepareProducts = (
      activityId,
      defaultProducts
    ) => {
      const branches =
        establishmentsByActivity[activityId] || [];

      const savedActivityProducts =
        Array.isArray(saved[activityId])
          ? saved[activityId]
          : [];

      /* =================================================
         IMPORTANT : LES PRODUITS ENREGISTRÉS PAR L'UTILISATEUR
         DOIVENT PRENDRE LE DESSUS SUR LES PRODUITS PAR DÉFAUT.
         Cela conserve notamment :
         - l'image / icône personnalisée
         - le prix et sa devise (FC ou USD)
         - l'unité
         - le stock modifié
      ================================================= */
      const savedById = new Map(
        savedActivityProducts.map((savedProduct) => [
          String(savedProduct?.id),
          savedProduct,
        ])
      );

      const defaultProductsMerged =
        defaultProducts.map((defaultProduct) => {
          const savedProduct =
            savedById.get(String(defaultProduct?.id));

          if (!savedProduct) {
            return defaultProduct;
          }

          return {
            ...defaultProduct,
            ...savedProduct,
          };
        });

      const defaultIds = new Set(
        defaultProducts.map((product) =>
          String(product?.id)
        )
      );

      const newSavedProducts =
        savedActivityProducts.filter(
          (savedProduct) =>
            !defaultIds.has(String(savedProduct?.id))
        );

      const allProducts = [
        ...defaultProductsMerged,
        ...newSavedProducts,
      ];

      /* =================================================
         STOCK PAR MAGASIN
      ================================================= */

      return allProducts.map((product) => {
        if (
          product.stockByBranch &&
          typeof product.stockByBranch === "object"
        ) {
          return {
            ...product,
            activity: activityId,
            unit: normalizeProductUnit(activityId, product.unit),
          };
        }

        const stockByBranch = {};

        branches.forEach(
          (branch, index) => {
            stockByBranch[branch] =
              index === 0
                ? Number(product.stock || 0)
                : 0;
          }
        );

        return {
          ...product,
          activity: activityId,
          unit: normalizeProductUnit(activityId, product.unit),
          stockByBranch,
        };
      });
    };

    /* ===================================================
       PRODUITS DE CHAQUE ACTIVITÉ
    =================================================== */

    return {
      commerce: prepareProducts(
        "commerce",
        productsByActivity.commerce
      ),

      restaurant: prepareProducts(
        "restaurant",
        productsByActivity.restaurant
      ),

      habillement: prepareProducts(
        "habillement",
        productsByActivity.habillement
      ),

      pharmacie: prepareProducts(
        "pharmacie",
        productsByActivity.pharmacie
      ),

      pressing: prepareProducts(
        "pressing",
        productsByActivity.pressing || []
      ),
    };

  } catch (error) {
    console.error(
      "Erreur de chargement des produits :",
      error
    );
  }

  return productsByActivity;
});


/* =====================================================
   SAUVEGARDE AUTOMATIQUE DES PRODUITS
===================================================== */

useEffect(() => {
  try {
    localStorage.setItem(
      "monalix_products",
      JSON.stringify(products)
    );
  } catch (error) {
    console.error(
      "Erreur de sauvegarde des produits :",
      error
    );
  }
}, [products]);


/* =====================================================
   FORMULAIRE NOUVEAU PRODUIT
===================================================== */

const [showProductModal, setShowProductModal] =
  useState(false);

const [editingProduct, setEditingProduct] =
  useState(null);

const [reportPeriod, setReportPeriod] = useState("today");

const [productForm, setProductForm] = useState({
  name: "",
  category: "",
  store: "",
  purchasePrice: "",
  purchasePriceCurrency: "USD",
  pricingMode: "auto",
  marginPercent: "20",
  price: "",
  priceCurrency: "USD",
  packUnits: "1",
  stock: "",
  minStock: "5",
  unit: "Pièce",
  icon: "📦",
});


/* =====================================================
   ÉTATS PRINCIPAUX
===================================================== */

/* =====================================================
   SÉCURITÉ — CONNEXION UTILISATEUR
===================================================== */

const [isAuthenticated, setIsAuthenticated] =
  useState(() => {
    try {
      return localStorage.getItem("monalix_authenticated") === "true";
    } catch (error) {
      return false;
    }
  });

const [loggedUser, setLoggedUser] =
  useState(() => {
    try {
      return localStorage.getItem("monalix_logged_user") || "";
    } catch (error) {
      return "";
    }
  });
  const [loggedRole, setLoggedRole] =
  useState(() => {
    try {
      return localStorage.getItem("monalix_logged_role") || "";
    } catch (error) {
      return "";
    }
  });

const [loginUsername, setLoginUsername] =
  useState("");

const [loginPassword, setLoginPassword] =
  useState("");

const [loginError, setLoginError] =
  useState("");

const [monalixUsersState, setMonalixUsersState] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("monalix_users") || "null");
    if (Array.isArray(saved) && saved.length) {
      const legacyAdminHash = localStorage.getItem("monalix_installation_password_hash") || DEFAULT_PASSWORD_HASH;
      return saved.map((user) => ({
        ...user,
        passwordHash: user.username === "admin" ? legacyAdminHash : (user.passwordHash || DEFAULT_PASSWORD_HASH),
        active: user.active !== false,
        activities:
          user.username === "caissier" &&
          Array.isArray(user.activities) &&
          user.activities.length === 1 &&
          user.activities[0] === "commerce"
            ? ["commerce", "restaurant", "habillement", "pharmacie", "pressing"]
            : (Array.isArray(user.activities) ? user.activities : ["commerce"]),
        branches: Array.isArray(user.branches) ? user.branches : [],
      }));
    }
  } catch {}
  const legacyAdminHash = localStorage.getItem("monalix_installation_password_hash") || DEFAULT_PASSWORD_HASH;
  return defaultMonalixUsers.map((user) => user.username === "admin" ? { ...user, passwordHash: legacyAdminHash } : user);
});

const [pressingOrders, setPressingOrders] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("monalix_pressing_orders") || "[]");
  } catch {
    return [];
  }
});

const [pressingSearch, setPressingSearch] = useState("");
const [pressingStatusFilter, setPressingStatusFilter] = useState("Tous");
const [pressingPaymentFilter, setPressingPaymentFilter] = useState("Tous");
const [pressingForm, setPressingForm] = useState({
  clientName: "",
  phone: "",
  serviceType: "normal",
  dueDate: "",
  paymentTiming: "deposit",
  paymentMethod: "Espèces",
  paymentCurrency: "USD",
  amountPaid: "",
  notes: "",
});
const [pressingGarments, setPressingGarments] = useState([]);
const [garmentDraft, setGarmentDraft] = useState({
  type: "Chemise",
  brand: "",
  color: "",
  size: "",
  material: "",
  service: "Nettoyage à sec",
  normalPrice: "3",
  expressPrice: "5",
  quantity: 1,
  condition: [],
  description: "",
  photo: "",
});
const [pressingSettings, setPressingSettings] = useState(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("monalix_pressing_settings") || "null");
    return saved || {
      normalHours: 48,
      expressHours: 6,
      services: [
        { name: "Lavage", normal: 2, express: 4 },
        { name: "Repassage", normal: 2, express: 4 },
        { name: "Nettoyage à sec", normal: 3, express: 5 },
        { name: "Lavage + repassage", normal: 4, express: 6 },
        { name: "Costume", normal: 7, express: 12 },
        { name: "Robe", normal: 5, express: 8 },
      ],
    };
  } catch {
    return { normalHours: 48, expressHours: 6, services: [] };
  }
});
const [pressingTab, setPressingTab] = useState("nouveau");
const [selectedPressingOrderId, setSelectedPressingOrderId] = useState(null);
const [passwordForm, setPasswordForm] = useState({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const [passwordMessage, setPasswordMessage] = useState("");
const [userForm, setUserForm] = useState(null);
const [userMessage, setUserMessage] = useState("");

const [activeActivity, setActiveActivity] =
  useState("commerce");

const [activeService, setActiveService] =
  useState("dashboard");

const [activitiesMenuOpen, setActivitiesMenuOpen] =
  useState(false);

/* =====================================================
   LICENCE MONALIX CONTROL
   L'activite disponible dans STORE est determinee
   par la licence active du client dans Supabase.
===================================================== */
const [licensedActivityIds, setLicensedActivityIds] = useState([]);
const [licenseLoading, setLicenseLoading] = useState(false);
const [licenseError, setLicenseError] = useState("");
const [licenseInfo, setLicenseInfo] = useState(null);

const [selectedBranch, setSelectedBranch] =
  useState(() => {
    try {
      return localStorage.getItem("monalix_branch_name") || "Magasin Golf";
    } catch {
      return "Magasin Golf";
    }
  });

/* =====================================================
   IDENTITÉ DE L'INSTALLATION MONALIX
===================================================== */

const getOrCreateMonalixDeviceId = () => {
  try {
    const key = "monalix_device_id";
    const existing = localStorage.getItem(key);
    if (existing) return existing;

    const generated =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `device-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    localStorage.setItem(key, generated);
    return generated;
  } catch {
    return `device-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
};

const [installationDeviceId] = useState(() => getOrCreateMonalixDeviceId());

const [installationOrgId, setInstallationOrgId] = useState(() => {
  try {
    return localStorage.getItem("monalix_org_id") || "";
  } catch {
    return "";
  }
});

const [installationBranchId, setInstallationBranchId] = useState(() => {
  try {
    return localStorage.getItem("monalix_branch_id") || "";
  } catch {
    return "";
  }
});

const [installationOrgName, setInstallationOrgName] = useState(() => {
  try {
    return localStorage.getItem("monalix_org_name") || "";
  } catch {
    return "";
  }
});

const [installationBranchName, setInstallationBranchName] = useState(() => {
  try {
    return localStorage.getItem("monalix_branch_name") || "";
  } catch {
    return "";
  }
});

const [installationConfigured, setInstallationConfigured] = useState(() => {
  try {
    return Boolean(
      localStorage.getItem("monalix_org_id") &&
      localStorage.getItem("monalix_branch_id")
    );
  } catch {
    return false;
  }
});

const [showInstallationSetup, setShowInstallationSetup] = useState(false);
const [installationOrganizations, setInstallationOrganizations] = useState([]);
const [installationBranches, setInstallationBranches] = useState([]);
const [selectedInstallationOrg, setSelectedInstallationOrg] = useState("");
const [selectedInstallationBranch, setSelectedInstallationBranch] = useState("");
const [installationLoading, setInstallationLoading] = useState(false);
const [installationSaving, setInstallationSaving] = useState(false);
const [installationError, setInstallationError] = useState("");

const getMonalixInstallationContext = () => {
  let orgId = "";
  let branchId = "";
  let deviceId = installationDeviceId;

  try {
    orgId = localStorage.getItem("monalix_org_id") || installationOrgId || "";
    branchId = localStorage.getItem("monalix_branch_id") || installationBranchId || "";
    deviceId = localStorage.getItem("monalix_device_id") || installationDeviceId;
  } catch {}

  return { orgId, branchId, deviceId };
};

const loadInstallationOrganizations = async () => {
  setInstallationLoading(true);
  setInstallationError("");

  try {
    const { data, error } = await supabase
      .from("mon_orgs")
      .select("id, name, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("❌ Chargement organisations installation :", error);
      setInstallationError(
        "Impossible de charger les organisations. Vérifiez les autorisations Supabase de mon_orgs."
      );
      return;
    }

    setInstallationOrganizations(data || []);
  } catch (error) {
    console.error("❌ Erreur chargement organisations installation :", error);
    setInstallationError("Erreur de connexion à Supabase.");
  } finally {
    setInstallationLoading(false);
  }
};

const loadInstallationBranches = async (orgId) => {
  setInstallationBranches([]);
  setSelectedInstallationBranch("");
  if (!orgId) return;

  setInstallationLoading(true);
  setInstallationError("");

  try {
    const { data, error } = await supabase
      .from("mon_branches")
      .select("id, org_id, name, code, address, phone, active, created_at")
      .eq("org_id", orgId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("❌ Chargement établissements installation :", error);
      setInstallationError(
        "Impossible de charger les établissements. Vérifiez les autorisations Supabase de mon_branches."
      );
      return;
    }

    const activeBranches = (data || []).filter((branch) => branch.active !== false);
    setInstallationBranches(activeBranches);

    const savedBranchId =
      orgId === installationOrgId ? installationBranchId : "";

    if (savedBranchId && activeBranches.some((branch) => String(branch.id) === String(savedBranchId))) {
      setSelectedInstallationBranch(savedBranchId);
    } else if (activeBranches.length === 1) {
      setSelectedInstallationBranch(activeBranches[0].id);
    }
  } catch (error) {
    console.error("❌ Erreur établissements installation :", error);
    setInstallationError("Erreur de connexion à Supabase.");
  } finally {
    setInstallationLoading(false);
  }
};

const openInstallationSetup = async () => {
  setShowInstallationSetup(true);
  setInstallationError("");
  setSelectedInstallationOrg(installationOrgId || "");
  setSelectedInstallationBranch(installationBranchId || "");
  await loadInstallationOrganizations();

  if (installationOrgId) {
    await loadInstallationBranches(installationOrgId);
  }
};

const saveInstallationSetup = async () => {
  if (!selectedInstallationOrg) {
    setInstallationError("Veuillez sélectionner l'organisation du client.");
    return;
  }

  if (!selectedInstallationBranch) {
    setInstallationError("Veuillez sélectionner l'établissement de cette installation.");
    return;
  }

  const organization = installationOrganizations.find(
    (item) => String(item.id) === String(selectedInstallationOrg)
  );
  const branch = installationBranches.find(
    (item) => String(item.id) === String(selectedInstallationBranch)
  );

  if (!organization || !branch) {
    setInstallationError("Organisation ou établissement introuvable.");
    return;
  }

  setInstallationSaving(true);
  setInstallationError("");

  try {
    const deviceName =
      localStorage.getItem("monalix_device_name") ||
      `MONALIX - ${branch.name || "Caisse"}`;

    const deviceRecord = {
      id: installationDeviceId,
      org_id: organization.id,
      branch_id: branch.id,
      name: deviceName,
      device_type: "pc",
      last_seen_at: new Date().toISOString(),
    };

    const { error: deviceError } = await supabase
      .from("mon_devices")
      .upsert(deviceRecord, { onConflict: "id" });

    if (deviceError) {
      console.error("❌ Enregistrement appareil MONALIX :", deviceError);
      setInstallationError(
        "Impossible d'enregistrer cette installation dans MONALIX CONTROL. Vérifiez les droits INSERT/UPDATE sur mon_devices."
      );
      return;
    }

    localStorage.setItem("monalix_org_id", String(organization.id));
    localStorage.setItem("monalix_org_name", String(organization.name || ""));
    localStorage.setItem("monalix_branch_id", String(branch.id));
    localStorage.setItem("monalix_branch_name", String(branch.name || ""));
    localStorage.setItem("monalix_device_id", String(installationDeviceId));
    localStorage.setItem("monalix_device_name", String(deviceName));

    setInstallationOrgId(String(organization.id));
    setInstallationOrgName(String(organization.name || ""));
    setInstallationBranchId(String(branch.id));
    setInstallationBranchName(String(branch.name || ""));
    setSelectedBranch(String(branch.name || ""));
    setInstallationConfigured(true);
    setShowInstallationSetup(false);

    console.log("✅ Installation MONALIX enregistrée :", {
      org_id: organization.id,
      branch_id: branch.id,
      device_id: installationDeviceId,
    });
  } catch (error) {
    console.error("❌ Erreur configuration installation MONALIX :", error);
    setInstallationError("Erreur lors de l'enregistrement de l'installation.");
  } finally {
    setInstallationSaving(false);
  }
};

/* =====================================================
   HEARTBEAT INSTALLATION → MONALIX CONTROL
===================================================== */

useEffect(() => {
  if (!isAuthenticated || !installationConfigured) return undefined;

  const sendInstallationHeartbeat = async () => {
    const { orgId, branchId, deviceId } = getMonalixInstallationContext();

    if (!orgId || !branchId || !deviceId) return;

    const { error } = await supabase
      .from("mon_devices")
      .update({
        org_id: orgId,
        branch_id: branchId,
        last_seen_at: new Date().toISOString(),
      })
      .eq("id", deviceId);

    if (error) {
      console.error("❌ Heartbeat MONALIX :", error);
    }
  };

  sendInstallationHeartbeat();
  const heartbeatTimer = setInterval(sendInstallationHeartbeat, 60 * 1000);

  return () => clearInterval(heartbeatTimer);
}, [isAuthenticated, installationConfigured, installationDeviceId]);

/* =====================================================
   VERIFICATION LICENCE → ACTIVITE AUTORISEE
===================================================== */
useEffect(() => {
  if (!isAuthenticated || !installationConfigured) {
    setLicensedActivityIds([]);
    setLicenseInfo(null);
    setLicenseError("");
    return undefined;
  }

  let cancelled = false;

  const loadInstallationLicense = async () => {
    const { orgId, branchId } = getMonalixInstallationContext();

    if (!orgId || !branchId) {
      setLicensedActivityIds([]);
      setLicenseInfo(null);
      setLicenseError("Installation MONALIX incomplète : client ou établissement manquant.");
      return;
    }

    setLicenseLoading(true);
    setLicenseError("");

    try {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from("mon_licenses")
        .select("id, org_id, branch_id, activity_id, license_code, status, starts_at, expires_at, max_devices")
        .eq("org_id", orgId)
        .eq("status", "active")
        .lte("starts_at", now)
        .gte("expires_at", now)
        .or(`branch_id.eq.${branchId},branch_id.is.null`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (cancelled) return;

      const validLicenses = (data || []).filter(
        (license) =>
          license?.activity_id &&
          String(license.org_id) === String(orgId) &&
          (!license.branch_id || String(license.branch_id) === String(branchId))
      );

      const activityIds = [
        ...new Set(
          validLicenses.map((license) =>
            String(license.activity_id).toLowerCase().trim()
          )
        ),
      ];

      setLicensedActivityIds(activityIds);
      setLicenseInfo(validLicenses[0] || null);

      if (activityIds.length === 0) {
        setLicenseError(
          "Aucune licence MONALIX active n'est associée à cet établissement."
        );
        return;
      }

      setActiveActivity((current) => {
        const normalizedCurrent = String(current || "").toLowerCase().trim();
        return activityIds.includes(normalizedCurrent)
          ? normalizedCurrent
          : activityIds[0];
      });
    } catch (error) {
      if (cancelled) return;

      console.error("❌ Vérification licence MONALIX :", error);
      setLicensedActivityIds([]);
      setLicenseInfo(null);
      setLicenseError(
        error?.message ||
          "Impossible de vérifier la licence MONALIX auprès de Supabase."
      );
    } finally {
      if (!cancelled) setLicenseLoading(false);
    }
  };

  loadInstallationLicense();

  return () => {
    cancelled = true;
  };
}, [isAuthenticated, installationConfigured, installationDeviceId, installationOrgId, installationBranchId]);

const [selectedCashier, setSelectedCashier] =
  useState("Charles Monalix");

const [selectedTable, setSelectedTable] =
  useState(null);

const [search, setSearch] =
  useState("");

const [selectedCategory, setSelectedCategory] =
  useState("Tous");


/* =====================================================
   RECHERCHE — GESTION DES STOCKS
===================================================== */

const [stockSearch, setStockSearch] =
  useState("");

const [stockCategoryFilter, setStockCategoryFilter] =
  useState("Tous");

const [stockCategory, setStockCategory] =
  useState("Toutes");

const [stockStatus, setStockStatus] =
  useState("Tous");


/* =====================================================
   RÉFÉRENCES — GESTION DES STOCKS
===================================================== */

const stockTableRef =
  useRef(null);

const stockTopScrollRef =
  useRef(null);

const stockSearchInputRef =
  useRef(null);


const [cart, setCart] =
  useState([]);

const [tableOrders, setTableOrders] =
  useState({});

const [exchangeRate, setExchangeRate] =
  useState(2850);

const [currency, setCurrency] =
  useState("USD");

const [paymentMethod, setPaymentMethod] =
  useState("Espèces");

const [amountReceived, setAmountReceived] =
  useState("");

const [invoiceModal, setInvoiceModal] =
  useState(false);

const [saleValidated, setSaleValidated] =
  useState(false);

const [invoicePrinted, setInvoicePrinted] =
  useState(false);


/* =====================================================
   SAUVEGARDE VALIDATION
===================================================== */

useEffect(() => {
  localStorage.setItem(
    "saleValidated",
    saleValidated ? "true" : "false"
  );
}, [saleValidated]);

/* =====================================================
   SAUVEGARDE ET RESTAURATION DES DONNÉES
===================================================== */

const backupFileInputRef = useRef(null);

const handleBackupData = () => {
  try {
    const storageData = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && ![
        "monalix_installation_password_hash",
        "monalix_users",
        "monalix_authenticated",
        "monalix_logged_user",
        "monalix_logged_role",
      ].includes(key)) {
        storageData[key] =
          localStorage.getItem(key);
      }
    }

    const backup = {
      application: "MONALIX",
      version: "1.0",
      date: new Date().toISOString(),
      data: storageData,
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `monalix-backup-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    alert(
      "Sauvegarde Monalix créée avec succès."
    );

  } catch (error) {

    console.error(
      "Erreur lors de la sauvegarde :",
      error
    );

    alert(
      "Impossible de créer la sauvegarde."
    );
  }
};


const handleRestoreData = (
  event
) => {

  const file =
    event.target.files?.[0];

  if (!file) return;

  const reader =
    new FileReader();

  reader.onload = () => {

    try {

      const backup =
        JSON.parse(
          reader.result
        );

      if (
        backup?.application !==
        "MONALIX" ||
        !backup?.data
      ) {

        alert(
          "Ce fichier n'est pas une sauvegarde Monalix valide."
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Restaurer cette sauvegarde remplacera les données actuellement enregistrées dans Monalix. Continuer ?"
        );

      if (!confirmed) return;

      const protectedKeys = [
        "monalix_installation_password_hash",
        "monalix_users",
        "monalix_authenticated",
        "monalix_logged_user",
        "monalix_logged_role",
      ];
      const protectedData = {};
      protectedKeys.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value !== null) protectedData[key] = value;
      });

      localStorage.clear();

      Object.entries(backup.data).forEach(([key, value]) => {
        if (!protectedKeys.includes(key)) {
          localStorage.setItem(key, value);
        }
      });

      Object.entries(protectedData).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      alert(
        "Sauvegarde restaurée. Monalix va être rechargé."
      );

      window.location.reload();

    } catch (error) {

      console.error(
        "Erreur lors de la restauration :",
        error
      );

      alert(
        "Impossible de lire cette sauvegarde."
      );
    }
  };

  reader.readAsText(file);

  event.target.value = "";
};
/* =====================================================
   ACTIVITÉ ACTIVE
===================================================== */

const normalizedActiveActivity =
  String(
    activeActivity || "commerce"
  )
    .toLowerCase()
    .trim();


const activeActivityData =
  activities.find(
    (activity) =>
      String(
        activity.id || ""
      )
        .toLowerCase()
        .trim() ===
      normalizedActiveActivity
  ) || activities[0];


const currentProducts =
  products &&
  typeof products === "object"
    ? (
        Array.isArray(
          products[
            normalizedActiveActivity
          ]
        )
          ? products[
              normalizedActiveActivity
            ]
          : (
              Object.entries(
                products
              ).find(
                ([key]) =>
                  String(
                    key || ""
                  )
                    .toLowerCase()
                    .trim() ===
                  normalizedActiveActivity
              )?.[1] || []
            )
      )
    : (
        Object.entries(
          productsByActivity || {}
        ).find(
          ([key]) =>
            String(
              key || ""
            )
              .toLowerCase()
              .trim() ===
            normalizedActiveActivity
        )?.[1] || []
      );


const currentBranches =
  Object.entries(
    establishmentsByActivity || {}
  ).find(
    ([key]) =>
      String(
        key || ""
      )
        .toLowerCase()
        .trim() ===
      normalizedActiveActivity
  )?.[1] || [];


/* =====================================================
   STOCK DU MAGASIN ACTIF
===================================================== */

const getProductStock = (
  product,
  branch = selectedBranch
) => {

  if (!product) {
    return 0;
  }


  /* Nouveau système :
     stock séparé pour chaque magasin */

  if (
    product.stockByBranch &&
    typeof product.stockByBranch === "object"
  ) {

    const branchStock =
      product.stockByBranch[
        branch
      ];


    return Math.max(
      0,
      Number(
        branchStock || 0
      )
    );

  }


  /* Compatibilité avec les anciens produits */

  return Math.max(
    0,
    Number(
      product.stock || 0
    )
  );

};


const categories = [
  "Tous",

  ...new Set(
    (
      Array.isArray(
        currentProducts
      )
        ? currentProducts
        : []
    )
      .map(
        (product) =>
          String(
            product?.category || ""
          ).trim()
      )
      .filter(Boolean)
  ),
];
/* =====================================================
   CONVERSION SÉCURISÉE DES NOMBRES
===================================================== */

const toSafeNumber = (value) => {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return 0;

  }


  if (typeof value === "number") {

    return Number.isFinite(value)
      ? value
      : 0;

  }


  let normalized =
    String(value)
      .trim()
      .replace(/\s/g, "")
      .replace(/[^\d,.-]/g, "");


  const lastComma =
    normalized.lastIndexOf(",");

  const lastDot =
    normalized.lastIndexOf(".");


  if (
    lastComma > -1 &&
    lastDot > -1
  ) {

    if (
      lastComma > lastDot
    ) {

      normalized =
        normalized
          .replace(/\./g, "")
          .replace(",", ".");

    } else {

      normalized =
        normalized.replace(/,/g, "");

    }

  } else if (
    lastComma > -1
  ) {

    normalized =
      normalized.replace(",", ".");

  }


  const number =
    Number(normalized);


  return Number.isFinite(number)
    ? number
    : 0;

};

/* =====================================================
   PRIX PRODUIT
===================================================== */

const getProductPrice = (item) => {

  if (!item) {
    return 0;
  }


  const rawPrice =
    item.price ??
    item.unitPrice ??
    item.sellingPrice ??
    item.salePrice ??
    0;


  const price =
    typeof rawPrice === "string"
      ? Number(
          rawPrice
            .replace(/\s/g, "")
            .replace(",", ".")
        )
      : Number(rawPrice);


  return Number.isFinite(price) &&
    price >= 0
    ? price
    : 0;

};


/* =====================================================
   QUANTITÉ PRODUIT
===================================================== */

const getProductQuantity = (item) => {

  if (!item) {
    return 0;
  }


  const rawQuantity =
    item.quantity !== undefined &&
    item.quantity !== null
      ? item.quantity
      : item.qty;


  const quantity =
    typeof rawQuantity === "string"
      ? Number(
          rawQuantity
            .replace(/\s/g, "")
            .replace(",", ".")
        )
      : Number(rawQuantity);


  return Number.isFinite(quantity) &&
    quantity > 0
    ? quantity
    : 0;

};
/* =====================================================
   TABLE SÉLECTIONNÉE
===================================================== */

const selectedTableData =
  restaurantTables.find(
    (table) =>
      table.id === selectedTable
  );


const selectedTableOrder =
  selectedTable
    ? tableOrders[selectedTable] || null
    : null;


const currentCart =
  activeActivity === "restaurant"
    ? (
        Array.isArray(
          selectedTableOrder?.items
        )
          ? selectedTableOrder.items
          : []
      )
    : (
        Array.isArray(cart)
          ? cart
          : []
      );


const safeCurrentCart =
  Array.isArray(currentCart)
    ? currentCart
    : [];


/* =====================================================
   PRODUITS FILTRÉS
   CAISSE — RECHERCHE NOM / CODE / CATÉGORIE
===================================================== */

const filteredProducts = useMemo(() => {

  /* ===================================================
     TEXTE DE RECHERCHE
  =================================================== */

  const text =
    String(search || "")
      .toLowerCase()
      .trim();


  /* ===================================================
     CATÉGORIE SÉLECTIONNÉE
     Accepte "Tous" ET "Toutes"
  =================================================== */

  const selectedCategoryNormalized =
    String(
      selectedCategory || "Tous"
    )
      .toLowerCase()
      .trim();


  const showAllCategories =
    selectedCategoryNormalized === "tous" ||
    selectedCategoryNormalized === "toutes" ||
    selectedCategoryNormalized === "";


  /* ===================================================
     FILTRAGE
  =================================================== */

  return currentProducts.filter(
    (product) => {

      if (!product) {
        return false;
      }


      /* ===============================================
         DONNÉES NORMALISÉES
      =============================================== */

      const productName =
        String(
          product.name || ""
        )
          .toLowerCase()
          .trim();


      const productCode =
        String(
          product.code || ""
        )
          .toLowerCase()
          .trim();


      const productCategory =
        String(
          product.category || ""
        )
          .toLowerCase()
          .trim();


      /* ===============================================
         RECHERCHE
         Nom
         Code-barres
         Catégorie
      =============================================== */

      const searchMatch =
        text === "" ||
        productName.includes(text) ||
        productCode.includes(text) ||
        productCategory.includes(text);


      /* ===============================================
         CATÉGORIE
      =============================================== */

      const categoryMatch =
        showAllCategories ||
        productCategory ===
          selectedCategoryNormalized;


      /* ===============================================
         PRODUIT VISIBLE
      =============================================== */

      return (
        categoryMatch &&
        searchMatch
      );

    }
  );

}, [
  currentProducts,
  search,
  selectedCategory,
]);


/* =====================================================
   CALCUL GLOBAL DU PANIER - CALCUL DIRECT
===================================================== */

const totalItems =
  safeCurrentCart.reduce(
    (total, item) => {

      if (!item) {
        return total;
      }

      const quantity =
        getProductQuantity(item);

      return (
        total +
        quantity
      );

    },
    0
  );


const totalUSD =
  safeCurrentCart.reduce(
    (total, item) => {

      if (!item) {
        return total;
      }

      const price =
        Math.max(0, Number(getProductPrice(item)) || 0);

      const quantity =
        Math.max(0, Number(getProductQuantity(item)) || 0);

      const itemCurrency =
        String(
          item.priceCurrency ||
          item.currency ||
          "USD"
        )
          .toUpperCase()
          .trim();

      const itemTotal = price * quantity;

      return itemCurrency === "FC"
        ? total + itemTotal / (toSafeNumber(exchangeRate) || 2850)
        : total + itemTotal;

    },
    0
  );
/* =====================================================
   TAUX DE CHANGE
===================================================== */

const rateValue =
  toSafeNumber(exchangeRate);


const rate =
  rateValue > 0
    ? rateValue
    : 2850;


/* =====================================================
   TOTAL FC
===================================================== */

const totalFC =
  totalUSD * rate;

/* =====================================================
   AFFICHAGE PRIX — DEVISE ORIGINALE + CONVERSION
===================================================== */

const normalizePriceCurrency = (value) =>
  String(value || "USD").toUpperCase().trim() === "FC"
    ? "FC"
    : "USD";

const formatDisplayUSD = (value) =>
  `${toSafeNumber(value).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} $`;

const formatDisplayFC = (value) =>
  `${Math.round(toSafeNumber(value)).toLocaleString("fr-FR")} FC`;

const getPriceDisplayData = (item) => {
  const value = Math.max(0, toSafeNumber(getProductPrice(item)));
  const itemCurrency = normalizePriceCurrency(
    item?.priceCurrency || item?.currency
  );

  const usd = itemCurrency === "FC"
    ? value / rate
    : value;

  const fc = itemCurrency === "FC"
    ? value
    : value * rate;

  return {
    currency: itemCurrency,
    usd,
    fc,
    primary: itemCurrency === "FC"
      ? formatDisplayFC(value)
      : formatDisplayUSD(value),
    secondary: itemCurrency === "FC"
      ? formatDisplayUSD(usd)
      : formatDisplayFC(fc),
  };
};


/* =====================================================
   STATUT TABLE
===================================================== */

const getTableStatus = (tableId) => {

  const order =
    tableOrders[tableId];


  if (!order) {
    return "free";
  }


  if (
    order.status === "reserved"
  ) {

    return "reserved";

  }


  if (
    order.status === "billing"
  ) {

    return "billing";

  }


  if (
    Array.isArray(order.items) &&
    order.items.length > 0
  ) {

    return "occupied";

  }


  return "free";

};


const getStatusLabel = (status) => {

  const labels = {

    free: "LIBRE",

    occupied:
      "COMMANDE EN COURS",

    billing:
      "À ENCAISSER",

    reserved:
      "RÉSERVÉE",

  };


  return (
    labels[status] ||
    "LIBRE"
  );

};


/* =====================================================
   MISE À JOUR DU PANIER
===================================================== */

const updateCurrentCart = (updater) => {

  if (
    activeActivity === "restaurant"
  ) {

    if (!selectedTable) {

      alert(
        "Veuillez sélectionner une table."
      );

      return;

    }


    setTableOrders((previous) => {

      const current =
        previous[selectedTable] || {

          items: [],

          status: "occupied",

          openedAt:
            new Date().toLocaleTimeString(
              "fr-FR",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),

          waiter:
            selectedCashier,

          customers:
            selectedTableData?.seats || 1,

        };


      const previousItems =
        Array.isArray(current.items)
          ? current.items
          : [];


      const updatedItems =
        typeof updater === "function"
          ? updater(previousItems)
          : updater;


      const safeUpdatedItems =
        Array.isArray(updatedItems)
          ? updatedItems
          : [];


      return {

        ...previous,

        [selectedTable]: {

          ...current,

          items:
            safeUpdatedItems,

          status:
            safeUpdatedItems.length === 0
              ? "free"
              : current.status === "billing"
                ? "billing"
                : "occupied",

        },

      };

    });


    return;

  }


  setCart((previous) => {

    const current =
      Array.isArray(previous)
        ? previous
        : [];


    const updated =
      typeof updater === "function"
        ? updater(current)
        : updater;


    return Array.isArray(updated)
      ? updated
      : [];

  });

};
  /* =====================================================
     AJOUT PRODUIT
  ===================================================== */

  const addToCart = (product) => {

    if (!product) {
      return;
    }


    if (
      activeActivity === "restaurant" &&
      !selectedTable
    ) {

      alert(
        "Sélectionnez d'abord une table."
      );

      return;

    }


    /* =================================================
       PRIX DU PRODUIT
    ================================================= */

    const productPrice =
      Math.max(
        0,
        Number(
          getProductPrice(product)
        ) || 0
      );

    const productCurrency =
      String(
        product.priceCurrency ||
        product.currency ||
        "USD"
      )
        .toUpperCase()
        .trim() === "FC"
        ? "FC"
        : "USD";


    /* =================================================
       AJOUT / MISE À JOUR DU PANIER
    ================================================= */

    updateCurrentCart(
      (previousCart) => {

        const current =
          Array.isArray(previousCart)
            ? previousCart
            : [];


        const existing =
          current.find(
            (item) =>
              String(item?.id) ===
              String(product.id)
          );


        /* =============================================
           PRODUIT DÉJÀ DANS LE PANIER
        ============================================= */

        if (existing) {

          return current.map(
            (item) => {

              if (
                String(item?.id) !==
                String(product.id)
              ) {

                return item;

              }


              const currentQuantity =
                Math.max(
                  0,
                  Number(
                    item.quantity ??
                    item.qty ??
                    0
                  ) || 0
                );


              const itemPrice =
                Math.max(
                  0,
                  Number(
                    getProductPrice(item)
                  ) || productPrice
                );


              return {

                ...item,

                quantity:
                  currentQuantity + 1,

                qty:
                  currentQuantity + 1,

                price:
                  itemPrice,

                priceCurrency:
                  item.priceCurrency ||
                  item.currency ||
                  productCurrency,

              };

            }
          );

        }


        /* =============================================
           NOUVEAU PRODUIT DANS LE PANIER
        ============================================= */

        return [

          ...current,

          {

            ...product,

            price:
              productPrice,

            priceCurrency:
              productCurrency,

            quantity:
              1,

            qty:
              1,

          },

        ];

      }
    );


    /* =================================================
       NETTOYER LA RECHERCHE APRÈS AJOUT
    ================================================= */

    setSearch("");

  };


/* =====================================================
   SCANNER CODE-BARRES
===================================================== */

const handleScanKeyDown = (event) => {

  if (
    event.key !== "Enter"
  ) {

    return;

  }


  event.preventDefault();


  const code =
    String(search || "")
      .trim()
      .toLowerCase();


  if (!code) {

    return;

  }


  const product =
    currentProducts.find(
      (item) => {

        const productCode =
          String(
            item?.code ??
            item?.barcode ??
            item?.barCode ??
            item?.sku ??
            ""
          )
            .trim()
            .toLowerCase();


        return (
          productCode === code
        );

      }
    );


  if (product) {

    addToCart(product);

  } else {

    alert(
      "Aucun article trouvé avec ce code-barres."
    );

  }

};
  /* =====================================================
     MODIFICATION QUANTITÉ
  ===================================================== */

  const updateQuantity = (
    productId,
    change
  ) => {
    updateCurrentCart(
      (previousCart) => {
        const current =
          Array.isArray(previousCart)
            ? previousCart
            : [];

        return current
          .map((item) => {
            if (
              String(item.id) !==
              String(productId)
            ) {
              return item;
            }

            const newQuantity =
              getProductQuantity(item) +
              toSafeNumber(change);

            return {
              ...item,

              quantity:
                newQuantity > 0
                  ? newQuantity
                  : 0,
            };
          })
          .filter(
            (item) =>
              getProductQuantity(item) >
              0
          );
      }
    );
  };

  /* =====================================================
     SUPPRESSION PRODUIT
  ===================================================== */

  const removeFromCart = (
    productId
  ) => {
    updateCurrentCart(
      (previousCart) => {
        const current =
          Array.isArray(previousCart)
            ? previousCart
            : [];

        return current.filter(
          (item) =>
            String(item.id) !==
            String(productId)
        );
      }
    );
  };

 /* =====================================================
     PAIEMENT
  ===================================================== */

  const receivedValue =
    toSafeNumber(amountReceived);

  const receivedUSD =
    currency === "USD"
      ? receivedValue
      : rate > 0
        ? receivedValue / rate
        : 0;

  const isPaymentComplete =
    totalUSD > 0 &&
    receivedUSD >= totalUSD;

  const changeUSD =
    isPaymentComplete
      ? Math.max(
          0,
          receivedUSD - totalUSD
        )
      : 0;

  const changeFC =
    changeUSD * rate;

  const remainingUSD =
    Math.max(
      0,
      totalUSD - receivedUSD
    );

  const remainingFC =
    remainingUSD * rate;

  /* =====================================================
     NOUVELLE VENTE
  ===================================================== */

  const newSale = () => {
    if (
      activeActivity === "restaurant"
    ) {
      if (selectedTable) {
        setTableOrders((previous) => {
          const updated = {
            ...previous,
          };

          delete updated[selectedTable];

          return updated;
        });

        setSelectedTable(null);
      }
    } else {
      setCart([]);
    }

    setSearch("");
    setAmountReceived("");
    setCurrency("USD");
    setPaymentMethod("Espèces");
    setSelectedCategory("Tous");
    setSaleValidated(false);
  };
  /* =====================================================
     PASSER À ENCAISSEMENT
  ===================================================== */

  const sendTableToBilling = () => {
    if (
      !selectedTable ||
      safeCurrentCart.length === 0
    ) {
      alert(
        "Veuillez sélectionner une table avec une commande."
      );
      return;
    }

    setTableOrders(
      (previous) => ({
        ...previous,

        [selectedTable]: {
          ...previous[selectedTable],

          status: "billing",
        },
      })
    );
  };

  /* =====================================================
     APERÇU FACTURE
  ===================================================== */

  const openInvoicePreview = () => {
    /*
       L'ancien aperçu ouvrait la facture sans créer la vente en attente.
       Cela affichait donc « Fermer » et empêchait la finalisation.

       Désormais, le bouton d'aperçu suit exactement le même flux que
       « Valider la vente » : validation → facture → impression → finalisation.
    */
    return validateSale();
  };
/* =====================================================
   SYNCHRONISATION VENTE → SUPABASE
===================================================== */

const syncSaleToSupabase = async (saleRecord) => {
  try {
    if (!saleRecord?.id) return false;

    let syncMap = {};
    try {
      syncMap = JSON.parse(localStorage.getItem("monalix_supabase_sale_map") || "{}");
    } catch {
      syncMap = {};
    }

    const { orgId, branchId, deviceId } = getMonalixInstallationContext();

    if (!orgId || !branchId || !deviceId) {
      console.warn(
        "⚠️ MONALIX n'est pas configuré pour MONALIX CONTROL. Configurez l'installation avant de synchroniser les ventes."
      );
      return false;
    }

    const org = { id: orgId };

    const localClientId = `client-${saleRecord.id}`;

    const { data: existingSale, error: existingSaleError } = await supabase
      .from("mon_sales")
      .select("id")
      .eq("org_id", org.id)
      .eq("client_id", localClientId)
      .maybeSingle();

    if (existingSaleError) {
      console.error("❌ Vérification vente Supabase :", existingSaleError);
      return false;
    }

    const supabaseSaleId = existingSale?.id || syncMap?.[saleRecord.id] || crypto.randomUUID();
    const totalUSD = Number(saleRecord.totalUSD || 0);
    const totalFC = Number(saleRecord.totalFC || 0);
    const exchangeRateValue = Number(saleRecord.exchangeRate || (totalUSD > 0 && totalFC > 0 ? totalFC / totalUSD : 2850)) || 2850;

    const saleData = {
      id: supabaseSaleId,
      org_id: org.id,
      client_id: localClientId,
      activity: saleRecord.activity || "commerce",
      cashier_name: saleRecord.cashier || null,
      sale_date: saleRecord.date || new Date().toISOString(),
      total_usd: totalUSD,
      total_fc: totalFC,
      profit_usd: Number(saleRecord.profitUSD || 0),
      profit_fc: Number(saleRecord.profitFC || 0),
      payment_method: saleRecord.paymentMethod || "Espèces",
      payment_currency: saleRecord.paymentCurrency || null,
      amount_received: Number(saleRecord.amountReceived || 0),
      amount_received_usd: Number(saleRecord.amountReceivedUSD || 0),
      change_usd: Number(saleRecord.changeUSD || 0),
      change_fc: Number(saleRecord.changeFC || 0),
      exchange_rate: exchangeRateValue,
      status: "completed",
    };

    const { error: saleError } = existingSale?.id
      ? await supabase.from("mon_sales").update(saleData).eq("id", supabaseSaleId)
      : await supabase.from("mon_sales").insert(saleData);

    if (saleError) {
      console.error("❌ Synchronisation financière vente :", saleError);
      return false;
    }

    const items = Array.isArray(saleRecord.items)
      ? saleRecord.items.map((item) => ({
          sale_id: supabaseSaleId,
          product_name: item?.name || "Produit",
          quantity: Number(item?.quantity || 0),
        }))
      : [];

    if (!existingSale?.id && items.length) {
      const { error: itemsError } = await supabase
        .from("mon_sale_items")
        .insert(items);
      if (itemsError) {
        console.error("❌ Synchronisation articles :", itemsError);
        return false;
      }
    }

    syncMap[saleRecord.id] = supabaseSaleId;
    try {
      localStorage.setItem("monalix_supabase_sale_map", JSON.stringify(syncMap));
    } catch {}

    console.log("✅ Vente synchronisée avec montants :", {
      id: supabaseSaleId,
      totalUSD,
      totalFC,
      profitUSD: Number(saleRecord.profitUSD || 0),
      profitFC: Number(saleRecord.profitFC || 0),
    });

    return true;
  } catch (error) {
    console.error("❌ Erreur générale synchronisation vente :", error);
    return false;
  }
};

/* =====================================================
   SYNCHRONISATION MOUVEMENTS DE STOCK → SUPABASE
   Appelée uniquement après finalisation de la vente.
===================================================== */

const syncStockMovementsToSupabase = async (saleRecord) => {
  try {

    if (!saleRecord?.id || !Array.isArray(saleRecord.items)) {
      console.error("❌ Mouvement stock impossible : vente invalide.");
      return false;
    }

    const { orgId, branchId, deviceId } = getMonalixInstallationContext();

    if (!orgId || !branchId || !deviceId) {
      console.warn(
        "⚠️ MONALIX n'est pas configuré pour MONALIX CONTROL. Mouvement de stock non synchronisé."
      );
      return false;
    }

    const org = { id: orgId };

    const movements = saleRecord.items.map((item, index) => {
      const localProductId =
        item?.productId ??
        item?.id ??
        null;

      const clientId =
        `stock-${saleRecord.id}-${localProductId || index}`;

      return {
        id: crypto.randomUUID(),
        org_id: org.id,
        branch_id: branchId,
        device_id: deviceId,
        product_id: null,
        product_name: item?.name || "Produit",
        movement_type: "sortie",
        reason: "Vente",
        quantity: Number(item?.quantity || 0),
        activity: saleRecord.activity || "commerce",
        cashier_name: saleRecord.cashier || null,
        purchase_price: Number(item?.purchasePrice || 0),
        purchase_price_currency: item?.purchasePriceCurrency || null,
        sale_price: Number(item?.salePrice || 0),
        sale_price_currency: item?.salePriceCurrency || null,
        purchase_price_usd: Number(item?.purchasePriceUSD || 0),
        sale_price_usd: Number(item?.salePriceUSD || 0),
        total_usd: Number(item?.totalUSD || 0),
        total_fc: Number(item?.totalFC || 0),
        profit_usd: Number(item?.profitUSD || 0),
        profit_fc: Number(item?.profitFC || 0),
        movement_date: saleRecord.date || new Date().toISOString(),
        client_id: clientId,
        metadata: {
          sale_id_local: saleRecord.id,
          product_id_local: localProductId,
          establishment: saleRecord.establishment || null,
          reference: saleRecord.id
        }
      };
    });

    if (movements.length === 0) {
      console.warn("⚠️ Aucun mouvement de stock à synchroniser.");
      return true;
    }

    const { error } = await supabase
      .from("mon_stock_movements")
      .upsert(movements, {
        onConflict: "org_id,client_id"
      });

    if (error) {
      console.error("❌ Erreur synchronisation mouvements stock :", error);
      return false;
    }

    console.log(
      "✅ Mouvements de stock synchronisés vers Supabase :",
      movements.length
    );

    return true;

  } catch (error) {
    console.error("❌ Erreur générale mouvements stock :", error);
    return false;
  }
};

/* =====================================================
   VALIDATION VENTE
   Prépare la vente et ouvre la facture.
   Le stock sera diminué uniquement lors de la
   finalisation de la vente.
===================================================== */

const validateSale = async () => {

  /* =================================================
     PROTECTION CONTRE UNE DOUBLE VALIDATION
  ================================================= */

  if (saleValidated) {
    return;
  }


  /* =================================================
     VÉRIFICATION DU PANIER
  ================================================= */

  if (safeCurrentCart.length === 0) {

    alert(
      "Veuillez ajouter au moins un article."
    );

    return;
  }


  /* =================================================
     TAUX DE CHANGE CENTRAL
  ================================================= */

  const currentRate =
    Number(exchangeRate) > 0
      ? Number(exchangeRate)
      : 2850;


  /* =================================================
     VÉRIFICATION DU PAIEMENT
  ================================================= */

  if (!isPaymentComplete) {

    alert(
      "Le montant reçu est insuffisant."
    );

    return;
  }


  /* =================================================
     ÉTABLISSEMENT
  ================================================= */

  const branch =
    selectedBranch ||
    "Établissement principal";


  /* =================================================
     PRÉPARATION DES ARTICLES DE LA VENTE
     USD + FC + BÉNÉFICE
  ================================================= */

  const saleItems =
    safeCurrentCart.map(
      (item) => {

        /* =============================================
           QUANTITÉ
        ============================================= */

        const quantity =
          Math.max(
            0,
            toSafeNumber(
              getProductQuantity(item)
            )
          );


        /* =============================================
           DEVISE PRIX DE VENTE
        ============================================= */

        const saleCurrency =
          String(
            item.priceCurrency ||
            "USD"
          )
            .toUpperCase()
            .trim() === "FC"
            ? "FC"
            : "USD";


        /* =============================================
           DEVISE PRIX D'ACHAT
        ============================================= */

        const purchaseCurrency =
          String(
            item.purchasePriceCurrency ||
            "USD"
          )
            .toUpperCase()
            .trim() === "FC"
            ? "FC"
            : "USD";


        /* =============================================
           PRIX DE VENTE
        ============================================= */

        const salePrice =
          Math.max(
            0,
            toSafeNumber(
              getProductPrice(item)
            )
          );


        /* =============================================
           PRIX D'ACHAT
        ============================================= */

        const purchasePrice =
          Math.max(
            0,
            toSafeNumber(
              item.purchasePrice
            )
          );


        /* =============================================
           NORMALISATION PRIX DE VENTE → USD
        ============================================= */

        const salePriceUSD =
          saleCurrency === "FC"
            ? salePrice / currentRate
            : salePrice;


        /* =============================================
           NORMALISATION PRIX D'ACHAT → USD
        ============================================= */

        const purchasePriceUSD =
          purchaseCurrency === "FC"
            ? purchasePrice / currentRate
            : purchasePrice;


        /* =============================================
           MARGE UNITAIRE USD
        ============================================= */

        const unitProfitUSD =
          salePriceUSD -
          purchasePriceUSD;


        /* =============================================
           TOTAL DE LA LIGNE USD
        ============================================= */

        const totalUSD =
          salePriceUSD *
          quantity;


        /* =============================================
           BÉNÉFICE TOTAL USD
        ============================================= */

        const profitUSD =
          unitProfitUSD *
          quantity;


        /* =============================================
           PRIX DE VENTE → FC
        ============================================= */

        const salePriceFC =
          saleCurrency === "FC"
            ? Math.round(
                salePrice
              )
            : Math.round(
                salePriceUSD *
                currentRate
              );


        /* =============================================
           PRIX D'ACHAT → FC
        ============================================= */

        const purchasePriceFC =
          purchaseCurrency === "FC"
            ? Math.round(
                purchasePrice
              )
            : Math.round(
                purchasePriceUSD *
                currentRate
              );


        /* =============================================
           MARGE UNITAIRE FC
        ============================================= */

        const unitProfitFC =
          Math.round(
            unitProfitUSD *
            currentRate
          );


        /* =============================================
           TOTAL FC
        ============================================= */

        const totalFC =
          Math.round(
            totalUSD *
            currentRate
          );


        /* =============================================
           BÉNÉFICE FC
        ============================================= */

        const profitFC =
          Math.round(
            profitUSD *
            currentRate
          );


        /* =============================================
           ARTICLE DE VENTE
        ============================================= */

        return {

          productId:
            item.id,

          name:
            item.name ||
            "Produit",

          code:
            item.code ||
            "",

          category:
            item.category ||
            "",

          quantity,

          purchasePrice,

          purchasePriceCurrency:
            purchaseCurrency,

          purchasePriceUSD,

          purchasePriceFC,

          salePrice,

          salePriceCurrency:
            saleCurrency,

          salePriceUSD,

          salePriceFC,

          unitProfit:
            unitProfitUSD,

          unitProfitUSD,

          unitProfitFC,

          total:
            totalUSD,

          totalUSD,

          totalFC,

          profit:
            profitUSD,

          profitUSD,

          profitFC,

          unit:
            item.unit ||
            "Pièce",

        };

      }
    );


  /* =================================================
     CALCUL GLOBAL DE LA VENTE
  ================================================= */

  const saleTotalUSD =
    saleItems.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.totalUSD || 0
        ),
      0
    );


  const saleTotalFC =
    Math.round(
      saleTotalUSD *
      currentRate
    );


  const saleProfitUSD =
    saleItems.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.profitUSD || 0
        ),
      0
    );


  const saleProfitFC =
    Math.round(
      saleProfitUSD *
      currentRate
    );


  /* =================================================
     VÉRIFICATION DU STOCK
     
     IMPORTANT :
     Le stock est seulement vérifié ici.
     Il n'est PAS diminué.
  ================================================= */

  const stockErrors = [];


  saleItems.forEach(
    (saleItem) => {

      const product =
        currentProducts.find(
          (item) =>
            String(item.id) ===
            String(
              saleItem.productId
            )
        );


      if (!product) {

        stockErrors.push(
          `${saleItem.name} : produit introuvable`
        );

        return;
      }


      const availableStock =
        Math.max(
          0,
          Number(
            getProductStock(product)
          ) || 0
        );


      if (
        saleItem.quantity >
        availableStock
      ) {

        stockErrors.push(
          `${saleItem.name} : stock disponible ${availableStock}, quantité demandée ${saleItem.quantity}`
        );

      }

    }
  );


  /* =================================================
     BLOQUER SI STOCK INSUFFISANT
  ================================================= */

  if (
    stockErrors.length > 0
  ) {

    alert(
      "Stock insuffisant :\n\n" +
      stockErrors.join("\n")
    );

    return;
  }


  /* =================================================
     CRÉATION DE LA VENTE EN ATTENTE
     
     Elle sera finalisée après impression.
  ================================================= */

  const saleRecord = {

    id:
      `sale-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

    date:
      new Date().toISOString(),

    activity:
      activeActivity,

    establishment:
      branch,

    cashier:
      selectedCashier,

    items:
      saleItems,


    /* ===============================================
       TOTAUX
    =============================================== */

    totalUSD:
      saleTotalUSD,

    totalFC:
      saleTotalFC,


    /* ===============================================
       BÉNÉFICE
    =============================================== */

    profitUSD:
      saleProfitUSD,

    profitFC:
      saleProfitFC,


    /* ===============================================
       PAIEMENT
    =============================================== */

    paymentMethod:
      paymentMethod ||
      "Espèces",

    paymentCurrency:
      currency,

    amountReceived:
      receivedValue,

    amountReceivedUSD:
      receivedUSD,

    changeUSD:
      changeUSD,

    changeFC:
      changeFC,

  };


  /* =================================================
     SAUVEGARDE TEMPORAIRE
  ================================================= */

  try {

    localStorage.setItem(
      "monalix_pending_sale",
      JSON.stringify(
        saleRecord
      )
    );

  } catch (error) {

    console.error(
      "Erreur lors de la préparation de la vente :",
      error
    );

    alert(
      "Impossible de préparer la vente."
    );

    return;
  }


  /* =================================================
     VALIDATION VISUELLE
  ================================================= */

  setSaleValidated(
    true
  );

  setInvoicePrinted(false);


  /* =================================================
     OUVERTURE DE LA FACTURE
     
     À ce stade :
     - le stock n'a pas diminué
     - la vente n'est pas enregistrée définitivement
     - aucun mouvement de stock n'est créé
     - Supabase n'est pas encore synchronisé
  ================================================= */

  setInvoiceModal(
    true
  );

};

/* =====================================================
   FINALISER LA VENTE
   - Le stock diminue uniquement après impression.
   - Le produit reste dans le catalogue.
   - Seule la quantité de stock est diminuée.
   - La vente et le mouvement sont enregistrés ici.
   - Supabase est synchronisé après la finalisation.
===================================================== */

const closeInvoice = async () => {

  /* Une facture validée doit être imprimée avant de sortir du stock. */
  if (!saleValidated) {
    setInvoiceModal(false);
    return;
  }

  if (!invoicePrinted) {
    alert(
      "Veuillez d'abord imprimer la facture avant de finaliser la vente."
    );
    return;
  }

  /* =================================================
     RÉCUPÉRER LA VENTE EN ATTENTE
  ================================================= */

  let saleRecord = null;

  try {
    const pendingSale =
      localStorage.getItem("monalix_pending_sale");

    if (!pendingSale) {
      alert("Aucune vente en attente à finaliser.");
      return;
    }

    saleRecord = JSON.parse(pendingSale);

  } catch (error) {
    console.error(
      "Erreur lecture vente en attente :",
      error
    );
    alert("Impossible de récupérer la vente en attente.");
    return;
  }

  if (
    !saleRecord ||
    !Array.isArray(saleRecord.items) ||
    saleRecord.items.length === 0
  ) {
    alert("La vente en attente est invalide ou vide.");
    return;
  }

  const activityKey =
    String(
      saleRecord.activity ||
      activeActivity ||
      "commerce"
    )
      .toLowerCase()
      .trim();

  const activity =
    activityKey === "restaurant"
      ? "restaurant"
      : activityKey === "habillement"
        ? "habillement"
        : activityKey === "pharmacie"
          ? "pharmacie"
          : "commerce";

  const branch =
    saleRecord.establishment ||
    selectedBranch ||
    "Établissement principal";

  /* =================================================
     VÉRIFICATION + DIMINUTION DU STOCK
     On travaille sur la bonne activité et le bon magasin.
  ================================================= */

  const activityProducts =
    Array.isArray(products?.[activity])
      ? products[activity]
      : [];

  if (activityProducts.length === 0) {
    alert("Impossible de trouver les produits de cette activité.");
    return;
  }

  const stockErrors = [];

  const updatedActivityProducts =
    activityProducts.map((product) => ({
      ...product,
      stockByBranch:
        product?.stockByBranch &&
        typeof product.stockByBranch === "object"
          ? { ...product.stockByBranch }
          : product?.stockByBranch,
    }));

  saleRecord.items.forEach((saleItem) => {

    const quantitySold =
      Number(saleItem?.quantity || 0);

    if (!Number.isFinite(quantitySold) || quantitySold <= 0) {
      stockErrors.push(
        `${saleItem?.name || "Produit"} : quantité invalide.`
      );
      return;
    }

    const productIndex =
      updatedActivityProducts.findIndex(
        (product) =>
          String(product?.id) ===
          String(saleItem?.productId)
      );

    if (productIndex === -1) {
      stockErrors.push(
        `${saleItem?.name || "Produit"} : produit introuvable dans le catalogue.`
      );
      return;
    }

    const product =
      updatedActivityProducts[productIndex];

    const currentStock =
      getProductStock(product, branch);

    if (quantitySold > currentStock) {
      stockErrors.push(
        `${saleItem?.name || product?.name || "Produit"} : stock disponible ${currentStock}, quantité demandée ${quantitySold}.`
      );
      return;
    }

    /* Stock par magasin : on ne supprime jamais le produit. */
    if (
      product.stockByBranch &&
      typeof product.stockByBranch === "object"
    ) {

      const stockByBranch = {
        ...product.stockByBranch,
      };

      stockByBranch[branch] =
        Math.max(
          0,
          Number(stockByBranch[branch] || 0) -
            quantitySold
        );

      const totalStock =
        Object.values(stockByBranch).reduce(
          (sum, value) =>
            sum + Number(value || 0),
          0
        );

      updatedActivityProducts[productIndex] = {
        ...product,
        stockByBranch,
        stock: totalStock,
      };

    } else {

      updatedActivityProducts[productIndex] = {
        ...product,
        stock:
          Math.max(
            0,
            Number(product.stock || 0) -
              quantitySold
          ),
      };
    }
  });

  if (stockErrors.length > 0) {
    alert(
      "Impossible de finaliser la vente :\n\n" +
      stockErrors.join("\n")
    );
    return;
  }

  /* =================================================
     ENREGISTRER LE NOUVEAU STOCK
  ================================================= */

  const updatedProducts = {
    ...(products || {}),
    [activity]: updatedActivityProducts,
  };

  try {
    localStorage.setItem(
      "monalix_products",
      JSON.stringify(updatedProducts)
    );
  } catch (error) {
    console.error(
      "Erreur sauvegarde stock :",
      error
    );
    alert("Impossible de sauvegarder le nouveau stock.");
    return;
  }

  setProducts(updatedProducts);

  /* =================================================
     HISTORIQUE DES VENTES LOCAL
  ================================================= */

  try {
    const savedSales =
      JSON.parse(
        localStorage.getItem("monalix_sales") || "[]"
      );

    const sales =
      Array.isArray(savedSales)
        ? savedSales
        : [];

    const alreadyRecorded =
      sales.some(
        (sale) =>
          String(sale?.id) ===
          String(saleRecord.id)
      );

    if (!alreadyRecorded) {
      sales.push(saleRecord);
    }

    localStorage.setItem(
      "monalix_sales",
      JSON.stringify(sales)
    );

  } catch (error) {
    console.error(
      "Erreur enregistrement historique vente :",
      error
    );
    alert("Impossible d'enregistrer l'historique de la vente.");
    return;
  }

  /* =================================================
     MOUVEMENTS DE STOCK LOCAL
  ================================================= */

  try {
    const savedMovements =
      JSON.parse(
        localStorage.getItem(
          "monalix_stock_movements"
        ) || "[]"
      );

    const movements =
      Array.isArray(savedMovements)
        ? savedMovements
        : [];

    const alreadyMoved =
      movements.some(
        (movement) =>
          String(movement?.reference) ===
          String(saleRecord.id)
      );

    if (!alreadyMoved) {

      saleRecord.items.forEach((saleItem) => {

        movements.push({
          id:
            `movement-${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 8)}`,
          date:
            new Date().toISOString(),
          type:
            "sortie",
          reason:
            "Vente",
          activity:
            activity,
          establishment:
            branch,
          cashier:
            saleRecord.cashier ||
            selectedCashier,
          productId:
            saleItem.productId,
          productName:
            saleItem.name,
          quantity:
            Number(saleItem.quantity || 0),
          purchasePrice:
            saleItem.purchasePrice,
          purchasePriceCurrency:
            saleItem.purchasePriceCurrency,
          salePrice:
            saleItem.salePrice,
          salePriceCurrency:
            saleItem.salePriceCurrency,
          purchasePriceUSD:
            saleItem.purchasePriceUSD,
          salePriceUSD:
            saleItem.salePriceUSD,
          total:
            saleItem.totalUSD,
          totalUSD:
            saleItem.totalUSD,
          totalFC:
            saleItem.totalFC,
          profit:
            saleItem.profitUSD,
          profitUSD:
            saleItem.profitUSD,
          profitFC:
            saleItem.profitFC,
          reference:
            saleRecord.id,
        });
      });
    }

    localStorage.setItem(
      "monalix_stock_movements",
      JSON.stringify(movements)
    );

  } catch (error) {
    console.error(
      "Erreur enregistrement mouvement stock :",
      error
    );
  }

  /* =================================================
     SYNCHRONISATION SUPABASE
     Vente + articles + mouvements de stock
     uniquement après impression et finalisation.
  ================================================= */

  try {
    await syncSaleToSupabase(saleRecord);
  } catch (error) {
    console.error(
      "Erreur synchronisation vente Supabase :",
      error
    );
  }

  try {
    await syncStockMovementsToSupabase(saleRecord);
  } catch (error) {
    console.error(
      "Erreur synchronisation mouvements stock Supabase :",
      error
    );
  }

  /* =================================================
     SUPPRIMER LA VENTE EN ATTENTE
  ================================================= */

  localStorage.removeItem(
    "monalix_pending_sale"
  );

  /* =================================================
     FERMER LA FACTURE ET NETTOYER LA CAISSE
  ================================================= */

  setInvoiceModal(false);
  setAmountReceived("");
  setSaleValidated(false);
  setInvoicePrinted(false);

  if (activity === "restaurant") {

    if (selectedTable) {
      setTableOrders((previous) => {
        const updated = {
          ...previous,
        };

        delete updated[selectedTable];

        return updated;
      });
    }

    setSelectedTable(null);

  } else {
    setCart([]);
  }

  /* =================================================
     RETOUR SELON LE RÔLE
  ================================================= */

  const role =
    String(loggedRole || "")
      .toLowerCase()
      .trim();

  if (role === "caissier") {
    setActiveService("caisse");
  } else {
    setActiveService("dashboard");
  }

  console.log(
    "✅ Vente finalisée :",
    saleRecord.id
  );
};


/* =====================================================
   IMPRIMER
===================================================== */

const printInvoice = () => {
  const invoice = document.getElementById("invoice-print");

  if (!invoice) {
    console.error("Facture introuvable.");
    return;
  }

  const printWindow = window.open(
    "",
    "_blank",
    "width=380,height=700"
  );

  if (!printWindow) {
    alert(
      "Impossible d'ouvrir l'aperçu de la facture. Autorisez les fenêtres."
    );
    return;
  }

  const invoiceHTML = invoice.innerHTML;

  printWindow.document.open();

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <title>Ticket MONALIX</title>

      <style>

        /* =========================================
           TICKET THERMIQUE — 80 MM
        ========================================= */

        @page {
          size: 80mm auto;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 80mm;
          background: #ffffff;
          color: #000000;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 10px;
        }

        body {
          width: 80mm;
          padding: 2.5mm 3mm;
        }

        .invoice-print-page {
          width: 74mm;
          max-width: 74mm;
          margin: 0 auto;
          padding: 0;
          background: #ffffff;
        }

        .invoice-print-page * {
          color: #000000 !important;
        }

        /* =========================================
           LOGO / EN-TÊTE
        ========================================= */

        .invoice-brand {
          text-align: center;
          margin: 0 0 5px 0;
        }

        .invoice-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1px;
        }

        .invoice-logo-inner {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          font-weight: 900;
          line-height: 1;
        }

        .invoice-logo-accent {
          display: none !important;
        }

        .invoice-brand h2 {
          margin: 2px 0 1px 0;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 0.4px;
        }

        .invoice-brand p {
          margin: 0;
          font-size: 7px;
          letter-spacing: 0.8px;
        }

        /* =========================================
           MAGASIN
        ========================================= */

        .invoice-establishment {
          text-align: center;
          padding: 4px 0;
          margin-bottom: 3px;
          border-top: 1px dashed #000000;
          border-bottom: 1px dashed #000000;
        }

        .invoice-establishment strong {
          display: block;
          font-size: 11px;
          font-weight: 900;
        }

        .invoice-establishment span {
          display: block;
          margin-top: 1px;
          font-size: 8px;
        }

        /* =========================================
           DATE / HEURE
        ========================================= */

        .invoice-meta {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 3px 0;
          margin-bottom: 2px;
          border-bottom: 1px dashed #000000;
        }

        .invoice-meta > div {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .invoice-meta span {
          font-size: 7px;
        }

        .invoice-meta strong {
          font-size: 8px;
          font-weight: 700;
        }

        /* =========================================
           TABLE RESTAURANT
        ========================================= */

        .invoice-table {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 0;
          border-bottom: 1px dashed #000000;
          font-size: 8px;
        }

        /* =========================================
           CAISSIER
        ========================================= */

        .invoice-cashier {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 0;
          margin-bottom: 2px;
          border-bottom: 1px dashed #000000;
          font-size: 8px;
        }

        .invoice-cashier strong {
          margin-left: 1px;
          font-weight: 800;
        }

        /* =========================================
           ARTICLES
        ========================================= */

        .invoice-items {
          width: 100%;
          padding: 0;
          margin: 0;
        }

        .invoice-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 5px;
          width: 100%;
          padding: 4px 0;
          border-bottom: 1px dotted #888888;
        }

        .invoice-item > div:first-child {
          flex: 1;
          min-width: 0;
        }

        .invoice-item > div:last-child {
          flex-shrink: 0;
          min-width: 24mm;
          text-align: right;
        }

        .invoice-item strong {
          display: block;
          font-size: 9px;
          line-height: 1.15;
          font-weight: 800;
        }

        .invoice-item span {
          display: block;
          margin-top: 1px;
          font-size: 7px;
          line-height: 1.15;
        }

        .invoice-item small {
          display: block;
          margin-top: 1px;
          font-size: 6.5px;
          line-height: 1.1;
        }

        /* =========================================
           TOTAL
        ========================================= */

        .invoice-total {
          width: 100%;
          margin-top: 5px;
          padding: 5px 0;
          border-top: 2px solid #000000;
          border-bottom: 2px solid #000000;
          text-align: right;
        }

        .invoice-total span {
          display: block;
          text-align: left;
          font-size: 9px;
          font-weight: 900;
        }

        .invoice-total strong {
          display: block;
          margin-top: 2px;
          font-size: 13px;
          line-height: 1.1;
          font-weight: 900;
        }

        .invoice-total small {
          display: block;
          margin-top: 1px;
          font-size: 8px;
          font-weight: 800;
        }

        /* =========================================
           PAIEMENT
        ========================================= */

        .invoice-payment {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 0;
          border-bottom: 1px dashed #000000;
          font-size: 8px;
        }

        .invoice-payment strong {
          font-weight: 900;
        }

        /* =========================================
           PIED DU TICKET
        ========================================= */

        .invoice-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 5px;
          margin-top: 1px;
        }

        .invoice-footer strong {
          margin-top: 2px;
          font-size: 9px;
          font-weight: 800;
        }

        .invoice-footer span {
          margin-top: 1px;
          font-size: 7px;
        }

        /* =========================================
           ICÔNES
        ========================================= */

        svg {
          width: 10px;
          height: 10px;
          max-width: 10px;
          max-height: 10px;
        }

        /* =========================================
           BOUTONS
        ========================================= */

        button {
          display: none !important;
        }

        /* =========================================
           IMPRESSION
        ========================================= */

        @media print {

          @page {
            size: 80mm auto;
            margin: 0;
          }

          html,
          body {
            width: 80mm;
            margin: 0;
            padding: 0;
          }

          body {
            padding: 2.5mm 3mm;
          }

          .invoice-print-page {
            width: 74mm;
            max-width: 74mm;
            margin: 0 auto;
          }

        }

      </style>
    </head>

    <body>

      <div class="invoice-print-page">
        ${invoiceHTML}
      </div>

    </body>
    </html>
  `);

  printWindow.document.close();

  const startPrint = () => {
    setTimeout(() => {
      printWindow.focus();
      setInvoicePrinted(true);
      printWindow.print();
    }, 800);
  };

  if (
    printWindow.document.readyState ===
    "complete"
  ) {
    startPrint();
  } else {
    printWindow.onload = startPrint;
  }
};

/* =====================================================
   CHANGEMENT ACTIVITÉ
===================================================== */
/* =====================================================
   CONNEXION MONALIX
===================================================== */

const hashPassword = async (value) => {
  const data = new TextEncoder().encode(String(value));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const getInstallationPasswordHash = () => {
  const stored = localStorage.getItem("monalix_installation_password_hash");
  if (stored) return stored;
  // SHA-256 de 1234 : mot de passe initial, jamais stocké en clair.
  return "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
};

const handleLogin = async () => {
  setLoginError("");

  const username = String(loginUsername || "").trim().toLowerCase();
  const password = String(loginPassword || "");
  const user = monalixUsersState.find(
    (item) => String(item.username || "").toLowerCase() === username
  );

  if (!user || user.active === false) {
    setLoginError("Nom d'utilisateur ou mot de passe incorrect.");
    return;
  }

  const passwordHash = await hashPassword(password);
  const storedHash = user.passwordHash || DEFAULT_PASSWORD_HASH;

  if (passwordHash !== storedHash) {
    setLoginError("Nom d'utilisateur ou mot de passe incorrect.");
    return;
  }

  /* =====================================================
     ACTIVITÉ AUTORISÉE PAR MONALIX CONTROL
     Si l'installation est déjà liée à un client + établissement,
     la licence Supabase détermine l'activité disponible.
  ===================================================== */

  let activityForUser =
    user.activities?.[0] || "commerce";

  const installationContext =
    getMonalixInstallationContext();

  if (
    installationContext.orgId &&
    installationContext.branchId
  ) {
    try {
      const now = new Date().toISOString();

      const { data: activeLicenses, error: licenseLoginError } =
        await supabase
          .from("mon_licenses")
          .select(
            "id, org_id, branch_id, activity_id, license_code, status, starts_at, expires_at, max_devices"
          )
          .eq("org_id", installationContext.orgId)
          .eq("status", "active")
          .lte("starts_at", now)
          .gte("expires_at", now)
          .or(
            `branch_id.eq.${installationContext.branchId},branch_id.is.null`
          )
          .order("created_at", { ascending: false });

      if (licenseLoginError) {
        console.error(
          "❌ Vérification licence lors de la connexion :",
          licenseLoginError
        );
        setLoginError(
          "Impossible de vérifier la licence MONALIX. Vérifiez la connexion Internet."
        );
        return;
      }

      const validLicenses =
        (activeLicenses || []).filter(
          (license) =>
            license?.activity_id &&
            String(license.org_id) ===
              String(installationContext.orgId) &&
            (
              !license.branch_id ||
              String(license.branch_id) ===
                String(installationContext.branchId)
            )
        );

      if (validLicenses.length === 0) {
        setLoginError(
          "Aucune licence MONALIX active n'est associée à cet établissement."
        );
        return;
      }

      activityForUser = String(
        validLicenses[0].activity_id
      )
        .toLowerCase()
        .trim();

      const licensedIds = [
        ...new Set(
          validLicenses.map((license) =>
            String(license.activity_id)
              .toLowerCase()
              .trim()
          )
        ),
      ];

      setLicensedActivityIds(licensedIds);
      setLicenseInfo(validLicenses[0]);
      setLicenseError("");
    } catch (licenseError) {
      console.error(
        "❌ Erreur licence MONALIX lors de la connexion :",
        licenseError
      );
      setLoginError(
        "Impossible de vérifier la licence MONALIX."
      );
      return;
    }
  }

  setLoggedUser(user.name);
  setLoggedRole(user.role);
  setActiveActivity(activityForUser);
  setActiveService(
    user.role === "caissier"
      ? "caisse"
      : "dashboard"
  );
  setIsAuthenticated(true);

  const branches =
    establishmentsByActivity[activityForUser] ||
    [];

  setSelectedBranch(
    user.branches?.[0] ||
      branches[0] ||
      installationBranchName ||
      ""
  );

  setSelectedCashier(user.name);

  try {
    localStorage.setItem("monalix_users", JSON.stringify(monalixUsersState));
    localStorage.setItem("monalix_authenticated", "true");
    localStorage.setItem("monalix_logged_user", user.name);
    localStorage.setItem("monalix_logged_role", user.role);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la connexion :", error);
  }

  setLoginUsername("");
  setLoginPassword("");
  setLoginError("");
};

/* =====================================================
   DÉCONNEXION MONALIX
===================================================== */

const handleLogout = () => {
  setIsAuthenticated(false);
  setLoggedUser("");
  setLoggedRole("");
  setLoginUsername("");
  setLoginPassword("");
  setLoginError("");

  try {
    localStorage.removeItem("monalix_authenticated");
    localStorage.removeItem("monalix_logged_user");
    localStorage.removeItem("monalix_logged_role");
  } catch (error) {
    console.error(
      "Erreur lors de la déconnexion :",
      error
    );
  }

  setActiveActivity("commerce");
  setActiveService("dashboard");
};
const persistUsers = (nextUsers) => {
  setMonalixUsersState(nextUsers);
  localStorage.setItem("monalix_users", JSON.stringify(nextUsers));
};

const handleChangePassword = async (event) => {
  event?.preventDefault?.();
  setPasswordMessage("");
  const { oldPassword, newPassword, confirmPassword } = passwordForm;

  if (!oldPassword || !newPassword || !confirmPassword) {
    setPasswordMessage("Veuillez remplir les trois champs.");
    return;
  }
  if (newPassword.length < 4) {
    setPasswordMessage("Le nouveau mot de passe doit contenir au moins 4 caractères.");
    return;
  }
  if (newPassword !== confirmPassword) {
    setPasswordMessage("La confirmation du nouveau mot de passe ne correspond pas.");
    return;
  }

  const oldHash = await hashPassword(oldPassword);
  const currentUser = monalixUsersState.find((user) => user.name === loggedUser);
  if (!currentUser || oldHash !== (currentUser.passwordHash || DEFAULT_PASSWORD_HASH)) {
    setPasswordMessage("Ancien mot de passe incorrect.");
    return;
  }

  const newHash = await hashPassword(newPassword);
  const nextUsers = monalixUsersState.map((user) =>
    user.id === currentUser.id ? { ...user, passwordHash: newHash, mustChangePassword: false } : user
  );
  persistUsers(nextUsers);
  setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  setPasswordMessage("Mot de passe modifié avec succès sur cette installation.");
};

const openUserForm = (user = null) => {
  setUserMessage("");
  setUserForm(user ? { ...user } : {
    id: `user-${Date.now()}`,
    username: "",
    name: "",
    role: "caissier",
    password: "1234",
    active: true,
    mustChangePassword: false,
    activities: ["commerce"],
    branches: ["Magasin Golf"],
  });
};

const saveUserFromAdmin = async (event) => {
  event?.preventDefault?.();
  if (!userForm) return;
  const username = String(userForm.username || "").trim().toLowerCase();
  const name = String(userForm.name || "").trim();
  if (!username || !name) {
    setUserMessage("Le nom complet et le nom d'utilisateur sont obligatoires.");
    return;
  }
  const duplicate = monalixUsersState.find(
    (user) => user.username.toLowerCase() === username && user.id !== userForm.id
  );
  if (duplicate) {
    setUserMessage("Ce nom d'utilisateur existe déjà.");
    return;
  }

  let passwordHash = userForm.passwordHash || DEFAULT_PASSWORD_HASH;
  if (userForm.password) {
    if (String(userForm.password).length < 4) {
      setUserMessage("Le mot de passe doit contenir au moins 4 caractères.");
      return;
    }
    passwordHash = await hashPassword(userForm.password);
  }

  const cleanUser = {
    id: userForm.id || `user-${Date.now()}`,
    username,
    name,
    role: userForm.role === "admin" ? "admin" : "caissier",
    passwordHash,
    active: userForm.active !== false,
    mustChangePassword: Boolean(userForm.mustChangePassword),
    activities: Array.isArray(userForm.activities) && userForm.activities.length ? userForm.activities : ["commerce"],
    branches: Array.isArray(userForm.branches) ? userForm.branches : [],
  };

  const exists = monalixUsersState.some((user) => user.id === cleanUser.id);
  const nextUsers = exists
    ? monalixUsersState.map((user) => user.id === cleanUser.id ? cleanUser : user)
    : [...monalixUsersState, cleanUser];

  persistUsers(nextUsers);
  setUserForm(null);
  setUserMessage(exists ? "Utilisateur modifié." : "Utilisateur créé.");
};

const resetUserPassword = async (userId) => {
  if (loggedRole !== "admin") return;
  const target = monalixUsersState.find((user) => user.id === userId);
  if (!target) return;
  const newPassword = window.prompt(`Nouveau mot de passe pour ${target.name} :`, "1234");
  if (newPassword === null) return;
  if (newPassword.length < 4) {
    alert("Le mot de passe doit contenir au moins 4 caractères.");
    return;
  }
  const passwordHash = await hashPassword(newPassword);
  persistUsers(monalixUsersState.map((user) =>
    user.id === userId ? { ...user, passwordHash, mustChangePassword: true } : user
  ));
  alert(`Le mot de passe de ${target.name} a été réinitialisé.`);
};

const toggleUserActive = (userId) => {
  const target = monalixUsersState.find((user) => user.id === userId);
  if (!target || target.username === "admin") return;
  persistUsers(monalixUsersState.map((user) =>
    user.id === userId ? { ...user, active: !user.active } : user
  ));
};

const toggleUserActivity = (activityId) => {
  setUserForm((current) => {
    if (!current) return current;
    const list = Array.isArray(current.activities) ? current.activities : [];
    return { ...current, activities: list.includes(activityId) ? list.filter((id) => id !== activityId) : [...list, activityId] };
  });
};

const toggleUserBranch = (branch) => {
  setUserForm((current) => {
    if (!current) return current;
    const list = Array.isArray(current.branches) ? current.branches : [];
    return { ...current, branches: list.includes(branch) ? list.filter((item) => item !== branch) : [...list, branch] };
  });
};

const savePressingOrders = (orders) => {
  setPressingOrders(orders);
  localStorage.setItem("monalix_pressing_orders", JSON.stringify(orders));
};

const getNextPressingNumber = () => {
  const max = pressingOrders.reduce((highest, order) => {
    const n = Number(String(order?.number || "").replace(/\D/g, ""));
    return Number.isFinite(n) ? Math.max(highest, n) : highest;
  }, 0);
  return `PRS-${String(max + 1).padStart(5, "0")}`;
};

const getPressingTotal = (garments = pressingGarments, serviceType = pressingForm.serviceType) =>
  garments.reduce((sum, garment) => sum + Number(garment.price || 0) * Number(garment.quantity || 1), 0);

const addPressingGarment = (event) => {
  event?.preventDefault?.();
  const type = String(garmentDraft.type || "").trim();
  const service = String(garmentDraft.service || "").trim();
  const quantity = Math.max(1, Number(garmentDraft.quantity || 1));
  if (!type || !service) {
    alert("Le type de vêtement et la prestation sont obligatoires.");
    return;
  }
  const price = Number(pressingForm.serviceType === "express" ? garmentDraft.expressPrice : garmentDraft.normalPrice);
  const garment = {
    id: `garment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    brand: String(garmentDraft.brand || "").trim(),
    color: String(garmentDraft.color || "").trim(),
    size: String(garmentDraft.size || "").trim(),
    material: String(garmentDraft.material || "").trim(),
    service,
    normalPrice: Number(garmentDraft.normalPrice || 0),
    expressPrice: Number(garmentDraft.expressPrice || 0),
    price: Number.isFinite(price) ? price : 0,
    quantity,
    condition: Array.isArray(garmentDraft.condition) ? garmentDraft.condition : [],
    description: String(garmentDraft.description || "").trim(),
    photo: garmentDraft.photo || "",
  };
  setPressingGarments((current) => [...current, garment]);
  setGarmentDraft({ ...garmentDraft, brand: "", color: "", size: "", material: "", quantity: 1, condition: [], description: "", photo: "" });
};

const removePressingGarment = (garmentId) => {
  setPressingGarments((current) => current.filter((garment) => garment.id !== garmentId));
};

const handlePressingPhoto = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    alert("La photo doit faire au maximum 2 Mo.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => setGarmentDraft((current) => ({ ...current, photo: String(reader.result || "") }));
  reader.readAsDataURL(file);
};

const calculatePressingDueDate = (serviceType) => {
  const hours = Number(serviceType === "express" ? pressingSettings.expressHours : pressingSettings.normalHours) || (serviceType === "express" ? 6 : 48);
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
};

const createPressingOrder = (event) => {
  event?.preventDefault?.();
  const clientName = String(pressingForm.clientName || "").trim();
  const phone = String(pressingForm.phone || "").trim();
  if (!clientName || !phone) {
    alert("Le nom du client et le téléphone sont obligatoires.");
    return;
  }
  if (!pressingGarments.length) {
    alert("Ajoutez au moins un vêtement à la commande.");
    return;
  }

  const total = getPressingTotal();
  const requestedPaid = Number(pressingForm.amountPaid || 0);
  const amountPaid = pressingForm.paymentTiming === "withdrawal" ? 0 : Math.min(Math.max(0, requestedPaid || total), total);
  const dueDate = pressingForm.dueDate ? new Date(pressingForm.dueDate).toISOString() : calculatePressingDueDate(pressingForm.serviceType);
  const number = getNextPressingNumber();
  const order = {
    id: `pressing-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    number,
    date: new Date().toISOString(),
    dueDate,
    activity: "pressing",
    establishment: selectedBranch,
    cashier: selectedCashier,
    clientName,
    phone,
    serviceType: pressingForm.serviceType === "express" ? "express" : "normal",
    garments: pressingGarments,
    items: pressingGarments.map((item) => `${item.quantity} × ${item.type}${item.brand ? ` — ${item.brand}` : ""}`).join(", "),
    amount: Number(total.toFixed(2)),
    total: Number(total.toFixed(2)),
    amountPaid: Number(amountPaid.toFixed(2)),
    remaining: Number((total - amountPaid).toFixed(2)),
    paymentTiming: pressingForm.paymentTiming,
    paymentMethod: pressingForm.paymentMethod,
    paymentCurrency: pressingForm.paymentCurrency,
    paymentStatus: amountPaid >= total ? "Payé" : amountPaid > 0 ? "Partiel" : "À payer",
    notes: String(pressingForm.notes || "").trim(),
    status: "Déposé",
  };

  savePressingOrders([order, ...pressingOrders]);
  setSelectedPressingOrderId(order.id);
  setPressingGarments([]);
  setPressingForm({ clientName: "", phone: "", serviceType: "normal", dueDate: "", paymentTiming: "deposit", paymentMethod: "Espèces", paymentCurrency: "USD", amountPaid: "", notes: "" });
  setPressingTab("commandes");
  alert(`${number} enregistré avec succès.`);
};

const updatePressingStatus = (orderId, status) => {
  savePressingOrders(pressingOrders.map((order) => order.id === orderId ? { ...order, status } : order));
};

const registerPressingPayment = (orderId, amount, method, currency) => {
  const value = Number(amount || 0);
  if (!(value > 0)) return;
  const nextOrders = pressingOrders.map((order) => {
    if (order.id !== orderId) return order;
    const paid = Math.min(Number(order.total || 0), Number(order.amountPaid || 0) + value);
    return { ...order, amountPaid: Number(paid.toFixed(2)), remaining: Number((Number(order.total || 0) - paid).toFixed(2)), paymentMethod: method || order.paymentMethod, paymentCurrency: currency || order.paymentCurrency, paymentStatus: paid >= Number(order.total || 0) ? "Payé" : "Partiel" };
  });
  savePressingOrders(nextOrders);
};

const printPressingTicket = (order) => {
  if (!order) return;
  const garments = Array.isArray(order.garments) ? order.garments : [];
  const win = window.open("", "_blank", "width=420,height=760");
  if (!win) { alert("Autorisez les fenêtres d'impression pour imprimer le ticket."); return; }
  const rows = garments.map((item) => `<div class="row"><div><strong>${item.quantity} × ${item.type}</strong><span>${[item.brand, item.color, item.size].filter(Boolean).join(" • ")}</span><small>${item.service}</small></div><b>${(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)} $</b></div>`).join("");
  win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${order.number}</title><style>@page{size:80mm auto;margin:0}body{width:74mm;margin:0 auto;padding:3mm;font:10px Arial;color:#000}.center{text-align:center}.line{border-top:1px dashed #000;margin:7px 0}.row{display:flex;justify-content:space-between;gap:6px;padding:4px 0;border-bottom:1px dotted #777}.row span,.row small{display:block;font-size:8px;margin-top:2px}.total{font-size:14px;font-weight:900;text-align:right;margin-top:7px}.status{font-weight:900}.footer{text-align:center;margin-top:10px;font-size:8px}</style></head><body><div class="center"><strong>MONALIX</strong><br>PRESSING<br><b>${order.number}</b></div><div class="line"></div><b>Client :</b> ${order.clientName}<br><b>Tél :</b> ${order.phone}<br><b>Service :</b> ${order.serviceType === "express" ? "⚡ EXPRESS" : "NORMAL"}<br><b>Dépôt :</b> ${new Date(order.date).toLocaleString("fr-FR")}<br><b>Retrait :</b> ${new Date(order.dueDate).toLocaleString("fr-FR")}<div class="line"></div>${rows}<div class="line"></div><div class="total">TOTAL : ${Number(order.total || 0).toFixed(2)} $</div><div>Payé : ${Number(order.amountPaid || 0).toFixed(2)} $</div><div>Reste : ${Number(order.remaining || 0).toFixed(2)} $</div><p class="status">Statut : ${order.status}</p><div class="footer">Merci pour votre confiance.</div></body></html>`);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
};

const renderSettingsService = () => {
  const availableBranches = Object.values(establishmentsByActivity).flat();
  const isAdmin = loggedRole === "admin";

  return (
    <section className="module-page monalix-settings-page">
      <div className="module-header">
        <div>
          <span className="page-section-label">ADMINISTRATION</span>
          <h2>Paramètres MONALIX</h2>
          <p>Sécurité, utilisateurs, établissements, POS et configuration du Pressing.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-title"><Lock size={20} /><span>Sécurité / Mon compte</span></div>
          <p className="settings-muted">Utilisateur connecté : <strong>{loggedUser}</strong></p>
          <form onSubmit={handleChangePassword} className="settings-form">
            <input type="password" placeholder="Ancien mot de passe" value={passwordForm.oldPassword} onChange={(e) => setPasswordForm((v) => ({ ...v, oldPassword: e.target.value }))} />
            <input type="password" placeholder="Nouveau mot de passe" value={passwordForm.newPassword} onChange={(e) => setPasswordForm((v) => ({ ...v, newPassword: e.target.value }))} />
            <input type="password" placeholder="Confirmer le nouveau mot de passe" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm((v) => ({ ...v, confirmPassword: e.target.value }))} />
            <button type="submit" className="primary-button"><KeyRound size={17} /> Modifier mon mot de passe</button>
            {passwordMessage && <div className="settings-message">{passwordMessage}</div>}
          </form>
        </div>

        {isAdmin && (
          <div className="settings-card">
            <div className="settings-card-title"><Users size={20} /><span>Utilisateurs & permissions</span></div>
            <p className="settings-muted">L'administrateur peut créer, modifier, désactiver et réinitialiser les comptes des caissiers.</p>

            <div className="settings-user-list">
              {monalixUsersState.map((user) => (
                <div className="settings-user-row" key={user.id}>
                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.username} • {user.role === "admin" ? "Administrateur" : "Caissier"}</span>
                    <small>{user.active ? "● Actif" : "● Désactivé"}</small>
                  </div>
                  <div className="settings-user-actions">
                    <button type="button" className="secondary-button" onClick={() => openUserForm(user)}><Pencil size={15} /> Modifier</button>
                    <button type="button" className="secondary-button" onClick={() => resetUserPassword(user.id)}><KeyRound size={15} /> Réinitialiser</button>
                    {user.username !== "admin" && <button type="button" className="secondary-button" onClick={() => toggleUserActive(user.id)}>{user.active ? "Désactiver" : "Activer"}</button>}
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="primary-button" onClick={() => openUserForm()}><Plus size={17} /> Ajouter un utilisateur</button>

            {userMessage && <div className="settings-message">{userMessage}</div>}

            {userForm && (
              <form className="settings-user-editor" onSubmit={saveUserFromAdmin}>
                <div className="settings-card-title"><User size={18} /><span>{monalixUsersState.some((u) => u.id === userForm.id) ? "Modifier l'utilisateur" : "Nouvel utilisateur"}</span></div>
                <div className="settings-form-grid">
                  <input placeholder="Nom complet *" value={userForm.name || ""} onChange={(e) => setUserForm((v) => ({ ...v, name: e.target.value }))} />
                  <input placeholder="Nom d'utilisateur *" value={userForm.username || ""} onChange={(e) => setUserForm((v) => ({ ...v, username: e.target.value }))} />
                  <select value={userForm.role || "caissier"} onChange={(e) => setUserForm((v) => ({ ...v, role: e.target.value }))}>
                    <option value="caissier">Caissier</option>
                    <option value="admin">Administrateur</option>
                  </select>
                  <input type="password" placeholder={monalixUsersState.some((u) => u.id === userForm.id) ? "Nouveau mot de passe (facultatif)" : "Mot de passe initial"} value={userForm.password || ""} onChange={(e) => setUserForm((v) => ({ ...v, password: e.target.value }))} />
                </div>
                <div className="settings-permissions-box">
                  <strong>Activités autorisées</strong>
                  <div className="settings-check-grid">
                    {activities.map((activity) => (
                      <label key={activity.id}><input type="checkbox" checked={(userForm.activities || []).includes(activity.id)} onChange={() => toggleUserActivity(activity.id)} /> {activity.label}</label>
                    ))}
                  </div>
                </div>
                <div className="settings-permissions-box">
                  <strong>Établissements autorisés</strong>
                  <div className="settings-check-grid">
                    {availableBranches.map((branch) => (
                      <label key={branch}><input type="checkbox" checked={(userForm.branches || []).includes(branch)} onChange={() => toggleUserBranch(branch)} /> {branch}</label>
                    ))}
                  </div>
                </div>
                <label className="settings-inline-check"><input type="checkbox" checked={userForm.active !== false} onChange={(e) => setUserForm((v) => ({ ...v, active: e.target.checked }))} /> Compte actif</label>
                <label className="settings-inline-check"><input type="checkbox" checked={Boolean(userForm.mustChangePassword)} onChange={(e) => setUserForm((v) => ({ ...v, mustChangePassword: e.target.checked }))} /> Demander un changement de mot de passe à la prochaine connexion</label>
                <div className="settings-form-actions">
                  <button type="button" className="secondary-button" onClick={() => setUserForm(null)}>Annuler</button>
                  <button type="submit" className="primary-button"><CheckCircle2 size={17} /> Enregistrer</button>
                </div>
              </form>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="settings-card">
            <div className="settings-card-title"><MonitorSmartphone size={20} /><span>MONALIX CONTROL / Installation</span></div>
            <p className="settings-muted">Cette caisse est reliée à l'organisation et à l'établissement sélectionnés dans MONALIX CONTROL.</p>
            <div className="pos-check-list">
              <div><Building2 size={18} /> Client <span>{installationOrgName || "Non configuré"}</span></div>
              <div><Store size={18} /> Établissement <span>{installationBranchName || selectedBranch || "Non configuré"}</span></div>
              <div><MonitorSmartphone size={18} /> Installation <span>{installationConfigured ? "Connectée" : "Non configurée"}</span></div>
            </div>
            <p className="settings-muted" style={{ wordBreak: "break-all" }}>ID machine : {installationDeviceId}</p>
            <button type="button" className="primary-button" onClick={openInstallationSetup}>
              <RefreshCw size={17} /> {installationConfigured ? "Modifier le rattachement" : "Configurer l'installation"}
            </button>
          </div>
        )}

        <div className="settings-card">
          <div className="settings-card-title"><MonitorSmartphone size={20} /><span>POS / Matériel</span></div>
          <div className="pos-check-list">
            <div><ScanLine size={18} /> Scanner code-barres <span>Compatible</span></div>
            <div><Printer size={18} /> Imprimante ticket <span>Prévue</span></div>
            <div><Banknote size={18} /> Tiroir-caisse <span>Prévu</span></div>
            <div><MonitorSmartphone size={18} /> Écran tactile <span>Compatible</span></div>
          </div>
          <p className="settings-muted">MONALIX conserve la même caisse sur PC classique et terminal POS Windows.</p>
        </div>

        {isAdmin && activeActivity === "pressing" && (
          <div className="settings-card">
            <div className="settings-card-title"><WashingMachine size={20} /><span>Paramètres Pressing</span></div>
            <p className="settings-muted">Délais par défaut et tarifs Express/Normal.</p>
            <div className="settings-form-grid">
              <label>Délai normal (heures)<input type="number" min="1" value={pressingSettings.normalHours} onChange={(e) => setPressingSettings((v) => ({ ...v, normalHours: Number(e.target.value) || 1 }))} /></label>
              <label>Délai Express (heures)<input type="number" min="1" value={pressingSettings.expressHours} onChange={(e) => setPressingSettings((v) => ({ ...v, expressHours: Number(e.target.value) || 1 }))} /></label>
            </div>
            <div className="settings-service-prices">
              {(pressingSettings.services || []).map((service, index) => (
                <div className="settings-service-row" key={`${service.name}-${index}`}>
                  <input value={service.name} onChange={(e) => setPressingSettings((v) => ({ ...v, services: v.services.map((item, i) => i === index ? { ...item, name: e.target.value } : item) }))} />
                  <input type="number" min="0" step="0.01" value={service.normal} onChange={(e) => setPressingSettings((v) => ({ ...v, services: v.services.map((item, i) => i === index ? { ...item, normal: Number(e.target.value) || 0 } : item) }))} />
                  <input type="number" min="0" step="0.01" value={service.express} onChange={(e) => setPressingSettings((v) => ({ ...v, services: v.services.map((item, i) => i === index ? { ...item, express: Number(e.target.value) || 0 } : item) }))} />
                </div>
              ))}
              <div className="settings-service-row settings-service-header"><strong>Prestation</strong><strong>Normal $</strong><strong>Express $</strong></div>
            </div>
            <button type="button" className="primary-button" onClick={() => { localStorage.setItem("monalix_pressing_settings", JSON.stringify(pressingSettings)); alert("Paramètres Pressing enregistrés."); }}><CheckCircle2 size={17} /> Enregistrer les paramètres</button>
          </div>
        )}

        <div className="settings-card">
          <div className="settings-card-title"><Shield size={20} /><span>Sauvegarde</span></div>
          <p className="settings-muted">Les données de l'installation peuvent être sauvegardées/restaurées. Le mot de passe d'installation reste local à la machine.</p>
        </div>
      </div>
    </section>
  );
};

const renderPressingDashboard = () => {
  const total = pressingOrders.length;
  const ready = pressingOrders.filter((o) => o.status === "Prêt").length;
  const processing = pressingOrders.filter((o) => o.status === "En traitement").length;
  const withdrawn = pressingOrders.filter((o) => o.status === "Retiré").length;
  const express = pressingOrders.filter((o) => o.serviceType === "express" && o.status !== "Retiré" && o.status !== "Annulé").length;
  const receivable = pressingOrders.reduce((sum, o) => sum + Number(o.remaining || 0), 0);
  const revenue = pressingOrders.reduce((sum, o) => sum + Number(o.amountPaid || 0), 0);
  const late = pressingOrders.filter((o) => o.status !== "Retiré" && o.status !== "Annulé" && o.dueDate && new Date(o.dueDate).getTime() < Date.now()).length;
  return (
    <section className="module-page pressing-dashboard-page">
      <div className="module-header"><div><span className="page-section-label">PRESSING</span><h2>Tableau de bord</h2><p>Suivi des dépôts, traitements, retraits et encaissements.</p></div></div>
      <div className="pressing-stats">
        <div><strong>{total}</strong><span>Commandes</span></div>
        <div><strong>{processing}</strong><span>En traitement</span></div>
        <div><strong>{ready}</strong><span>Prêtes</span></div>
        <div><strong>{withdrawn}</strong><span>Retirées</span></div>
        <div><strong>{express}</strong><span>Express</span></div>
        <div><strong>{late}</strong><span>En retard</span></div>
        <div><strong>{revenue.toFixed(2)} $</strong><span>Encaissé</span></div>
        <div><strong>{receivable.toFixed(2)} $</strong><span>À encaisser</span></div>
      </div>
      <div className="pressing-card">
        <h3>Commandes à surveiller</h3>
        {pressingOrders.filter((o) => o.status === "Prêt" || (o.dueDate && new Date(o.dueDate).getTime() < Date.now() && o.status !== "Retiré" && o.status !== "Annulé")).slice(0, 10).map((order) => (
          <div className="pressing-order" key={order.id} onClick={() => { setSelectedPressingOrderId(order.id); setActiveService("pressing"); }}>
            <div className="pressing-order-main"><strong>{order.number}</strong><span>{order.clientName} • {order.phone}</span><small>{order.serviceType === "express" ? "⚡ EXPRESS" : "NORMAL"} • retrait {new Date(order.dueDate).toLocaleString("fr-FR")}</small></div>
            <div className="pressing-order-side"><strong>{Number(order.remaining || 0).toFixed(2)} $</strong><span>{order.status}</span></div>
          </div>
        ))}
        {!pressingOrders.length && <div className="empty-state">Aucune commande Pressing pour le moment.</div>}
      </div>
    </section>
  );
};

const renderPressingService = () => {
  const normalizedSearch = pressingSearch.toLowerCase().trim();
  const statuses = ["Déposé", "En traitement", "Prêt", "Retiré", "Annulé"];
  const filteredOrders = pressingOrders.filter((order) => {
    const matchesSearch = !normalizedSearch || [order.number, order.clientName, order.phone, ...(order.garments || []).map((item) => `${item.type} ${item.brand}`)].some((v) => String(v || "").toLowerCase().includes(normalizedSearch));
    const matchesStatus = pressingStatusFilter === "Tous" || order.status === pressingStatusFilter;
    const matchesPayment = pressingPaymentFilter === "Tous" || order.paymentStatus === pressingPaymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });
  const counts = statuses.reduce((acc, status) => { acc[status] = pressingOrders.filter((o) => o.status === status).length; return acc; }, {});
  const selectedOrder = pressingOrders.find((order) => order.id === selectedPressingOrderId) || null;
  const totalDraft = getPressingTotal();
  const remainingDraft = Math.max(0, totalDraft - Number(pressingForm.amountPaid || 0));

  return (
    <section className="pressing-page">
      <div className="module-header">
        <div><span className="page-section-label">MONALIX • PRESSING</span><h2>Gestion des dépôts</h2><p>Enregistrez précisément chaque vêtement, gérez les paiements et suivez le retrait.</p></div>
        <div className="pressing-tab-buttons">
          <button type="button" className={pressingTab === "nouveau" ? "primary-button" : "secondary-button"} onClick={() => setPressingTab("nouveau")}>+ Nouveau dépôt</button>
          <button type="button" className={pressingTab === "commandes" ? "primary-button" : "secondary-button"} onClick={() => setPressingTab("commandes")}>Commandes</button>
        </div>
      </div>

      <div className="pressing-stats">
        <div><strong>{pressingOrders.length}</strong><span>Total</span></div>
        <div><strong>{counts["Déposé"] || 0}</strong><span>Déposés</span></div>
        <div><strong>{counts["En traitement"] || 0}</strong><span>En traitement</span></div>
        <div><strong>{counts["Prêt"] || 0}</strong><span>Prêts</span></div>
        <div><strong>{pressingOrders.filter((o) => o.serviceType === "express").length}</strong><span>Express</span></div>
        <div><strong>{pressingOrders.reduce((sum, o) => sum + Number(o.remaining || 0), 0).toFixed(2)} $</strong><span>À encaisser</span></div>
      </div>

      {pressingTab === "nouveau" ? (
        <div className="pressing-layout">
          <form className="pressing-card pressing-form" onSubmit={createPressingOrder}>
            <h3><User size={18} /> Client & commande</h3>
            <div className="pressing-form-grid">
              <input required placeholder="Nom du client *" value={pressingForm.clientName} onChange={(e) => setPressingForm((v) => ({ ...v, clientName: e.target.value }))} />
              <input required placeholder="Téléphone *" value={pressingForm.phone} onChange={(e) => setPressingForm((v) => ({ ...v, phone: e.target.value }))} />
              <select value={pressingForm.serviceType} onChange={(e) => setPressingForm((v) => ({ ...v, serviceType: e.target.value }))}><option value="normal">Service normal</option><option value="express">⚡ Service Express</option></select>
              <input type="datetime-local" value={pressingForm.dueDate} onChange={(e) => setPressingForm((v) => ({ ...v, dueDate: e.target.value }))} />
            </div>
            <div className="pressing-payment-choice">
              <strong>Paiement</strong>
              <label><input type="radio" checked={pressingForm.paymentTiming === "deposit"} onChange={() => setPressingForm((v) => ({ ...v, paymentTiming: "deposit" }))} /> Au dépôt</label>
              <label><input type="radio" checked={pressingForm.paymentTiming === "withdrawal"} onChange={() => setPressingForm((v) => ({ ...v, paymentTiming: "withdrawal", amountPaid: "0" }))} /> Au retrait</label>
              <label><input type="radio" checked={pressingForm.paymentTiming === "partial"} onChange={() => setPressingForm((v) => ({ ...v, paymentTiming: "partial" }))} /> Paiement partiel</label>
            </div>
            <div className="pressing-form-grid">
              <select value={pressingForm.paymentMethod} onChange={(e) => setPressingForm((v) => ({ ...v, paymentMethod: e.target.value }))}><option>Espèces</option><option>Airtel Money</option><option>Orange Money</option><option>M-Pesa</option><option>Carte</option></select>
              <select value={pressingForm.paymentCurrency} onChange={(e) => setPressingForm((v) => ({ ...v, paymentCurrency: e.target.value }))}><option>USD</option><option>FC</option></select>
              <input type="number" min="0" step="0.01" placeholder="Montant payé au dépôt" value={pressingForm.amountPaid} disabled={pressingForm.paymentTiming === "withdrawal"} onChange={(e) => setPressingForm((v) => ({ ...v, amountPaid: e.target.value }))} />
            </div>
          </form>

          <div className="pressing-card">
            <h3><Shirt size={18} /> Ajouter un vêtement</h3>
            <div className="pressing-form-grid">
              <select value={garmentDraft.type} onChange={(e) => setGarmentDraft((v) => ({ ...v, type: e.target.value }))}>{["Chemise","T-shirt","Pantalon","Robe","Costume","Veste","Manteau","Jupe","Pull","Couverture","Rideau","Autre"].map((item) => <option key={item}>{item}</option>)}</select>
              <input placeholder="Marque (facultatif)" value={garmentDraft.brand} onChange={(e) => setGarmentDraft((v) => ({ ...v, brand: e.target.value }))} />
              <input placeholder="Couleur (facultatif)" value={garmentDraft.color} onChange={(e) => setGarmentDraft((v) => ({ ...v, color: e.target.value }))} />
              <input placeholder="Taille (facultatif)" value={garmentDraft.size} onChange={(e) => setGarmentDraft((v) => ({ ...v, size: e.target.value }))} />
              <input placeholder="Matière (facultatif)" value={garmentDraft.material} onChange={(e) => setGarmentDraft((v) => ({ ...v, material: e.target.value }))} />
              <select value={garmentDraft.service} onChange={(e) => { const value = e.target.value; const priceRow = (pressingSettings.services || []).find((s) => s.name === value); setGarmentDraft((v) => ({ ...v, service: value, normalPrice: priceRow?.normal ?? v.normalPrice, expressPrice: priceRow?.express ?? v.expressPrice })); }}><option value="Nettoyage à sec">Nettoyage à sec</option>{(pressingSettings.services || []).filter((s) => s.name !== "Nettoyage à sec").map((service) => <option key={service.name}>{service.name}</option>)}</select>
              <input type="number" min="1" value={garmentDraft.quantity} onChange={(e) => setGarmentDraft((v) => ({ ...v, quantity: e.target.value }))} placeholder="Quantité" />
              <input type="number" min="0" step="0.01" value={pressingForm.serviceType === "express" ? garmentDraft.expressPrice : garmentDraft.normalPrice} onChange={(e) => setGarmentDraft((v) => pressingForm.serviceType === "express" ? ({ ...v, expressPrice: e.target.value }) : ({ ...v, normalPrice: e.target.value }))} placeholder="Prix" />
            </div>
            <div className="pressing-condition-grid">
              {['Tache','Déchirure','Bouton manquant','Fermeture défectueuse','Couleur délavée','Usure'].map((condition) => <label key={condition}><input type="checkbox" checked={(garmentDraft.condition || []).includes(condition)} onChange={() => setGarmentDraft((v) => ({ ...v, condition: v.condition.includes(condition) ? v.condition.filter((item) => item !== condition) : [...v.condition, condition] }))} /> {condition}</label>)}
            </div>
            <textarea placeholder="Description / observations (facultatif)" value={garmentDraft.description} onChange={(e) => setGarmentDraft((v) => ({ ...v, description: e.target.value }))} />
            <label className="pressing-photo-box">📷 Photo du vêtement — facultative<input type="file" accept="image/*" onChange={handlePressingPhoto} /></label>
            {garmentDraft.photo && <img src={garmentDraft.photo} alt="Aperçu vêtement" className="pressing-garment-photo-preview" />}
            <button type="button" className="primary-button" onClick={addPressingGarment}><Plus size={17} /> Ajouter ce vêtement</button>
          </div>

          <div className="pressing-card">
            <h3><ShoppingBag size={18} /> Vêtements de la commande</h3>
            {pressingGarments.length === 0 ? <div className="empty-state">Ajoutez les vêtements un par un. La photo reste facultative.</div> : pressingGarments.map((item) => (
              <div className="pressing-garment-row" key={item.id}>
                {item.photo ? <img src={item.photo} alt="" /> : <div className="pressing-garment-placeholder">👕</div>}
                <div><strong>{item.quantity} × {item.type}</strong><span>{[item.brand, item.color, item.size, item.material].filter(Boolean).join(" • ") || "Détails non renseignés"}</span><small>{item.service} • {Number(item.price || 0).toFixed(2)} $</small></div>
                <button type="button" className="icon-button" onClick={() => removePressingGarment(item.id)}><Trash2 size={16} /></button>
              </div>
            ))}
            <div className="pressing-total-box"><span>Total</span><strong>{totalDraft.toFixed(2)} $</strong><small>Reste au dépôt : {Math.max(0, pressingForm.paymentTiming === "withdrawal" ? totalDraft : remainingDraft).toFixed(2)} $</small></div>
            <textarea placeholder="Notes de la commande (facultatif)" value={pressingForm.notes} onChange={(e) => setPressingForm((v) => ({ ...v, notes: e.target.value }))} />
            <button type="button" className="primary-button" onClick={createPressingOrder}><Receipt size={17} /> Enregistrer le dépôt {getNextPressingNumber()}</button>
          </div>
        </div>
      ) : (
        <div className="pressing-card pressing-list-card">
          <div className="pressing-toolbar">
            <input placeholder="Rechercher n° commande, client, téléphone, marque..." value={pressingSearch} onChange={(e) => setPressingSearch(e.target.value)} />
            <select value={pressingStatusFilter} onChange={(e) => setPressingStatusFilter(e.target.value)}><option>Tous</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
            <select value={pressingPaymentFilter} onChange={(e) => setPressingPaymentFilter(e.target.value)}><option>Tous</option><option>Payé</option><option>Partiel</option><option>À payer</option></select>
          </div>
          <div className="pressing-orders">
            {filteredOrders.length === 0 ? <div className="empty-state">Aucune commande Pressing.</div> : filteredOrders.map((order) => (
              <article className={`pressing-order ${order.serviceType === "express" ? "express" : ""}`} key={order.id} onClick={() => setSelectedPressingOrderId(order.id)}>
                <div className="pressing-order-main">
                  <strong>{order.number} {order.serviceType === "express" && <span>⚡ EXPRESS</span>}</strong>
                  <span>{order.clientName} • {order.phone}</span>
                  <small>{order.garments?.length || 0} type(s) de vêtements • dépôt {new Date(order.date).toLocaleString("fr-FR")}</small>
                  <p>{order.items}</p>
                </div>
                <div className="pressing-order-side">
                  <strong>{Number(order.total || 0).toFixed(2)} $</strong>
                  <span>Reste : {Number(order.remaining || 0).toFixed(2)} $</span>
                  <select value={order.status} onClick={(e) => e.stopPropagation()} onChange={(e) => updatePressingStatus(order.id, e.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
                  <button type="button" className="secondary-button" onClick={(e) => { e.stopPropagation(); printPressingTicket(order); }}><Printer size={16} /> Ticket</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="pressing-card pressing-detail-card">
          <div className="module-header"><div><span className="page-section-label">FICHE COMMANDE</span><h3>{selectedOrder.number} — {selectedOrder.clientName}</h3><p>{selectedOrder.phone} • {selectedOrder.serviceType === "express" ? "⚡ EXPRESS" : "NORMAL"}</p></div><button type="button" className="secondary-button" onClick={() => setSelectedPressingOrderId(null)}><X size={16} /> Fermer</button></div>
          <div className="pressing-detail-grid">
            <div><strong>Statut</strong><select value={selectedOrder.status} onChange={(e) => updatePressingStatus(selectedOrder.id, e.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div>
            <div><strong>Total</strong><span>{Number(selectedOrder.total || 0).toFixed(2)} $</span></div>
            <div><strong>Payé</strong><span>{Number(selectedOrder.amountPaid || 0).toFixed(2)} $</span></div>
            <div><strong>Reste</strong><span>{Number(selectedOrder.remaining || 0).toFixed(2)} $</span></div>
            <div><strong>Retrait prévu</strong><span>{new Date(selectedOrder.dueDate).toLocaleString("fr-FR")}</span></div>
          </div>
          <div className="pressing-garments-detail">
            {(selectedOrder.garments || []).map((item) => <div className="pressing-garment-row" key={item.id}>{item.photo ? <img src={item.photo} alt="" /> : <div className="pressing-garment-placeholder">👕</div>}<div><strong>{item.quantity} × {item.type} {item.brand && `— ${item.brand}`}</strong><span>{[item.color, item.size, item.material].filter(Boolean).join(" • ")}</span><small>{item.service} • {item.condition?.join(", ") || "Aucun défaut signalé"}</small>{item.description && <p>{item.description}</p>}</div></div>)}
          </div>
          {Number(selectedOrder.remaining || 0) > 0 && (
            <div className="pressing-payment-box">
              <strong>Encaisser le solde au retrait</strong>
              <span>Reste : {Number(selectedOrder.remaining || 0).toFixed(2)} $</span>
              <div className="pressing-form-grid"><select id="pressing-payment-method"><option>Espèces</option><option>Airtel Money</option><option>Orange Money</option><option>M-Pesa</option><option>Carte</option></select><select id="pressing-payment-currency"><option>USD</option><option>FC</option></select><input id="pressing-payment-amount" type="number" min="0" step="0.01" defaultValue={Number(selectedOrder.remaining || 0).toFixed(2)} /></div>
              <button type="button" className="primary-button" onClick={() => { const amount = document.getElementById("pressing-payment-amount")?.value; const method = document.getElementById("pressing-payment-method")?.value; const currency = document.getElementById("pressing-payment-currency")?.value; registerPressingPayment(selectedOrder.id, amount, method, currency); }}><Wallet size={17} /> Encaisser</button>
            </div>
          )}
          <div className="settings-form-actions"><button type="button" className="secondary-button" onClick={() => printPressingTicket(selectedOrder)}><Printer size={16} /> Imprimer le ticket</button>{selectedOrder.status === "Prêt" && Number(selectedOrder.remaining || 0) <= 0 && <button type="button" className="primary-button" onClick={() => updatePressingStatus(selectedOrder.id, "Retiré")}><CheckCircle2 size={16} /> Remettre au client</button>}</div>
        </div>
      )}
    </section>
  );
};

/* =====================================================
   PERMISSIONS PAR RÔLE
===================================================== */

const canAccessService = (serviceId) => {
  const role = String(loggedRole || "").toLowerCase().trim();

  if (role === "admin") {
    return true;
  }

  if (role === "caissier") {
    const currentUser = monalixUsersState.find(
      (user) => user.name === loggedUser
    );

    const allowedActivities = Array.isArray(currentUser?.activities)
      ? currentUser.activities
      : ["commerce"];

    const activityAllowed = allowedActivities.includes(
      String(activeActivity || "commerce").toLowerCase().trim()
    );

    if (!activityAllowed) {
      return false;
    }

    // Le caissier voit la caisse de l'activité actuellement sélectionnée.
    if (serviceId === "caisse") {
      return true;
    }

    // Pour le Pressing, il peut également accéder directement aux commandes
    // si cette activité lui est attribuée.
    if (activeActivity === "pressing" && serviceId === "pressing") {
      return true;
    }

    return false;
  }

  return false;
};
const changeActivity = (
  activityId
) => {

  const normalizedActivityId = String(activityId || "").toLowerCase().trim();

  if (licenseLoading || licensedActivityIds.length === 0 || !licensedActivityIds.includes(normalizedActivityId)) {
    console.warn("⛔ Activité non autorisée par la licence MONALIX :", activityId);
    return;
  }

  const branches =
    establishmentsByActivity[
      activityId
    ] || [];


  setActiveActivity(
    activityId
  );


  setSelectedBranch(
    branches[0] || ""
  );


if (loggedRole === "caissier") {
  setActiveService("caisse");
} else {
  setActiveService("dashboard");
}


  setSelectedTable(
    null
  );


  setSearch("");


  setAmountReceived("");


  setSelectedCategory(
    "Toutes"
  );


  setSaleValidated(
    false
  );

};


/* =====================================================
   STATISTIQUES RESTAURANT
===================================================== */

const restaurantStats =
  useMemo(
    () => {

      let free = 0;
      let occupied = 0;
      let billing = 0;
      let reserved = 0;

      restaurantTables.forEach(
        (table) => {

          const status =
            getTableStatus(table.id);

          if (
            status === "free"
          ) {
            free++;
          }

          else if (
            status === "occupied"
          ) {
            occupied++;
          }

          else if (
            status === "billing"
          ) {
            billing++;
          }

          else if (
            status === "reserved"
          ) {
            reserved++;
          }

        }
      );

      return {
        free,
        occupied,
        billing,
        reserved,
      };

    },
    [tableOrders]
  );

/* =====================================================
   SYNCHRONISATION DASHBOARD SUPABASE
===================================================== */

const [dashboardSales, setDashboardSales] =
  useState([]);

const [dashboardLoading, setDashboardLoading] =
  useState(false);

const loadDashboardSales =
  async () => {

    try {

      setDashboardLoading(true);

      const {
        data,
        error
      } = await supabase
        .from("mon_sales")
        .select(
          "id, org_id, activity, client_id, cashier_name, sale_date"
        )
        .eq(
          "activity",
          String(activeActivity || "commerce")
            .toLowerCase()
            .trim()
        )
        .order(
          "sale_date",
          {
            ascending: false
          }
        )
        .limit(100);

      if (error) {
        console.error(
          "❌ Erreur chargement Dashboard :",
          error
        );
        return;
      }

      setDashboardSales(
        Array.isArray(data)
          ? data
          : []
      );

      console.log(
        "✅ Dashboard chargé depuis Supabase :",
        data
      );

    } catch (error) {

      console.error(
        "❌ Erreur Dashboard Supabase :",
        error
      );

    } finally {

      setDashboardLoading(false);

    }

  };

useEffect(() => {

  if (
    loggedRole === "admin"
  ) {
    loadDashboardSales();
  }

}, [loggedRole, activeActivity]);

const dashboardTodaySales =
  useMemo(() => {

    const today =
      new Date();

    return dashboardSales.filter(
      (sale) => {

        if (!sale?.sale_date) {
          return false;
        }

        const date =
          new Date(
            sale.sale_date
          );

        return (
          date.getFullYear() ===
            today.getFullYear() &&
          date.getMonth() ===
            today.getMonth() &&
          date.getDate() ===
            today.getDate()
        );

      }
    );

  }, [dashboardSales]);

const dashboardMonthSales =
  useMemo(() => {

    const today =
      new Date();

    return dashboardSales.filter(
      (sale) => {

        if (!sale?.sale_date) {
          return false;
        }

        const date =
          new Date(
            sale.sale_date
          );

        return (
          date.getFullYear() ===
            today.getFullYear() &&
          date.getMonth() ===
            today.getMonth()
        );

      }
    );

  }, [dashboardSales]);

/* =====================================================
   DASHBOARD
===================================================== */

const renderDashboard = () => (
  <div className="dashboard-page">

    <section className="dashboard-hero">

      <div>

        <span className="eyebrow">
          MONALIX • CENTRE DE PILOTAGE
        </span>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "16px",
            flexWrap: "wrap"
          }}
        >

          <button
            type="button"
            onClick={handleBackupData}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            💾 Sauvegarder les données
          </button>

          <button
            type="button"
            onClick={() =>
              backupFileInputRef.current?.click()
            }
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            ↩ Restaurer une sauvegarde
          </button>

          <input
            ref={backupFileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleRestoreData}
            style={{
              display: "none"
            }}
          />

        </div>

        <h2>
          Bienvenue, {selectedCashier}
        </h2>

        <p>
          Vue globale de votre activité et de vos performances.
        </p>

      </div>

      <div className="hero-status">

        <CheckCircle2 size={18} />

        {dashboardLoading
          ? "Synchronisation..."
          : "Supabase synchronisé"}

      </div>

    </section>

    <section className="dashboard-selectors">

      <div className="selector-box">

        <Building2 size={19} />

        <div>

          <span>
            ÉTABLISSEMENT ACTIF
          </span>

          <select
            value={selectedBranch}
            onChange={(event) =>
              setSelectedBranch(
                event.target.value
              )
            }
          >

            {currentBranches.map(
              (branch) => (

                <option
                  key={branch}
                  value={branch}
                >
                  {branch}
                </option>

              )
            )}

          </select>

        </div>

        <ChevronDown size={17} />

      </div>

      <div className="selector-box">

        <Users size={19} />

        <div>

          <span>
            UTILISATEUR ACTIF
          </span>

          <select
            value={selectedCashier}
            onChange={(event) =>
              setSelectedCashier(
                event.target.value
              )
            }
          >

            {cashiers.map(
              (cashier) => (

                <option
                  key={cashier}
                  value={cashier}
                >
                  {cashier}
                </option>

              )
            )}

          </select>

        </div>

        <ChevronDown size={17} />

      </div>

    </section>

    <section className="stats-grid">

      <div className="stat-card premium">

        <div className="stat-top">
          <span>VENTES DU JOUR</span>
          <DollarSign size={21} />
        </div>

        <strong>
          {dashboardTodaySales.length}
        </strong>

        <small>
          Transactions synchronisées
        </small>

        <div className="stat-footer">
          <TrendingUp size={15} />
          Données Supabase
        </div>

      </div>

      <div className="stat-card">

        <div className="stat-top">
          <span>COMMANDES</span>
          <ShoppingCart size={21} />
        </div>

        <strong>
          {dashboardTodaySales.length}
        </strong>

        <small>
          Transactions du jour
        </small>

        <div className="stat-footer">
          <TrendingUp size={15} />
          Activité synchronisée
        </div>

      </div>

      <div className="stat-card">

        <div className="stat-top">
          <span>CHIFFRE DU MOIS</span>
          <BarChart3 size={21} />
        </div>

        <strong>
          {dashboardMonthSales.length}
        </strong>

        <small>
          Transactions du mois
        </small>

        <div className="stat-footer">
          <CalendarDays size={15} />
          Mois en cours
        </div>

      </div>

      <div className="stat-card">

        <div className="stat-top">
          <span>TRÉSORERIE</span>
          <Wallet size={21} />
        </div>

        <strong>
          {dashboardTodaySales.length}
        </strong>

        <small>
          Ventes du jour
        </small>

        <div className="stat-footer">
          <CircleDollarSign size={15} />
          Mise à jour depuis Supabase
        </div>

      </div>

    </section>

    {activeActivity === "restaurant" && (

      <section className="restaurant-dashboard">

        <div className="dashboard-section-header">

          <div>

            <span className="eyebrow">
              RESTAURANT
            </span>

            <h2>
              Situation des tables
            </h2>

          </div>

          <button
            type="button"
            onClick={() =>
              setActiveService("caisse")
            }
          >
            Ouvrir les tables
            <ArrowUpRight size={17} />
          </button>

        </div>

        <div className="restaurant-stats">

          <div className="table-stat free">

            <span>🟢</span>

            <div>

              <strong>
                {restaurantStats.free}
              </strong>

              <small>
                Tables libres
              </small>

            </div>

          </div>

          <div className="table-stat occupied">

            <span>🔴</span>

            <div>

              <strong>
                {restaurantStats.occupied}
              </strong>

              <small>
                Commandes en cours
              </small>

            </div>

          </div>

          <div className="table-stat billing">

            <span>🟠</span>

            <div>

              <strong>
                {restaurantStats.billing}
              </strong>

              <small>
                À encaisser
              </small>

            </div>

          </div>

          <div className="table-stat reserved">

            <span>🔵</span>

            <div>

              <strong>
                {restaurantStats.reserved}
              </strong>

              <small>
                Réservées
              </small>

            </div>

          </div>

        </div>

      </section>

    )}

    <section className="dashboard-grid">

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <span className="eyebrow">
              RÉSEAU MONALIX
            </span>

            <h3>
              Établissements
            </h3>

          </div>

          <button type="button">
            Voir tout
            <ArrowUpRight size={16} />
          </button>

        </div>

        {currentBranches.map(
          (branch) => (

            <button
              type="button"
              className={`store-row ${
                selectedBranch === branch
                  ? "active"
                  : ""
              }`}
              key={branch}
              onClick={() =>
                setSelectedBranch(branch)
              }
            >

              <div className="store-info">

                <div className="store-icon">
                  <Building2 size={18} />
                </div>

                <div>

                  <strong>
                    {branch}
                  </strong>

                  <span>
                    {selectedBranch === branch
                      ? "Établissement actif"
                      : "Cliquer pour sélectionner"}
                  </span>

                </div>

              </div>

              <ArrowUpRight size={18} />

            </button>

          )
        )}

      </div>

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <span className="eyebrow">
              UTILISATEURS
            </span>

            <h3>
              Caissiers connectés
            </h3>

          </div>

          <div className="live-status">
            ● En direct
          </div>

        </div>

        {cashiers.map((name) => {

          const initials =
            name
              .split(" ")
              .map(
                (word) => word[0]
              )
              .join("")
              .slice(0, 2);

          return (

            <button
              type="button"
              className={`cashier-row ${
                selectedCashier === name
                  ? "active"
                  : ""
              }`}
              key={name}
              onClick={() =>
                setSelectedCashier(name)
              }
            >

              <div className="cashier-avatar">
                {initials}
              </div>

              <div>

                <strong>
                  {name}
                </strong>

                <span>
                  {selectedCashier === name
                    ? "Session actuellement active"
                    : "Cliquer pour sélectionner"}
                </span>

              </div>

              {selectedCashier === name ? (
                <CheckCircle2 size={19} />
              ) : (
                <Eye size={18} />
              )}

            </button>

          );

        })}

      </div>

    </section>

    <section
      className="dashboard-card"
      style={{
        marginTop: "24px"
      }}
    >

      <div className="card-header">

        <div>

          <span className="eyebrow">
            SUPABASE
          </span>

          <h3>
            Dernières ventes synchronisées
          </h3>

        </div>

        <div className="live-status">
          {dashboardLoading
            ? "● Chargement"
            : `● ${dashboardSales.length} vente(s) • ${String(activeActivity || "commerce").toUpperCase()}`}
        </div>

      </div>

      {dashboardSales.length === 0 ? (

        <div
          style={{
            padding: "24px",
            textAlign: "center",
            opacity: 0.7
          }}
        >
          Aucune vente synchronisée pour le moment.
        </div>

      ) : (

        <div
          style={{
            overflowX: "auto"
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >

            <thead>

              <tr>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px"
                  }}
                >
                  Date
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px"
                  }}
                >
                  Activité
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px"
                  }}
                >
                  Caissier
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px"
                  }}
                >
                  Vente
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboardSales
                .slice(0, 10)
                .map((sale) => (

                  <tr key={sale.id}>

                    <td
                      style={{
                        padding: "12px"
                      }}
                    >
                      {sale.sale_date
                        ? new Date(
                            sale.sale_date
                          ).toLocaleString(
                            "fr-FR"
                          )
                        : "-"}
                    </td>

                    <td
                      style={{
                        padding: "12px"
                      }}
                    >
                      {sale.activity || "-"}
                    </td>

                    <td
                      style={{
                        padding: "12px"
                      }}
                    >
                      {sale.cashier_name || "-"}
                    </td>

                    <td
                      style={{
                        padding: "12px"
                      }}
                    >
                      {sale.id
                        ? sale.id.slice(0, 18) + "..."
                        : "-"}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      )}

    </section>

  </div>
);


/* =====================================================
   CAISSE
===================================================== */

const renderCaisse = () => {

  /* =====================================================
     CALCUL DIRECT DU TOTAL DE LA CAISSE
     Compatible USD + FC
  ===================================================== */

  const caisseRate =
    Number(exchangeRate) > 0
      ? Number(exchangeRate)
      : 2850;


  /* =====================================================
     NOMBRE RÉEL D'ARTICLES
  ===================================================== */

  const caisseTotalItems =
    safeCurrentCart.reduce(
      (total, item) => {

        if (!item) {
          return total;
        }

        const quantity =
          Number(
            getProductQuantity(item)
          ) || 0;

        return (
          total +
          Math.max(0, quantity)
        );

      },
      0
    );


  /* =====================================================
     TOTAL RÉEL DE LA CAISSE EN USD
  ===================================================== */

  const caisseTotalUSD =
    safeCurrentCart.reduce(
      (total, item) => {

        if (!item) {
          return total;
        }


        /* =============================================
           PRIX RÉEL DU PRODUIT
        ============================================= */

        const rawPrice =
          getProductPrice(item);


        const price =
          typeof rawPrice === "string"
            ? Number(
                rawPrice
                  .replace(/\s/g, "")
                  .replace(",", ".")
              ) || 0
            : Number(rawPrice) || 0;


        /* =============================================
           QUANTITÉ RÉELLE
        ============================================= */

        const rawQuantity =
          getProductQuantity(item);


        const quantity =
          typeof rawQuantity === "string"
            ? Number(
                rawQuantity
                  .replace(/\s/g, "")
                  .replace(",", ".")
              ) || 0
            : Number(rawQuantity) || 0;


        /* =============================================
           DEVISE DU PRODUIT
        ============================================= */

        const itemCurrency =
          String(
            item.priceCurrency ||
            "USD"
          )
            .toUpperCase()
            .trim();


        /* =============================================
           TOTAL DE LA LIGNE
        ============================================= */

        const itemTotal =
          Math.max(
            0,
            price
          ) *
          Math.max(
            0,
            quantity
          );


        /* =============================================
           PRODUIT EN FC
           FC → USD
        ============================================= */

        if (
          itemCurrency === "FC"
        ) {

          return (
            total +
            (
              itemTotal /
              caisseRate
            )
          );

        }


        /* =============================================
           PRODUIT EN USD
        ============================================= */

        return (
          total +
          itemTotal
        );

      },
      0
    );


  /* =====================================================
     TOTAL EN FC
  ===================================================== */

  const caisseTotalFC =
    caisseTotalUSD *
    caisseRate;


  /* =====================================================
     CAISSE
  ===================================================== */

  return (
    <div
      className="caisse-page"
      style={{
        width: "100%",
        maxWidth: "none",
        minWidth: 0,
        margin: 0,
        boxSizing: "border-box",
      }}
    >

      {/* =====================================================
         BARRE SUPÉRIEURE
      ===================================================== */}

      <div className="caisse-topbar">

 {String(loggedRole || "").toLowerCase().trim() !== "caissier" && (
  <button
    type="button"
    className="back-dashboard"
    onClick={() => {
      setActiveService("dashboard");
      setSelectedTable(null);
      setAmountReceived("");
    }}
  >
    <ArrowLeft size={18} />
    Tableau de bord
  </button>
)}

        <div className="caisse-title">

          <span>
            MONALIX • {selectedBranch}
          </span>

          <strong>
            {activeActivity === "restaurant"
              ? selectedTableData
                ? selectedTableData.name
                : "Gestion des tables"
              : "Nouvelle vente"}
          </strong>

        </div>

        <div className="secure-session">

          <Lock size={15} />

          {selectedCashier}

        </div>

      </div>


      {/* =====================================================
         RESTAURANT : PLAN DES TABLES
      ===================================================== */}

      {activeActivity === "restaurant" &&
        !selectedTable && (

          <section className="restaurant-floor">

            <div className="floor-header">

              <div>

                <span>
                  PLAN DE SALLE
                </span>

                <h2>
                  Gestion des tables
                </h2>

                <p>
                  Sélectionnez une table pour consulter
                  ou modifier sa commande.
                </p>

              </div>

              <div className="floor-legend">

                <span>🟢 Libre</span>
                <span>🔴 En cours</span>
                <span>🟠 À encaisser</span>
                <span>🔵 Réservée</span>

              </div>

            </div>

            <div className="tables-grid professional">

              {restaurantTables.map(
                renderRestaurantTable
              )}

            </div>

          </section>

        )}


      {/* =====================================================
         RESTAURANT : INFORMATIONS TABLE SÉLECTIONNÉE
      ===================================================== */}

      {activeActivity === "restaurant" &&
        selectedTableData && (

          <section className="selected-table-info">

            <div className="selected-table-main">

              <div className="selected-table-icon">

                <Table2 size={28} />

              </div>

              <div>

                <span>
                  TABLE SÉLECTIONNÉE
                </span>

                <h2>
                  {selectedTableData.name}
                </h2>

                <p>
                  {selectedTableData.zone}
                  {" • "}
                  {selectedTableData.seats} places
                </p>

              </div>

            </div>

            <div className="selected-table-details">

              <div>

                <Clock size={17} />

                <span>
                  Ouverte :{" "}
                  {selectedTableOrder?.openedAt ||
                    "--:--"}
                </span>

              </div>

              <div>

                <User size={17} />

                <span>
                  {selectedTableOrder?.waiter ||
                    selectedCashier}
                </span>

              </div>

              <div
                className={`status-display ${
                  getTableStatus(selectedTable)
                }`}
              >

                <CircleDot size={17} />

                {getStatusLabel(
                  getTableStatus(selectedTable)
                )}

              </div>

            </div>

          </section>

        )}


      {/* =====================================================
         INTERFACE CAISSE
         Commerce + Habillement
         Restaurant uniquement après sélection d'une table
      ===================================================== */}

      {(activeActivity !== "restaurant" ||
        selectedTable) && (

        <div className="three-zone-layout">

          {/* =====================================================
             CATALOGUE
          ===================================================== */}

          <aside className="products-zone">

            <div className="zone-header">

              <div>

                <span className="zone-label">
                  CATALOGUE
                </span>

                <h2>
                  {activeActivity === "restaurant"
                    ? "Menu"
                    : "Produits"}
                </h2>

              </div>

              <span className="products-count">
                {currentProducts.length}
              </span>

            </div>

            <div className="catalog-search">

              <Search size={18} />

              <input
                type="text"
                placeholder="Scanner ou rechercher..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={handleScanKeyDown}
              />

              <ScanLine size={18} />

            </div>

            <div className="categories-scroll">

              {categories.map((category) => (

                <button
                  type="button"
                  key={category}
                  className={
                    selectedCategory === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >
                  {category}
                </button>

              ))}

            </div>

            <div className="products-scroll">

              {filteredProducts.map((product) => (

                <button
                  type="button"
                  className="product-list-row"
                  key={product.id}
                  onClick={() =>
                    addToCart(product)
                  }
                >

                  <div
                    className="product-emoji"
                    style={{
                      ...getProductIconTone(activeActivity),
                      display: "grid",
                      placeItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {String(product.icon || "").startsWith("data:image/") ? (
                      <img
                        src={product.icon}
                        alt={String(product.name || "Produit")}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      (() => {
                        const ProductIcon = getProductIconComponent({
                          ...product,
                          activity: activeActivity,
                        });
                        return <ProductIcon size={24} strokeWidth={2.15} />;
                      })()
                    )}
                  </div>

                  <div className="product-row-info">

                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.category}
                    </span>

                  </div>

                  <div className="product-row-price">

                    <strong>
                      {getPriceDisplayData(product).primary}
                    </strong>

                    <small>
                      {getPriceDisplayData(product).secondary}
                    </small>

                  </div>

                  <Plus size={18} />

                </button>

              ))}

            </div>

          </aside>


          {/* =====================================================
             PANIER
          ===================================================== */}

          <section className="cart-zone">

            <div className="zone-header">

              <div>

                <span className="zone-label">
                  {activeActivity === "restaurant"
                    ? "COMMANDE ACTIVE"
                    : "VENTE EN COURS"}
                </span>

                <h2>
                  {activeActivity === "restaurant"
                    ? selectedTableData?.name
                    : "Panier"}
                </h2>

              </div>

              <div className="cart-badge">

                <ShoppingBasket size={17} />

                {caisseTotalItems}

              </div>

            </div>

            <div className="cart-zone-scroll">

              {safeCurrentCart.length === 0 ? (

                <div className="empty-cart">

                  <ShoppingCart size={50} />

                  <h3>
                    Aucune commande
                  </h3>

                  <p>
                    Ajoutez des articles depuis
                    le catalogue.
                  </p>

                </div>

              ) : (

                 <div className="cart-list">

                  {safeCurrentCart.map((item) => {

                    const itemPrice =
                      Math.max(
                        0,
                        Number(
                          getProductPrice(item)
                        ) || 0
                      );

                    const itemQuantity =
                      Math.max(
                        0,
                        Number(
                          getProductQuantity(item)
                        ) || 0
                      );

                    const itemTotal =
                      itemPrice *
                      itemQuantity;

                    const itemCurrency =
                      String(
                        item.priceCurrency ||
                        item.currency ||
                        "USD"
                      )
                        .toUpperCase()
                        .trim() === "FC"
                        ? "FC"
                        : "USD";

                    const itemPriceUSD =
                      itemCurrency === "FC"
                        ? itemPrice / caisseRate
                        : itemPrice;

                    const itemPriceFC =
                      itemCurrency === "FC"
                        ? itemPrice
                        : itemPrice * caisseRate;

                    const itemTotalUSD =
                      itemCurrency === "FC"
                        ? itemTotal / caisseRate
                        : itemTotal;

                    const itemTotalFC =
                      itemCurrency === "FC"
                        ? itemTotal
                        : itemTotal * caisseRate;

                    return (

                      <div
                        className="cart-item"
                        key={item.id}
                      >

                        <div className="cart-item-product">

                          <div
                            className="cart-item-icon"
                            style={{
                              ...getProductIconTone(activeActivity),
                              display: "grid",
                              placeItems: "center",
                              overflow: "hidden",
                            }}
                          >

                            {String(item.icon || "").startsWith("data:image/") ? (

                              <img
                                src={item.icon}
                                alt={String(item.name || "Produit")}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />

                            ) : (

                              (() => {

                                const ProductIcon =
                                  getProductIconComponent({
                                    ...item,
                                    activity: activeActivity,
                                  });

                                return (
                                  <ProductIcon
                                    size={24}
                                    strokeWidth={2.15}
                                  />
                                );

                              })()

                            )}

                          </div>

                          <div>

                            <strong>
                              {item.name}
                            </strong>

                            <span className="cart-price-primary">
                              {itemCurrency === "FC"
                                ? `${Math.round(
                                    itemPriceFC
                                  ).toLocaleString(
                                    "fr-FR"
                                  )} FC`
                                : `${itemPriceUSD.toFixed(
                                    2
                                  )} $`}
                            </span>

                            <small className="cart-price-secondary">
                              {itemCurrency === "FC"
                                ? `${itemPriceUSD.toFixed(
                                    2
                                  )} $`
                                : `${Math.round(
                                    itemPriceFC
                                  ).toLocaleString(
                                    "fr-FR"
                                  )} FC`}
                            </small>

                          </div>

                        </div>

                        <div className="quantity-controls">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                -1
                              )
                            }
                          >
                            <Minus size={16} />
                          </button>

                          <strong>
                            {itemQuantity}
                          </strong>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                1
                              )
                            }
                          >
                            <Plus size={16} />
                          </button>

                        </div>

                        <div className="cart-item-price">

                          <strong className="cart-total-primary">
                            {itemCurrency === "FC"
                              ? `${Math.round(
                                  itemTotalFC
                                ).toLocaleString(
                                  "fr-FR"
                                )} FC`
                              : `${itemTotalUSD.toFixed(
                                  2
                                )} $`}
                          </strong>

                          <span className="cart-total-secondary">
                            {itemCurrency === "FC"
                              ? `${itemTotalUSD.toFixed(
                                  2
                                )} $`
                              : `${Math.round(
                                  itemTotalFC
                                ).toLocaleString(
                                  "fr-FR"
                                )} FC`}
                          </span>

                        </div>

                        <button
                          type="button"
                          className="delete-product"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    );

                  })}

                </div>
              )}

            </div>

          </section>


          {/* =====================================================
             PAIEMENT
          ===================================================== */}

          <aside className="payment-zone">

            <div className="payment-scroll">

              <div className="payment-header">

                <div className="payment-header-icon">
                  <Wallet size={21} />
                </div>

                <div>

                  <span>
                    ESPACE PAIEMENT
                  </span>

                  <h2>
                    Encaissement
                  </h2>

                </div>

                <button
                  type="button"
                  className="reset-sale"
                  onClick={newSale}
                >
                  <RefreshCw size={17} />
                </button>

              </div>


              {/* =================================================
                 TOTAL
              ================================================= */}

              <div className="payment-total-box premium-total">

                <span>
                  TOTAL À PAYER
                </span>

                <small>
                  {caisseTotalItems} article(s)
                </small>

                {activeActivity === "pharmacie" ? (

                  <>

                    <strong className="main-total">

                      {Math.round(
                        Number(
                          caisseTotalFC || 0
                        )
                      ).toLocaleString(
                        "fr-FR"
                      )} FC

                    </strong>

                    <span className="secondary-total">

                      {Number(
                        caisseTotalUSD || 0
                      ).toFixed(2)} $

                    </span>

                  </>

                ) : currency === "USD" ? (

                  <>

                    <strong className="main-total">

                      {Number(
                        caisseTotalUSD || 0
                      ).toFixed(2)} $

                    </strong>

                    <span className="secondary-total">

                      {Math.round(
                        Number(
                          caisseTotalFC || 0
                        )
                      ).toLocaleString(
                        "fr-FR"
                      )} FC

                    </span>

                  </>

                ) : (

                  <>

                    <strong className="main-total">

                      {Math.round(
                        Number(
                          caisseTotalFC || 0
                        )
                      ).toLocaleString(
                        "fr-FR"
                      )} FC

                    </strong>

                    <span className="secondary-total">

                      {Number(
                        caisseTotalUSD || 0
                      ).toFixed(2)} $

                    </span>

                  </>

                )}

              </div>


              {/* =================================================
                 TAUX
              ================================================= */}

              <div className="payment-section">

                <label>
                  TAUX DU JOUR
                </label>

                <div className="rate-box">

                  <span>
                    1 USD =
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={exchangeRate}
                    onChange={(event) =>
                      setExchangeRate(
                        Number(
                          event.target.value
                        ) || 0
                      )
                    }
                  />

                  <strong>
                    FC
                  </strong>

                </div>

              </div>


              {/* =================================================
                 DEVISE
              ================================================= */}

              <div className="payment-section">

                <label>
                  DEVISE PRINCIPALE
                </label>

                <div className="currency-buttons">

                  <button
                    type="button"
                    className={
                      currency === "USD"
                        ? "active"
                        : ""
                    }
                    onClick={() => {

                      setCurrency("USD");
                      setAmountReceived("");

                    }}
                  >
                    <DollarSign size={18} />
                    USD
                  </button>

                  <button
                    type="button"
                    className={
                      currency === "FC"
                        ? "active"
                        : ""
                    }
                    onClick={() => {

                      setCurrency("FC");
                      setAmountReceived("");

                    }}
                  >
                    <Banknote size={18} />
                    FC
                  </button>

                </div>

              </div>


              {/* =================================================
                 MODE DE PAIEMENT
              ================================================= */}

              <div className="payment-section">

                <label>
                  MODE DE PAIEMENT
                </label>

                <div className="payment-methods">

                  {[
                    {
                      name: "Espèces",
                      icon: Banknote,
                    },
                    {
                      name: "Airtel Money",
                      icon: Smartphone,
                    },
                    {
                      name: "Orange Money",
                      icon: Smartphone,
                    },
                    {
                      name: "M-Pesa",
                      icon: Smartphone,
                    },
                    {
                      name: "Carte",
                      icon: CreditCard,
                    },
                  ].map((method) => {

                    const Icon =
                      method.icon;

                    return (

                      <button
                        type="button"
                        key={method.name}
                        className={
                          paymentMethod ===
                          method.name
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setPaymentMethod(
                            method.name
                          )
                        }
                      >

                        <Icon size={16} />

                        {method.name}

                      </button>

                    );

                  })}

                </div>

              </div>


              {/* =================================================
                 MONTANT REÇU
              ================================================= */}

              <div className="payment-section">

                <label>
                  MONTANT REÇU ({currency})
                </label>

                <div className="received-input">

                  <CircleDollarSign size={19} />

                  <input
                    type="number"
                    min="0"
                    value={amountReceived}
                    placeholder="Montant reçu"
                    onChange={(event) =>
                      setAmountReceived(
                        event.target.value
                      )
                    }
                  />

                  <strong>
                    {currency}
                  </strong>

                </div>

              </div>


              {/* =================================================
                 RESTE OU MONNAIE
              ================================================= */}

              {amountReceived !== "" &&
                Number(caisseTotalUSD || 0) > 0 &&
                (isPaymentComplete ? (

                  <div className="change-result">

                    <span>
                      MONNAIE À RENDRE
                    </span>

                    <strong>

                      {currency === "USD"
                        ? `${changeUSD.toFixed(2)} $`
                        : `${Math.round(
                            changeFC
                          ).toLocaleString(
                            "fr-FR"
                          )} FC`}

                    </strong>

                  </div>

                ) : (

                  <div className="remaining-result">

                    <span>
                      RESTE À PAYER
                    </span>

                    <strong>

                      {currency === "USD"
                        ? `${remainingUSD.toFixed(2)} $`
                        : `${Math.round(
                            remainingFC
                          ).toLocaleString(
                            "fr-FR"
                          )} FC`}

                    </strong>

                  </div>

                ))}


              {/* =================================================
                 RESTAURANT : METTRE À ENCAISSER
              ================================================= */}

              {activeActivity === "restaurant" &&
                safeCurrentCart.length > 0 &&
                getTableStatus(selectedTable) ===
                  "occupied" && (

                  <button
                    type="button"
                    className="billing-table-button"
                    onClick={sendTableToBilling}
                  >
                    <Receipt size={19} />
                    Mettre à encaisser
                  </button>

                )}


              {/* =================================================
                 APERÇU FACTURE
              ================================================= */}

              <button
                type="button"
                className="print-preview-button"
                disabled={
                  safeCurrentCart.length === 0
                }
                onClick={openInvoicePreview}
              >
                <Printer size={19} />
                Aperçu de la facture
              </button>


              {/* =================================================
                 VALIDATION
              ================================================= */}

              <button
                type="button"
                className="validate-sale"
                disabled={
                  safeCurrentCart.length === 0 ||
                  amountReceived === "" ||
                  !isPaymentComplete
                }
                onClick={validateSale}
              >

                <CheckCircle2 size={20} />

                {activeActivity === "restaurant"
                  ? "Encaisser la table"
                  : "Valider la vente"}

              </button>

            </div>

          </aside>

        </div>

      )}

    </div>
  );

};
/* =====================================================
   PRODUITS
===================================================== */

/* =====================================================
   GESTION DES PRODUITS
===================================================== */

/* =====================================================
   GÉNÉRER AUTOMATIQUEMENT UN CODE-BARRES EAN-13
===================================================== */

const generateBarcode = () => {

  const base =
    Date.now().toString().slice(-12);

  let code = base;

  while (code.length < 12) {
    code = "0" + code;
  }

  code = code.slice(-12);

  let sum = 0;

  for (let i = 0; i < 12; i++) {

    const digit =
      Number(code[i]);

    sum +=
      i % 2 === 0
        ? digit
        : digit * 3;

  }

  const checkDigit =
    (10 - (sum % 10)) % 10;

  return code + checkDigit;
};


/* =====================================================
   NOUVEAU PRODUIT
===================================================== */

const openNewProductModal = () => {

  setEditingProduct(null);

  setProductForm({

    name: "",

    category: "",

    store: selectedBranch,

    /* =============================================
       PRIX D'ACHAT
    ============================================= */

    purchasePrice: "",

    purchasePriceCurrency: "USD",

    /* =============================================
       PRIX DE VENTE
    ============================================= */

    pricingMode: "auto",

    marginPercent: "20",

    price: "",

    priceCurrency: "USD",

    /* =============================================
       CONDITIONNEMENT PHARMACIE
    ============================================= */

    packUnits:
      activeActivity === "pharmacie"
        ? "20"
        : "1",

    /* =============================================
       STOCK
    ============================================= */

    stock: "",

    minStock: "5",

    /* =============================================
       AUTRES
    ============================================= */

    unit:
      getActivityUnitOptions(
        activeActivity
      )[0],

    icon: "",

    code:
      generateBarcode(),

    /* =============================================
       EXPIRATION
       COMMERCE + PHARMACIE
    ============================================= */

    expiryDate:
      activeActivity === "commerce" ||
      activeActivity === "pharmacie"
        ? ""
        : null,

  });

  setShowProductModal(true);
};


/* =====================================================
   MODIFIER PRODUIT
===================================================== */

const openEditProductModal = (product) => {

  setEditingProduct(product);

  setProductForm({

    name:
      product.name || "",

    category:
      product.category || "",

    store:
      selectedBranch,

    /* =============================================
       PRIX D'ACHAT
       ON CONSERVE LA DEVISE ENREGISTRÉE
    ============================================= */

    purchasePrice:
      product.purchasePrice ?? "",

    purchasePriceCurrency:
      String(
        product.purchasePriceCurrency ||
        "USD"
      )
        .toUpperCase()
        .trim() === "FC"
        ? "FC"
        : "USD",

    /* =============================================
       PRIX DE VENTE
       ON CONSERVE LA DEVISE ENREGISTRÉE
    ============================================= */

    price:
      product.price ?? "",

    priceCurrency:
      String(
        product.priceCurrency ||
        "USD"
      )
        .toUpperCase()
        .trim() === "FC"
        ? "FC"
        : "USD",

    pricingMode:
      product.pricingMode || "manual",

    marginPercent:
      product.marginPercent ?? "20",

    packUnits:
      product.packUnits ?? "1",

    /* =============================================
       STOCK
    ============================================= */

    stock:
      getProductStock(product),

    minStock:
      product.minStock ?? "5",

    /* =============================================
       AUTRES
    ============================================= */

    unit:
      normalizeProductUnit(
        activeActivity,
        product.unit
      ),

    icon:
      product.icon || "",

    code:
      product.code ||
      generateBarcode(),

    /* =============================================
       EXPIRATION
       COMMERCE + PHARMACIE
    ============================================= */

    expiryDate:
      activeActivity === "commerce" ||
      activeActivity === "pharmacie"
        ? product.expiryDate || ""
        : null,

  });

  setShowProductModal(true);
};


/* =====================================================
   ENREGISTRER PRODUIT
===================================================== */

const saveProduct = () => {

  /* =================================================
     ACTIVITÉ NORMALISÉE — DOIT ÊTRE DÉFINIE AVANT
     TOUTE UTILISATION DANS CETTE FONCTION
  ================================================= */

  const activityKey =
    String(
      activeActivity || "commerce"
    )
      .toLowerCase()
      .trim();

  const normalizedActivity =
    activityKey === "restaurant"
      ? "restaurant"
      : activityKey === "habillement"
        ? "habillement"
        : activityKey === "pharmacie"
          ? "pharmacie"
          : "commerce";


  /* =================================================
     DONNÉES DU FORMULAIRE
  ================================================= */

  const name =
    String(
      productForm.name || ""
    ).trim();

  const category =
    String(
      productForm.category || ""
    ).trim();

  const purchasePrice =
    toSafeNumber(
      productForm.purchasePrice
    );

  const priceCurrency =
    productForm.priceCurrency === "FC"
      ? "FC"
      : "USD";

  const purchasePriceCurrency =
    productForm.purchasePriceCurrency === "FC"
      ? "FC"
      : "USD";

  const pricingMode =
    productForm.pricingMode === "manual"
      ? "manual"
      : "auto";

  const marginPercent =
    Math.max(
      0,
      toSafeNumber(productForm.marginPercent)
    );

  const rate =
    toSafeNumber(exchangeRate) > 0
      ? toSafeNumber(exchangeRate)
      : 2850;

  const purchaseInSaleCurrency =
    purchasePriceCurrency === priceCurrency
      ? purchasePrice
      : purchasePriceCurrency === "USD"
        ? purchasePrice * rate
        : purchasePrice / rate;

  const calculatedPrice =
    purchaseInSaleCurrency *
    (1 + marginPercent / 100);

  const price =
    pricingMode === "auto"
      ? Number(calculatedPrice.toFixed(priceCurrency === "FC" ? 0 : 2))
      : toSafeNumber(productForm.price);

  const packUnits =
    normalizedActivity === "pharmacie"
      ? Math.max(1, Math.floor(toSafeNumber(productForm.packUnits) || 1))
      : 1;

  const rawStock =
    toSafeNumber(
      productForm.stock
    );

  const stock =
    normalizedActivity === "pharmacie" && !editingProduct
      ? rawStock * packUnits
      : rawStock;

  const minStock =
    toSafeNumber(
      productForm.minStock
    );

  const unit =
    normalizedActivity === "pharmacie"
      ? "Comprimé"
      : normalizeProductUnit(
          normalizedActivity,
          productForm.unit
        );

  const code =
    String(
      productForm.code || ""
    ).trim() ||
    generateBarcode();

  const branch =
    productForm.store ||
    selectedBranch;
    const expiryDate =
  normalizedActivity === "commerce" ||
  normalizedActivity === "pharmacie"
    ? String(
        productForm.expiryDate || ""
      ).trim()
    : "";


  /* =================================================
     VALIDATIONS
  ================================================= */

  if (!name) {
    alert(
      "Veuillez saisir le nom du produit."
    );
    return;
  }

  if (!category) {
    alert(
      "Veuillez saisir la catégorie."
    );
    return;
  }

  if (price <= 0) {
    alert(
      "Veuillez saisir un prix de vente valide ou une marge correcte."
    );
    return;
  }

  if (normalizedActivity === "pharmacie" && packUnits < 1) {
    alert("Le nombre d'unités par conditionnement doit être supérieur à 0.");
    return;
  }


  /* =================================================
     ENREGISTREMENT
  ================================================= */

  setProducts((previous) => {

    const activityProducts =
      Array.isArray(
        previous?.[normalizedActivity]
      )
        ? previous[normalizedActivity]
        : [];


    /* ===============================================
       MODIFICATION
    =============================================== */

    if (editingProduct) {

      return {

        ...previous,

        [normalizedActivity]:
          activityProducts.map(
            (product) => {

              if (
                String(product.id) !==
                String(
                  editingProduct.id
                )
              ) {
                return product;
              }

              const stockByBranch = {
                ...(product.stockByBranch || {}),
              };

              stockByBranch[branch] =
                stock;

              const totalStock =
                Object.values(
                  stockByBranch
                ).reduce(
                  (sum, value) =>
                    sum +
                    Number(
                      value || 0
                    ),
                  0
                );

    return {
  ...product,
  name,
  category,
  code,
  purchasePrice,
  purchasePriceCurrency,
  price,
  priceCurrency,
  pricingMode,
  marginPercent,
  packUnits,
  minStock,
  unit,
  activity: normalizedActivity,
  icon: productForm.icon || "",

  expiryDate:
    normalizedActivity === "commerce" ||
    normalizedActivity === "pharmacie"
      ? expiryDate
      : "",

  stockByBranch,
  stock: totalStock,
};
            }
          ),

      };
    }


    /* ===============================================
       NOUVEAU PRODUIT
    =============================================== */

    const stockByBranch = {};

    currentBranches.forEach(
      (currentBranch) => {
        stockByBranch[currentBranch] =
          currentBranch === branch
            ? stock
            : 0;
      }
    );

    const newProduct = {
  id:
    `product-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
  name,
  category,
  code,
  purchasePrice,
  purchasePriceCurrency,
  price,
  priceCurrency,
  pricingMode,
  marginPercent,
  packUnits,
  minStock,
  unit,
  activity: normalizedActivity,
  icon: productForm.icon || "",

  expiryDate:
    normalizedActivity === "commerce" ||
    normalizedActivity === "pharmacie"
      ? expiryDate
      : "",

  stock,
  stockByBranch,
};

    return {
      ...previous,
      [normalizedActivity]: [
        ...activityProducts,
        newProduct,
      ],
    };
  });


  /* =================================================
     FERMER LE FORMULAIRE
  ================================================= */

  setShowProductModal(false);
  setEditingProduct(null);

setProductForm({
  name: "",
  category: "",
  store: selectedBranch,
  purchasePrice: "",
  purchasePriceCurrency: "USD",
  pricingMode: "auto",
  marginPercent: "20",
  price: "",
  priceCurrency: "USD",
  packUnits: "1",
  stock: "",
  minStock: "5",
  unit: getActivityUnitOptions(activeActivity)[0],
  icon: "",
  code: "",
  expiryDate: "",
});
};

/* =====================================================
   SUPPRIMER PRODUIT
===================================================== */

const deleteProduct = (productId) => {

  if (
    !window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?"
    )
  ) {

    return;

  }


  /* =================================================
     ACTIVITÉ NORMALISÉE
  ================================================= */

  const activityKey =
    String(
      activeActivity || "commerce"
    )
      .toLowerCase()
      .trim();

  const normalizedActivity =
    activityKey === "restaurant"
      ? "restaurant"
      : activityKey === "habillement"
        ? "habillement"
        : activityKey === "pharmacie"
          ? "pharmacie"
          : "commerce";


  setProducts((previous) => ({

    ...previous,

    [normalizedActivity]:
      (
        previous[normalizedActivity] || []
      ).filter(
        (product) =>
          String(product.id) !==
          String(productId)
      ),

  }));

};
/* =====================================================
   RECHERCHE PRODUIT
===================================================== */

const productSearchText =
  String(search || "")
    .toLowerCase()
    .trim();


const productsForDisplay =
  currentProducts.filter(
    (product) => {

      if (!productSearchText) {

        return true;

      }


      return (

        String(
          product.name || ""
        )
          .toLowerCase()
          .includes(
            productSearchText
          )

        ||

        String(
          product.code || ""
        )
          .toLowerCase()
          .includes(
            productSearchText
          )

        ||

        String(
          product.category || ""
        )
          .toLowerCase()
          .includes(
            productSearchText
          )

      );

    }
  );
/* =====================================================
   TÉLÉCHARGER LES PRODUITS
===================================================== */

const downloadCurrentProducts = () => {
  try {
    const rows = [
      ["Nom", "Catégorie", "Code-barres", "Prix achat", "Prix vente", "Stock", "Unité"],
      ...(Array.isArray(currentProducts) ? currentProducts : []).map((product) => [
        product?.name || "",
        product?.category || "",
        product?.code || "",
        product?.purchasePrice ?? 0,
        product?.price ?? 0,
        getProductStock(product),
        normalizeProductUnit(activeActivity, product?.unit),
      ]),
    ];

    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(";"))
      .join("\\r\\n");

    const blob = new Blob(["\\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `monalix-produits-${activeActivity}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur téléchargement produits :", error);
    alert("Impossible de télécharger les produits.");
  }
};

/* =====================================================
   INTERFACE PRODUITS
===================================================== */

const renderProductsService = () => {

  /* ===================================================
     PRODUITS SÉCURISÉS
  =================================================== */

  const safeCurrentProducts =
    Array.isArray(currentProducts)
      ? currentProducts
      : [];


  /* ===================================================
     CATÉGORIES DISPONIBLES
  =================================================== */

  const categoriesList = [
    "Toutes",

    ...Array.from(
      new Set(
        safeCurrentProducts
          .map(
            (product) =>
              String(
                product?.category || ""
              ).trim()
          )
          .filter(Boolean)
      )
    ),
  ];


  /* ===================================================
     RECHERCHE
  =================================================== */

  const normalizedSearch =
    String(search || "")
      .toLowerCase()
      .trim();


  /* ===================================================
     PRODUITS RECHERCHÉS
     RECHERCHE PAR :
     - NOM
     - CODE-BARRES
     - CATÉGORIE
  =================================================== */

  const searchedProducts =
    safeCurrentProducts.filter(
      (product) => {

        if (!product) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        return (
          String(product.name || "")
            .toLowerCase()
            .includes(normalizedSearch) ||

          String(product.code || "")
            .toLowerCase()
            .includes(normalizedSearch) ||

          String(product.category || "")
            .toLowerCase()
            .includes(normalizedSearch)
        );

      }
    );


  /* ===================================================
     FILTRE CATÉGORIE

     COMPATIBLE AVEC :
     "Tous"
     "Toutes"
  =================================================== */

  const normalizedSelectedCategory =
    String(
      selectedCategory || ""
    )
      .toLowerCase()
      .trim();


  const isAllCategories =
    normalizedSelectedCategory === "" ||
    normalizedSelectedCategory === "tous" ||
    normalizedSelectedCategory === "toutes";


  const displayedProducts =
    isAllCategories

      ? searchedProducts

      : searchedProducts.filter(
          (product) =>
            String(
              product?.category || ""
            )
              .toLowerCase()
              .trim() ===
            normalizedSelectedCategory
        );


  /* ===================================================
     TAUX DE CHANGE PRODUITS
  =================================================== */

  const productRate =
    toSafeNumber(
      exchangeRate
    ) > 0
      ? toSafeNumber(
          exchangeRate
        )
      : 2850;


  /* ===================================================
     FORMATAGE PRIX
  =================================================== */

  const formatProductPrice = (
    value,
    currency
  ) => {

    const safeValue =
      Math.max(
        0,
        toSafeNumber(
          value
        )
      );


    const normalizedCurrency =
      String(
        currency || "USD"
      )
        .toUpperCase()
        .trim();


    if (
      normalizedCurrency === "FC"
    ) {

      return `${Math.round(
        safeValue
      ).toLocaleString(
        "fr-FR"
      )} FC`;

    }


    return `${safeValue.toLocaleString(
      "fr-FR",
      {
        minimumFractionDigits:
          2,

        maximumFractionDigits:
          2,
      }
    )} $`;

  };


  /* ===================================================
     FORMATAGE MARGE
  =================================================== */

  const formatProductMargin = (
    value,
    currency
  ) => {

    const safeValue =
      toSafeNumber(
        value
      );


    const normalizedCurrency =
      String(
        currency || "USD"
      )
        .toUpperCase()
        .trim();


    if (
      normalizedCurrency === "FC"
    ) {

      return `${Math.round(
        safeValue
      ).toLocaleString(
        "fr-FR"
      )} FC`;

    }


    return `${safeValue.toLocaleString(
      "fr-FR",
      {
        minimumFractionDigits:
          2,

        maximumFractionDigits:
          2,
      }
    )} $`;

  };


  /* ===================================================
     CALCUL DE MARGE SELON LES DEVISES
  =================================================== */

  const calculateProductMargin = (
    purchasePrice,
    purchaseCurrency,
    salePrice,
    saleCurrency
  ) => {

    const safePurchasePrice =
      Math.max(
        0,
        toSafeNumber(
          purchasePrice
        )
      );


    const safeSalePrice =
      Math.max(
        0,
        toSafeNumber(
          salePrice
        )
      );


    const normalizedPurchaseCurrency =
      String(
        purchaseCurrency || "USD"
      )
        .toUpperCase()
        .trim() === "FC"
        ? "FC"
        : "USD";


    const normalizedSaleCurrency =
      String(
        saleCurrency || "USD"
      )
        .toUpperCase()
        .trim() === "FC"
        ? "FC"
        : "USD";


    let purchaseInSaleCurrency =
      safePurchasePrice;


    /* ===============================================
       MÊME DEVISE
    =============================================== */

    if (
      normalizedPurchaseCurrency ===
      normalizedSaleCurrency
    ) {

      purchaseInSaleCurrency =
        safePurchasePrice;

    }


    /* ===============================================
       ACHAT USD → VENTE FC
    =============================================== */

    else if (
      normalizedPurchaseCurrency ===
        "USD" &&
      normalizedSaleCurrency ===
        "FC"
    ) {

      purchaseInSaleCurrency =
        safePurchasePrice *
        productRate;

    }


    /* ===============================================
       ACHAT FC → VENTE USD
    =============================================== */

    else if (
      normalizedPurchaseCurrency ===
        "FC" &&
      normalizedSaleCurrency ===
        "USD"
    ) {

      purchaseInSaleCurrency =
        safePurchasePrice /
        productRate;

    }


    const margin =
      safeSalePrice -
      purchaseInSaleCurrency;


    const marginUSD =
      normalizedSaleCurrency ===
        "FC"
        ? margin /
          productRate
        : margin;


    const marginFC =
      normalizedSaleCurrency ===
        "FC"
        ? margin
        : margin *
          productRate;


    return {
      margin,
      marginUSD,
      marginFC,
      currency:
        normalizedSaleCurrency,
    };

  };


  /* ===================================================
     RENDU
  =================================================== */

  return (

    <div className="products-page">


      {/* =================================================
          EN-TÊTE
      ================================================= */}

      <div className="products-page-header">

        <div>

          <span className="page-section-label">
            CATALOGUE
          </span>

          <h2>
            Articles & Produits
          </h2>

          <p>
            Gestion complète de votre catalogue
            de produits dans {selectedBranch}.
          </p>

        </div>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            className="add-product-button"
            onClick={downloadCurrentProducts}
          >
            <Package size={18} />
            Télécharger les produits
          </button>

          <button
            type="button"
            className="add-product-button"
            onClick={
              openNewProductModal
            }
          >

            <Plus size={18} />

            Ajouter un produit

          </button>
        </div>

      </div>


      {/* =================================================
          BARRE D'OUTILS
      ================================================= */}

      <div className="products-toolbar">


        {/* RECHERCHE */}

        <div className="products-search">

          <Search size={18} />

          <input
            id="products-search-input"
            type="text"
            value={search}
            placeholder="Rechercher un produit, code-barres ou catégorie..."
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            onKeyDown={
              handleScanKeyDown
            }
          />

        </div>


        {/* SCANNER */}

        <button
          type="button"
          className="products-scanner-button"
          onClick={() => {

            const input =
              document.getElementById(
                "products-search-input"
              );


            if (input) {

              input.focus();
              input.select();

            }

          }}
        >

          <ScanLine size={17} />

          Scanner

        </button>


        {/* FILTRE CATÉGORIE */}

        <select
          className="products-filter"
          value={
            isAllCategories
              ? "Toutes"
              : selectedCategory
          }
          onChange={(event) =>
            setSelectedCategory(
              event.target.value
            )
          }
        >

          {categoriesList.map(
            (category) => (

              <option
                key={category}
                value={category}
              >

                {category}

              </option>

            )
          )}

        </select>


        {/* COMPTEUR */}

        <div className="products-toolbar-count">

          <strong>
            {displayedProducts.length}
          </strong>

          <span>
            produit(s)
          </span>

        </div>

      </div>


      {/* =================================================
          BARRE LISTE
      ================================================= */}

      <div className="products-list-header">

        <div>

          <h3>
            Liste des produits
          </h3>

          <span>
            Ajoutez, recherchez, modifiez ou
            supprimez vos produits.
          </span>

        </div>


        <button
          type="button"
          className="new-product-button"
          onClick={
            openNewProductModal
          }
        >

          <Plus size={17} />

          Nouveau produit

        </button>

      </div>


      {/* =================================================
          TABLEAU DES PRODUITS
      ================================================= */}

      <div className="products-list-container">

        {displayedProducts.length > 0 ? (

          <div className="products-table-container">

            <table className="products-table">

              <thead>

                <tr>

                  <th>
                    Produit
                  </th>

                  <th>
                    Catégorie
                  </th>

                  <th>
                    Code-barres
                  </th>

                  <th>
                    Prix achat
                  </th>

                  <th>
                    Prix vente
                  </th>

                  <th>
                    Marge
                  </th>

                  <th>
                    Stock
                  </th>

<th>
  Stock minim
</th>

{(activeActivity === "commerce" ||
  activeActivity === "pharmacie") && (
  <th>
    Expiration
  </th>
)}

<th>
  Statut
</th>

<th>
  Actions
</th>

                </tr>

              </thead>


              <tbody>

                {displayedProducts.map(
                  (product) => {

                    /* =====================================
                       NORMALISATION DES DONNÉES
                    ===================================== */

                    const stock =
                      Math.max(
                        0,
                        toSafeNumber(
                          getProductStock(
                            product
                          )
                        )
                      );


                    const minimum =
                      Math.max(
                        0,
                        toSafeNumber(
                          product.minStock ??
                          5
                        )
                      );


                    const purchasePrice =
                      Math.max(
                        0,
                        toSafeNumber(
                          product.purchasePrice
                        )
                      );


                    const salePrice =
                      Math.max(
                        0,
                        toSafeNumber(
                          product.price
                        )
                      );


                    /* =====================================
                       DEVISE DU PRIX D'ACHAT
                    ===================================== */

                    const purchaseCurrency =
                      String(
                        product.purchasePriceCurrency ||
                        product.purchaseCurrency ||
                        "USD"
                      )
                        .toUpperCase()
                        .trim() === "FC"
                        ? "FC"
                        : "USD";


                    /* =====================================
                       DEVISE DU PRIX DE VENTE
                    ===================================== */

                    const saleCurrency =
                      String(
                        product.priceCurrency ||
                        product.saleCurrency ||
                        "USD"
                      )
                        .toUpperCase()
                        .trim() === "FC"
                        ? "FC"
                        : "USD";


                    /* =====================================
                       CALCUL MARGE
                    ===================================== */

                    const marginData =
                      calculateProductMargin(
                        purchasePrice,
                        purchaseCurrency,
                        salePrice,
                        saleCurrency
                      );


                    const margin =
                      marginData.margin;


                    /* =====================================
                       AFFICHAGE PRIX
                    ===================================== */

                    const purchasePriceDisplay =
                      formatProductPrice(
                        purchasePrice,
                        purchaseCurrency
                      );


                    const salePriceDisplay =
                      formatProductPrice(
                        salePrice,
                        saleCurrency
                      );


                    const marginDisplay =
                      formatProductMargin(
                        margin,
                        saleCurrency
                      );


                    /* =====================================
                       STATUT DU STOCK
                    ===================================== */

                    const isOutOfStock =
                      stock <= 0;


                    const isLowStock =
                      !isOutOfStock &&
                      stock <= minimum;


                    const status =
                      isOutOfStock
                        ? "Rupture"
                        : isLowStock
                          ? "Stock faible"
                          : "En stock";


                    const statusClass =
                      isOutOfStock
                        ? "out"
                        : isLowStock
                          ? "low"
                          : "good";


                    return (

                      <tr
                        key={
                          product.id ||
                          product.code ||
                          product.name
                        }
                      >


                        {/* =================================
                            PRODUIT
                        ================================= */}

                        <td>

                          <div className="product-table-name">

                            <div
                              className="product-table-icon"
                              style={{
                                ...getProductIconTone(activeActivity),
                                display: "grid",
                                placeItems: "center",
                                overflow: "hidden",
                              }}
                            >
                              {String(product.icon || "").startsWith("data:image/") ? (
                                <img
                                  src={product.icon}
                                  alt={String(product.name || "Produit")}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />
                              ) : (
                                (() => {
                                  const ProductIcon = getProductIconComponent({
                                    ...product,
                                    activity: activeActivity,
                                  });
                                  return <ProductIcon size={22} strokeWidth={2.1} />;
                                })()
                              )}
                            </div>


                            <div>

                              <strong>
                                {product.name ||
                                  "Produit sans nom"}
                              </strong>

                              <small>
                                {product.unit ||
                                  "Pièce"}
                              </small>

                            </div>

                          </div>

                        </td>


                        {/* =================================
                            CATÉGORIE
                        ================================= */}

                        <td>

                          <span className="product-category-badge">

                            {product.category ||
                              "Sans catégorie"}

                          </span>

                        </td>


                        {/* =================================
                            CODE-BARRES
                        ================================= */}

                        <td>

                          <div className="product-table-code">

                            {product.code ||
                              "—"}

                          </div>

                        </td>


                        {/* =================================
                            PRIX D'ACHAT
                        ================================= */}

                        <td>

                          <span className="product-table-price">

                            {purchasePriceDisplay}

                          </span>

                        </td>


                        {/* =================================
                            PRIX DE VENTE
                        ================================= */}

                        <td>

                          <span className="product-table-price">

                            {salePriceDisplay}

                          </span>

                        </td>


                        {/* =================================
                            MARGE
                        ================================= */}

                        <td>

                          <span
                            className={
                              margin > 0
                                ? "product-table-margin positive"
                                : margin < 0
                                  ? "product-table-margin negative"
                                  : "product-table-margin"
                            }
                          >

                            {marginDisplay}

                          </span>

                        </td>


                        {/* =================================
                            STOCK
                        ================================= */}

                        <td>

                          <strong
                            className={
                              `product-table-stock ${statusClass}`
                            }
                          >

                            {stock.toLocaleString(
                              "fr-FR"
                            )}

                          </strong>

                        </td>


                        {/* =================================
                            STOCK MINIMUM
                        ================================= */}

                        <td>

                          <span className="product-table-minimum">

                            {minimum.toLocaleString(
                              "fr-FR"
                            )}

                          </span>

                        </td>
{/* =================================
    EXPIRATION
================================= */}

{(activeActivity === "commerce" ||
  activeActivity === "pharmacie") && (

  <td>

    {product.expiryDate ? (

      (() => {

        const today =
          new Date();

        today.setHours(
          0,
          0,
          0,
          0
        );

        const expiration =
          new Date(
            `${product.expiryDate}T00:00:00`
          );

        expiration.setHours(
          0,
          0,
          0,
          0
        );

        const daysRemaining =
          Math.ceil(
            (
              expiration.getTime() -
              today.getTime()
            ) /
            (
              1000 *
              60 *
              60 *
              24
            )
          );

        let expiryStatus =
          "Valide";

        let expiryStatusClass =
          "good";

        if (
          daysRemaining < 0
        ) {

          expiryStatus =
            "Expiré";

          expiryStatusClass =
            "out";

        } else if (
          daysRemaining <= 30
        ) {

          expiryStatus =
            "Expire bientôt";

          expiryStatusClass =
            "low";

        }

        return (

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >

            <span
              style={{
                fontWeight: 600,
              }}
            >
              {expiration.toLocaleDateString(
                "fr-FR"
              )}
            </span>

            <span
              className={
                `product-stock-status ${expiryStatusClass}`
              }
            >

              <span className="product-stock-status-dot" />

              {expiryStatus}

            </span>

            <small
              style={{
                color: "#777",
              }}
            >

              {daysRemaining < 0
                ? `Dépassé de ${Math.abs(
                    daysRemaining
                  )} jour(s)`
                : `${daysRemaining} jour(s) restant(s)`}

            </small>

          </div>

        );

      })()

    ) : (

      <span
        style={{
          color: "#888",
        }}
      >
        Sans date
      </span>

    )}

  </td>

)}

{/* =================================
    STATUT
================================= */}

<td>

  <span
    className={
      `product-stock-status ${statusClass}`
    }
  >

    <span className="product-stock-status-dot" />

    {status}

  </span>

</td>


{/* =================================
    ACTIONS
================================= */}

<td>

  <div className="product-actions">


    {/* MODIFIER */}

    <button
      type="button"
      className="product-action-button"
      title="Modifier le produit"
      aria-label="Modifier le produit"
      onClick={() =>
        openEditProductModal(
          product
        )
      }
    >

      <Pencil
        size={15}
      />

    </button>


    {/* SUPPRIMER */}

    <button
      type="button"
      className="product-action-button delete"
      title="Supprimer le produit"
      aria-label="Supprimer le produit"
      onClick={() =>
        deleteProduct(
          product.id
        )
      }
    >

      <Trash2
        size={15}
      />

    </button>

  </div>

</td>


</tr>

);

}

)}

</tbody>

</table>

</div>

) : (

/* =================================================
   ÉTAT VIDE
================================================= */

<div className="empty-products">

  <Package
    size={48}
  />


  <h3>

    {search ||
    !isAllCategories

      ? "Aucun produit trouvé"

      : "Aucun produit enregistré"}

  </h3>


  <p>

    {search ||
    !isAllCategories

      ? "Aucun produit ne correspond à vos critères de recherche."

      : "Commencez par ajouter votre premier produit."}

  </p>


  {!search &&
    isAllCategories && (

      <button
        type="button"
        className="add-product-button"
        onClick={
          openNewProductModal
        }
      >

        <Plus size={18} />

        Ajouter un produit

      </button>

    )}

</div>

)}

</div>


{/* =================================================
    MODAL PRODUIT
    NOUVEAU / MODIFICATION
================================================= */}

{showProductModal && (

  <div className="product-modal-overlay">

    <div className="product-modal">


      {/* =============================================
          EN-TÊTE MODAL
      ============================================= */}

      <div className="product-modal-header">

        <div>

          <span>
            GESTION DU CATALOGUE
          </span>

          <h2>

            {editingProduct
              ? "Modifier le produit"
              : "Nouveau produit"}

          </h2>

        </div>


        <button
          type="button"
          className="product-modal-close"
          onClick={() => {

            setShowProductModal(
              false
            );

            setEditingProduct(
              null
            );

                }}
              >

                <X
                  size={21}
                />

              </button>

            </div>


            {/* =============================================
                FORMULAIRE
            ============================================= */}

            <div className="product-form">


              {/* =============================================
                  NOM
              ============================================= */}

              <div className="product-form-group">

                <label>
                  Nom du produit *
                </label>

                <input
                  type="text"
                  value={
                    productForm.name ||
                    ""
                  }
                  placeholder="Ex. Coca-Cola 50 cl"
                  onChange={(event) =>
                    setProductForm(
                      (previous) => ({
                        ...previous,
                        name:
                          event.target.value,
                      })
                    )
                  }
                />

              </div>


              {/* =============================================
                  CATÉGORIE
              ============================================= */}

              <div className="product-form-group">

                <label>
                  Catégorie *
                </label>

                <input
                  type="text"
                  list="product-categories"
                  value={
                    productForm.category ||
                    ""
                  }
                  placeholder="Ex. Boissons"
                  onChange={(event) =>
                    setProductForm(
                      (previous) => ({
                        ...previous,
                        category:
                          event.target.value,
                      })
                    )
                  }
                />
{/* =============================================
    DATE D'EXPIRATION
    COMMERCE + PHARMACIE UNIQUEMENT
============================================= */}

{(activeActivity === "commerce" ||
  activeActivity === "pharmacie") && (

  <div className="product-form-group">

    <label>
      Date d'expiration
    </label>

    <input
      type="date"
      value={
        productForm.expiryDate ||
        ""
      }
      onChange={(event) =>
        setProductForm(
          (previous) => ({
            ...previous,
            expiryDate:
              event.target.value,
          })
        )
      }
    />

  </div>

)}

                <datalist
                  id="product-categories"
                >

                  {categoriesList
                    .filter(
                      (category) =>
                        category !==
                        "Toutes"
                    )
                    .map(
                      (category) => (

                        <option
                          key={category}
                          value={category}
                        />

                      )
                    )}

                </datalist>

              </div>


              {/* =============================================
                  MAGASIN / POINT DE VENTE
              ============================================= */}

              <div className="product-form-group">

                <label>
                  Magasin / Point de vente
                </label>

                <select
                  value={
                    productForm.store ||
                    selectedBranch ||
                    ""
                  }
                  onChange={(event) =>
                    setProductForm(
                      (previous) => ({
                        ...previous,
                        store:
                          event.target.value,
                      })
                    )
                  }
                >

                  {(
                    Array.isArray(
                      currentBranches
                    )
                      ? currentBranches
                      : []
                  ).map(
                    (branch) => (

                      <option
                        key={branch}
                        value={branch}
                      >

                        {branch}

                      </option>

                    )
                  )}

                </select>

              </div>


              {/* =============================================
                  CODE-BARRES
              ============================================= */}

              <div className="product-form-group product-barcode-form">

                <label>
                  Code-barres
                </label>

                <div className="barcode-input-wrapper">

                  <input
                    type="text"
                    value={
                      productForm.code ||
                      ""
                    }
                    onChange={(event) =>
                      setProductForm(
                        (previous) => ({
                          ...previous,
                          code:
                            event.target.value,
                        })
                      )
                    }
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setProductForm(
                        (previous) => ({
                          ...previous,
                          code:
                            generateBarcode(),
                        })
                      )
                    }
                  >

                    <RefreshCw
                      size={17}
                    />

                    Générer

                  </button>

                </div>


                <small>

                  Le code est généré automatiquement.
                  Vous pouvez également le remplacer
                  par le code fourni par le fabricant.

                </small>

              </div>


              {/* =============================================
                  PRIX D'ACHAT / MARGE / PRIX DE VENTE
              ============================================= */}

              <div className="product-form-grid">

                <div className="product-form-group">
                  <label>Prix d'achat *</label>
                  <div className="product-price-input-row">
                    <input
                      type="number"
                      min="0"
                      step={productForm.purchasePriceCurrency === "FC" ? "1" : "0.01"}
                      value={productForm.purchasePrice ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        setProductForm((previous) => {
                          const purchase = Math.max(0, toSafeNumber(value));
                          const purchaseCurrency = previous.purchasePriceCurrency === "FC" ? "FC" : "USD";
                          const saleCurrency = previous.priceCurrency === "FC" ? "FC" : "USD";
                          const rateNow = toSafeNumber(exchangeRate) > 0 ? toSafeNumber(exchangeRate) : 2850;
                          const purchaseConverted = purchaseCurrency === saleCurrency ? purchase : purchaseCurrency === "USD" ? purchase * rateNow : purchase / rateNow;
                          const margin = Math.max(0, toSafeNumber(previous.marginPercent));
                          const nextPrice = purchaseConverted * (1 + margin / 100);
                          return {
                            ...previous,
                            purchasePrice: value,
                            price: previous.pricingMode === "auto"
                              ? Number(nextPrice.toFixed(saleCurrency === "FC" ? 0 : 2))
                              : previous.price,
                          };
                        });
                      }}
                    />
                    <select
                      value={productForm.purchasePriceCurrency || "USD"}
                      onChange={(event) =>
                        setProductForm((previous) => ({
                          ...previous,
                          purchasePriceCurrency: event.target.value,
                        }))
                      }
                    >
                      <option value="USD">USD $</option>
                      <option value="FC">FC</option>
                    </select>
                  </div>
                  <small>Coût d'achat du produit.</small>
                </div>

                <div className="product-form-group">
                  <label>Mode de prix</label>
                  <select
                    value={productForm.pricingMode || "auto"}
                    onChange={(event) => {
                      const mode = event.target.value;
                      setProductForm((previous) => {
                        if (mode !== "auto") {
                          return { ...previous, pricingMode: mode };
                        }
                        const purchase = Math.max(0, toSafeNumber(previous.purchasePrice));
                        const purchaseCurrency = previous.purchasePriceCurrency === "FC" ? "FC" : "USD";
                        const saleCurrency = previous.priceCurrency === "FC" ? "FC" : "USD";
                        const rateNow = toSafeNumber(exchangeRate) > 0 ? toSafeNumber(exchangeRate) : 2850;
                        const purchaseConverted = purchaseCurrency === saleCurrency ? purchase : purchaseCurrency === "USD" ? purchase * rateNow : purchase / rateNow;
                        const margin = Math.max(0, toSafeNumber(previous.marginPercent));
                        const nextPrice = purchaseConverted * (1 + margin / 100);
                        return {
                          ...previous,
                          pricingMode: "auto",
                          price: Number(nextPrice.toFixed(saleCurrency === "FC" ? 0 : 2)),
                        };
                      });
                    }}
                  >
                    <option value="auto">Automatique — marge %</option>
                    <option value="manual">Manuel — prix imposé</option>
                  </select>
                  <small>Les anciens produits restent compatibles avec le mode manuel.</small>
                </div>

              </div>

              <div className="product-form-grid">

                <div className="product-form-group">
                  <label>Marge sur achat (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.marginPercent ?? "20"}
                    disabled={productForm.pricingMode === "manual"}
                    onChange={(event) => {
                      const value = event.target.value;
                      setProductForm((previous) => {
                        const margin = Math.max(0, toSafeNumber(value));
                        const purchase = Math.max(0, toSafeNumber(previous.purchasePrice));
                        const purchaseCurrency = previous.purchasePriceCurrency === "FC" ? "FC" : "USD";
                        const saleCurrency = previous.priceCurrency === "FC" ? "FC" : "USD";
                        const rateNow = toSafeNumber(exchangeRate) > 0 ? toSafeNumber(exchangeRate) : 2850;
                        const purchaseConverted = purchaseCurrency === saleCurrency ? purchase : purchaseCurrency === "USD" ? purchase * rateNow : purchase / rateNow;
                        const nextPrice = purchaseConverted * (1 + margin / 100);
                        return {
                          ...previous,
                          marginPercent: value,
                          price: previous.pricingMode === "auto"
                            ? Number(nextPrice.toFixed(saleCurrency === "FC" ? 0 : 2))
                            : previous.price,
                        };
                      });
                    }}
                  />
                  <small>MONALIX calcule automatiquement le prix de vente.</small>
                </div>

                <div className="product-form-group">
                  <label>Prix de vente {productForm.pricingMode === "auto" ? "calculé" : "*"}</label>
                  <div className="product-price-input-row">
                    <input
                      type="number"
                      min="0"
                      step={productForm.priceCurrency === "FC" ? "1" : "0.01"}
                      value={productForm.price ?? ""}
                      readOnly={productForm.pricingMode === "auto"}
                      onChange={(event) =>
                        setProductForm((previous) => ({
                          ...previous,
                          price: event.target.value,
                        }))
                      }
                    />
                    <select
                      value={productForm.priceCurrency || "USD"}
                      onChange={(event) => {
                        const nextCurrency = event.target.value;
                        setProductForm((previous) => {
                          const purchase = Math.max(0, toSafeNumber(previous.purchasePrice));
                          const purchaseCurrency = previous.purchasePriceCurrency === "FC" ? "FC" : "USD";
                          const rateNow = toSafeNumber(exchangeRate) > 0 ? toSafeNumber(exchangeRate) : 2850;
                          const purchaseConverted = purchaseCurrency === nextCurrency ? purchase : purchaseCurrency === "USD" ? purchase * rateNow : purchase / rateNow;
                          const margin = Math.max(0, toSafeNumber(previous.marginPercent));
                          const nextPrice = purchaseConverted * (1 + margin / 100);
                          return {
                            ...previous,
                            priceCurrency: nextCurrency,
                            price: previous.pricingMode === "auto"
                              ? Number(nextPrice.toFixed(nextCurrency === "FC" ? 0 : 2))
                              : previous.price,
                          };
                        });
                      }}
                    >
                      <option value="USD">USD $</option>
                      <option value="FC">FC</option>
                    </select>
                  </div>
                  <small>Prix calculé à partir du prix d'achat et de la marge.</small>
                </div>

              </div>

              {/* =============================================
                  APERÇU DE LA MARGE
              ============================================= */}

              <div className="product-margin-preview">

                <span>
                  Marge unitaire
                </span>

                <strong>

                  {(() => {

                    const purchase =
                      Math.max(
                        0,
                        toSafeNumber(
                          productForm.purchasePrice
                        )
                      );


                    const sale =
                      Math.max(
                        0,
                        toSafeNumber(
                          productForm.price
                        )
                      );


                    const purchaseCurrency =
                      String(
                        productForm.purchasePriceCurrency ||
                        "USD"
                      )
                        .toUpperCase()
                        .trim() === "FC"
                        ? "FC"
                        : "USD";


                    const saleCurrency =
                      String(
                        productForm.priceCurrency ||
                        "USD"
                      )
                        .toUpperCase()
                        .trim() === "FC"
                        ? "FC"
                        : "USD";


                    const marginData =
                      calculateProductMargin(
                        purchase,
                        purchaseCurrency,
                        sale,
                        saleCurrency
                      );


                    return formatProductMargin(
                      marginData.margin,
                      marginData.currency
                    );

                  })()}

                </strong>

              </div>


              {activeActivity === "pharmacie" && (
                <div className="product-form-grid">
                  <div className="product-form-group">
                    <label>Unités par conditionnement</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={productForm.packUnits ?? "1"}
                      onChange={(event) =>
                        setProductForm((previous) => ({
                          ...previous,
                          packUnits: event.target.value,
                        }))
                      }
                    />
                    <small>Exemple : 1 boîte = 20 comprimés. Le stock est géré à l'unité de vente.</small>
                  </div>

                  <div className="product-form-group">
                    <label>Unité de vente pharmacie</label>
                    <input
                      type="text"
                      value="Comprimé"
                      readOnly
                    />
                    <small>Pour les médicaments conditionnés en comprimés, la vente se fait à l'unité.</small>
                  </div>
                </div>
              )}

              {/* =============================================
                  STOCK
              ============================================= */}

              <div className="product-form-grid">


                {/* STOCK INITIAL */}

                <div className="product-form-group">

                  <label>
                    Stock initial
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={
                      productForm.stock ??
                      ""
                    }
                    placeholder="0"
                    onChange={(event) =>
                      setProductForm(
                        (previous) => ({
                          ...previous,
                          stock:
                            event.target.value,
                        })
                      )
                    }
                  />

                  <small>
                    {activeActivity === "pharmacie"
                      ? "MONALIX convertit automatiquement les boîtes en comprimés selon le conditionnement."
                      : "Quantité disponible au départ."}
                  </small>

                </div>


                {/* STOCK MINIMUM */}

                <div className="product-form-group">

                  <label>
                    Stock minimum
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={
                      productForm.minStock ??
                      ""
                    }
                    placeholder="5"
                    onChange={(event) =>
                      setProductForm(
                        (previous) => ({
                          ...previous,
                          minStock:
                            event.target.value,
                        })
                      )
                    }
                  />

                  <small>
                    Niveau déclenchant l'alerte de stock faible.
                  </small>

                </div>

              </div>


              {/* =============================================
                  UNITÉ + ICÔNE / IMAGE PERSONNALISÉE
              ============================================= */}

              <div className="product-form-grid">

                <div className="product-form-group">

                  <label>Unité</label>

                  <select
                    value={productForm.unit || "Pièce"}
                    onChange={(event) =>
                      setProductForm((previous) => ({
                        ...previous,
                        unit: event.target.value,
                      }))
                    }
                  >
                    {getActivityUnitOptions(activeActivity).map((unitOption) => (
                      <option key={unitOption} value={unitOption}>
                        {unitOption}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="product-form-group">

                  <label>Icône / image du produit</label>

                  <div className="product-icon-upload-box">

                    <div className="product-icon-upload-preview">
                      {String(productForm.icon || "").startsWith("data:image/") ? (
                        <img
                          src={productForm.icon}
                          alt="Aperçu du produit"
                        />
                      ) : (
                        (() => {
                          const ProductIcon = getProductIconComponent({
                            name: productForm.name,
                            category: productForm.category,
                            activity: activeActivity,
                            icon: productForm.icon,
                          });
                          const tone = getProductIconTone(activeActivity);
                          return (
                            <span
                              style={{
                                color: tone.color,
                                display: "grid",
                                placeItems: "center",
                              }}
                            >
                              <ProductIcon size={27} strokeWidth={2.2} />
                            </span>
                          );
                        })()
                      )}
                    </div>

                    <div className="product-icon-upload-actions">

                      <label
                        htmlFor="monalix-product-icon-upload-v6"
                        className="product-icon-upload-button"
                      >
                        <Plus size={17} />
                        Ajouter depuis l'appareil
                      </label>

                      <input
                        id="monalix-product-icon-upload-v6"
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const file = event.target.files?.[0];

                          if (!file) return;

                          if (!file.type || !file.type.startsWith("image/")) {
                            alert("Veuillez sélectionner une image.");
                            event.target.value = "";
                            return;
                          }

                          if (file.size > 2 * 1024 * 1024) {
                            alert("L'image est trop lourde. Choisissez une image de 2 Mo maximum.");
                            event.target.value = "";
                            return;
                          }

                          const reader = new FileReader();

                          reader.onload = () => {
                            setProductForm((previous) => ({
                              ...previous,
                              icon: String(reader.result || ""),
                            }));
                          };

                          reader.readAsDataURL(file);
                        }}
                      />

                      {String(productForm.icon || "").startsWith("data:image/") ? (
                        <button
                          type="button"
                          className="product-icon-remove-button"
                          onClick={() =>
                            setProductForm((previous) => ({
                              ...previous,
                              icon: "",
                            }))
                          }
                        >
                          <Trash2 size={16} />
                          Retirer l'image
                        </button>
                      ) : (
                        <span className="product-icon-auto-label">
                          Icône professionnelle automatique
                        </span>
                      )}

                    </div>

                  </div>

                  <small>
                    Vous pouvez remplacer l'icône automatique par votre propre image.
                  </small>

                </div>

              </div>


              {/* =============================================
                  ACTIONS DU FORMULAIRE
              ============================================= */}

              <div className="product-form-actions">


                {/* ANNULER */}

                <button
                  type="button"
                  className="product-form-cancel"
                  onClick={() => {

                    setShowProductModal(
                      false
                    );

                    setEditingProduct(
                      null
                    );

                  }}
                >

                  Annuler

                </button>


                {/* ENREGISTRER */}

                <button
                  type="button"
                  className="product-form-save"
                  onClick={
                    saveProduct
                  }
                >

                  <CheckCircle2
                    size={18}
                  />

                  {editingProduct
                    ? "Enregistrer les modifications"
                    : "Enregistrer le produit"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};
/* =====================================================
   GESTION DES STOCKS — MONALIX STOCK
   MODULE CENTRAL DE GESTION
===================================================== */

const renderStocksService = () => {

  /* =================================================
     TAUX DE CHANGE RDC
  ================================================= */

  const currentRate =
    toSafeNumber(
      exchangeRate
    ) || 2850;


  /* =================================================
     FORMATAGE MONÉTAIRE
  ================================================= */

  const formatUSD = (value) => {

    return `${toSafeNumber(value).toLocaleString(
      "fr-FR",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )} $`;

  };


  const formatFC = (value) => {

    return `${Math.round(
      toSafeNumber(value)
    ).toLocaleString(
      "fr-FR"
    )} FC`;

  };


  const formatBothCurrencies = (value) => {

    const usd =
      toSafeNumber(value);

    const fc =
      usd * currentRate;

    return {
      usd,
      fc,
      usdText: formatUSD(usd),
      fcText: formatFC(fc),
    };

  };


  /* =================================================
     FORMATAGE DU PRIX SELON LA DEVISE DU PRODUIT
  ================================================= */

  const formatProductPrice = (
    value,
    currency
  ) => {

    const safeValue =
      toSafeNumber(value);

    const normalizedCurrency =
      String(
        currency || "USD"
      )
        .toUpperCase()
        .trim();


    if (
      normalizedCurrency === "FC"
    ) {

      return {
        value: safeValue,
        currency: "FC",
        text: formatFC(
          safeValue
        ),
      };

    }


    return {
      value: safeValue,
      currency: "USD",
      text: formatUSD(
        safeValue
      ),
    };

  };


  /* =================================================
     PRODUITS SÉCURISÉS
  ================================================= */

  const safeProducts =
    Array.isArray(currentProducts)
      ? currentProducts
      : [];


  /* =================================================
     CALCULS STOCK
  ================================================= */

  const stockData =
    safeProducts.map(
      (product) => {

        const safeProduct =
          product &&
          typeof product === "object"
            ? product
            : {};


        const stock =
          Math.max(
            0,
            toSafeNumber(
              getProductStock(
                safeProduct
              )
            )
          );


        const minimum =
          Math.max(
            0,
            toSafeNumber(
              safeProduct.minStock ?? 5
            )
          );


        /* =============================================
           PRIX D'ACHAT
        ============================================= */

        const purchasePrice =
          Math.max(
            0,
            toSafeNumber(
              safeProduct.purchasePrice
            )
          );


        const purchaseCurrency =
          String(
            safeProduct.purchasePriceCurrency ||
            "USD"
          )
            .toUpperCase()
            .trim();


        const purchase =
          formatProductPrice(
            purchasePrice,
            purchaseCurrency
          );


        /* =============================================
           PRIX DE VENTE
        ============================================= */

        const salePrice =
          Math.max(
            0,
            toSafeNumber(
              safeProduct.price
            )
          );


        const saleCurrency =
          String(
            safeProduct.priceCurrency ||
            "USD"
          )
            .toUpperCase()
            .trim();


        const sale =
          formatProductPrice(
            salePrice,
            saleCurrency
          );


        /* =============================================
           CONVERSION EN USD
           POUR LES CALCULS INTERNES
        ============================================= */

        const purchasePriceUSD =
          purchaseCurrency === "FC"
            ? purchasePrice / currentRate
            : purchasePrice;


        const salePriceUSD =
          saleCurrency === "FC"
            ? salePrice / currentRate
            : salePrice;


        /* =============================================
           MARGE UNITAIRE EN USD
        ============================================= */

        const unitMarginUSD =
          salePriceUSD -
          purchasePriceUSD;


        /* =============================================
           MARGE DANS LA DEVISE DU PRIX DE VENTE
        ============================================= */

        const unitMargin =
          saleCurrency === "FC"
            ? unitMarginUSD * currentRate
            : unitMarginUSD;


        const marginText =
          saleCurrency === "FC"
            ? formatFC(
                unitMargin
              )
            : formatUSD(
                unitMargin
              );


        /* =============================================
           VALEUR DU STOCK
        ============================================= */

        const stockValueUSD =
          purchasePriceUSD *
          stock;


        /* =============================================
           VALEUR DE VENTE POTENTIELLE
        ============================================= */

        const potentialRevenueUSD =
          salePriceUSD *
          stock;


        /* =============================================
           MARGE POTENTIELLE
        ============================================= */

        const potentialMarginUSD =
          unitMarginUSD *
          stock;


        /* =============================================
           VALEURS D'AFFICHAGE
        ============================================= */

        const stockValue =
          purchaseCurrency === "FC"
            ? formatProductPrice(
                stockValueUSD *
                  currentRate,
                "FC"
              )
            : formatProductPrice(
                stockValueUSD,
                "USD"
              );


        const potentialRevenue =
          saleCurrency === "FC"
            ? formatProductPrice(
                potentialRevenueUSD *
                  currentRate,
                "FC"
              )
            : formatProductPrice(
                potentialRevenueUSD,
                "USD"
              );


        const potentialMargin =
          saleCurrency === "FC"
            ? formatProductPrice(
                potentialMarginUSD *
                  currentRate,
                "FC"
              )
            : formatProductPrice(
                potentialMarginUSD,
                "USD"
              );


        /* =============================================
           NIVEAU DU STOCK
        ============================================= */

        const stockPercentage =
          minimum > 0

            ? Math.min(
                100,
                Math.max(
                  0,
                  (
                    stock /
                    Math.max(
                      minimum * 3,
                      1
                    )
                  ) *
                  100
                )
              )

            : stock > 0
              ? 100
              : 0;


        /* =============================================
   STATUT DU STOCK
============================================= */

let status =
  "En stock";

let statusClass =
  "good";

if (
  stock <= 0
) {

  status =
    "Rupture";

  statusClass =
    "out";

} else if (
  stock <= minimum
) {

  status =
    "Stock faible";

  statusClass =
    "low";

}


/* =============================================
   STATUT D'EXPIRATION
   COMMERCE + PHARMACIE UNIQUEMENT
============================================= */

const normalizedActivity =
  String(
    activeActivity || ""
  )
    .toLowerCase()
    .trim();

const hasExpiryManagement =
  normalizedActivity === "commerce" ||
  normalizedActivity === "pharmacie";

const expiryDate =
  hasExpiryManagement
    ? String(
        safeProduct.expiryDate || ""
      ).trim()
    : "";

let expiryStatus =
  "Sans date";

let expiryStatusClass =
  "neutral";

let expiryDaysRemaining =
  null;

if (
  hasExpiryManagement &&
  expiryDate
) {

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const expiration =
    new Date(
      `${expiryDate}T00:00:00`
    );

  if (
    !Number.isNaN(
      expiration.getTime()
    )
  ) {

    expiration.setHours(
      0,
      0,
      0,
      0
    );

    expiryDaysRemaining =
      Math.ceil(
        (
          expiration.getTime() -
          today.getTime()
        ) /
        (
          1000 *
          60 *
          60 *
          24
        )
      );

    if (
      expiryDaysRemaining < 0
    ) {

      expiryStatus =
        "Expiré";

      expiryStatusClass =
        "out";

    } else if (
      expiryDaysRemaining <= 30
    ) {

      expiryStatus =
        "Expire bientôt";

      expiryStatusClass =
        "low";

    } else {

      expiryStatus =
        "Valide";

      expiryStatusClass =
        "good";

    }

  }

}       
 /* =============================================
           DONNÉES DU PRODUIT
    ============================================= */

        return {

          ...safeProduct,

          stock,

          minimum,

          purchasePrice,

          purchaseCurrency,

          purchase,

          salePrice,

          saleCurrency,

          sale,

          purchasePriceUSD,

          salePriceUSD,

          unitMargin,

          unitMarginUSD,

          marginText,

          stockValue,

          stockValueUSD,

          potentialRevenue,

          potentialRevenueUSD,

          potentialMargin,

          potentialMarginUSD,

          stockPercentage,

          status,

          statusClass,

          expiryDate,

          expiryStatus,

          expiryStatusClass,

          expiryDaysRemaining,

        };

      }
    );


  /* =================================================
     CATÉGORIES DISPONIBLES POUR LE STOCK
  ================================================= */

  const stockCategories = [
    "Toutes",

    ...Array.from(
      new Set(
        stockData
          .map(
            (product) =>
              String(
                product.category || ""
              ).trim()
          )
          .filter(Boolean)
      )
    ),
  ];


  /* =================================================
     RECHERCHE STOCK
     NOM / CODE-BARRES / CATÉGORIE
  ================================================= */

  const normalizedStockSearch =
    String(
      stockSearch || ""
    )
      .toLowerCase()
      .trim();


  /* =================================================
     STOCK FILTRÉ
  ================================================= */

  const filteredStockData =
    stockData.filter(
      (product) => {

        const productName =
          String(
            product.name || ""
          )
            .toLowerCase()
            .trim();


        const productCode =
          String(
            product.code || ""
          )
            .toLowerCase()
            .trim();


        const productCategory =
          String(
            product.category || ""
          )
            .toLowerCase()
            .trim();


        const productStatus =
          String(
            product.status || ""
          )
            .toLowerCase()
            .trim();


        const searchMatch =
          normalizedStockSearch === "" ||

          productName.includes(
            normalizedStockSearch
          ) ||

          productCode.includes(
            normalizedStockSearch
          ) ||

          productCategory.includes(
            normalizedStockSearch
          );


        const selectedStockCategory =
          String(
            stockCategory || "Toutes"
          )
            .toLowerCase()
            .trim();


        const categoryMatch =
          selectedStockCategory === "toutes" ||
          selectedStockCategory === "tous" ||
          selectedStockCategory === "" ||

          productCategory ===
            selectedStockCategory;


        const selectedStockStatus =
          String(
            stockStatus || "Tous"
          )
            .toLowerCase()
            .trim();


        const statusMatch =
          selectedStockStatus === "tous" ||
          selectedStockStatus === "" ||

          productStatus ===
            selectedStockStatus;


        return (
          searchMatch &&
          categoryMatch &&
          statusMatch
        );

      }
    );


  /* =================================================
     STATISTIQUES GÉNÉRALES
  ================================================= */

  const totalProducts =
    stockData.length;


  const totalQuantity =
    stockData.reduce(
      (total, product) =>
        total +
        toSafeNumber(
          product.stock
        ),
      0
    );


  const productsInStock =
    stockData.filter(
      (product) =>
        product.stock > 0
    );


  const lowStockProducts =
    stockData.filter(
      (product) =>
        product.stock > 0 &&
        product.stock <=
          product.minimum
    );


  const outOfStockProducts =
    stockData.filter(
      (product) =>
        product.stock <= 0
    );


  /* =================================================
     TOTAUX EN USD
  ================================================= */

  const totalStockValue =
    stockData.reduce(
      (total, product) =>
        total +
        toSafeNumber(
          product.stockValueUSD
        ),
      0
    );


  const totalPotentialRevenue =
    stockData.reduce(
      (total, product) =>
        total +
        toSafeNumber(
          product.potentialRevenueUSD
        ),
      0
    );


  const totalPotentialMargin =
    stockData.reduce(
      (total, product) =>
        total +
        toSafeNumber(
          product.potentialMarginUSD
        ),
      0
    );

  /* =================================================
     CONVERSION DES TOTAUX EN FC
  ================================================= */

  const totalStockValueFC =
    totalStockValue *
    currentRate;


  const totalPotentialRevenueFC =
    totalPotentialRevenue *
    currentRate;


  const totalPotentialMarginFC =
    totalPotentialMargin *
    currentRate;


  /* =================================================
     RENDU
  ================================================= */

  return (

    <div className="stocks-page">


      {/* =================================================
          EN-TÊTE PRINCIPAL
      ================================================= */}

      <div className="stocks-page-header">

        <div>

          <span className="page-section-label">
            MONALIX STOCK
          </span>

          <h2>
            Gestion des stocks
          </h2>

          <p>
            Pilotage centralisé des produits,
            inventaires, prix, marges,
            valorisation et disponibilité.
          </p>

        </div>


        <div className="stocks-header-actions">

          <div className="stocks-branch-indicator">

            <span>
              ÉTABLISSEMENT
            </span>

            <strong>
              {selectedBranch ||
                "Tous les établissements"}
            </strong>

          </div>


          <div className="stocks-branch-indicator">

            <span>
              TAUX DE CHANGE
            </span>

            <strong>
              1 $ ={" "}
              {Math.round(
                currentRate
              ).toLocaleString(
                "fr-FR"
              )} FC
            </strong>

          </div>


          <button
            type="button"
            className="add-product-button"
            onClick={
              openNewProductModal
            }
          >

            <Plus size={18} />

            Ajouter un produit

          </button>

        </div>

      </div>


      {/* =================================================
          INDICATEURS DE GESTION
      ================================================= */}

      <div className="stocks-summary">

        <div className="stock-stat">

          <div className="stock-stat-icon">
            <Package size={20} />
          </div>

          <span>
            PRODUITS
          </span>

          <strong>
            {totalProducts}
          </strong>

          <small>
            Références enregistrées
          </small>

        </div>


        <div className="stock-stat">

          <div className="stock-stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <span>
            DISPONIBLES
          </span>

          <strong>
            {productsInStock.length}
          </strong>

          <small>
            Produits actuellement disponibles
          </small>

        </div>


        <div className="stock-stat">

          <div className="stock-stat-icon">
            <span>
              ⚠
            </span>
          </div>

          <span>
            STOCK FAIBLE
          </span>

          <strong>
            {lowStockProducts.length}
          </strong>

          <small>
            À réapprovisionner
          </small>

        </div>


        <div className="stock-stat">

          <div className="stock-stat-icon">
            <X size={20} />
          </div>

          <span>
            RUPTURES
          </span>

          <strong>
            {outOfStockProducts.length}
          </strong>

          <small>
            Produits indisponibles
          </small>

        </div>


        <div className="stock-stat">

          <div className="stock-stat-icon">
            <Warehouse size={20} />
          </div>

          <span>
            QUANTITÉ TOTALE
          </span>

          <strong>
            {totalQuantity.toLocaleString(
              "fr-FR"
            )}
          </strong>

          <small>
            Unités présentes en stock
          </small>

        </div>


        <div className="stock-stat">

          <div className="stock-stat-icon">
            $
          </div>

          <span>
            VALEUR DU STOCK
          </span>

          <strong>
            {formatUSD(
              totalStockValue
            )}
          </strong>

          <small>
            {formatFC(
              totalStockValueFC
            )} · au prix d'achat
          </small>

        </div>


        <div className="stock-stat">

          <div className="stock-stat-icon">
            $
          </div>

          <span>
            VALEUR DE VENTE
          </span>

          <strong>
            {formatUSD(
              totalPotentialRevenue
            )}
          </strong>

          <small>
            {formatFC(
              totalPotentialRevenueFC
            )} · si tout est vendu
          </small>

        </div>


        <div className="stock-stat">

          <div className="stock-stat-icon">
            %
          </div>

          <span>
            MARGE POTENTIELLE
          </span>

          <strong>
            {formatUSD(
              totalPotentialMargin
            )}
          </strong>

          <small>
            {formatFC(
              totalPotentialMarginFC
            )} · bénéfice théorique
          </small>

        </div>

      </div>


      {/* =================================================
          LÉGENDE DES STATUTS
      ================================================= */}

      <div className="stocks-status-legend">

        <span>
          État du stock :
        </span>

        <span className="stock-status good">

          <span className="stock-status-dot" />

          En stock

        </span>

        <span className="stock-status low">

          <span className="stock-status-dot" />

          Stock faible

        </span>

        <span className="stock-status out">

          <span className="stock-status-dot" />

          Rupture

        </span>

      </div>


      {/* =================================================
          ALERTES
      ================================================= */}

      {(lowStockProducts.length > 0 ||
        outOfStockProducts.length > 0) && (

        <div className="stocks-alert-panel">

          <div className="stocks-alert-icon">
            ⚠️
          </div>

          <div>

            <strong>
              Alertes de stock
            </strong>

            <p>

              {outOfStockProducts.length > 0 &&
                `${outOfStockProducts.length} produit(s) en rupture. `}

              {lowStockProducts.length > 0 &&
                `${lowStockProducts.length} produit(s) sous le stock minimum.`}

            </p>

          </div>

        </div>

      )}


      {/* =================================================
          INVENTAIRE
      ================================================= */}

      <div className="stocks-section-heading">

        <div>

          <span className="page-section-label">
            INVENTAIRE EN TEMPS RÉEL
          </span>

          <h3>
            État et valorisation des produits
          </h3>

        </div>

        <span className="stocks-product-count">
          {filteredStockData.length} / {totalProducts} référence(s)
        </span>

      </div>


      {/* =================================================
          OUTILS DE RECHERCHE STOCK
      ================================================= */}

      <div className="stocks-toolbar">

        <div className="stocks-search">

          <Search size={18} />

          <input
            id="stocks-search-input"
            type="text"
            value={stockSearch}
            placeholder="Rechercher par nom, code-barres ou catégorie..."
            onChange={(event) =>
              setStockSearch(
                event.target.value
              )
            }
            onKeyDown={(event) => {

              if (
                event.key === "Enter"
              ) {

                event.preventDefault();

              }

            }}
          />

          <ScanLine size={18} />

        </div>


        <select
          className="stocks-filter"
          value={
            stockCategory ||
            "Toutes"
          }
          onChange={(event) =>
            setStockCategory(
              event.target.value
            )
          }
        >

          {stockCategories.map(
            (category) => (

              <option
                key={category}
                value={category}
              >

                {category}

              </option>

            )
          )}

        </select>


        <select
          className="stocks-filter"
          value={
            stockStatus ||
            "Tous"
          }
          onChange={(event) =>
            setStockStatus(
              event.target.value
            )
          }
        >

          <option value="Tous">
            Tous les statuts
          </option>

          <option value="En stock">
            En stock
          </option>

          <option value="Stock faible">
            Stock faible
          </option>

          <option value="Rupture">
            Rupture
          </option>

        </select>


        <button
          type="button"
          className="stocks-reset-button"
          onClick={() => {

            setStockSearch("");

            setStockCategory(
              "Toutes"
            );

            setStockStatus(
              "Tous"
            );

            const input =
              document.getElementById(
                "stocks-search-input"
              );

            if (input) {

              input.focus();

            }

          }}
        >

          <RefreshCw size={16} />

          Réinitialiser

        </button>

      </div>


      {/* =================================================
          TABLEAU
      ================================================= */}

      <div className="stocks-table-container">

        {filteredStockData.length > 0 ? (

          <table className="stocks-table">

            <thead>

              <tr>

                <th>
                  Produit
                </th>

                <th>
                  Catégorie
                </th>

                <th>
                  Code
                </th>

                <th>
                  Prix d'achat
                </th>

                <th>
                  Prix de vente
                </th>

                <th>
                  Marge unitaire
                </th>

                <th>
                  Stock
                </th>

                <th>
                  Stock minimum
                </th>

                {(activeActivity === "commerce" ||
                  activeActivity === "pharmacie") && (

                  <th>
                    Expiration
                  </th>

                )}

                <th>
                  Statut
                </th>

                <th>
                  Gestion
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredStockData.map(
                (product) => {

                  const stock =
                    Math.max(
                      0,
                      toSafeNumber(
                        product.stock
                      )
                    );


                  const minimum =
                    Math.max(
                      0,
                      toSafeNumber(
                        product.minimum
                      )
                    );


                  const purchaseCurrency =
                    String(
                      product.purchaseCurrency ||
                      product.purchasePriceCurrency ||
                      "USD"
                    )
                      .toUpperCase()
                      .trim();


                  const purchasePrice =
                    Math.max(
                      0,
                      toSafeNumber(
                        product.purchasePrice
                      )
                    );


                  const saleCurrency =
                    String(
                      product.saleCurrency ||
                      product.priceCurrency ||
                      "USD"
                    )
                      .toUpperCase()
                      .trim();


                  const salePrice =
                    Math.max(
                      0,
                      toSafeNumber(
                        product.salePrice
                      )
                    );


                  const purchasePrimary =
                    purchaseCurrency === "FC"
                      ? formatFC(
                          purchasePrice
                        )
                      : formatUSD(
                          purchasePrice
                        );


                  const purchaseSecondary =
                    purchaseCurrency === "FC"
                      ? formatUSD(
                          product.purchasePriceUSD
                        )
                      : formatFC(
                          purchasePrice *
                          currentRate
                        );


                  const salePrimary =
                    saleCurrency === "FC"
                      ? formatFC(
                          salePrice
                        )
                      : formatUSD(
                          salePrice
                        );


                  const saleSecondary =
                    saleCurrency === "FC"
                      ? formatUSD(
                          product.salePriceUSD
                        )
                      : formatFC(
                          salePrice *
                          currentRate
                        );


                  const marginPrimary =
                    saleCurrency === "FC"
                      ? formatFC(
                          product.unitMargin
                        )
                      : formatUSD(
                          product.unitMargin
                        );


                  const marginSecondary =
                    saleCurrency === "FC"
                      ? formatUSD(
                          product.unitMarginUSD
                        )
                      : formatFC(
                          product.unitMarginUSD *
                          currentRate
                        );


                  return (

                    <tr
                      key={
                        product.id ||
                        product.code ||
                        product.name
                      }
                      className={
                        `stock-row ${
                          product.statusClass ||
                          "good"
                        }`
                      }
                    >

                      {/* =================================
                          PRODUIT
                      ================================= */}

                      <td>

                        <div className="product-table-name">

                          <div
                            className="product-table-icon"
                            style={{
                              display: "grid",
                              placeItems: "center",
                              overflow: "hidden",
                            }}
                          >

                            {String(
                              product.icon || ""
                            ).startsWith("data:image/") ? (

                              <img
                                src={product.icon}
                                alt={
                                  String(
                                    product.name ||
                                    "Produit"
                                  )
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />

                            ) : (

                              product.icon || "📦"

                            )}

                          </div>


                          <div>

                            <strong>
                              {product.name ||
                                "Produit sans nom"}
                            </strong>

                            <span>
                              {product.unit ||
                                "Pièce"}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* =================================
                          CATÉGORIE
                      ================================= */}

                      <td>

                        <span className="stock-category">

                          {product.category ||
                            "Sans catégorie"}

                        </span>

                      </td>


                      {/* =================================
                          CODE
                      ================================= */}

                      <td>

                        <span className="stock-code">

                          {product.code ||
                            "—"}

                        </span>

                      </td>


                      {/* =================================
                          PRIX D'ACHAT
                      ================================= */}

                      <td>

                        <div className="stock-price-dual">

                          <strong className="stock-price">

                            {purchasePrimary}

                          </strong>

                          <span>

                            {purchaseSecondary}

                          </span>

                        </div>

                      </td>


                      {/* =================================
                          PRIX DE VENTE
                      ================================= */}

                      <td>

                        <div className="stock-price-dual">

                          <strong className="stock-price">

                            {salePrimary}

                          </strong>

                          <span>

                            {saleSecondary}

                          </span>

                        </div>

                      </td>


                      {/* =================================
                          MARGE
                      ================================= */}

                      <td>

                        <div className="stock-margin">

                          <strong>

                            {marginPrimary}

                          </strong>

                          <span>

                            {marginSecondary}

                          </span>

                          <small>

                            /{" "}

                            {product.unit ||
                              "Pièce"}

                          </small>

                        </div>

                      </td>


                      {/* =================================
                          STOCK
                      ================================= */}

                      <td>

                        <div className="stock-level">

                          <strong
                            className={
                              `stock-quantity ${
                                product.statusClass ||
                                "good"
                              }`
                            }
                          >

                            {stock.toLocaleString(
                              "fr-FR"
                            )}

                          </strong>


                          <div className="stock-progress">

                            <span
                              style={{
                                width:
                                  `${Math.max(
                                    0,
                                    Math.min(
                                      100,
                                      toSafeNumber(
                                        product.stockPercentage
                                      )
                                    )
                                  )}%`
                              }}
                            />

                          </div>

                        </div>

                      </td>


                      {/* =================================
                          STOCK MINIMUM
                      ================================= */}

                      <td>

                        <span className="stock-minimum">

                          {minimum.toLocaleString(
                            "fr-FR"
                          )}

                        </span>

                      </td>

                      {/* =================================
                          EXPIRATION
                          Commerce + Pharmacie uniquement
                      ================================= */}

                      {(activeActivity === "commerce" ||
                        activeActivity === "pharmacie") && (

                        <td>

                          {product.expiryDate ? (

                            (() => {

                              const today =
                                new Date();

                              today.setHours(
                                0,
                                0,
                                0,
                                0
                              );

                              const expiration =
                                new Date(
                                  `${product.expiryDate}T00:00:00`
                                );

                              expiration.setHours(
                                0,
                                0,
                                0,
                                0
                              );

                              const daysRemaining =
                                Math.ceil(
                                  (
                                    expiration.getTime() -
                                    today.getTime()
                                  ) /
                                  (
                                    1000 *
                                    60 *
                                    60 *
                                    24
                                  )
                                );

                              let expiryStatus =
                                "Valide";

                              let expiryStatusClass =
                                "good";

                              if (
                                daysRemaining < 0
                              ) {

                                expiryStatus =
                                  "Expiré";

                                expiryStatusClass =
                                  "out";

                              } else if (
                                daysRemaining <= 30
                              ) {

                                expiryStatus =
                                  "Expire bientôt";

                                expiryStatusClass =
                                  "low";

                              }

                              return (

                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                  }}
                                >

                                  <span
                                    style={{
                                      fontWeight: 600,
                                    }}
                                  >

                                    {expiration.toLocaleDateString(
                                      "fr-FR"
                                    )}

                                  </span>

                                  <span
                                    className={
                                      `stock-status ${expiryStatusClass}`
                                    }
                                  >

                                    <span className="stock-status-dot" />

                                    {expiryStatus}

                                  </span>

                                  <small
                                    style={{
                                      color: "#777",
                                    }}
                                  >

                                    {daysRemaining < 0
                                      ? `Dépassé de ${Math.abs(
                                          daysRemaining
                                        )} jour(s)`
                                      : `${daysRemaining} jour(s) restant(s)`}

                                  </small>

                                </div>

                              );

                            })()

                          ) : (

                            <span
                              style={{
                                color: "#888",
                              }}
                            >
                              Sans date
                            </span>

                          )}

                        </td>

                      )}

                      {/* =================================
                          STATUT
                      ================================= */}

                      <td>

                        <span
                          className={
                            `stock-status ${
                              product.statusClass ||
                              "good"
                            }`
                          }
                        >

                          <span className="stock-status-dot" />

                          {product.status ||
                            "En stock"}

                        </span>

                      </td>


                      {/* =================================
                          GESTION
                      ================================= */}

                      <td>

                        <div className="product-row-actions">

                          <button
                            type="button"
                            className="edit-product-button"
                            title="Modifier le produit"
                            aria-label="Modifier le produit"
                            onClick={() =>
                              openEditProductModal(
                                product
                              )
                            }
                          >

                            <Pencil
                              size={16}
                            />

                            <span>
                              Modifier
                            </span>

                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        ) : (

          <div className="products-empty-state">

            <Warehouse
              size={48}
            />

            <h3>
              Aucun produit disponible
            </h3>

            <p>
              Aucun produit ne correspond
              aux critères sélectionnés.
            </p>

            <button
              type="button"
              className="add-product-button"
              onClick={
                openNewProductModal
              }
            >

              <Plus size={18} />

              Ajouter un produit

            </button>

          </div>

        )}

      </div>

    </div>

  );

};
/* =====================================================
   RAPPORTS — MONALIX
   VERSION STABLE
===================================================== */

const renderReportsService = () => {

  /* =================================================
     RÉCUPÉRATION DES VENTES
  ================================================= */

  let reportSales = [];

  try {

    const savedSales =
      JSON.parse(
        localStorage.getItem("monalix_sales") || "[]"
      );

    const allSales =
      Array.isArray(savedSales)
        ? savedSales
        : [];

    const now = new Date();

reportSales =
  allSales.filter((sale) => {

    if (!sale) {
      return false;
    }

    // Filtrer les ventes selon l'activité active
    const saleActivity = String(
      sale.activity ||
      sale.activityId ||
      ""
    )
      .toLowerCase()
      .trim();

    if (saleActivity !== normalizedActiveActivity) {
      return false;
    }

    const saleDate =
      sale.date ||
      sale.createdAt ||
      sale.saleDate;

        if (!saleDate) {
          return false;
        }

        const date =
          new Date(saleDate);

        if (Number.isNaN(date.getTime())) {
          return false;
        }

        if (reportPeriod === "today") {

          return (
            date.getFullYear() ===
              now.getFullYear() &&
            date.getMonth() ===
              now.getMonth() &&
            date.getDate() ===
              now.getDate()
          );

        }

        if (reportPeriod === "month") {

          return (
            date.getFullYear() ===
              now.getFullYear() &&
            date.getMonth() ===
              now.getMonth()
          );

        }

        return true;

      });

  } catch (error) {

    console.error(
      "❌ Erreur chargement rapports :",
      error
    );

    reportSales = [];

  }


  /* =================================================
     CONVERSION NUMÉRIQUE SÉCURISÉE
  ================================================= */

  const numberValue = (value) => {

    const number =
      Number(value);

    return Number.isFinite(number)
      ? number
      : 0;

  };


  /* =================================================
     STATISTIQUES
  ================================================= */

  const totalSales =
    reportSales.length;

  const totalUSD =
    reportSales.reduce(
      (total, sale) =>
        total +
        numberValue(
          sale?.totalUSD
        ),
      0
    );

  const totalFC =
    reportSales.reduce(
      (total, sale) =>
        total +
        numberValue(
          sale?.totalFC
        ),
      0
    );

  const profitUSD =
    reportSales.reduce(
      (total, sale) =>
        total +
        numberValue(
          sale?.profitUSD
        ),
      0
    );

  const profitFC =
    reportSales.reduce(
      (total, sale) =>
        total +
        numberValue(
          sale?.profitFC
        ),
      0
    );


  /* =================================================
     PRODUITS LES PLUS VENDUS
  ================================================= */

  const productMap =
    new Map();

  reportSales.forEach(
    (sale) => {

      const items =
        Array.isArray(
          sale?.items
        )
          ? sale.items
          : [];

      items.forEach(
        (item) => {

          const name =
            item?.name ||
            item?.productName ||
            item?.product_name ||
            "Produit";

          const quantity =
            numberValue(
              item?.quantity
            );

          productMap.set(
            name,
            (
              productMap.get(name) ||
              0
            ) + quantity
          );

        }
      );

    }
  );

  const topProducts =
    Array.from(
      productMap.entries()
    )
      .map(
        ([name, quantity]) => ({
          name,
          quantity,
        })
      )
      .sort(
        (a, b) =>
          b.quantity -
          a.quantity
      )
      .slice(0, 10);


  /* =================================================
     STOCK FAIBLE
  ================================================= */

  const products =
    Array.isArray(
      currentProducts
    )
      ? currentProducts
      : [];

  const lowStockProducts =
    products.filter(
      (product) => {

        const stock =
          numberValue(
            getProductStock(
              product
            )
          );

        const minimum =
          numberValue(
            product?.minStock ?? 5
          );

        return stock <= minimum;

      }
    );


  /* =================================================
     FORMATAGE
  ================================================= */

  const formatUSD =
    (value) =>
      `${numberValue(value).toLocaleString(
        "fr-FR",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} $`;

  const formatFC =
    (value) =>
      `${Math.round(
        numberValue(value)
      ).toLocaleString(
        "fr-FR"
      )} FC`;


  /* =================================================
     EXPORT CSV
  ================================================= */

  const exportReport =
    () => {

      const rows = [

        [
          "Date",
          "Caissier",
          "Activité",
          "Établissement",
          "Total USD",
          "Total FC",
          "Bénéfice USD",
          "Bénéfice FC",
        ],

        ...reportSales.map(
          (sale) => [

            sale?.date ||
              sale?.createdAt ||
              "",

            sale?.cashier ||
              sale?.cashierName ||
              "",

            sale?.activity ||
              "",

            sale?.establishment ||
              sale?.branch ||
              "",

            numberValue(
              sale?.totalUSD
            ),

            numberValue(
              sale?.totalFC
            ),

            numberValue(
              sale?.profitUSD
            ),

            numberValue(
              sale?.profitFC
            ),

          ]
        ),

      ];

      const csv =
        rows
          .map(
            (row) =>
              row
                .map(
                  (value) =>
                    `"${String(
                      value ?? ""
                    ).replace(
                      /"/g,
                      '""'
                    )}"`
                )
                .join(";")
          )
          .join("\r\n");

      const blob =
        new Blob(
          [
            "\ufeff" +
              csv
          ],
          {
            type:
              "text/csv;charset=utf-8;",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href =
        url;

      link.download =
        `MONALIX_Rapport_${reportPeriod}_${new Date()
          .toISOString()
          .slice(0, 10)}.csv`;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      URL.revokeObjectURL(
        url
      );

    };


  /* =================================================
     RAPPORT
  ================================================= */

  return (

    <div
      style={{
        padding: "24px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >

      {/* EN-TÊTE */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >

        <div>

          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              opacity: 0.65,
              marginBottom: "6px",
            }}
          >
            MONALIX • ANALYSE
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "28px",
            }}
          >
            Rapports
          </h2>

          <p
            style={{
              margin:
                "7px 0 0",
              opacity: 0.65,
            }}
          >
            Analyse des ventes, du chiffre
            d'affaires et du bénéfice.
          </p>

        </div>


        {/* ACTIONS */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >

          <select
            value={reportPeriod}
            onChange={(event) =>
              setReportPeriod(
                event.target.value
              )
            }
            style={{
              padding:
                "11px 14px",
              border:
                "1px solid #ddd",
              borderRadius:
                "10px",
              background:
                "#fff",
              cursor:
                "pointer",
            }}
          >

            <option value="today">
              Aujourd'hui
            </option>

            <option value="month">
              Ce mois
            </option>

            <option value="all">
              Toutes les ventes
            </option>

          </select>


          <button
            type="button"
            onClick={
              exportReport
            }
            style={{
              padding:
                "11px 15px",
              border:
                "1px solid #ddd",
              borderRadius:
                "10px",
              background:
                "#fff",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            📥 Exporter CSV
          </button>


          <button
            type="button"
            onClick={() =>
              window.print()
            }
            style={{
              padding:
                "11px 15px",
              border:
                "none",
              borderRadius:
                "10px",
              background:
                "#111827",
              color:
                "#fff",
              cursor:
                "pointer",
              fontWeight:
                "600",
            }}
          >
            🖨️ Imprimer
          </button>

        </div>

      </div>


      {/* =================================================
         CARTES
      ================================================= */}

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap:
            "16px",
          marginBottom:
            "24px",
        }}
      >

        {/* VENTES */}

        <div
          style={{
            background:
              "#fff",
            border:
              "1px solid #e8e8e8",
            borderRadius:
              "16px",
            padding:
              "20px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >

          <div
            style={{
              fontSize:
                "13px",
              opacity:
                0.65,
            }}
          >
            Nombre de ventes
          </div>

          <strong
            style={{
              display:
                "block",
              marginTop:
                "8px",
              fontSize:
                "28px",
            }}
          >
            {totalSales}
          </strong>

        </div>


        {/* VENTES */}

        <div
          style={{
            background:
              "#fff",
            border:
              "1px solid #e8e8e8",
            borderRadius:
              "16px",
            padding:
              "20px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >

          <div
            style={{
              fontSize:
                "13px",
              opacity:
                0.65,
            }}
          >
           {reportPeriod === "today"
  ? "Ventes du jour"
  : reportPeriod === "month"
  ? "Ventes du mois"
  : "Ventes totales"}
          </div>

          <strong
            style={{
              display:
                "block",
              marginTop:
                "8px",
              fontSize:
                "24px",
            }}
          >
            {formatUSD(
              totalUSD
            )}
          </strong>

          <span
            style={{
              opacity:
                0.65,
              fontSize:
                "13px",
            }}
          >
            {formatFC(
              totalFC
            )}
          </span>

        </div>


        {/* BÉNÉFICE */}

        <div
          style={{
            background:
              "#fff",
            border:
              "1px solid #e8e8e8",
            borderRadius:
              "16px",
            padding:
              "20px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >

          <div
            style={{
              fontSize:
                "13px",
              opacity:
                0.65,
            }}
          >
           {reportPeriod === "today"
  ? "Bénéfice du jour"
  : reportPeriod === "month"
  ? "Bénéfice du mois"
  : "Bénéfice total"}
          </div>

          <strong
            style={{
              display:
                "block",
              marginTop:
                "8px",
              fontSize:
                "24px",
            }}
          >
            {formatUSD(
              profitUSD
            )}
          </strong>

          <span
            style={{
              opacity:
                0.65,
              fontSize:
                "13px",
            }}
          >
            {formatFC(
              profitFC
            )}
          </span>

        </div>

      </div>


      {/* =================================================
         CONTENU
      ================================================= */}

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap:
            "20px",
        }}
      >

        {/* PRODUITS LES PLUS VENDUS */}

        <div
          style={{
            background:
              "#fff",
            border:
              "1px solid #e8e8e8",
            borderRadius:
              "16px",
            padding:
              "20px",
          }}
        >

          <h3
            style={{
              marginTop:
                0,
            }}
          >
            🛒 Produits les plus vendus
          </h3>

          {topProducts.length ===
          0 ? (

            <p
              style={{
                opacity:
                  0.6,
              }}
            >
              Aucune donnée disponible
              pour cette période.
            </p>

          ) : (

            <div>

              {topProducts.map(
                (
                  product,
                  index
                ) => (

                  <div
                    key={
                      `${product.name}-${index}`
                    }
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      padding:
                        "12px 0",
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >

                    <span>
                      {index + 1}.
                      {" "}
                      {product.name}
                    </span>

                    <strong>
                      {product.quantity}
                    </strong>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* STOCK FAIBLE */}

        <div
          style={{
            background:
              "#fff",
            border:
              "1px solid #e8e8e8",
            borderRadius:
              "16px",
            padding:
              "20px",
          }}
        >

          <h3
            style={{
              marginTop:
                0,
            }}
          >
            📦 Produits à réapprovisionner
          </h3>

          {lowStockProducts.length ===
          0 ? (

            <p
              style={{
                opacity:
                  0.6,
              }}
            >
              Aucun produit sous le
              seuil d'alerte.
            </p>

          ) : (

            <div>

              {lowStockProducts
                .slice(0, 10)
                .map(
                  (
                    product,
                    index
                  ) => {

                    const stock =
                      numberValue(
                        getProductStock(
                          product
                        )
                      );

                    const unit =
                      product?.unit ||
                      "unité";

                    return (

                      <div
                        key={
                          product?.id ||
                          `${product?.name}-${index}`
                        }
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          padding:
                            "12px 0",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >

                        <span>
                          {product?.name ||
                            "Produit"}
                        </span>

                        <strong>
                          {stock} {unit}
                        </strong>

                      </div>

                    );

                  }
                )}

            </div>

          )}

        </div>

      </div>


      {/* =================================================
         HISTORIQUE
      ================================================= */}

      <div
        style={{
          marginTop:
            "20px",
          background:
            "#fff",
          border:
            "1px solid #e8e8e8",
          borderRadius:
            "16px",
          padding:
            "20px",
          overflowX:
            "auto",
        }}
      >

        <h3
          style={{
            marginTop:
              0,
          }}
        >
          🧾 Historique des ventes
        </h3>

        {reportSales.length ===
        0 ? (

          <div
            style={{
              padding:
                "35px 15px",
              textAlign:
                "center",
              opacity:
                0.6,
            }}
          >
            Aucune vente enregistrée
            pour cette période.
          </div>

        ) : (

          <table
            style={{
              width:
                "100%",
              borderCollapse:
                "collapse",
              minWidth:
                "800px",
            }}
          >

            <thead>

              <tr>

                <th
                  style={{
                    textAlign:
                      "left",
                    padding:
                      "12px",
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  Date
                </th>

                <th
                  style={{
                    textAlign:
                      "left",
                    padding:
                      "12px",
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  Caissier
                </th>

                <th
                  style={{
                    textAlign:
                      "left",
                    padding:
                      "12px",
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  Activité
                </th>

                <th
                  style={{
                    textAlign:
                      "right",
                    padding:
                      "12px",
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  Total USD
                </th>

                <th
                  style={{
                    textAlign:
                      "right",
                    padding:
                      "12px",
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  Total FC
                </th>

                <th
                  style={{
                    textAlign:
                      "right",
                    padding:
                      "12px",
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  Bénéfice USD
                </th>

              </tr>

            </thead>


            <tbody>

              {reportSales.map(
                (
                  sale,
                  index
                ) => {

                  const date =
                    sale?.date ||
                    sale?.createdAt ||
                    "";

                  return (

                    <tr
                      key={
                        sale?.id ||
                        index
                      }
                    >

                      <td
                        style={{
                          padding:
                            "12px",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        {date
                          ? new Date(
                              date
                            ).toLocaleString(
                              "fr-FR"
                            )
                          : "—"}
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        {sale?.cashier ||
                          sale?.cashierName ||
                          "—"}
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        {sale?.activity ||
                          "—"}
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                          textAlign:
                            "right",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        {formatUSD(
                          sale?.totalUSD
                        )}
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                          textAlign:
                            "right",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        {formatFC(
                          sale?.totalFC
                        )}
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                          textAlign:
                            "right",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        {formatUSD(
                          sale?.profitUSD
                        )}
                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

};
/* =====================================================
   MODE CAISSE
===================================================== */

// La caisse reste dans l'interface MONALIX complète :
// le tableau de bord et le sélecteur d'activités restent toujours accessibles.
const isCaisse = activeService === "caisse";


/* =====================================================
   FACTURE
===================================================== */

const renderInvoiceModal = () => {

  if (!invoiceModal) {

    return null;

  }


  const invoiceItems =
    Array.isArray(
      safeCurrentCart
    )
      ? safeCurrentCart
      : [];
const formatUSD = (value) => {
  return `${toSafeNumber(value).toLocaleString(
    "fr-FR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )} $`;
};

const formatFC = (value) => {
  return `${Math.round(
    toSafeNumber(value)
  ).toLocaleString(
    "fr-FR"
  )} FC`;
};

  return (

    <div className="invoice-modal-overlay">

      <div className="invoice-modal">


        <button
          type="button"
          className="close-invoice"
          onClick={() =>
            setInvoiceModal(false)
          }
        >

          <X
            size={22}
          />

        </button>


        <div
          className="invoice-content"
          id="invoice-print"
        >


          <div className="invoice-brand">

            <div className="invoice-logo">

              <div className="invoice-logo-inner">

                <span className="invoice-logo-m">
                  M
                </span>

                <span className="invoice-logo-accent" />

              </div>

            </div>


            <h2>
              MONALIX
            </h2>


            <p>
              SYSTÈME INTELLIGENT
            </p>

          </div>


          <div className="invoice-establishment">

            <strong>
              {selectedBranch}
            </strong>

            <span>
              Facture / Ticket de caisse
            </span>

          </div>


          <div className="invoice-meta">

            <div>

              <span>
                Date
              </span>

              <strong>

                {new Date()
                  .toLocaleDateString(
                    "fr-FR"
                  )}

              </strong>

            </div>


            <div>

              <span>
                Heure
              </span>

              <strong>

                {new Date()
                  .toLocaleTimeString(
                    "fr-FR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}

              </strong>

            </div>

          </div>


          {activeActivity === "restaurant" &&
            selectedTableData && (

              <div className="invoice-table">

                <UtensilsCrossed
                  size={18}
                />

                <strong>
                  {selectedTableData.name}
                </strong>

              </div>

            )}


          <div className="invoice-cashier">

            <User
              size={16}
            />

            <span>
              Caissier :
            </span>

            <strong>
              {selectedCashier}
            </strong>

          </div>


          <div className="invoice-items">

            {invoiceItems.map(
              (item, index) => {

                const price =
                  Math.max(
                    0,
                    toSafeNumber(
                      getProductPrice(item)
                    )
                  );


                const quantity =
                  Math.max(
                    0,
                    toSafeNumber(
                      getProductQuantity(item)
                    )
                  );


                const itemCurrency =
                  String(
                    item.priceCurrency ||
                    item.currency ||
                    "USD"
                  )
                    .toUpperCase()
                    .trim();


                const itemPriceUSD =
  itemCurrency === "FC"
    ? price / rate
    : price;


                const itemTotal =
                  price *
                  quantity;


                const itemTotalUSD =
                  itemPriceUSD *
                  quantity;

const itemTotalFC =
  itemTotalUSD *
  rate;


                const itemPricePrimary =
                  itemCurrency === "FC"
                    ? formatFC(
                        price
                      )
                    : formatUSD(
                        price
                      );


                const itemPriceSecondary =
                  itemCurrency === "FC"
                    ? formatUSD(
                        itemPriceUSD
                      )
                   : formatFC(
    price *
    rate
  );


                return (

                  <div
                    className="invoice-item"
                    key={
                      item.id ||
                      item.code ||
                      `${item.name}-${index}`
                    }
                  >

                    <div>

                      <strong>
                        {item.name ||
                          "Produit"}
                      </strong>

                      <span>

                        {quantity} ×{" "}
                        {itemPricePrimary}

                      </span>

                      <small>

                        {itemPriceSecondary}

                      </small>

                    </div>


                    <div>

                      <strong>

                        {itemCurrency === "FC"
                          ? formatFC(
                              itemTotal
                            )
                          : formatUSD(
                              itemTotal
                            )}

                      </strong>

                      <small>

                        {itemCurrency === "FC"
                          ? formatUSD(
                              itemTotalUSD
                            )
                          : formatFC(
                              itemTotalFC
                            )}

                      </small>

                    </div>

                  </div>

                );

              }
            )}

          </div>


          <div className="invoice-total">

            <span>
              TOTAL
            </span>


            <strong>

              {formatUSD(
                totalUSD
              )}

            </strong>


            <small>

              {formatFC(
                totalFC
              )}

            </small>

          </div>


          <div className="invoice-payment">

            <PaymentIcon
              size={17}
            />

            <span>
              Paiement :
            </span>

            <strong>
              {paymentMethod}
            </strong>

          </div>


          <div className="invoice-footer">

            <CheckCircle2
              size={18}
            />

            <strong>
              Merci de votre visite !
            </strong>

            <span>
              Propulsé par MONALIX
            </span>

          </div>

        </div>


        <div className="invoice-actions">

          <button
            type="button"
            className="invoice-print-button"
            onClick={
              printInvoice
            }
          >

            <Printer
              size={19}
            />

            Imprimer

          </button>


          <button
            type="button"
            className="invoice-close-sale"
            onClick={
              closeInvoice
            }
          >

            <CheckCircle2
              size={19}
            />

            {saleValidated
              ? "Finaliser la vente"
              : "Fermer"}

          </button>

        </div>

      </div>

    </div>

  );

};


/* =====================================================
   INTERFACE PRINCIPALE
===================================================== */

/* =====================================================
   ÉCRAN DE CONNEXION MONALIX
===================================================== */

useEffect(() => {
  if (!isAuthenticated) return;

  if (loggedRole === "admin" && !installationConfigured) {
    openInstallationSetup();
  }
}, [isAuthenticated, loggedRole, installationConfigured]);

if (!isAuthenticated) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #07142f 0%, #0b3b91 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto 16px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#075bff",
              color: "#ffffff",
              fontSize: "30px",
              fontWeight: "800",
            }}
          >
            M
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0b1735",
              fontWeight: "800",
            }}
          >
            MONALIX
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#71809d",
              fontSize: "14px",
            }}
          >
            Connectez-vous à votre espace
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#102044",
              }}
            >
              Nom d'utilisateur
            </label>

            <input
              type="text"
              value={loginUsername}
              onChange={(event) =>
                setLoginUsername(event.target.value)
              }
              placeholder="Entrez votre identifiant"
              autoComplete="username"
              style={{
                width: "100%",
                padding: "13px 14px",
                border: "1px solid #dce6f3",
                borderRadius: "10px",
                outline: "none",
                background: "#f8fafc",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#102044",
              }}
            >
              Mot de passe
            </label>

            <input
              type="password"
              value={loginPassword}
              onChange={(event) =>
                setLoginPassword(event.target.value)
              }
              placeholder="Entrez votre mot de passe"
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "13px 14px",
                border: "1px solid #dce6f3",
                borderRadius: "10px",
                outline: "none",
                background: "#f8fafc",
              }}
            />
          </div>

          {loginError && (
            <div
              style={{
                marginBottom: "18px",
                padding: "12px",
                borderRadius: "10px",
                background: "#fff2f3",
                color: "#dc3545",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {loginError}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#075bff",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Se connecter
          </button>
        </form>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          MONALIX • Gestion commerciale
        </div>
      </div>
    </div>
  );

const renderGenericService = () => (
  <section className="module-page">
    <div className="module-header">
      <div>
        <h2>{activeService === "approvisionnement" ? "Approvisionnement" : "Module"}</h2>
        <p>Cette section conserve l'espace prévu par MONALIX.</p>
      </div>
    </div>
    <div className="empty-state">Le module est disponible dans la structure MONALIX.</div>
  </section>
);

}return (

  <div className="monalix-app">


    {/* =================================================
        SIDEBAR
    ================================================= */}

    {!isCaisse && (

      <aside className="sidebar">


        <div className="brand">

          <div className="brand-logo">
            M
          </div>


          <div className="brand-text">

            <strong>
              MONALIX
            </strong>

            <span>
              Business Intelligence
            </span>

          </div>

        </div>


        {!isCaisse && canAccessService("dashboard") && (
          <div className="sidebar-dashboard-fixed">
            <button
              type="button"
              className={`sidebar-dashboard-button ${activeService === "dashboard" ? "active" : ""}`}
              onClick={() => {
                setActiveService("dashboard");
                setSelectedTable(null);
                setAmountReceived("");
              }}
            >
              <LayoutDashboard size={19} />
              <span>Tableau de bord</span>
            </button>
          </div>
        )}

        <div className="sidebar-scroll">

          <section className={`sidebar-activity-panel ${activitiesMenuOpen ? "open" : ""}`}>

            <button
              type="button"
              className="sidebar-activity-trigger"
              onClick={() => setActivitiesMenuOpen((value) => !value)}
              aria-expanded={activitiesMenuOpen}
            >
              <span className="sidebar-activity-trigger-main">
                <span className="sidebar-label">ACTIVITÉS</span>
                <span className="sidebar-activity-current">
                  {activeActivityData?.label || "Commerce"}
                </span>
              </span>
              <ChevronDown
                size={17}
                className="sidebar-activity-chevron"
              />
            </button>

            {licenseError && (
              <div
                style={{
                  margin: "10px 12px",
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.08)",
                  color: "#f8fafc",
                  fontSize: 12,
                  lineHeight: 1.4,
                }}
              >
                {licenseError}
              </div>
            )}

            <div className="activity-switcher">
              {(Array.isArray(activities) ? activities : [])
                .filter((activity) => {
                  if (licenseLoading) return false;

                  if (licensedActivityIds.length > 0 && !licensedActivityIds.includes(activity.id)) {
                    return false;
                  }

                  if (loggedRole === "admin") return true;

                  const currentUser = monalixUsersState.find((user) => user.name === loggedUser);
                  return currentUser?.activities?.includes(activity.id);
                })
                .map((activity) => {
                  const Icon = activity?.icon || Package;

                  return (
                    <button
                      type="button"
                      key={activity.id}
                      className={activeActivity === activity.id ? "active" : ""}
                      onClick={() => {
                        changeActivity(activity.id);
                        setActivitiesMenuOpen(false);
                      }}
                    >
                      <span className="activity-icon-box">
                        <Icon size={19} strokeWidth={2.1} />
                      </span>

                      <span className="activity-text">
                        <strong>{activity.label}</strong>
                        <small>{activity.description}</small>
                      </span>

                      {activeActivity === activity.id && (
                        <CheckCircle2
                          size={16}
                          className="activity-active-check"
                        />
                      )}
                    </button>
                  );
                })}
            </div>

          </section>

          <nav className="sidebar-navigation">

            <span className="sidebar-label">
              MENU PRINCIPAL
            </span>

            {(
              Array.isArray(activeActivityData?.services)
                ? activeActivityData.services
                : []
            )
              .filter((service) => service.id !== "dashboard")
              .filter((service) => canAccessService(service.id))
              .map((service) => {
                const Icon = service?.icon || Package;

                return (
                  <button
                    type="button"
                    key={service.id}
                    className={activeService === service.id ? "active" : ""}
                    onClick={() => {
                      setActiveService(service.id);
                      setSelectedTable(null);
                      setAmountReceived("");
                    }}
                  >
                    <Icon size={19} />
                    <span>{service.label}</span>
                    {service.id === "caisse" && (
                      <ArrowUpRight
                        size={15}
                        className="nav-arrow"
                      />
                    )}
                  </button>
                );
              })}

          </nav>

        </div>


        <div className="sidebar-footer">

          <div className="sidebar-user">

            <div className="sidebar-user-avatar">

              {String(
                selectedCashier ||
                "CM"
              )
                .split(" ")
                .map(
                  (word) =>
                    word[0] || ""
                )
                .join("")
                .slice(0, 2)}

            </div>


            <div>

              <strong>
                {selectedCashier}
              </strong>

              <span>
                Utilisateur connecté
              </span>

            </div>

          </div>
<button
  type="button"
  onClick={handleLogout}
  style={{
    width: "100%",
    marginTop: "12px",
    padding: "10px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#dc3545",
    fontWeight: "600",
    cursor: "pointer",
  }}
>
  Se déconnecter
</button>

          <div className="system-version">

            <CheckCircle2
              size={14}
            />

            MONALIX v1.0

          </div>

        </div>

      </aside>

    )}


    {/* =================================================
        CONTENU PRINCIPAL
    ================================================= */}

    <main
      className={
        isCaisse
          ? "main-content caisse-mode"
          : "main-content"
      }
      style={
        isCaisse
          ? {
              flex: "1 1 0%",
              width: "auto",
              minWidth: 0,
              maxWidth: "none",
              margin: 0,
              padding: 0,
              overflow: "hidden",
            }
          : undefined
      }
    >


      {!isCaisse && (

        <header className="main-header">


          <div className="header-title">

            <div>

              <span className="header-activity">

                {activeActivityData?.label ||
                  "MONALIX"}

              </span>


              <h1>

                {activeService === "dashboard"

                  ? "Tableau de bord"

                  : (
                      Array.isArray(
                        activeActivityData?.services
                      )
                        ? activeActivityData.services
                        : []
                    ).find(
                      (service) =>
                        service.id ===
                        activeService
                    )?.label ||
                    "Module"}

              </h1>

            </div>

          </div>


          <div className="header-actions">


            <div className="header-date">

              <CalendarDays
                size={17}
              />

              <span>

                {new Date()
                  .toLocaleDateString(
                    "fr-FR",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}

              </span>

            </div>


            <div className="online-indicator">

              <span className="online-dot" />

              En ligne

            </div>

          </div>

        </header>

      )}

<div
  className={
    isCaisse
      ? "page-content caisse-content"
      : "page-content"
  }
  style={
    isCaisse
      ? {
          width: "100%",
          maxWidth: "none",
          minWidth: 0,
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }
      : undefined
  }
>
  {activeService === "dashboard"
    ? (activeActivity === "pressing" ? renderPressingDashboard() : renderDashboard())
    : activeService === "caisse"
    ? (activeActivity === "pressing" ? renderPressingService() : renderCaisse())
    : activeService === "produits"
    ? renderProductsService()
    : activeService === "stocks"
    ? renderStocksService()
    : activeService === "rapports"
    ? renderReportsService()
    : activeService === "pressing"
    ? renderPressingService()
    : activeService === "parametres"
    ? renderSettingsService()
    : renderGenericService()}
</div>

    </main>


    {/* =================================================
        CONFIGURATION INSTALLATION MONALIX CONTROL
    ================================================= */}

    {showInstallationSetup && loggedRole === "admin" && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(15, 23, 42, 0.62)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            width: "min(620px, 100%)",
            background: "#fff",
            borderRadius: 22,
            padding: 28,
            boxShadow: "0 24px 80px rgba(0,0,0,.25)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#eef5ff",
                color: "#075bff",
              }}
            >
              <MonitorSmartphone size={24} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, color: "#111827" }}>
                Configuration de l'installation
              </h2>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
                Reliez cette installation MONALIX à son client dans MONALIX CONTROL.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 14,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              fontSize: 13,
              color: "#475569",
            }}
          >
            <strong>Identifiant de cette installation :</strong><br />
            <span style={{ wordBreak: "break-all", fontFamily: "monospace" }}>
              {installationDeviceId}
            </span>
          </div>

          <div style={{ marginTop: 20 }}>
            <label style={{ display: "block", marginBottom: 7, fontWeight: 700, color: "#334155" }}>
              Organisation / Client
            </label>
            <select
              value={selectedInstallationOrg}
              onChange={(event) => {
                const value = event.target.value;
                setSelectedInstallationOrg(value);
                loadInstallationBranches(value);
              }}
              disabled={installationLoading || installationSaving}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #cbd5e1", background: "#fff", fontSize: 15 }}
            >
              <option value="">Sélectionner le client...</option>
              {installationOrganizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.name || "Organisation sans nom"}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ display: "block", marginBottom: 7, fontWeight: 700, color: "#334155" }}>
              Établissement
            </label>
            <select
              value={selectedInstallationBranch}
              onChange={(event) => setSelectedInstallationBranch(event.target.value)}
              disabled={!selectedInstallationOrg || installationLoading || installationSaving}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #cbd5e1", background: "#fff", fontSize: 15 }}
            >
              <option value="">Sélectionner l'établissement...</option>
              {installationBranches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}{branch.code ? ` — ${branch.code}` : ""}
                </option>
              ))}
            </select>
          </div>

          {installationBranches.length === 0 && selectedInstallationOrg && !installationLoading && (
            <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: "#fff7ed", color: "#9a3412", fontSize: 13 }}>
              Aucun établissement actif n'est disponible pour ce client. Créez d'abord son établissement dans MONALIX CONTROL.
            </div>
          )}

          {installationError && (
            <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: "#fef2f2", color: "#b91c1c", fontSize: 13 }}>
              {installationError}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
            {installationConfigured && (
              <button
                type="button"
                onClick={() => setShowInstallationSetup(false)}
                disabled={installationSaving}
                style={{ padding: "11px 16px", borderRadius: 12, border: "1px solid #cbd5e1", background: "#fff", color: "#334155", cursor: "pointer" }}
              >
                Annuler
              </button>
            )}
            <button
              type="button"
              onClick={saveInstallationSetup}
              disabled={installationSaving || installationLoading || !selectedInstallationOrg || !selectedInstallationBranch}
              style={{ padding: "11px 18px", borderRadius: 12, border: 0, background: "#075bff", color: "#fff", fontWeight: 700, cursor: "pointer", opacity: installationSaving || installationLoading || !selectedInstallationOrg || !selectedInstallationBranch ? 0.55 : 1 }}
            >
              {installationSaving ? "Enregistrement..." : "Connecter cette installation"}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* =================================================
        FACTURE
    ================================================= */}

    {renderInvoiceModal()}

  </div>

);

}
