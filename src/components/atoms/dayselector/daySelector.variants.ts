import { tv, type VariantProps } from 'tailwind-variants';

const daySelectorVariants = tv({
    base: 'grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-7',
    variants: {
        selected: {
            true: 'bg-blue-500 text-white',
            false: 'bg-white text-gray-600',
        },
    },
});

const buttonVariants = tv({
    base: 'w-full rounded px-3 py-2',
    variants: {
        selected: {
            true: 'bg-blue-500 text-white',
            false: 'border border-gray-200 bg-gray-100 text-sm font-semibold text-gray-600',
        },
    },
});

type DaySelectorProps = VariantProps<typeof daySelectorVariants>;

export { type DaySelectorProps, daySelectorVariants, buttonVariants };
