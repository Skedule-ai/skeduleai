import { type ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
    base: 'card w-75 h-auto rounded border-2',
    variants: {
        size: {
            sm: 'w-full sm:w-52',
            md: 'w-full md:w-64',
            lg: 'w-full md:w-80 lg:w-100',
        },
        variant: {
            default: 'border-tertiary-150 bg-white shadow-md hover:cursor-pointer',
            error: 'ring- border-tertiary-150 ring-danger-600 bg-white shadow-md ring-2 hover:cursor-pointer',
        },
    },
});

type CardProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof cardVariants> & {
        as?: ElementType;
        children: React.ReactNode;
        // image?: string;
    };

export { type CardProps, cardVariants };
