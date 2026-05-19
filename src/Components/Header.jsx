"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { auth, db } from "@/Firebase/FireBaseconfig";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

const NAV_LINKS = [
  { href: "/Hunters", label: "Hunters" },
  { href: "/Jinwoo", label: "Jinwoo" },
  { href: "/Shadows", label: "Shadows" },
  { href: "/WeeklyContent", label: "Weekly Guide" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const profileRef = useRef(null);

  // ─── Close Profile Menu Outside Click ─────────────────────
  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  // ─── Auth Listener ────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // ─── First Try Direct UID Document ─────────────────
          let userRef = doc(db, "users", user.uid);
          let snap = await getDoc(userRef);

          // ─── If Not Found, Search Manually ─────────────────
          if (!snap.exists()) {
            const querySnapshot = await getDocs(collection(db, "users"));

            let foundUser = null;

            querySnapshot.forEach((docSnap) => {
              const data = docSnap.data();

              if (data.uid === user.uid) {
                foundUser = data;
              }
            });

            if (foundUser) {
              setUserData(foundUser);
            } else {
              setUserData({
                fullName:
                  user.displayName || user.email?.split("@")[0] || "Hunter",
                email: user.email,
              });
            }
          } else {
            setUserData(snap.data());
          }
        } catch (err) {
          console.log(err);

          setUserData({
            fullName: user.displayName || user.email?.split("@")[0] || "Hunter",
            email: user.email,
          });
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // ─── Logout ───────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await signOut(auth);

      setProfileOpen(false);
      setMenuOpen(false);
      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed w-screen z-50 bg-dark/80 backdrop-blur-lg border-b border-gray-700">
      {/* ── Main Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <h1
            className={`text-base sm:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#ffffff] to-[#a855f7] drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] leading-tight ${cinzel.className}`}
          >
            Solo Leveling:
            <br />
            Arise
          </h1>
        </Link>

        {/* Desktop Nav Only If Logged In */}
        {userData && (
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm lg:text-base text-gray-300 hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* ─── Logged In ───────────────────────── */}
          {userData ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] flex items-center justify-center text-white font-bold text-sm uppercase border border-purple-400/30 shrink-0">
                    {userData?.photoURL ? (
                      <img
                        src={userData.photoURL}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{(userData?.fullName || "H")[0]}</span>
                    )}
                  </div>

                  {/* Name */}
                  <span className="text-sm text-purple-400 font-medium max-w-[140px] truncate">
                    @{userData?.username || userData?.fullName || "Hunter"}
                  </span>
                </div>
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-3 w-64 rounded-2xl overflow-hidden border border-purple-500/20 bg-[#0b1220]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all duration-300 ${
                  profileOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                {/* User Info */}
                <div className="px-4 py-4 border-b border-white/10">
                  <h3 className="text-white font-semibold text-base truncate">
                    {userData?.fullName || userData?.username || "Hunter"}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {userData?.email}
                  </p>

                  {userData?.username && (
                    <p className="text-xs text-purple-300 mt-2">
                      @{userData.username}
                    </p>
                  )}
                </div>

                {/* Menu */}
                <div className="p-2">
                  <div className="p-2">
                    <Link
                      href="/UserDashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
                    >
                      User Dashboard
                    </Link>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  >
                    ⏻ Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ─── Not Logged In ───────────────────── */
            <Link
              href="/Login"
              className="bg-primary text-white text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:brightness-110 transition whitespace-nowrap"
            >
              Login
            </Link>
          )}

          {/* Hamburger Only If Logged In */}
          {userData && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg border border-gray-600 bg-gray-800/60 gap-1.5 shrink-0"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Dropdown Only If Logged In ── */}
      {userData && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-64 border-t border-gray-700" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-4 py-3 gap-1 bg-black/60 backdrop-blur-lg">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
