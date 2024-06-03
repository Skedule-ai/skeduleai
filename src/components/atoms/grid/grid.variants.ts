import { tv, type VariantProps } from 'tailwind-variants';

const gridVariants = tv({
    base: 'grid',
    variants: {
        columns: {
            1: 'grid-cols-1',
            2: 'grid-cols-2',
            3: 'grid-cols-3',
            4: 'grid-cols-4',
            5: 'grid-cols-5',
            6: 'grid-cols-6',
        },
        rows: {
            1: 'grid-rows-1',
            2: 'grid-rows-2',
            3: 'grid-rows-3',
            4: 'grid-rows-4',
            5: 'grid-rows-5',
            6: 'grid-rows-6',
        },
        gap: {
            1: 'gap-1',
            2: 'gap-2',
            3: 'gap-3',
            4: 'gap-4',
            5: 'gap-5',
            6: 'gap-6',
        },
        gapX: {
            1: 'gap-x-1',
            2: 'gap-x-2',
            3: 'gap-x-3',
            4: 'gap-x-4',
            5: 'gap-x-5',
        },
        gapY: {
            1: 'gap-y-1',
            2: 'gap-y-2',
            3: 'gap-y-3',
            4: 'gap-y-4',
            5: 'gap-y-5',
        },
    },
});

type GridProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof gridVariants> & {
        as?: React.ElementType;
    };

export { gridVariants, type GridProps };
