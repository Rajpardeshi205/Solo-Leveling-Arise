"use client";

import React, { useState, useEffect, useRef } from "react";
import Background from "@/Components/Background";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/Firebase/FireBaseconfig";
import { onAuthStateChanged } from "firebase/auth";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    gameUID: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    photoURL: "",
    role: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch user data from Firestore
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return;
      setUser(firebaseUser);
      const docRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          fullName: data.fullName || "",
          username: data.username || "",
          gameUID: data.gameUID || "",
          email: data.email || "",
          mobile: data.mobile || "",
          gender: data.gender || "",
          dob: data.dob || "",
          photoURL: data.photoURL || "",
          role: data.role || [],
        });
        setAvatarPreview(data.photoURL || null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX_SIZE = 250;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5);

        setAvatarPreview(compressedBase64);

        setForm((prev) => ({
          ...prev,
          photoURL: compressedBase64,
        }));
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    if (!user || saving) return;

    setSaving(true);

    try {
      const docRef = doc(db, "users", user.uid);

      await updateDoc(docRef, {
        fullName: form.fullName || "",
        username: form.username || "",
        gameUID: form.gameUID || "",
        email: form.email || "",
        mobile: form.mobile || "",
        gender: form.gender || "",
        dob: form.dob || "",
        photoURL: form.photoURL || "",
      });

      showToast("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to save profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const InfoCard = ({ label, children }) => (
    <div className="bg-gray-900/50 border border-purple-500/20 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
      {label && (
        <div className="text-purple-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-5 font-semibold">
          {label}
        </div>
      )}
      {children}
    </div>
  );

  const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-purple-400 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
        {label}
      </label>
      {children}
    </div>
  );

  const inputClass =
    "bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500/60 transition placeholder:text-slate-600 w-full";

  if (loading) {
    return (
      <Background>
        <div className="flex items-center  justify-center min-h-screen">
          <div className="text-purple-400 animate-pulse text-sm tracking-widest uppercase">
            Loading profile...
          </div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <div className="min-h-screen px-4 py-10 pt-25 max-w-2xl mx-auto flex flex-col gap-5">
        {/* Toast */}
        {toast && (
          <div
            className={`fixed top-32 right-5 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl border transition-all ${
              toast.type === "error"
                ? "bg-red-900/80 border-red-500/40 text-red-200"
                : "bg-green-900/80 border-green-500/40 text-green-200"
            }`}
          >
            {toast.msg}
          </div>
        )}

        {/* Avatar + Role */}
        <InfoCard>
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-purple-500/50 overflow-hidden bg-purple-900/40 flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">🎮</span>
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-xs tracking-wide">Change</span>
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-xs shadow-lg border border-purple-400/30">
                📷
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Name + Role */}
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight">
                {form.fullName || "Your Name"}
              </div>
              <div className="text-slate-500 text-sm mt-0.5">
                @{form.username || "username"}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.isArray(form.role) && form.role.length > 0 ? (
                  form.role.map((r, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-semibold"
                    >
                      ⚔️ {r}
                    </div>
                  ))
                ) : (
                  <div className="inline-flex items-center gap-1.5 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-semibold">
                    ⚔️ user
                  </div>
                )}
              </div>
            </div>
          </div>
        </InfoCard>

        {/* Profile Fields */}
        <InfoCard label="Profile Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <input
                className={inputClass}
                value={form.fullName}
                onChange={handleChange("fullName")}
                placeholder="Your full name"
              />
            </Field>
            <Field label="Username">
              <input
                className={inputClass}
                value={form.username}
                onChange={handleChange("username")}
                placeholder="@username"
              />
            </Field>
            <Field label="Game UID">
              <input
                className={inputClass}
                value={form.gameUID}
                onChange={handleChange("gameUID")}
                placeholder="Game UID"
              />
            </Field>
            <Field label="Gender (optional)">
              <select
                className={inputClass}
                value={form.gender}
                onChange={handleChange("gender")}
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="Date of Birth (optional)">
              <input
                type="date"
                className={inputClass}
                value={form.dob}
                onChange={handleChange("dob")}
              />
            </Field>
          </div>
        </InfoCard>

        {/* Contact Fields */}
        <InfoCard label="Contact">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label={
                <span>
                  Email{" "}
                  {form.email && (
                    <span className="text-green-400 text-[10px] ml-1">
                      ✓ Verified
                    </span>
                  )}
                </span>
              }
            >
              <input
                className={inputClass}
                value={form.email}
                onChange={handleChange("email")}
                placeholder="email@example.com"
                type="email"
              />
            </Field>
            <Field label="Mobile Number">
              <input
                className={inputClass}
                value={form.mobile}
                onChange={handleChange("mobile")}
                placeholder="10-digit number"
                type="tel"
              />
            </Field>
          </div>
        </InfoCard>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-50 shadow-lg shadow-purple-900/40"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Background>
  );
}
