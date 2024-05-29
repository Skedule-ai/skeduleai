import React from 'react';
import { type GridProps, gridVariants } from './grid.variants';
import { twJoin } from 'tailwind-merge';

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
    ({ as = 'div', id = 'grid', columns, rows, gap, gapX, gapY, className, ...rest }, ref) => {
        return React.createElement(as, {
            id,
            ...rest,
            className: gridVariants({
                columns,
                rows,
                gap,
                gapX,
                gapY,
                className: twJoin(id, className),
            }),
            ref,
        });
    },
);

Grid.displayName = 'Grid';

export default Grid;
