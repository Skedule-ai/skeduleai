import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
    base: 'button flex flex-row items-center gap-2 rounded px-4 py-2 font-bold',
    variants: {
        size: {
            sm: 'w-auto text-xs',
            md: 'w-auto text-sm',
            lg: 'w-auto ',
        },
        color: {
            primary:
                'bg-primary-600 hover:bg-primary-500 focus:bg-primary-500 focus:ring-1 focus:ring-primary-700 active:bg-primary-700 text-white',
            secondary:
                'border-2 border-secondary-200 bg-secondary-100 text-primary-600 hover:bg-white focus:ring-1 focus:ring-primary-700 active:border-primary-700 active:bg-white active:text-primary-700',
            tertiary:
                'border-2 border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-100 focus:bg-white focus:ring-1 focus:ring-primary-700 active:bg-neutral-150',
        },
    },
});

type ButtonProps = React.ComponentPropsWithRef<'button'> &
    VariantProps<typeof buttonVariants> & {
        loading?: boolean;
    };

export { type ButtonProps, buttonVariants };
