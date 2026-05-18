"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  setDoc,
} from "firebase/firestore";
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
  const isInfo = type === "info";
  const color = isErr
    ? "rgba(255,80,80,0.45)"
    : isInfo
      ? "rgba(80,160,255,0.4)"
      : "rgba(80,200,130,0.4)";
  const icon = isErr ? "✕" : isInfo ? "ℹ" : "✦";
  const bg = isErr
    ? "rgba(255,80,80,0.12)"
    : isInfo
      ? "rgba(80,160,255,0.12)"
      : "rgba(80,200,130,0.12)";
  const textColor = isErr ? "#ffd8d8" : isInfo ? "#d8e8ff" : "#d8f0e8";

  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background:
          "linear-gradient(135deg,rgba(10,22,48,0.98),rgba(6,14,32,0.99))",
        border: `1px solid ${color}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        transform: show ? "translateX(0)" : "translateX(130%)",
        opacity: show ? 1 : 0,
        transition: "transform .45s cubic-bezier(.2,.8,.2,1), opacity .45s",
        minWidth: 230,
        maxWidth: 310,
        fontFamily: "'Rajdhani', sans-serif",
        pointerEvents: "none",
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: bg, border: `1px solid ${color}`, fontSize: 15 }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-0.5"
          style={{
            color: isErr
              ? "rgba(255,110,110,0.85)"
              : isInfo
                ? "rgba(100,180,255,0.85)"
                : "rgba(80,200,130,0.85)",
          }}
        >
          {isErr ? "Error" : isInfo ? "Notice" : "Welcome, Hunter"}
        </div>
        <div
          className="text-sm font-bold leading-snug"
          style={{
            fontFamily: "'Cinzel', serif",
            color: textColor,
            wordBreak: "break-word",
          }}
        >
          {isErr ? message : isInfo ? message : `${username}!`}
        </div>
      </div>
    </div>
  );
}

// ─── Password Strength Bar ────────────────────────────────────────────────────
function StrengthBar({ password }) {
  const checks = [
    password.length >= 7,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = ["#ff4444", "#ff8844", "#ffcc44", "#44cc88"];
  const labels = ["Very weak", "Weak", "Moderate", "Strong", "Very strong ✓"];
  const color = score > 0 ? colors[score - 1] : "transparent";

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 h-0.5 rounded-full transition-all duration-300"
            style={{ background: i < score ? color : "rgba(255,255,255,0.08)" }}
          />
        ))}
      </div>
      {password.length > 0 && (
        <p
          className="mt-1 text-xs"
          style={{ color: score === 4 ? "#44cc88" : "rgba(160,180,210,0.6)" }}
        >
          {labels[score]}
        </p>
      )}
    </div>
  );
}

// ─── Field Wrapper ────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div>
      <label
        className="block mb-1.5 text-xs font-semibold tracking-widest uppercase"
        style={{ color: "rgba(140,170,210,0.7)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs" style={{ color: "rgba(255,110,110,0.85)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
function Divider({ text }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div
        className="flex-1 h-px"
        style={{ background: "rgba(120,180,255,0.1)" }}
      />
      <span
        className="text-xs tracking-widest uppercase"
        style={{ color: "rgba(140,170,210,0.4)" }}
      >
        {text}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: "rgba(120,180,255,0.1)" }}
      />
    </div>
  );
}

// ─── Email Verification Banner ────────────────────────────────────────────────
function VerificationBanner({ email, onResend, loading }) {
  return (
    <div
      className="rounded-xl p-4 mb-4"
      style={{
        background: "rgba(80,160,255,0.06)",
        border: "1px solid rgba(80,160,255,0.18)",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-lg mt-0.5">📧</div>
        <div className="flex-1">
          <p
            className="text-sm font-bold"
            style={{ fontFamily: "'Cinzel',serif", color: "#d8e8ff" }}
          >
            Verify Your Email
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(160,180,210,0.7)" }}
          >
            A verification link has been sent to{" "}
            <span style={{ color: "#80bfff" }}>{email}</span>. Check your inbox.
          </p>
          <button
            onClick={onResend}
            disabled={loading}
            className="mt-2 text-xs font-semibold tracking-widest uppercase"
            style={{
              color: loading ? "rgba(140,170,210,0.4)" : "#a080ff",
              background: "none",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              padding: 0,
            }}
          >
            {loading ? "Sending..." : "Resend Email →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Forgot Password Modal ────────────────────────────────────────────────────

// ─── Signup Page ──────────────────────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    uid: "",
    fullName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    username: "",
    type: "success",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [createdUserRef, setCreatedUserRef] = useState(null);

  const fireToast = (opts) => {
    setToast({ show: true, ...opts });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 4200);
  };

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const normalize = (mobile) => {
    const digits = mobile.replace(/\D/g, "");
    return digits.startsWith("91") && digits.length === 12
      ? digits.slice(2)
      : digits.startsWith("0") && digits.length === 11
        ? digits.slice(1)
        : digits;
  };

  const validate = useCallback(() => {
    const errs = {};
    const { username, uid, fullName, mobile, email, password } = form;

    if (
      username.trim() &&
      (username.trim().length < 3 || /\s/.test(username))
    ) {
      errs.username = "Min 3 chars, no spaces";
    }
    if (uid.trim() && uid.trim().length < 4)
      errs.uid = "UID must be 32 characters";
    if (!fullName.trim() || fullName.trim().split(/\s+/).length < 2)
      errs.fullName = "Enter your first and last name";

    const normalized = normalize(mobile);
    if (normalized.length !== 10 || !/^[6-9]/.test(normalized))
      errs.mobile = "Enter a valid 10-digit Indian mobile number";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Enter a valid email address";
    if (
      password.length < 7 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    )
      errs.password = "Min 7 chars · 1 uppercase · 1 number · 1 symbol";

    return errs;
  }, [form]);

  // Google Sign In
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user doc already exists
      const q = query(
        collection(fireDB, "users"),
        where("uid", "==", user.uid),
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        const userDoc = {
          uid: user.uid,
          username:
            user.displayName?.replace(/\s+/g, "").toLowerCase() ||
            `user_${Date.now()}`,
          gameUID: "",
          fullName: user.displayName || "",
          mobile: "",
          email: user.email?.toLowerCase() || "",
          role: "user",
          provider: "google",
          createdAt: Timestamp.now(),
        };
        await setDoc(doc(fireDB, "users", uid), userDoc);
      }

      localStorage.setItem("userUID", user.uid);
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("userName", user.displayName || "Hunter");
      localStorage.setItem("userRole", "user");

      fireToast({ type: "success", username: user.displayName || "Hunter" });
      setTimeout(() => router.push("/"), 1800);
    } catch (err) {
      const MAP = {
        "auth/popup-closed-by-user": "Google sign-in was cancelled.",
        "auth/account-exists-with-different-credential":
          "An account with this email already exists.",
      };
      fireToast({
        type: "error",
        message: MAP[err.code] || "Google sign-in failed. Try again.",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const submitForm = async () => {
    setLoading(true);

    try {
      // Check username uniqueness
      if (form.username.trim()) {
        const usnameQ = query(
          collection(fireDB, "users"),
          where("username", "==", form.username.trim()),
        );

        const usnameSnap = await getDocs(usnameQ);

        if (!usnameSnap.empty) {
          setErrors((p) => ({
            ...p,
            username: "Username already taken. Choose another.",
          }));

          setLoading(false);
          return;
        }
      }

      // Create Firebase Auth account
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password,
      );

      const uid = cred.user.uid;

      // Send verification email
      await sendEmailVerification(cred.user);

      setVerificationSent(true);
      setCreatedUserRef(cred.user);

      // Save user document
      const normalized = normalize(form.mobile);

      const userDoc = {
        uid,
        username: form.username.trim() || "",
        gameUID: form.uid.trim() || "",
        fullName: form.fullName.trim(),
        mobile: normalized,
        email: form.email.trim().toLowerCase(),
        role: "user",
        mobileVerified: false,
        emailVerified: false,
        provider: "email",
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(fireDB, "users", uid), userDoc);
      fireToast({
        type: "info",
        message: "Verification email sent. Please verify before logging in.",
      });

      // Clear form
      setForm({
        username: "",
        uid: "",
        fullName: "",
        mobile: "",
        email: "",
        password: "",
      });
    } catch (err) {
      const MAP = {
        "auth/email-already-in-use":
          "An account with this email already exists.",

        "auth/invalid-email": "Invalid email address.",

        "auth/weak-password": "Password is too weak.",

        "auth/too-many-requests": "Too many attempts. Please wait.",
      };

      fireToast({
        type: "error",
        message: MAP[err.code] || "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    await submitForm();
  };

  const resendVerification = async () => {
    if (!createdUserRef) return;
    setResendLoading(true);
    try {
      await sendEmailVerification(createdUserRef);
      fireToast({ type: "info", message: "Verification email resent!" });
    } catch {
      fireToast({
        type: "error",
        message: "Failed to resend. Try again shortly.",
      });
    } finally {
      setResendLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-lg text-sm font-medium outline-none transition-all duration-200";
  const inputCls = (key) =>
    `${inputBase} ${errors[key] ? "border-red-500/60 bg-red-500/5" : "border-blue-400/15 bg-white/[0.04] focus:border-blue-400/50 focus:bg-blue-500/[0.06]"}`;
  const inputSt = (key) => ({
    border: "1px solid",
    color: "#d8e8ff",
    letterSpacing: "0.02em",
    boxShadow: errors[key] ? "0 0 0 3px rgba(255,80,80,0.08)" : undefined,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      await user.reload();

      if (user.emailVerified) {
        await setDoc(
          doc(fireDB, "users", user.uid),
          {
            emailVerified: true,
          },
          { merge: true },
        );

        localStorage.setItem("userUID", user.uid);
        localStorage.setItem("userEmail", user.email || "");
        localStorage.setItem("userName", user.displayName || form.username);
        localStorage.setItem("userRole", "user");

        fireToast({
          type: "success",
          username: "Email Verified",
        });

        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    });

    return () => unsubscribe();
  }, [router, form.username]);

  useEffect(() => {
    let interval;

    const checkVerification = async () => {
      const user = auth.currentUser;

      if (!user) return;

      await user.reload();

      if (user.emailVerified) {
        clearInterval(interval);

        await setDoc(
          doc(fireDB, "users", user.uid),
          {
            emailVerified: true,
          },
          { merge: true },
        );

        localStorage.setItem("userUID", user.uid);
        localStorage.setItem("userEmail", user.email || "");
        localStorage.setItem("userName", form.username);
        localStorage.setItem("userRole", "user");

        fireToast({
          type: "success",
          username: "Email Verified",
        });

        setTimeout(() => {
          router.push("/");
        }, 1200);
      }
    };

    interval = setInterval(checkVerification, 3000);

    return () => clearInterval(interval);
  }, [router, form.username]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        @keyframes panelIn  { from{opacity:0;transform:translateY(22px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes shimmer  { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes pulseGlow{ 0%,100%{box-shadow:0 0 0 0 rgba(130,100,255,.22)} 50%{box-shadow:0 0 0 10px rgba(130,100,255,0)} }
        @keyframes popIn    { from{transform:scale(0)} to{transform:scale(1)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        input::placeholder  { color:rgba(120,150,190,0.45); font-weight:400 }
        .google-btn:hover   { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.22) !important; }
        .verify-btn:hover   { opacity: 0.85; }
      `}</style>

      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-10"
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
            top: "5%",
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
            bottom: "5%",
            right: "10%",
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
                  "linear-gradient(90deg,transparent,rgba(180,130,255,0.55),rgba(100,180,255,0.55),transparent)",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%,rgba(120,80,255,0.04),transparent 65%)",
              }}
            />

            {/* Header */}
            <div className="text-center mb-6">
              <div
                className="w-14 h-14 mx-auto mb-3 flex items-center justify-center text-2xl rounded-full"
                style={{
                  background:
                    "radial-gradient(circle,rgba(130,100,255,0.14),transparent 70%)",
                  border: "1px solid rgba(160,120,255,0.22)",
                  animation: "pulseGlow 2.5s ease-in-out infinite",
                }}
              >
                ✦
              </div>
              <h1
                className="text-2xl font-black tracking-widest"
                style={{
                  fontFamily: "'Cinzel',serif",
                  color: "#e8f0ff",
                  textShadow: "0 0 22px rgba(140,100,255,0.4)",
                }}
              >
                THE SYSTEM HAS CHOSEN YOU
              </h1>
              <p
                className="mt-1 text-xs tracking-[3px] uppercase"
                style={{ color: "rgba(160,180,210,0.6)" }}
              >
                Level Up Fast
              </p>
            </div>

            {/* Email verification banner */}
            {verificationSent && (
              <VerificationBanner
                email={form.email}
                onResend={resendVerification}
                loading={resendLoading}
              />
            )}

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="google-btn relative w-full py-2.5 rounded-xl font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-200 mb-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#e8f0ff",
                fontSize: 13,
                letterSpacing: "0.1em",
                cursor: googleLoading ? "not-allowed" : "pointer",
                fontFamily: "'Rajdhani',sans-serif",
              }}
            >
              {googleLoading ? (
                <span
                  style={{
                    width: 15,
                    height: 15,
                    border: "2px solid rgba(220,200,255,0.25)",
                    borderTopColor: "#ddd0ff",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin .7s linear infinite",
                  }}
                />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </button>

            <Divider text="or create account" />

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-3.5 mt-4"
              noValidate
            >
              {/* Username + UID */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Username (Optional)" error={errors.username}>
                  <input
                    type="text"
                    value={form.username}
                    onChange={update("username")}
                    disabled={loading}
                    placeholder="PlayerX"
                    className={inputCls("username")}
                    style={inputSt("username")}
                    autoComplete="off"
                  />
                </Field>
                <Field label="Player UID (Optional)" error={errors.uid}>
                  <input
                    type="text"
                    value={form.uid}
                    onChange={update("uid")}
                    disabled={loading}
                    placeholder="932F1D6212D9477694FA50B6FA445C0D"
                    className={inputCls("uid")}
                    style={inputSt("uid")}
                    autoComplete="off"
                  />
                </Field>
              </div>

              {/* Full Name */}
              <Field label="Full Name" error={errors.fullName}>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={update("fullName")}
                  disabled={loading}
                  placeholder="Raj Pardeshi"
                  className={inputCls("fullName")}
                  style={inputSt("fullName")}
                />
              </Field>

              {/* Mobile */}
              <Field label="Mobile Number" error={errors.mobile}>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={update("mobile")}
                  disabled={loading}
                  placeholder="98344838**"
                  className={inputCls("mobile")}
                  style={inputSt("mobile")}
                  maxLength={14}
                />
              </Field>

              {/* Email */}
              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  disabled={loading}
                  placeholder="rajpardeshi205@email.com"
                  className={inputCls("email")}
                  style={inputSt("email")}
                />
              </Field>

              {/* Password */}
              <Field label="Password" error={errors.password}>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={form.password}
                    onChange={update("password")}
                    disabled={loading}
                    placeholder="Min 7 chars, 1 upper, 1 number, 1 symbol"
                    className={inputCls("password")}
                    style={{ ...inputSt("password"), paddingRight: "2.75rem" }}
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
                      fontSize: 15,
                    }}
                  >
                    {showPw ? "🙈" : "👁"}
                  </button>
                </div>
                <StrengthBar password={form.password} />
              </Field>

              {/* Role badge */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(80,140,255,0.06)",
                  border: "1px solid rgba(80,140,255,0.12)",
                }}
              >
                <span style={{ fontSize: 13 }}>🛡</span>
                <span
                  className="text-xs tracking-widest uppercase font-semibold"
                  style={{ color: "rgba(140,180,255,0.7)" }}
                >
                  Default Role:
                </span>
                <span
                  className="text-xs tracking-widest uppercase font-bold"
                  style={{ color: "#80bfff" }}
                >
                  User
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full mt-1 py-3 rounded-xl font-black tracking-widest uppercase overflow-hidden transition-all duration-200 flex items-center justify-center gap-2.5"
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: 13,
                  background: loading
                    ? "rgba(60,40,120,0.55)"
                    : "linear-gradient(135deg,rgba(95,55,215,0.85),rgba(55,95,215,0.85))",
                  border: "1px solid rgba(160,120,255,0.28)",
                  color: "#ddd0ff",
                  letterSpacing: "0.15em",
                  boxShadow: "0 4px 20px rgba(95,55,215,0.25)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 15,
                        height: 15,
                        border: "2px solid rgba(220,200,255,0.25)",
                        borderTopColor: "#ddd0ff",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin .7s linear infinite",
                      }}
                    />
                    2 Seconds...
                  </>
                ) : (
                  "✦ Do You Dare To Become A Player ? ✦"
                )}
              </button>
            </form>

            <p
              className="mt-5 text-center text-sm"
              style={{ color: "rgba(140,170,210,0.6)" }}
            >
              Already a Awaken?{" "}
              <a
                href="/Login"
                className="font-semibold"
                style={{ color: "#a080ff" }}
              >
                Log in →
              </a>
            </p>
          </div>
        </div>

        <Toast {...toast} />
      </div>
    </>
  );
}
