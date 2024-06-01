import React from "react";

export const btnSize = {
    "xs": "px-2 py-1 rounded text-xs",
    "sm": "px-2.5 py-1.5 rounded-md text-sm",
    "md": "px-3 py-2 rounded-md text-sm",
    "lg": "px-3.5 py-2.5 rounded-md text-sm",
}

export const btnVariant = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-400 active:bg-indigo-700 disabled:bg-neutral-100",

}

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    size?: keyof typeof btnSize;
    variant?: keyof typeof btnVariant;
};