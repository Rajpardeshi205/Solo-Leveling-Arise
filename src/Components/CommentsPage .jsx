import React, { useState } from "react";
import {
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
} from "lucide-react";

const CommentsPage = () => {
  const [selectedVote, setSelectedVote] = useState("Go for it");
  const [reviewText, setReviewText] = useState("");
  const [sortBy, setSortBy] = useState("Most Liked");

  // Vote data derived from actual reviews counts
  // Only these categories present in reviews: Average, Go for it, Must Have, Skip it = 0
  const voteData = {
    "Skip it": { count: 0, color: "bg-red-500", hex: "#ef4444" },
    Average: { count: 1, color: "bg-yellow-500", hex: "#eab308" },
    "Go for it": { count: 1, color: "bg-green-500", hex: "#10b981" },
    "Must Have": { count: 1, color: "bg-purple-500", hex: "#8b5cf6" },
  };

  // Calculate total votes from voteData counts
  const totalVotes = Object.values(voteData).reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  // Calculate percentage for each category dynamically
  Object.entries(voteData).forEach(([key, value]) => {
    voteData[key].percentage =
      totalVotes === 0 ? 0 : Math.round((value.count / totalVotes) * 100);
  });

  const reviews = [
    {
      id: 1,
      user: "Raj Pardeshi",
      username: "@Rajpardeshi",
      avatar: "https://i.pravatar.cc/40?img=1",
      review:
        "Amazing storyline and great character development. The pacing was perfect and kept me engaged throughout.",
      likes: 45,
      dislikes: 2,
      replies: 12,
      timeAgo: "2 hours ago",
      vote: "Go for it",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      username: "@sarahj",
      avatar: "	https://i.pravatar.cc/40?img=27",
      review:
        "Decent watch but felt like it could have been shorter. Some parts dragged on unnecessarily.",
      likes: 23,
      dislikes: 5,
      replies: 8,
      timeAgo: "5 hours ago",
      vote: "Average",
    },
    {
      id: 3,
      user: "Mike Chen",
      username: "@mikechen",
      avatar: "	https://i.pravatar.cc/40?img=43",
      review:
        "Absolutely blown away! This is cinema at its finest. Every frame is a masterpiece.",
      likes: 78,
      dislikes: 1,
      replies: 24,
      timeAgo: "1 day ago",
      vote: "Must Have",
    },
  ];

  // Colors map for meter arcs and dots
  const voteColors = {
    "Skip it": "#ef4444",
    Average: "#eab308",
    "Go for it": "#10b981",
    "Must Have": "#8b5cf6",
  };

  // Semicircle circumference (approx)
  const circumference = 377;

  // Calculate arcs for each vote category for SVG strokeDasharray and strokeDashoffset
  let cumulativePercentage = 0;
  const voteCategories = ["Skip it", "Average", "Go for it", "Must Have"];
  const arcs = voteCategories.map((key) => {
    const pct = voteData[key]?.percentage || 0;
    const strokeLength = (pct / 100) * circumference;
    const dashArray = `${strokeLength} ${circumference - strokeLength}`;
    // The offset starts from total circumference and subtracts cumulative length
    const dashOffset =
      circumference - cumulativePercentage * (circumference / 100);
    cumulativePercentage += pct;
    return {
      key,
      dashArray,
      dashOffset,
      color: voteColors[key],
    };
  });

  const getVoteColor = (vote) => {
    const colors = {
      "Skip it": "bg-red-500",
      Average: "bg-yellow-500",
      "Go for it": "bg-green-500",
      "Must Have": "bg-purple-500",
    };
    return colors[vote] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Meter Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
            Meter
          </h1>

          {/* Circular Progress */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-[320px] h-[160px] mb-6">
              <svg
                className="w-full h-full"
                viewBox="0 0 320 160"
                role="img"
                aria-label="Vote meter"
              >
                {/* Background arc */}
                <path
                  d="M 40 120 A 120 120 0 0 1 280 120"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="20"
                  strokeLinecap="round"
                />

                {/* Colored arcs */}
                {arcs.map(({ key, dashArray, dashOffset, color }) => (
                  <path
                    key={key}
                    d="M 40 120 A 120 120 0 0 1 280 120"
                    fill="none"
                    stroke={color}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    style={{
                      transition:
                        "stroke-dashoffset 1s ease, stroke-dasharray 1s ease",
                    }}
                  />
                ))}
              </svg>

              {/* Percentage Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-8 pointer-events-none">
                <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-1 sm:mb-2 select-none">
                  {voteData["Go for it"].percentage}%
                </div>
                <div className="text-gray-400 text-sm sm:text-lg select-none">
                  {totalVotes} Vote{totalVotes !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* Vote Categories Legend */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs sm:text-sm select-none">
              {voteCategories.map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: voteColors[key] }}
                  ></div>
                  <span>
                    {key} {voteData[key].percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold">
              Reviews ({reviews.length})
            </h2>
            <div className="relative w-full sm:w-auto">
              <button className="flex items-center justify-between gap-2 bg-gray-800 px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-gray-700 transition-colors">
                <span>↕</span>
                <span>{sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Write Review Section */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="User avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div>
                <div className="font-semibold text-sm sm:text-base">
                  Raj Pardeshi
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  @Rajpardeshi
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="flex flex-wrap gap-2 sm:gap-0 sm:flex-nowrap bg-gray-700 rounded-lg p-1 justify-center sm:justify-start w-full sm:w-auto">
                {voteCategories.map((vote) => (
                  <button
                    key={vote}
                    onClick={() => setSelectedVote(vote)}
                    className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${
                      selectedVote === vote
                        ? vote === "Skip it"
                          ? "bg-red-600"
                          : vote === "Average"
                          ? "bg-yellow-600"
                          : vote === "Go for it"
                          ? "bg-green-600"
                          : "bg-purple-600"
                        : "hover:bg-gray-600"
                    }`}
                  >
                    {vote}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full bg-gray-700 rounded-lg p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              rows={4}
              maxLength={1000}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-gray-400 text-xs sm:text-sm select-none">
                {reviewText.length}/1000
              </div>
              <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap w-full sm:w-auto">
                Post
              </button>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-800 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold">{review.user}</span>
                    <span className="text-gray-400 text-xs">
                      {review.username}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 text-xs">
                      {review.timeAgo}
                    </span>
                    <div
                      className={`ml-2 px-2 py-1 rounded text-xs ${getVoteColor(
                        review.vote
                      )} text-white whitespace-nowrap`}
                    >
                      {review.vote}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">
                    {review.review}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      <span>{review.dislikes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{review.replies}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors whitespace-nowrap">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
