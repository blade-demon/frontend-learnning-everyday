import { useState } from "react";

type Theme = "light" | "dark" | "system";

export default function Themes() {
  const themeOptions: Theme[] = ["light", "dark", "system"];

  const [selectedTheme, setSelectedTheme] = useState<Theme>("light");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-5 font-semibold">Themes</h1>

      <ThemeOptions
        themeOptions={themeOptions}
        selectedTheme={selectedTheme}
        onThemeClick={(theme: Theme) => setSelectedTheme(theme)}
      />

      <p className="mt-10">
        Selected theme: <strong>{selectedTheme}</strong>
      </p>
    </section>
  );
}

type ThemeOptionsProps<T> = {
  selectedTheme: T;
  themeOptions: T[];
  onThemeClick: (theme: T) => void;
};

function ThemeOptions<T extends React.ReactNode>({ themeOptions, selectedTheme, onThemeClick }: ThemeOptionsProps<T>) {
  return (
    <ul className="list-disc">
      {themeOptions.map((theme, index) => (
        <li key={index}>
          <button
            type="button"
            className={`w-10 h-10 rounded-full border-2 border-gray-800 ${
              theme === selectedTheme ? "bg-gray-800" : ""
            }`}
            onClick={() => onThemeClick(theme)}
          >
            {theme}
          </button>
        </li>
      ))}
    </ul>
  );
}
