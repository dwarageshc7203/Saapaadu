import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import DashboardLayout from "./components/DashboardLayout";
import DashboardRedirect from "./pages/DashboardRedirect";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerHotspots from "./pages/customer/CustomerHotspots";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerProfile from "./pages/customer/CustomerProfile";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorHotspots from "./pages/vendor/VendorHotspots";
import VendorOrders from "./pages/vendor/VendorOrders";
import VendorProfile from "./pages/vendor/VendorProfile";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Hotspots", href: "#hotspots" },
  { label: "Preview", href: "#preview" },
  { label: "CTA", href: "#cta" },
];

const featureRows = [
  {
    title: "Dynamic pricing that clears inventory",
    description:
      "Launch hotspot windows that automatically deepen discounts as time runs out.",
    stat: "38 min",
    detail: "Average sell-out time",
  },
  {
    title: "Live demand heatmaps",
    description:
      "See where hungry customers cluster so you post the right meals first.",
    stat: "2.4x",
    detail: "Higher conversion in hotspots",
  },
  {
    title: "Smart pickup orchestration",
    description:
      "Control pickup slots, reduce crowding, and keep operations smooth.",
    stat: "12 min",
    detail: "Median pickup delay",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const transition = { duration: 0.6, ease: "easeOut" } as const;

const customerMenu = [
  { to: "/dashboard/customer", label: "Overview" },
  { to: "/dashboard/customer/hotspots", label: "Hotspots" },
  { to: "/dashboard/customer/orders", label: "My Orders" },
  { to: "/dashboard/customer/profile", label: "Profile" },
];

const vendorMenu = [
  { to: "/dashboard/vendor", label: "Overview" },
  { to: "/dashboard/vendor/hotspots", label: "Hotspots" },
  { to: "/dashboard/vendor/orders", label: "Orders" },
  { to: "/dashboard/vendor/profile", label: "Profile" },
];

function AuroraBackground({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0 aurora-bg" aria-hidden="true" />
      <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
      <div className="relative">{children}</div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <AuroraBackground>
        <div className="fixed left-1/2 top-6 z-50 w-[min(1200px,calc(100%-2rem))] -translate-x-1/2 px-3">
          <motion.nav
            className="flex items-center justify-between rounded-full border border-ink/10 bg-white/90 px-6 py-3 text-ink shadow-lg shadow-black/10 backdrop-blur"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <Link to="/" className="text-lg font-semibold tracking-tight">
              Saapaadu
            </Link>
            <div className="hidden items-center gap-6 text-sm text-ink/70 md:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-ink">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link to="/login" className="text-ink/70 transition hover:text-ink">
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-amber-400 px-4 py-2 font-semibold text-ink shadow-sm transition hover:bg-amber-300"
              >
                Get started
              </Link>
            </div>
          </motion.nav>
        </div>

        <div className="flex min-h-[85vh] items-center justify-center py-32">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={transition}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Saapaadu for vendors
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-cream sm:text-5xl md:text-6xl">
                Turn Unsold Food Into Revenue
              </h1>
              <p className="mt-6 text-lg text-cream/70 md:text-xl">
                Activate hotspot windows, convert last-minute inventory, and keep food moving with a
                clean, fast SaaS workflow built for busy kitchens.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-ink shadow-md shadow-amber-300/40 transition hover:bg-amber-300"
                >
                  Start selling today
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-white/20"
                >
                  Log in
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </AuroraBackground>

      <section id="features" className="bg-sand py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <motion.div
            className="max-w-2xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              Features
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              A Framer-style flow built for fast decisions
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              Every panel is designed to keep the kitchen focused: minimal UI, heavy spacing, and
              instant clarity.
            </p>
          </motion.div>

          <div className="mt-16 space-y-16">
            {featureRows.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`flex flex-col gap-10 md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={transition}
              >
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold md:text-3xl">{feature.title}</h3>
                  <p className="mt-4 text-lg text-ink/70">{feature.description}</p>
                </div>
                <div className="md:w-1/2">
                  <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-xl shadow-amber-100/60">
                    <div className="text-sm uppercase tracking-[0.3em] text-ink/40">Live metric</div>
                    <div className="mt-4 text-4xl font-semibold text-ink">{feature.stat}</div>
                    <p className="mt-2 text-sm text-ink/60">{feature.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="hotspots" className="bg-ink py-24 text-cream">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <motion.div
            className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Hotspots
              </p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Time-boxed drops that drive urgency
              </h2>
              <p className="mt-4 text-lg text-cream/70">
                Hotspots activate the last hour of service, showing customers a live timer,
                discount, and pickup window in one clean card.
              </p>
              <div className="mt-8 space-y-4 text-cream/80">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <span>Countdown-driven demand spikes</span>
                  <span className="text-amber-300">+24%</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <span>Instant inventory updates</span>
                  <span className="text-amber-300">Live</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40">
              <div className="text-xs uppercase tracking-[0.3em] text-cream/60">Active hotspot</div>
              <h3 className="mt-4 text-2xl font-semibold">Sunset Veg Thali</h3>
              <p className="mt-2 text-sm text-cream/60">14 servings left</p>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                <div>
                  <div className="text-xs text-cream/60">Discount</div>
                  <div className="text-xl font-semibold text-amber-300">-40%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-cream/60">Timer</div>
                  <div className="text-xl font-semibold">19:42</div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-cream/60 line-through">INR 120</span>
                <span className="text-2xl font-semibold">INR 72</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="preview" className="bg-sand py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <motion.div
            className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
                Preview
              </p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Food cards built for speed</h2>
              <p className="mt-4 text-lg text-ink/70">
                The UI stays focused on what matters: discount, timer, and pickup.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/signup" className="btn btn-primary">
                  Launch hotspots
                </Link>
                <Link to="/login" className="btn btn-ghost">
                  View dashboard
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-xl shadow-amber-100/60">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-ink/40">Hotspot</div>
                  <h3 className="mt-3 text-2xl font-semibold">Masala Dosa</h3>
                  <p className="mt-2 text-sm text-ink/60">Pickup in 25 minutes</p>
                </div>
                <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                  -35%
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-ink/10 bg-amber-50 px-4 py-3">
                <div>
                  <p className="text-xs text-ink/50">Timer</p>
                  <p className="text-xl font-semibold text-ink">12:08</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink/50">Now</p>
                  <p className="text-2xl font-semibold text-ink">INR 48</p>
                  <p className="text-xs text-ink/50 line-through">INR 80</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm text-ink/60">
                <span>6 servings left</span>
                <span>0.6 km away</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="cta" className="bg-cream py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <motion.div
            className="rounded-3xl border border-ink/10 bg-white p-12 text-center shadow-xl shadow-amber-100/60"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
              Ready to launch
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Start earning from every unsold meal
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              Join Saapaadu and turn closing time into a high-conversion window.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="btn btn-primary">
                Create vendor account
              </Link>
              <Link to="/login" className="btn btn-ghost">
                Log in
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardRedirect />} />

          <Route element={<RoleRoute allow={["customer"]} />}>
            <Route path="/dashboard/customer" element={<DashboardLayout menu={customerMenu} />}>
              <Route index element={<CustomerDashboard />} />
              <Route path="hotspots" element={<CustomerHotspots />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="profile" element={<CustomerProfile />} />
            </Route>
          </Route>

          <Route element={<RoleRoute allow={["vendor"]} />}>
            <Route path="/dashboard/vendor" element={<DashboardLayout menu={vendorMenu} />}>
              <Route index element={<VendorDashboard />} />
              <Route path="hotspots" element={<VendorHotspots />} />
              <Route path="orders" element={<VendorOrders />} />
              <Route path="profile" element={<VendorProfile />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
