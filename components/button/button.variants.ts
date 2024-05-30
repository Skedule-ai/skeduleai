import { type ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
    base: 'button gap-2 rounded font-bold',
    variants: {
        size: {
            sm: 'w-auto px-4 py-2 text-xs',
            md: 'w-auto px-4 py-3 text-sm',
            lg: 'w-auto px-5 py-4',
        },

        variant: {
            primary:
                'bg-primary-600 hover:bg-primary-500 active:bg-primary-700 focus:bg-primary-500 focus:ring-primary-700 focus:ring-1',
            secondary:
                'bg-secondary-100 text-primary-600 border-2 border-secondary-200 hover:bg-white active:bg-white active:border-primary-700 active:text-primary-700 focus:ring-1 focus:ring-primary-700',
            tertiary:
                'bg-white border-2 border-tertiary-200 text-tertiary-800 hover:bg-tertiary-100 active:bg-tertiary-150 focus:bg-white focus:ring-1 focus:ring-primary-700',
        },
    },
});

type ButtonProps = React.ComponentPropsWithRef<'button'> &
    VariantProps<typeof buttonVariants> & {
        as?: ElementType;
    };

export { type ButtonProps, buttonVariants };
