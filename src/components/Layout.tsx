import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineViewGrid,
  HiOutlineSearch,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import { BackgroundBlobs } from "./BackgroundBlobs";

const NAV = [
  { to: "/", label: "Home", icon: HiOutlineHome },
  { to: "/discover", label: "Discover", icon: HiOutlineSearch },
  { to: "/ai", label: "AI Cook", icon: HiOutlineSparkles },
  { to: "/categories", label: "Browse", icon: HiOutlineViewGrid },
  { to: "/random", label: "Surprise", icon: HiOutlineLightningBolt },
  { to: "/favorites", label: "Loved", icon: HiOutlineHeart },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <div className="relative min-h-screen">
      <BackgroundBlobs />

      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
          <nav className="glass flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full gradient-button text-white shadow-md">
                <span className="text-base">✿</span>
              </span>
              <span className="font-display text-xl font-bold gradient-text">RoséRecipe</span>
            </Link>
            <ul className="hidden items-center gap-1 md:flex">
              {NAV.slice(1).map((n) => {
                const active = path === n.to || (n.to !== "/" && path.startsWith(n.to));
                return (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                        active ? "text-rose-600" : "text-rose-900/70 hover:text-rose-600"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/80 shadow-sm"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/ai"
              className="hidden rounded-full gradient-button px-5 py-2 text-sm font-semibold sm:inline-flex"
            >
              Cook now
            </Link>
          </nav>
        </div>
      </header>

      <main className="pb-28 pt-6 md:pb-12">{children}</main>

      <nav className="fixed inset-x-0 bottom-3 z-50 mx-auto w-fit md:hidden">
        <ul className="glass flex items-center gap-1 rounded-full px-2 py-2">
          {NAV.map((n) => {
            const active = path === n.to || (n.to !== "/" && path.startsWith(n.to));
            const Icon = n.icon;
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={`grid h-11 w-11 place-items-center rounded-full transition-all ${
                    active ? "gradient-button" : "text-rose-700/80 hover:bg-white/60"
                  }`}
                  aria-label={n.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className="border-t border-rose-100/60 py-8 text-center text-xs text-rose-900/50">
        Made with 🌸 — Ratna Singh
      </footer>
    </div>
  );
}