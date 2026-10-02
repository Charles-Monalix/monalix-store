import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase";
import {
  BarChart3,
  LogOut,
  RefreshCw,
  ShoppingCart,
  Package,
  Users,
  Activity,
  Clock,
  Wifi,
  WifiOff,
} from "lucide-react";

const PatronDashboard = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [sales, setSales] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data?.session || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (mounted) setSession(nextSession || null);
      }
    );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const loadDashboard = async () => {
    if (!session) return;

    try {
      setLoadingData(true);
      setDataError("");

      const [salesResult, itemsResult] = await Promise.all([
        supabase
          .from("mon_sales")
          .select("id, org_id, activity, client_id, cashier_name, sale_date")
          .order("sale_date", { ascending: false })
          .limit(200),
        supabase
          .from("mon_sale_items")
          .select("id, sale_id, product_name, quantity")
          .limit(1000),
      ]);

      if (salesResult.error) throw salesResult.error;
      if (itemsResult.error) throw itemsResult.error;

      setSales(Array.isArray(salesResult.data) ? salesResult.data : []);
      setSaleItems(Array.isArray(itemsResult.data) ? itemsResult.data : []);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("❌ Erreur Dashboard Patron :", error);
      setDataError(error?.message || "Impossible de charger les données.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (session) loadDashboard();
  }, [session]);

  const todaySales = useMemo(() => {
    const now = new Date();
    return sales.filter((sale) => {
      if (!sale?.sale_date) return false;
      const date = new Date(sale.sale_date);
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      );
    });
  }, [sales]);

  const monthSales = useMemo(() => {
    const now = new Date();
    return sales.filter((sale) => {
      if (!sale?.sale_date) return false;
      const date = new Date(sale.sale_date);
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth()
      );
    });
  }, [sales]);

  const totalItemsSold = useMemo(
    () =>
      saleItems.reduce(
        (sum, item) => sum + (Number(item?.quantity) || 0),
        0
      ),
    [saleItems]
  );

  const topProducts = useMemo(() => {
    const map = new Map();

    saleItems.forEach((item) => {
      const name = item?.product_name || "Produit";
      const quantity = Number(item?.quantity) || 0;
      map.set(name, (map.get(name) || 0) + quantity);
    });

    return [...map.entries()]
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  }, [saleItems]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");

    if (!email.trim() || !password) {
      setLoginError("Veuillez saisir votre e-mail et votre mot de passe.");
      return;
    }

    try {
      setLoadingLogin(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      setSession(data?.session || null);
      setPassword("");
    } catch (error) {
      console.error("❌ Connexion Patron :", error);
      setLoginError(error?.message || "Connexion impossible.");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSales([]);
    setSaleItems([]);
  };

  const formatDate = (value) => {
    if (!value) return "—";
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  };

  if (!session) {
    return (
      <div style={styles.page}>
        <div style={styles.loginCard}>
          <div style={styles.logo}>MONALIX</div>
          <h1 style={styles.title}>Espace Patron</h1>
          <p style={styles.subtitle}>
            Connectez-vous pour suivre votre activité à distance.
          </p>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="E-mail du patron"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              autoComplete="current-password"
            />

            {loginError && <div style={styles.error}>{loginError}</div>}

            <button type="submit" disabled={loadingLogin} style={styles.primaryButton}>
              {loadingLogin ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div style={styles.note}>
            Le compte Patron doit être créé dans Supabase Authentication avant la première connexion.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.logo}>MONALIX</div>
          <div style={styles.headerTitle}>Centre de pilotage Patron</div>
        </div>

        <div style={styles.headerActions}>
          <div style={styles.online}>
            <Wifi size={16} /> En ligne
          </div>
          <button onClick={loadDashboard} style={styles.secondaryButton} disabled={loadingData}>
            <RefreshCw size={16} />
            {loadingData ? "Actualisation..." : "Actualiser"}
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <div>
            <div style={styles.eyebrow}>MONALIX • SUPERVISION À DISTANCE</div>
            <h1 style={styles.heroTitle}>Vue globale de votre entreprise</h1>
            <p style={styles.heroText}>
              Les ventes enregistrées sur les caisses connectées apparaissent ici.
            </p>
          </div>
          <div style={styles.connectionBadge}>
            <Activity size={18} /> Supabase synchronisé
          </div>
        </section>

        {dataError && <div style={styles.errorBanner}>{dataError}</div>}

        <section style={styles.statsGrid}>
          <StatCard icon={<ShoppingCart size={22} />} label="Ventes aujourd'hui" value={todaySales.length} />
          <StatCard icon={<BarChart3 size={22} />} label="Ventes ce mois" value={monthSales.length} />
          <StatCard icon={<Package size={22} />} label="Articles vendus" value={totalItemsSold} />
          <StatCard icon={<Users size={22} />} label="Caissiers actifs" value={new Set(sales.map((s) => s.cashier_name).filter(Boolean)).size} />
        </section>

        <section style={styles.grid2}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h2 style={styles.cardTitle}>Dernières ventes</h2>
                <p style={styles.cardSubtitle}>Activité reçue depuis les caisses</p>
              </div>
              <ShoppingCart size={22} />
            </div>

            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Activité</th>
                    <th style={styles.th}>Caissier</th>
                    <th style={styles.th}>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.slice(0, 12).map((sale) => (
                    <tr key={sale.id}>
                      <td style={styles.td}>{formatDate(sale.sale_date)}</td>
                      <td style={styles.td}>{sale.activity || "—"}</td>
                      <td style={styles.td}>{sale.cashier_name || "—"}</td>
                      <td style={styles.tdSmall}>{String(sale.id).slice(0, 18)}...</td>
                    </tr>
                  ))}
                  {sales.length === 0 && (
                    <tr>
                      <td colSpan="4" style={styles.empty}>Aucune vente synchronisée.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h2 style={styles.cardTitle}>Produits les plus vendus</h2>
                <p style={styles.cardSubtitle}>Quantités provenant des ventes synchronisées</p>
              </div>
              <Package size={22} />
            </div>

            <div>
              {topProducts.length === 0 ? (
                <div style={styles.empty}>Aucun article synchronisé.</div>
              ) : (
                topProducts.map((product, index) => (
                  <div key={product.name} style={styles.productRow}>
                    <div style={styles.rank}>{index + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={styles.productName}>{product.name}</div>
                      <div style={styles.barTrack}>
                        <div
                          style={{
                            ...styles.barFill,
                            width: `${Math.max(6, (product.quantity / topProducts[0].quantity) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <strong>{product.quantity}</strong>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <Wifi size={20} />
            <div>
              <strong>Connexion</strong>
              <p>Le patron peut consulter ce tableau depuis un téléphone ou un PC connecté à Internet.</p>
            </div>
          </div>
          <div style={styles.infoCard}>
            <Clock size={20} />
            <div>
              <strong>Dernière actualisation</strong>
              <p>{lastRefresh ? formatDate(lastRefresh) : "—"}</p>
            </div>
          </div>
          <div style={styles.infoCard}>
            <WifiOff size={20} />
            <div>
              <strong>Important</strong>
              <p>Les ventes doivent être synchronisées par la caisse pour apparaître ici.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div style={styles.statCard}>
    <div style={styles.statIcon}>{icon}</div>
    <div>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  </div>
);

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f6fb",
    color: "#102044",
    fontFamily: "Inter, Arial, sans-serif",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "16px 5vw",
    background: "rgba(255,255,255,.96)",
    borderBottom: "1px solid #e4e9f2",
    backdropFilter: "blur(10px)",
  },
  logo: { fontWeight: 900, letterSpacing: 2, color: "#1455d9" },
  headerTitle: { fontSize: 18, fontWeight: 800, marginTop: 3 },
  headerActions: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  online: { display: "flex", alignItems: "center", gap: 6, color: "#098b61", fontWeight: 800, fontSize: 14 },
  main: { width: "min(1400px, 90vw)", margin: "0 auto", padding: "28px 0 50px" },
  hero: {
    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20,
    padding: 30, borderRadius: 24, color: "white", background: "linear-gradient(135deg,#102044,#1455d9)", marginBottom: 22,
  },
  eyebrow: { fontSize: 12, fontWeight: 900, letterSpacing: 2, opacity: .9 },
  heroTitle: { fontSize: "clamp(28px,4vw,46px)", margin: "10px 0 8px", lineHeight: 1.05 },
  heroText: { margin: 0, opacity: .86, maxWidth: 650 },
  connectionBadge: { display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.14)", padding: "12px 16px", borderRadius: 999, fontWeight: 800, whiteSpace: "nowrap" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16, marginBottom: 20 },
  statCard: { background: "white", border: "1px solid #e5eaf2", borderRadius: 18, padding: 20, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 8px 30px rgba(20,40,80,.05)" },
  statIcon: { width: 46, height: 46, borderRadius: 14, display: "grid", placeItems: "center", background: "#edf4ff", color: "#1455d9" },
  statLabel: { color: "#72809a", fontSize: 13, fontWeight: 700 },
  statValue: { fontSize: 28, fontWeight: 900, marginTop: 2 },
  grid2: { display: "grid", gridTemplateColumns: "1.35fr .65fr", gap: 20 },
  card: { background: "white", border: "1px solid #e5eaf2", borderRadius: 20, padding: 22, boxShadow: "0 8px 30px rgba(20,40,80,.05)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 18 },
  cardTitle: { margin: 0, fontSize: 19 },
  cardSubtitle: { margin: "5px 0 0", color: "#7a879d", fontSize: 13 },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 600 },
  th: { textAlign: "left", padding: "11px 8px", fontSize: 12, color: "#7a879d", borderBottom: "1px solid #e8edf4" },
  td: { padding: "13px 8px", borderBottom: "1px solid #eef1f5", fontSize: 13 },
  tdSmall: { padding: "13px 8px", borderBottom: "1px solid #eef1f5", fontSize: 11, color: "#7a879d" },
  empty: { textAlign: "center", padding: 28, color: "#7a879d" },
  productRow: { display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid #eef1f5" },
  rank: { width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 9, background: "#edf4ff", color: "#1455d9", fontWeight: 900, fontSize: 12 },
  productName: { fontWeight: 800, fontSize: 13, marginBottom: 6 },
  barTrack: { height: 6, borderRadius: 99, background: "#edf1f6", overflow: "hidden" },
  barFill: { height: "100%", background: "#1455d9", borderRadius: 99 },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 20 },
  infoCard: { display: "flex", gap: 12, padding: 18, background: "white", border: "1px solid #e5eaf2", borderRadius: 16, color: "#52617b" },
  form: { display: "grid", gap: 12, marginTop: 22 },
  loginCard: { width: "min(440px, 90vw)", margin: "10vh auto", padding: 32, background: "white", borderRadius: 24, border: "1px solid #e5eaf2", boxShadow: "0 20px 60px rgba(20,40,80,.10)" },
  title: { fontSize: 30, margin: "10px 0 8px" },
  subtitle: { color: "#718099", lineHeight: 1.5 },
  input: { width: "100%", boxSizing: "border-box", padding: "14px 15px", borderRadius: 12, border: "1px solid #d9e0eb", outline: "none", fontSize: 15 },
  primaryButton: { border: 0, borderRadius: 12, padding: "14px 16px", background: "#1455d9", color: "white", fontWeight: 900, cursor: "pointer", fontSize: 15 },
  secondaryButton: { display: "flex", alignItems: "center", gap: 7, border: "1px solid #dce3ee", borderRadius: 10, padding: "9px 12px", background: "white", color: "#233453", fontWeight: 800, cursor: "pointer" },
  logoutButton: { display: "flex", alignItems: "center", gap: 7, border: 0, borderRadius: 10, padding: "9px 12px", background: "#eef1f5", color: "#233453", fontWeight: 800, cursor: "pointer" },
  error: { padding: 11, borderRadius: 10, background: "#fff0f0", color: "#b42318", fontSize: 13 },
  errorBanner: { padding: 14, marginBottom: 18, borderRadius: 12, background: "#fff0f0", color: "#b42318", fontWeight: 700 },
  note: { marginTop: 18, fontSize: 12, lineHeight: 1.5, color: "#7a879d" },
};

export default PatronDashboard;
