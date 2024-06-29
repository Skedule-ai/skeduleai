import { type ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
    base: 'card h-auto w-72 rounded border-2',
    variants: {
        size: {
            sm: 'w-full sm:w-52',
            md: 'w-full md:w-64',
            lg: 'w-full md:w-80',
            xl: ' h-auto  w-100 rounded-2xl',
        },
        variant: {
            default: 'border-tertiary-150 bg-white hover:cursor-pointer',
            error: 'border-tertiary-150 ring-danger-600 bg-white shadow-md  ring-2 hover:cursor-pointer',
        },
    },
});

type CardProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof cardVariants> & {
        as?: ElementType;
        children: React.ReactNode;
    };

export { type CardProps, cardVariants };
