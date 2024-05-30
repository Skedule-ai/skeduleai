import { tv, type VariantProps } from 'tailwind-variants';
import { type ElementType } from 'react';

const textVariants = tv({
    base: 'text-base font-normal',
    variants: {
        size: {
            xxs: 'text-xxs',
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '4xl': 'text-4xl',
        },

        weight: {
            extraLight: 'font-extralight',
            light: 'font-light',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
            extraBold: 'font-extrabold',
        },

        color: {
            neutral800: 'text-neutral-800',
            neutral400: 'text-neutral-400',
        },
    },
});

type TextProps = React.ComponentPropsWithRef<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> &
    VariantProps<typeof textVariants> & {
        as?: ElementType;
    };

export { type TextProps, textVariants };
