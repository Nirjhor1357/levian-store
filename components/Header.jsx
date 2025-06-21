import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "./CartContext";

export default function Header() {
  const { setCartOpen, cartItems } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollY = useRef(0);

  // Hide/reveal navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect login/admin status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        try {
          const [, payload] = token.split(".");
          const user = JSON.parse(atob(payload));
          setIsAdmin(user.isAdmin);
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/";
  }

  return (
    <>
      <header
        className={`
          border-b border-gray-100 sticky top-0 bg-white z-50 transition-transform duration-300
          ${hidden ? "-translate-y-full" : "translate-y-0"}
        `}
        style={{ willChange: "transform" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo only, links to home */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              priority
              className="rounded"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary font-medium">
              Home
            </Link>
            <Link href="/products" className="hover:text-primary font-medium">
              Shop
            </Link>
            <Link href="/contact" className="hover:text-primary font-medium">
              Contact
            </Link>
            {isAdmin && (
              <Link href="/admin" className="hover:text-blue-700 font-semibold">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop auth & cart */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-secondary text-primary px-4 py-2 rounded hover:bg-secondary/80 transition font-semibold border border-primary"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" className="px-3 py-1 text-primary hover:underline rounded">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-red-500 hover:underline rounded"
                >
                  Logout
                </button>
              </>
            )}
            {/* Cart icon */}
            <button
              className="w-10 h-10 flex items-center justify-center relative"
              onClick={() => setCartOpen(true)}
              aria-label="Open Cart"
            >
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx={9} cy={21} r={1} />
                <circle cx={20} cy={21} r={1} />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            </button>
          </div>

          {/* Hamburger menu for mobile */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open navigation"
          >
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 flex">
          <div className="w-64 bg-white h-full shadow-lg flex flex-col p-6 space-y-6">
            <button
              className="self-end mb-4"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Link href="/" className="font-medium text-primary" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="font-medium text-primary" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            <Link href="/contact" className="font-medium text-primary" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            {isAdmin && (
              <Link href="/admin" className="font-medium text-blue-700" onClick={() => setMobileOpen(false)}>
                Admin
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-secondary text-primary px-4 py-2 rounded hover:bg-secondary/80 transition font-semibold border border-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" className="px-3 py-1 text-primary hover:underline rounded" onClick={() => setMobileOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="px-3 py-1 text-red-500 hover:underline rounded"
                >
                  Logout
                </button>
              </>
            )}
            <button
              className="w-10 h-10 flex items-center justify-center relative"
              onClick={() => {
                setCartOpen(true);
                setMobileOpen(false);
              }}
              aria-label="Open Cart"
            >
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx={9} cy={21} r={1} />
                <circle cx={20} cy={21} r={1} />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            </button>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
