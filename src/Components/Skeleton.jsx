export default function Skeleton({ className }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-300/40 rounded ${className}`}
    >
      <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-600/30 to-transparent" />
    </div>
  );
}
