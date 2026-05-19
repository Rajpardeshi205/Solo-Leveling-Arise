"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@/Firebase/FireBaseconfig";

const voteCategories = ["Skip it", "Average", "Go for it", "Must Have"];

const voteColors = {
  "Skip it": "#ef4444",
  Average: "#eab308",
  "Go for it": "#10b981",
  "Must Have": "#8b5cf6",
};

const voteBgClasses = {
  "Skip it": "bg-red-500/15 text-red-400 ring-1 ring-red-500/30",
  Average: "bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/30",
  "Go for it": "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  "Must Have": "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30",
};

const voteActiveClasses = {
  "Skip it": "bg-red-600 text-white",
  Average: "bg-yellow-500 text-white",
  "Go for it": "bg-emerald-600 text-white",
  "Must Have": "bg-purple-600 text-white",
};

const slugify = (text) => {
  if (text === undefined || text === null) return "";

  return String(text).toLowerCase().replace(/\s+/g, "-");
};
const CommentsPage = ({ type, itemId, itemName }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [selectedVote, setSelectedVote] = useState("Go for it");
  const [editingId, setEditingId] = useState(null);
  const [hoveredArc, setHoveredArc] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  const [sortType, setSortType] = useState("recent");

  const [replyInputs, setReplyInputs] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);

  const [editingReplyText, setEditingReplyText] = useState("");

  const arcPathRefs = useRef({});

  const currentUser = auth.currentUser;

  const userReview = reviews.find(
    (review) => review.userId === currentUser?.uid,
  );

  const slug = useMemo(() => slugify(itemId || itemName), [itemId, itemName]);

  const reviewsRef = collection(db, `${type}Reviews`, slug, "reviews");

  // ─── FETCH USER ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUser.uid),
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        setCurrentUserData(snap.docs[0].data());
      }
    };

    fetchUser();
  }, [currentUser]);

  // ─── FETCH REVIEWS ────────────────────────────────────────────────────
  useEffect(() => {
    const q = query(reviewsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => {
        const review = d.data();

        return {
          id: d.id,
          ...review,

          likes: Array.isArray(review.likes) ? review.likes : [],

          dislikes: Array.isArray(review.dislikes) ? review.dislikes : [],

          replies: Array.isArray(review.replies)
            ? review.replies.map((reply) => ({
                ...reply,

                likes: Array.isArray(reply.likes) ? reply.likes : [],

                dislikes: Array.isArray(reply.dislikes) ? reply.dislikes : [],
              }))
            : [],
        };
      });

      setReviews(data);
    });

    return () => unsubscribe();
  }, []);

  // ─── POST REVIEW ──────────────────────────────────────────────────────
  const handlePostReview = async () => {
    if (!currentUser || !currentUserData || !reviewText.trim()) return;

    try {
      const existingQuery = query(
        reviewsRef,
        where("userId", "==", currentUser.uid),
      );

      const existingSnap = await getDocs(existingQuery);

      if (!existingSnap.empty) {
        await updateDoc(doc(reviewsRef, existingSnap.docs[0].id), {
          vote: selectedVote,
          review: reviewText,
          updatedAt: serverTimestamp(),
          edited: true,
        });

        setEditingId(null);
      } else {
        await addDoc(reviewsRef, {
          userId: currentUser.uid,
          username: currentUserData.username,
          fullName: currentUserData.fullName,
          role: currentUserData.role,
          photoURL: currentUserData.photoURL || "",
          vote: selectedVote,
          review: reviewText,
          likes: [],
          dislikes: [],
          replies: [],
          pinned: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          edited: false,
        });
      }

      setReviewText("");
      setSelectedVote("Go for it");
    } catch (error) {
      console.log(error);
    }
  };

  // ─── DELETE ───────────────────────────────────────────────────────────
  const handleDelete = async (reviewId) => {
    try {
      await deleteDoc(doc(reviewsRef, reviewId));
    } catch (error) {
      console.log(error);
    }
  };

  // ─── EDIT ─────────────────────────────────────────────────────────────
  const handleEdit = (review) => {
    setEditingId(review.id);
    setReviewText(review.review);
    setSelectedVote(review.vote);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ─── LIKE / DISLIKE ───────────────────────────────────────────────────
  const handleReaction = async (reviewId, type) => {
    if (!currentUser) return;

    try {
      const reviewRef = doc(reviewsRef, reviewId);

      const reviewData = reviews.find((r) => r.id === reviewId);

      if (!reviewData) return;

      let likes = reviewData.likes || [];

      let dislikes = reviewData.dislikes || [];

      const uid = currentUser.uid;

      if (type === "like") {
        dislikes = dislikes.filter((id) => id !== uid);

        if (likes.includes(uid)) {
          likes = likes.filter((id) => id !== uid);
        } else {
          likes.push(uid);
        }
      }

      if (type === "dislike") {
        likes = likes.filter((id) => id !== uid);

        if (dislikes.includes(uid)) {
          dislikes = dislikes.filter((id) => id !== uid);
        } else {
          dislikes.push(uid);
        }
      }

      await updateDoc(reviewRef, {
        likes,
        dislikes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ─── PIN REVIEW ───────────────────────────────────────────────────────
  const handlePinReview = async (reviewId) => {
    if (!currentUserData?.role?.includes("admin")) return;
    try {
      const reviewData = reviews.find((r) => r.id === reviewId);

      if (!reviewData) return;

      const pinnedReviews = reviews.filter((r) => r.pinned);

      if (!reviewData.pinned && pinnedReviews.length >= 3) {
        alert("Maximum 3 pinned reviews allowed.");
        return;
      }

      await updateDoc(doc(reviewsRef, reviewId), {
        pinned: !reviewData.pinned,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ─── REPLY ────────────────────────────────────────────────────────────
  const handleReply = async (reviewId) => {
    if (!currentUser || !currentUserData) return;

    const text = replyInputs[reviewId];

    if (!text?.trim()) return;

    try {
      const reviewData = reviews.find((r) => r.id === reviewId);

      if (!reviewData) return;

      const newReply = {
        id: Date.now(),
        userId: currentUser.uid,
        username: currentUserData.username,
        fullName: currentUserData.fullName,
        text,
        createdAt: new Date(),
      };

      await updateDoc(doc(reviewsRef, reviewId), {
        replies: [...(reviewData.replies || []), newReply],
      });

      setReplyInputs((prev) => ({
        ...prev,
        [reviewId]: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // ─── VOTE DATA ────────────────────────────────────────────────────────
  const voteData = {
    "Skip it": 0,
    Average: 0,
    "Go for it": 0,
    "Must Have": 0,
  };

  reviews.forEach((r) => {
    voteData[r.vote]++;
  });

  const totalVotes = reviews.length;

  const circumference = 377;

  let cumulativePercentage = 0;

  const arcs = voteCategories.map((key) => {
    const pct =
      totalVotes === 0 ? 0 : Math.round((voteData[key] / totalVotes) * 100);

    const strokeLength = (pct / 100) * circumference;

    const dashArray = `${strokeLength} ${circumference - strokeLength}`;

    const dashOffset =
      circumference - cumulativePercentage * (circumference / 100);

    cumulativePercentage += pct;

    return {
      key,
      pct,
      dashArray,
      dashOffset,
      color: voteColors[key],
    };
  });

  const highestVote = voteCategories.reduce((prev, cur) =>
    voteData[cur] > voteData[prev] ? cur : prev,
  );

  const activeVote = hoveredArc || highestVote;

  const activePercentage =
    totalVotes === 0
      ? 0
      : Math.round((voteData[activeVote] / totalVotes) * 100);

  const activeColor = voteColors[activeVote];

  // ─── ARC HOVER ────────────────────────────────────────────────────────
  const handleArcEnter = (key) => {
    setHoveredArc(key);

    const el = arcPathRefs.current[key];

    if (el) {
      el.style.transform = "scale(1.08)";

      el.style.filter = `drop-shadow(0 0 8px ${voteColors[key]})`;
    }
  };

  const handleArcLeave = (key) => {
    setHoveredArc(null);

    const el = arcPathRefs.current[key];

    if (el) {
      el.style.transform = "";
      el.style.filter = "";
    }
  };

  // ─── LIKE / DISLIKE REPLY ───────────────────────────────────────────────
  const handleReplyReaction = async (reviewId, replyId, type) => {
    if (!currentUser || !currentUserData) return;

    try {
      const reviewData = reviews.find((r) => r.id === reviewId);

      if (!reviewData) return;

      const updatedReplies = (reviewData.replies || []).map((reply) => {
        if (reply.id !== replyId) return reply;

        let likes = reply.likes || [];

        let dislikes = reply.dislikes || [];

        const uid = currentUser.uid;

        if (type === "like") {
          dislikes = dislikes.filter((id) => id !== uid);

          if (likes.includes(uid)) {
            likes = likes.filter((id) => id !== uid);
          } else {
            likes.push(uid);
          }
        }

        if (type === "dislike") {
          likes = likes.filter((id) => id !== uid);

          if (dislikes.includes(uid)) {
            dislikes = dislikes.filter((id) => id !== uid);
          } else {
            dislikes.push(uid);
          }
        }

        return {
          ...reply,
          likes,
          dislikes,
        };
      });

      await updateDoc(doc(reviewsRef, reviewId), {
        replies: updatedReplies,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ─── DELETE REPLY ───────────────────────────────────────────────────────
  const handleDeleteReply = async (reviewId, replyId) => {
    try {
      const reviewData = reviews.find((r) => r.id === reviewId);

      if (!reviewData) return;

      const replyData = reviewData.replies?.find((r) => r.id === replyId);

      if (!replyData) return;

      // only owner or admin
      const canDelete =
        currentUser?.uid === replyData.userId ||
        currentUserData?.role?.includes("admin");
      if (!canDelete) return;

      const updatedReplies = (reviewData.replies || []).filter(
        (reply) => reply.id !== replyId,
      );

      await updateDoc(doc(reviewsRef, reviewId), {
        replies: updatedReplies,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ─── EDIT REPLY ─────────────────────────────────────────────────────────
  const handleEditReply = (replyId, text) => {
    setEditingReplyId(replyId);
    setEditingReplyText(text);
  };

  // ─── UPDATE REPLY ───────────────────────────────────────────────────────
  const handleUpdateReply = async (reviewId, replyId) => {
    if (!editingReplyText.trim()) return;

    try {
      const reviewData = reviews.find((r) => r.id === reviewId);

      if (!reviewData) return;

      const updatedReplies = (reviewData.replies || []).map((reply) => {
        if (reply.id !== replyId) return reply;

        return {
          ...reply,
          text: editingReplyText,
          edited: true,
        };
      });

      await updateDoc(doc(reviewsRef, reviewId), {
        replies: updatedReplies,
      });

      setEditingReplyId(null);
      setEditingReplyText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white">
      {/* METER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-8">Meter</h1>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[320px] h-[160px] mb-6">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 320 160"
            >
              <path
                d="M 40 120 A 120 120 0 0 1 280 120"
                fill="none"
                stroke="#1f2937"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {arcs
                .filter((a) => a.pct > 0)
                .map(({ key, dashArray, dashOffset, color }) => (
                  <path
                    key={key}
                    ref={(el) => {
                      arcPathRefs.current[key] = el;
                    }}
                    d="M 40 120 A 120 120 0 0 1 280 120"
                    fill="none"
                    stroke={color}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    className="cursor-pointer"
                    style={{
                      transformOrigin: "160px 120px",
                      transition:
                        "transform 0.22s cubic-bezier(.34,1.56,.64,1), filter 0.18s ease",
                    }}
                    onMouseEnter={() => handleArcEnter(key)}
                    onMouseLeave={() => handleArcLeave(key)}
                  />
                ))}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center mt-8 pointer-events-none">
              <div
                className="text-5xl font-bold"
                style={{
                  color: activeColor,
                }}
              >
                {activePercentage}%
              </div>

              <div className="text-gray-400 text-center mt-1">
                <div className="text-sm">
                  {voteData[activeVote]} Vote
                  {voteData[activeVote] !== 1 ? "s" : ""}
                </div>

                <div
                  className="text-sm font-medium"
                  style={{
                    color: activeColor,
                  }}
                >
                  {activeVote}
                </div>
              </div>
            </div>
          </div>

          {/* LEGEND */}
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {arcs
              .filter((item) => item.pct > 0)
              .map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 cursor-pointer"
                  onMouseEnter={() => handleArcEnter(item.key)}
                  onMouseLeave={() => handleArcLeave(item.key)}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="text-sm text-gray-300">
                    {item.key}{" "}
                    <span className="text-gray-500">{item.pct}%</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg px-4 py-2 outline-none"
          >
            <option value="recent">Most Recent</option>

            <option value="oldest">Oldest</option>

            <option value="likes">Most Liked</option>

            <option value="comments">Most Commented</option>
          </select>
        </div>

        {/* WRITE REVIEW */}
        {currentUserData && (!userReview || editingId) && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {voteCategories.map((vote) => (
                <button
                  key={vote}
                  onClick={() => setSelectedVote(vote)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedVote === vote
                      ? voteActiveClasses[vote]
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {vote}
                </button>
              ))}
            </div>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={`Review ${itemName}...`}
              rows={5}
              maxLength={1000}
              className="w-full bg-gray-700 rounded-xl p-4 resize-none outline-none text-sm"
            />

            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500 text-xs">
                {reviewText.length} / 1000
              </span>

              <button
                onClick={handlePostReview}
                className="bg-white text-black px-6 py-2 rounded-xl text-sm font-bold"
              >
                {editingId ? "Update Review" : "Post Review"}
              </button>
            </div>
          </div>
        )}

        {/* REVIEW CARDS */}
        <div className="space-y-4">
          {[...reviews]
            .sort((a, b) => {
              if (a.pinned !== b.pinned) {
                return a.pinned ? -1 : 1;
              }

              if (sortType === "recent") {
                return (
                  (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
                );
              }

              if (sortType === "oldest") {
                return (
                  (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)
                );
              }

              if (sortType === "likes") {
                return (b.likes?.length || 0) - (a.likes?.length || 0);
              }

              if (sortType === "comments") {
                return (b.replies?.length || 0) - (a.replies?.length || 0);
              }

              return 0;
            })
            .map((review) => {
              const canDelete =
                currentUser?.uid === review.userId ||
                currentUserData?.role?.includes("admin");
              const canEdit = currentUser?.uid === review.userId;

              return (
                <div
                  key={review.id}
                  className={`rounded-2xl p-6 ${
                    review.pinned
                      ? "bg-yellow-500/10 border border-yellow-500/30"
                      : "bg-gray-800"
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold uppercase shrink-0 border border-violet-400/30">
                        {review.photoURL ? (
                          <img
                            src={review.photoURL}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{(review.username || "H")[0]}</span>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{review.fullName}</h3>

                          <span
                            className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                              voteBgClasses[review.vote]
                            }`}
                          >
                            {review.vote}
                          </span>

                          {review.pinned && (
                            <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full">
                              📌 Pinned
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500">
                          @{review.username}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {currentUserData?.role?.includes("admin") && (
                        <button onClick={() => handlePinReview(review.id)}>
                          📌
                        </button>
                      )}

                      {canEdit && (
                        <button
                          onClick={() => handleEdit(review)}
                          className="text-blue-400"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}

                      {canDelete && (
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-4">{review.review}</p>
                  {/* LIKE / DISLIKE */}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleReaction(review.id, "like")}
                      className={`flex items-center gap-1.5 text-sm ${
                        review.likes?.includes(currentUser?.uid)
                          ? "text-blue-400"
                          : "text-gray-500"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {review.likes?.length || 0}
                    </button>

                    <button
                      onClick={() => handleReaction(review.id, "dislike")}
                      className={`flex items-center gap-1.5 text-sm ${
                        review.dislikes?.includes(currentUser?.uid)
                          ? "text-red-400"
                          : "text-gray-500"
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      {review.dislikes?.length || 0}
                    </button>
                  </div>
                  <div className="mt-5 border-t border-gray-700 pt-4">
                    <div className="space-y-3 mb-4">
                      {(review.replies || []).map((reply) => (
                        <div
                          key={reply.id}
                          className="bg-gray-900 rounded-xl p-3"
                        >
                          {/* HEADER */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold">
                                {reply.fullName}
                              </span>

                              <span className="text-xs text-gray-500">
                                @{reply.username}
                              </span>

                              {reply.edited && (
                                <span className="text-[10px] text-cyan-400">
                                  Edited
                                </span>
                              )}
                            </div>

                            {/* ACTIONS */}
                            <div className="flex items-center gap-2">
                              {currentUser?.uid === reply.userId && (
                                <button
                                  onClick={() =>
                                    handleEditReply(reply.id, reply.text)
                                  }
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {(currentUser?.uid === reply.userId ||
                                currentUserData?.role?.includes("admin")) && (
                                <button
                                  onClick={() =>
                                    handleDeleteReply(review.id, reply.id)
                                  }
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* EDIT MODE */}
                          {editingReplyId === reply.id ? (
                            <div className="mb-3 flex gap-2">
                              <input
                                type="text"
                                value={editingReplyText}
                                onChange={(e) =>
                                  setEditingReplyText(e.target.value)
                                }
                                className="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm outline-none"
                              />

                              <button
                                onClick={() =>
                                  handleUpdateReply(review.id, reply.id)
                                }
                                className="bg-white text-black px-3 rounded-lg text-xs font-medium"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-300 mb-3">
                              {reply.text}
                            </p>
                          )}

                          {/* REPLY LIKE / DISLIKE */}
                          <div className="flex gap-4">
                            <button
                              onClick={() =>
                                handleReplyReaction(review.id, reply.id, "like")
                              }
                              className={`flex items-center gap-1 text-xs ${
                                reply.likes?.includes(currentUser?.uid)
                                  ? "text-blue-400"
                                  : "text-gray-500 hover:text-gray-300"
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              {reply.likes?.length || 0}
                            </button>

                            <button
                              onClick={() =>
                                handleReplyReaction(
                                  review.id,
                                  reply.id,
                                  "dislike",
                                )
                              }
                              className={`flex items-center gap-1 text-xs ${
                                reply.dislikes?.includes(currentUser?.uid)
                                  ? "text-red-400"
                                  : "text-gray-500 hover:text-gray-300"
                              }`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                              {reply.dislikes?.length || 0}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* REPLY INPUT */}
                    {currentUser && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={replyInputs[review.id] || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [review.id]: e.target.value,
                            }))
                          }
                          placeholder="Write a comment..."
                          className="flex-1 bg-gray-700 rounded-xl px-4 py-2 text-sm outline-none"
                        />

                        <button
                          onClick={() => handleReply(review.id)}
                          className="bg-white text-black px-4 rounded-xl text-sm font-medium"
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
