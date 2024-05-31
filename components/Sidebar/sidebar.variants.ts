import { tv, type VariantProps } from 'tailwind-variants';

export const sidebarVariants = tv({
    base: 'bg-primary-100 h-full tranform transition-transform duration-300 ease-in-out border-2 border-neutral-150',
    variants: {
        collapsible: {
            true: 'w-16',
            false: 'w-64',
        },

        responsive: {
            true: 'transalte-x-0 md:translate-x-0 -translate-x-full',
            false: 'transalte-x-0,',
        },
    },

    defaultVariants: {
        collapsible: 'false',
        responsive: 'false',
    },
});
