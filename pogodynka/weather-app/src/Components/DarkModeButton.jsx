import { useState, useEffect } from "react";

export default function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="relative w-14 h-7 bg-white dark:bg-gray-600 rounded-full p-1 flex items-center transition-colors duration-300"
      >
        <div
          className={`w-5 h-5 bg-[rgba(255,145,76,0.9)] dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${
            darkMode ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
