import React from 'react';
import { ButtonProps, buttonVariants } from './button.variants';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ as = 'button', size, variant, className, ...rest }, ref) => {
        return React.createElement(as, {
            ...rest,
            className: buttonVariants({ size, variant, className }),
            ref,
        });
    },
);

export { Button };
