import { tv, type VariantProps } from 'tailwind-variants';

export const sidebarVariants = tv({
    base: 'tranform -sm:translate-x-full -md:translate-x-full h-screen border-2 border-neutral-150 bg-primary-100 transition-transform duration-300 ease-in-out sm:translate-x-0 md:translate-x-0',
    variants: {
        collapsible: {
            true: 'w-14',
            false: 'w-64',
        },

        hide: {
            true: 'hidden',
            false: 'md:block',
        },
    },

    defaultVariants: {
        collapsible: false,
        hide: false,
    },
});
