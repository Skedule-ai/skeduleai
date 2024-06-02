import React from 'react';
import { TextProps, textVariants } from './text.variants';

const Text = React.forwardRef<HTMLElement, TextProps>(
    ({ as = 'p', size, className, weight, color, ...rest }, ref) => {
        return React.createElement(as, {
            ...rest,
            className: textVariants({ size, weight, color, className }),
            ref,
        });
    },
);

export default Text;
