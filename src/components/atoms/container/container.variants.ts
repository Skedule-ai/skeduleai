import { type ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const containerBase = 'container';
export const containerLayout = {
    center: {
        true: 'mx-auto',
    },

    fullWidth: {
        true: 'w-full',
    },

    fullscreen: {
        true: 'h-screen min-w-full',
    },
};

export const containerVariants = tv({
    base: containerBase,
    variants: containerLayout,
});

export type ContainerProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof containerVariants> & {
        as?: ElementType;
    };
