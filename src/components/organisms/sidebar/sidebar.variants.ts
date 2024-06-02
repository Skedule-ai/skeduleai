import { ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const sidebarVariants = tv({
    base: 'tranform -sm:translate-x-full -md:translate-x-full border-neutral-150 bg-primary-100 h-screen border-2 transition-transform duration-300 ease-in-out sm:translate-x-0 md:translate-x-0',
    variants: {
        collapse: {
            true: 'w-14',
            false: 'w-64',
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
