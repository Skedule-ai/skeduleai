import { type ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
    base: 'card w-75 h-60 rounded border-2',
    variants: {
        size: {
            sm: 'h-32 w-44',
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
    };

export { type CardProps, cardVariants };
