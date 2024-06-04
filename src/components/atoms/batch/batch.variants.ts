import { tv, type VariantProps } from 'tailwind-variants';

const batchVariants = tv({
    base: 'flex items-center justify-center rounded px-2 py-1 text-sm',
    variants: {
        state: {
            default: 'bg-gray-200 text-gray-700',
            active: 'rinf-2 ring ring-blue-700',
        },
        color: {
            red: 'bg-red-500 text-white',
            green: 'bg-green-500 text-white',
            blue: 'bg-blue-500 text-white',
            yellow: 'bg-yellow-500 text-white',
        },
    },
    compoundVariants: [
        { state: 'default', color: 'red', className: 'bg-red-500 text-white' },
        { state: 'active', color: 'red', className: 'bg-red-500 text-white' },
    ],
});

type BatchProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof batchVariants> & {
        children: React.ReactNode;
    };

export { type BatchProps, batchVariants };
