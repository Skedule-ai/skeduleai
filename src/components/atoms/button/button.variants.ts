import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
    base: 'button flex flex-row items-center gap-2 rounded px-4 py-2 font-bold',
    variants: {
        size: {
            xs: 'rounded px-2 py-1 text-xs',
            sm: 'rounded-md px-2.5 py-1.5 text-sm',
            md: 'rounded-md px-3 py-2 text-sm',
            lg: 'rounded-md px-3.5 py-2.5 text-sm ',
            xl: 'rounded-md px-4 py-3 text-sm',
        },
        color: {
            primary:
                'bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-500 focus:ring-1 focus:ring-blue-700 active:bg-blue-700',
            secondary:
                'border-secondary-200 bg-secondary-100 border-2 text-blue-600 hover:bg-white focus:ring-1 focus:ring-blue-700 active:border-blue-700 active:bg-white active:text-blue-700',
            tertiary:
                'active:bg-neutral-150 border-2 border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-100 focus:bg-white focus:ring-1 focus:ring-blue-700',
            outline:
                'border border-blue-600 text-blue-600 hover:bg-blue-100 focus:bg-blue-100 focus:ring-1 focus:ring-blue-700 active:bg-blue-200',
            disabled: 'border-2 border-gray-200 bg-neutral-100 text-gray-500',
        },
    },
});

type ButtonProps = React.ComponentPropsWithRef<'button'> &
    VariantProps<typeof buttonVariants> & {
        loading?: boolean;
    };

export { type ButtonProps, buttonVariants };
