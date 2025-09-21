import { Icons } from "./Constans";

export const Components = {
    Button: ({ children, onClick, className = "" }) => (
        <button className={`px-4 py-2 rounded ${className}`} onClick={onClick}>
            {children}
        </button>
    ),
    Card: ({ children, color }) => (
        <div className={`flex items-center justify-center `}>
            <div className={`rounded-lg shadow-lg p-10  ${color.box} ${color.text} max-w-sm w-full`}>
                {children}
            </div>
        </div>
    ),
    H2: ({ children }) => (
        <h2 className="text-xl font-semibold mb-2">{children}</h2>
    ),
    Icons: ({url, className = "", imageClassName = "w-8 h-8"}) => (
        <div className={`flex space-x-4 ${className}`}>
            <img src={url} alt="Icon" className={imageClassName} />
        </div>
    ),
    Loader: () => (
        <div className="flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
        </div>
    ),
};