export const Components = {
    Button: ({ children, onClick, className = "" }) => (
        <button className={`px-4 py-2 rounded ${className}`} onClick={onClick}>
            {children}
        </button>
    ),
    Card: ({ children, color }) => (
        <div className={`flex items-center justify-center`}>
            <div className={`rounded-lg shadow-lg p-8 ${color.box} ${color.text} max-w-sm w-full`}>
                {children}
            </div>
        </div>
    ),
    H2: ({ children }) => (
        <h2 className="text-xl font-semibold mb-2">{children}</h2>
    ),
};