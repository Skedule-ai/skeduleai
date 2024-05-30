import React from 'react';
import { ButtonProps, buttonVariants } from './button.variants';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ size, color, className, loading, children, ...rest }, ref) => {
        return (
            <button ref={ref} className={buttonVariants({ size, color, className })} {...rest}>
                {loading && 'Loading...'}
                {children}
            </button>
        );
    },
);

export { Button };
