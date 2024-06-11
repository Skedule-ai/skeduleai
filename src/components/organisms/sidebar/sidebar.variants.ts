import { ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const sidebarVariants = tv({
    base: '-sm:translate-x-full -md:translate-x-full border-neutral-150 h-screen transform border-2 bg-blue-100 transition-transform duration-300 ease-in-out sm:translate-x-0 md:translate-x-0',
    variants: {
        collapse: {
            true: 'w-14',
            false: 'w-52',
        },

        hide: {
            true: 'hidden',
            false: 'block',
        },
    },

    defaultVariants: {
        collapse: false,
        hide: false,
    },
});

export type SidebarProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof sidebarVariants> & {
        as?: ElementType;
    };
