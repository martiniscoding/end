// BackButton.jsx
import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        group flex items-center gap-2 px-5 py-2.5
        bg-gradient-to-r from-amber-300 to-fuchsia-200
        rounded-full shadow-lg
        text-fuchsia-800 font-bold uppercase tracking-wide
        transition-all duration-200 ease-out
        outline-none border-2 border-amber-200
        hover:from-fuchsia-200 hover:to-amber-300
        hover:text-amber-700 hover:scale-105
        active:scale-95
      "
    >
      <svg
        className="w-5 h-5 mr-1 text-fuchsia-700 group-hover:text-amber-500 transition"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}
