import { tv, type VariantProps } from 'tailwind-variants';

const dropdownVariants = tv({
    base: 'relative inline-block text-left text-gray-500',
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },

        color: {
            primary: 'rounded border border-gray-300 bg-white shadow-sm',

            secondary: 'rounded border border-gray-200 bg-gray-100 shadow-sm',
        },
    },
});

type DropdownProps = VariantProps<typeof dropdownVariants>;

export { type DropdownProps, dropdownVariants };
