import { type ElementType } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const flexVariants = tv({
    base: 'flex',
    variants: {
        inline: {
            true: 'inline-flex',
        },
        dir: {
            row: 'flex-row',
            column: 'flex-col',
        },
        alignItems: {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            baseline: 'items-baseline',
            stretch: 'items-stretch',
        },
        justifyContent: {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            between: 'justify-between',
            around: 'justify-around',
            evenly: 'justify-evenly',
        },
        alignContent: {
            start: 'content-start',
            center: 'content-center',
            end: 'content-end',
            between: 'content-between',
            around: 'content-around',
            evenly: 'content-evenly',
        },
        alignSelf: {
            start: 'self-start',
            center: 'self-center',
            end: 'self-end',
            baseline: 'self-baseline',
            stretch: 'self-stretch',
        },
        fullWidth: {
            true: 'w-full',
        },
        reverse: {
            true: 'flex-row-reverse',
        },
        wrap: {
            true: 'flex-wrap',
        },
        // gap, margin and padding
        gap: {
            1: 'gap-1',
            2: 'gap-2',
            3: 'gap-3',
            4: 'gap-4',
            5: 'gap-5',
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
    compoundVariants: [
        {
            reverse: true,
            dir: 'row',
            className: 'flex-row-reverse',
        },
        {
            reverse: true,
            dir: 'column',
            className: 'flex-col-reverse',
        },
    ],
});

const flexItemVariants = tv({
    base: 'flex-initial self-auto',
    variants: {
        inline: {
            true: 'inline-flex w-fit',
        },
        alignSelf: {
            start: 'self-start',
            center: 'self-center',
            end: 'self-end',
            baseline: 'self-baseline',
            stretch: 'self-stretch',
        },
    },
});

type FlexProps = React.ComponentPropsWithRef<'ul'> &
    VariantProps<typeof flexVariants> & {
        as?: ElementType;
    };
type FlexItemProps = React.ComponentPropsWithRef<'li'> &
    VariantProps<typeof flexItemVariants> & {
        as?: ElementType;
    };

export { flexVariants, flexItemVariants, type FlexProps, type FlexItemProps };
