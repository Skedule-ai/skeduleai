import React from 'react';
import { ContainerProps, containerVariants } from './container.variants';

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ as = 'div', center, fullWidth, className, fullscreen, ...rest }, ref) => {
        return React.createElement(as, {
            ...rest,
            className: containerVariants({ center, fullscreen, fullWidth, className }),
            ref,
        });
    },
);

export { Container };
