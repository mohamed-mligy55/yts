    export const BannerEmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-40 bg-gray-800 text-gray-400 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 opacity-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7h18M3 12h18M3 17h18"
        />
      </svg>
      <h2 className="text-2xl font-semibold mb-2">{message}</h2>
      <p className="text-sm opacity-70">Try searching another movie.</p>
    </div>
  );
};
