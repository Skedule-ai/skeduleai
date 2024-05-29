import { type ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const containerVariants = tv({
    base: 'container',
    variants: {
        center: {
            true: 'mx-auto',
        },

        fullWidth: {
            true: 'w-full',
        },

        fullscreen: {
            true: 'h-screen min-w-full',
        },
    },
});

type ContainerProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof containerVariants> & {
        as?: ElementType;
    };

export { type ContainerProps, containerVariants };
