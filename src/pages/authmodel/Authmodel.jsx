// AuthModal.jsx
import { Login } from "../login/Login";
import { Signup } from "../signup/Signup";
import { useState } from "react";

export const AuthModal = ({ open, close, tab, setTab }) => {
  const [registerData, setRegisterData] = useState(null);

  if (!open) return null;

  return (
    <div
      onClick={close}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded shadow-lg"
      >
        {/* Tabs */}
        <div className="flex border-b text-sm font-medium">
          <button
            onClick={() => setTab("login")}
            className={`w-1/2 py-4 ${
              tab === "login"
                ? "bg-gray-100 text-gray-700"
                : "text-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setTab("signup")}
            className={`w-1/2 py-4 relative ${
              tab === "signup"
                ? "bg-white text-green-600"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            Signup
            {tab === "signup" && (
              <span className="absolute left-1/2 -bottom-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {tab === "login" ? (
         <Login
  onSuccess={close}
  defaultValues={registerData}
/>
          ) : (
            <Signup
  onSuccess={(data) => {
    setRegisterData(data);
    setTab("login");
  }}
/>
          )}
        </div>
      </div>
    </div>
  );
};
