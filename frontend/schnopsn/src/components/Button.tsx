import { ReactNode } from "react";

export interface ButtonProps {
    onClick: () => unknown;
    children: ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
    return (
        <button onClick={onClick} className="border-2 border-gray-600 px-2 py-1 hover:underline bg-gray-50 w-40 select-none">
            {children}
        </button>
    );
}
