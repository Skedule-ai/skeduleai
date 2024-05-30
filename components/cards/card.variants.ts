import { type ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
    base: 'card h-60 w-75 rounded border-2',
    variants: {
        size: {
            sm: 'w-44 h-32',
        },
        variant: {
            default: 'border-tertiary-150 bg-white shadow-md hover:cursor-pointer',
            error: 'ring- border-tertiary-150 bg-white shadow-md ring-2 ring-danger-600 hover:cursor-pointer',
        },
    },
});

type CardProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof cardVariants> & {
        as?: ElementType;
    };

export { type CardProps, cardVariants };
