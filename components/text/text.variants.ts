import { tv, type VariantProps } from 'tailwind-variants';
import { type ElementType } from 'react';

const textVariants = tv({
    base: 'text-base font-normal',
    variants: {
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-lg',
            xl: 'text-xl',
        },

        weight: {
            extraLight: 'font-extralight',
            light: 'font-light',
            semibold: 'font-bold',
            bold: 'font-bold',
            extraBold: 'font-bold',
        },
    },
});

type TextProps = React.ComponentPropsWithRef<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> &
    VariantProps<typeof textVariants> & {
        as?: ElementType;
    };

export { type TextProps, textVariants };
