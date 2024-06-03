import React from 'react';
import { type FlexItemProps, flexItemVariants } from './flex.variants';

import { twJoin } from 'tailwind-merge';

export const FlexItem = React.forwardRef<HTMLLIElement, FlexItemProps>(
    ({ as = 'li', id = 'flex-item', alignSelf, inline, className, ...rest }, ref) => {
        return React.createElement(as, {
            id,
            ...rest,
            className: flexItemVariants({
                alignSelf,
                inline,
                className: twJoin(id, className),
            }),
            ref,
        });
    },
);

FlexItem.displayName = 'FlexItem';
