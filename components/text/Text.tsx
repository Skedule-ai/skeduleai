import React from 'react';
import { TextProps, textVariants } from './text.variants';

const Text = React.forwardRef<HTMLElement, TextProps>(
    ({ as = 'p', size, className, weight, ...rest }, ref) => {
        return React.createElement(as, {
            ...rest,
            className: textVariants({ size, weight, className }),
            ref,
        });
    },
);

export { Text };
