"use client";
export function AssemblyButton() {
  return (
    <div className="mt-4">
      <button
        className="px-4 py-2 text-white rounded text-xl"
        style={{
          backgroundColor: "var(--button-next)",
          color: "white",
          fontSize: "1.5rem",
        }}
        onClick={() => (window.location.href = "/assembly")}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "var(--button-next-hover)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "var(--button-next)";
        }}
      >
        Inicie sua Montagem
      </button>
    </div>
  );
}
