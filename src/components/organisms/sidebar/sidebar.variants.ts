import { tv, type VariantProps } from 'tailwind-variants';

export const sidebarVariants = tv({
    base: 'transform transition-transform duration-300 ease-in-out',
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

export type SidebarVariants = VariantProps<typeof sidebarVariants>;
