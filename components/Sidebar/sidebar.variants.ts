import { tv, type VariantProps } from 'tailwind-variants';

export const sidebarVariants = tv({
    base: 'bg-primary-100 h-screen tranform transition-transform duration-300 ease-in-out border-2 border-neutral-150 sm:translate-x-0 md:translate-x-0 -sm:translate-x-full -md:translate-x-full',
    variants: {
        collapsible: {
            true: 'w-14',
            false: 'w-64',
        },

        hide:{
            true: 'hidden' ,
            false: 'md:block',
        }
    },

    defaultVariants: {
        collapsible: false,
        hide: false,
    },
});
