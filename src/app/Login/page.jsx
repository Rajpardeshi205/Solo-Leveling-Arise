"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, fireDB } from "@/Firebase/FireBaseconfig";

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId,
      pts = [],
      W,
      H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    const randPt = () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.7 + 0.3,
      hue: Math.random() > 0.5 ? 220 : 265,
      life: Math.random() * 220 + 80,
      maxLife: 300,
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (
          p.life <= 0 ||
          p.x < -10 ||
          p.x > W + 10 ||
          p.y < -10 ||
          p.y > H + 10
        ) {
          pts[i] = randPt();
          return;
        }
        const alpha = p.a * (p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,72%,${alpha})`;
        ctx.fill();
        pts.forEach((q, j) => {
          if (j <= i) return;
          const dx = p.x - q.x,
            dy = p.y - q.y,
            d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(${p.hue},80%,72%,${(1 - d / 90) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    pts = Array.from({ length: 100 }, randPt);
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ show, message, username, type }) {
  const isErr = type === "error";
  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background:
          "linear-gradient(135deg,rgba(10,22,48,0.98),rgba(6,14,32,0.99))",
        border: `1px solid ${isErr ? "rgba(255,80,80,0.45)" : "rgba(80,200,130,0.4)"}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.6)`,
        transform: show ? "translateX(0)" : "translateX(130%)",
        opacity: show ? 1 : 0,
        transition: "transform .45s cubic-bezier(.2,.8,.2,1), opacity .45s",
        minWidth: 230,
        maxWidth: 280,
        fontFamily: "'Rajdhani', sans-serif",
        pointerEvents: "none",
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: isErr ? "rgba(255,80,80,0.12)" : "rgba(80,200,130,0.12)",
          border: `1px solid ${isErr ? "rgba(255,80,80,0.35)" : "rgba(80,200,130,0.35)"}`,
          animation: show
            ? "popIn .4s .1s cubic-bezier(.2,.8,.2,1) both"
            : "none",
          fontSize: 15,
        }}
      >
        {isErr ? "✕" : "✦"}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-0.5"
          style={{
            color: isErr ? "rgba(255,110,110,0.85)" : "rgba(80,200,130,0.85)",
          }}
        >
          {isErr ? "Error" : "Welcome"}
        </div>
        <div
          className="text-sm font-bold leading-snug"
          style={{
            fontFamily: "'Cinzel', serif",
            color: isErr ? "#ffd8d8" : "#d8f0e8",
            wordBreak: "break-word",
          }}
        >
          {isErr ? message : `${username}!`}
        </div>
      </div>
    </div>
  );
}

function ForgotPasswordModal({ isOpen, onClose }) {
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setResetEmail("");
      setLoading(false);
      setSent(false);
      setError("");
    }
  }, [isOpen]);

  const handleReset = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail.trim())) {
      setError("Enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());

      setSent(true);
    } catch (err) {
      const MAP = {
        "auth/user-not-found": "No account found with this email.",

        "auth/invalid-email": "Invalid email address.",
      };

      setError(MAP[err.code] || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="relative rounded-2xl p-6 w-full max-w-sm mx-4"
        style={{
          background:
            "linear-gradient(145deg,rgba(13,20,38,0.99),rgba(8,14,28,0.99))",
          border: "1px solid rgba(120,180,255,0.2)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(255,140,80,0.5),transparent)",
          }}
        />

        <div className="text-center mb-5">
          <div
            className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-xl rounded-full"
            style={{
              background: "rgba(255,140,80,0.1)",
              border: "1px solid rgba(255,140,80,0.25)",
            }}
          >
            🔑
          </div>

          <h2
            className="text-lg font-black tracking-widest"
            style={{
              fontFamily: "'Cinzel',serif",
              color: "#e8f0ff",
            }}
          >
            {sent ? "Reset Link Sent!" : "Forgot Password"}
          </h2>

          <p
            className="text-xs mt-1"
            style={{ color: "rgba(160,180,210,0.6)" }}
          >
            {sent
              ? `Check your inbox at ${resetEmail}`
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        {!sent && (
          <>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => {
                setResetEmail(e.target.value);
                setError("");
              }}
              placeholder="hero@realm.com"
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none mb-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(120,180,255,0.15)",
                color: "#d8e8ff",
              }}
            />

            {error && (
              <p
                className="mb-3 text-xs"
                style={{
                  color: "rgba(255,110,110,0.85)",
                }}
              >
                {error}
              </p>
            )}
          </>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(160,180,210,0.6)",
              cursor: "pointer",
            }}
          >
            {sent ? "Close" : "Cancel"}
          </button>

          {!sent && (
            <button
              onClick={handleReset}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2"
              style={{
                background:
                  "linear-gradient(135deg,rgba(200,100,40,0.8),rgba(200,140,40,0.8))",
                border: "1px solid rgba(255,160,80,0.3)",
                color: "#ffe8cc",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <span
                  style={{
                    width: 14,
                    height: 14,
                    border: "2px solid rgba(255,230,200,0.25)",
                    borderTopColor: "#ffe8cc",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin .7s linear infinite",
                  }}
                />
              ) : (
                "Send Link"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    username: "",
    type: "success",
  });

  const fireToast = (opts) => {
    setToast({ show: true, ...opts });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3800);
  };

  const validate = useCallback(() => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Enter a valid email address";
    if (!password.trim()) errs.password = "Password is required";
    return errs;
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      // 1. Sign in with Firebase Auth
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const uid = cred.user.uid;

      // 2. Fetch Firestore user doc to get display name + role
      const q = query(collection(fireDB, "users"), where("uid", "==", uid));
      const snap = await getDocs(q);

      let displayName = email.split("@")[0];
      let role = "user";

      if (!snap.empty) {
        const data = snap.docs[0].data();
        displayName = data.username || data.fullName || displayName;
        role = data.role || "user";
      }

      // 3. Persist session info for use across the app
      localStorage.setItem("userUID", uid);
      localStorage.setItem("userEmail", email.trim());
      localStorage.setItem("userName", displayName);
      localStorage.setItem("userRole", role);

      fireToast({ type: "success", username: displayName });
      setTimeout(() => router.push("/"), 1800);
    } catch (err) {
      const MAP = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Try again.",
        "auth/invalid-credential": "Invalid email or password.",
        "auth/too-many-requests": "Too many attempts. Please wait.",
        "auth/user-disabled": "This account has been disabled.",
      };
      fireToast({
        type: "error",
        message: MAP[err.code] || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-lg text-sm font-medium outline-none transition-all duration-200";
  const fieldCls = (key) =>
    `${inputBase} ${errors[key] ? "border-red-500/60 bg-red-500/5" : "border-blue-400/15 bg-white/[0.04] focus:border-blue-400/50 focus:bg-blue-500/[0.06]"}`;
  const fieldSt = (key) => ({
    border: "1px solid",
    color: "#d8e8ff",
    letterSpacing: "0.02em",
    boxShadow: errors[key] ? "0 0 0 3px rgba(255,80,80,0.08)" : undefined,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        @keyframes panelIn  { from{opacity:0;transform:translateY(22px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes shimmer  { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes pulseGlow{ 0%,100%{box-shadow:0 0 0 0 rgba(100,180,255,.22)} 50%{box-shadow:0 0 0 10px rgba(100,180,255,0)} }
        @keyframes popIn    { from{transform:scale(0)} to{transform:scale(1)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        input::placeholder  { color:rgba(120,150,190,0.45); font-weight:400 }
      `}</style>

      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#070b14", fontFamily: "'Rajdhani', sans-serif" }}
      >
        <ParticleCanvas />

        {/* Ambient blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(60,90,220,0.07),transparent 70%)",
            top: "10%",
            left: "20%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(120,60,220,0.06),transparent 70%)",
            bottom: "10%",
            right: "15%",
          }}
        />

        {/* Panel */}
        <div
          className="relative z-10 w-full max-w-md mx-4"
          style={{ animation: "panelIn .55s cubic-bezier(.2,.8,.2,1) both" }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg,rgba(13,20,38,0.97),rgba(8,14,28,0.99))",
              border: "1px solid rgba(120,180,255,0.16)",
              boxShadow:
                "0 0 0 1px rgba(80,140,255,0.07),0 12px 48px rgba(0,0,0,0.72),inset 0 1px 0 rgba(255,255,255,0.04)",
              padding: "2.25rem 2rem 2rem",
            }}
          >
            {/* Shimmer line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(100,180,255,0.55),rgba(180,130,255,0.55),transparent)",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%,rgba(80,140,255,0.04),transparent 65%)",
              }}
            />

            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 mx-auto mb-3 flex items-center justify-center text-2xl rounded-full"
                style={{
                  background:
                    "radial-gradient(circle,rgba(100,160,255,0.14),transparent 70%)",
                  border: "1px solid rgba(120,180,255,0.22)",
                  animation: "pulseGlow 2.5s ease-in-out infinite",
                }}
              >
                ⚔
              </div>
              <h1
                className="text-2xl font-black tracking-widest"
                style={{
                  fontFamily: "'Cinzel',serif",
                  color: "#e8f0ff",
                  textShadow: "0 0 22px rgba(100,160,255,0.4)",
                }}
              >
                ARISE FROM THE SHADOWS
              </h1>
              <p
                className="mt-1 text-xs tracking-[3px] uppercase"
                style={{ color: "rgba(160,180,210,0.6)" }}
              >
                Awaken Your True Power
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label
                  className="block mb-1.5 text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(140,170,210,0.7)" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((p) => ({ ...p, email: "" }));
                  }}
                  placeholder="hero@realm.com"
                  className={fieldCls("email")}
                  style={fieldSt("email")}
                />
                {errors.email && (
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "rgba(255,110,110,0.85)" }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  className="block mb-1.5 text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(140,170,210,0.7)" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    disabled={loading}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((p) => ({ ...p, password: "" }));
                    }}
                    placeholder="••••••••"
                    className={fieldCls("password")}
                    style={{ ...fieldSt("password"), paddingRight: "2.75rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(140,170,210,0.5)",
                      fontSize: 16,
                    }}
                  >
                    {showPw ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.password && (
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "rgba(255,110,110,0.85)" }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{
                    color: "rgba(160,120,255,0.7)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full mt-2 py-3 rounded-xl font-black tracking-widest uppercase overflow-hidden transition-all duration-200 flex items-center justify-center gap-2.5"
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 13,
                  background: loading
                    ? "rgba(40,60,120,0.55)"
                    : "linear-gradient(135deg,rgba(55,95,215,0.85),rgba(95,55,215,0.85))",
                  border: "1px solid rgba(100,160,255,0.28)",
                  color: "#c8dfff",
                  letterSpacing: "0.15em",
                  boxShadow: "0 4px 20px rgba(55,95,215,0.25)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 15,
                        height: 15,
                        border: "2px solid rgba(200,220,255,0.25)",
                        borderTopColor: "#c8dfff",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin .7s linear infinite",
                      }}
                    />
                    You Become A Player...
                  </>
                ) : (
                  "ARISE!!!"
                )}
              </button>
            </form>

            <p
              className="mt-5 text-center text-sm"
              style={{ color: "rgba(140,170,210,0.6)" }}
            >
              No Awaken?{" "}
              <a
                href="/Login/Signup"
                className="font-semibold"
                style={{ color: "#80bfff" }}
              >
                Become Player →
              </a>
            </p>
          </div>
        </div>

        <Toast {...toast} />
      </div>
      <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </>
  );
}
