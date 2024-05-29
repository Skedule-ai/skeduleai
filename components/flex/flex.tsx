import React from 'react';
import { type FlexProps, flexVariants } from './flex.variants';
import { twJoin } from 'tailwind-merge';

import { FlexItem } from './flex-item';

const FlexComponent = React.forwardRef<HTMLUListElement, FlexProps>(
    (
        {
            as = 'ul',
            id = 'flex',
            inline,
            alignContent,
            alignItems,
            alignSelf,
            justifyContent,
            reverse,
            wrap,
            dir,
            fullWidth,
            gap,
            gapX,
            gapY,
            className,
            ...rest
        },
        ref,
    ) => {
        return React.createElement(as, {
            id,
            ...rest,
            className: flexVariants({
                inline,
                alignContent,
                alignItems,
                alignSelf,
                justifyContent,
                reverse,
                wrap,
                dir,
                fullWidth,
                gap,
                gapX,
                gapY,
                className: twJoin(id, className),
            }),
            ref,
        });
    },
);

FlexComponent.displayName = 'Flex';
FlexItem.displayName = 'Flex.Item';

export const Flex = Object.assign(FlexComponent, {
    Item: FlexItem,
});
