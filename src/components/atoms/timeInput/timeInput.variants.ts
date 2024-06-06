import { tv, type VariantProps } from 'tailwind-variants';

const timeInputVariants = tv({
    base: 'flex space-x-3',
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
    },
});

type TimeInputProps = VariantProps<typeof timeInputVariants>;
export { type TimeInputProps, timeInputVariants };
