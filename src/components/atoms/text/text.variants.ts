import { tv, type VariantProps } from 'tailwind-variants';
import { type ElementType } from 'react';

export const fontSize = {
    xxs: 'text-[10px]',
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '4xl': 'text-4xl',
};

export const fontWeight = {
    extraLight: 'font-extralight',
    light: 'font-light',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extraBold: 'font-extrabold',
};

export const fontColor = {
    primary: 'bg-blue-600',
    secondary: 'text-neutral-700',
    tertiary: 'text-neutral-400',
    error: 'text-red-500',
};

const textVariants = tv({
    base: 'text-base font-normal',
    variants: {
        size: fontSize,
        weight: fontWeight,
        color: fontColor,
    },
});

type TextProps = React.ComponentPropsWithRef<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> &
    VariantProps<typeof textVariants> & {
        as?: ElementType;
        htmlFor?: string;
    };

export { type TextProps, textVariants };
