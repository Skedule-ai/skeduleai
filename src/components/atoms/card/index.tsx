import React from 'react';
import { CardProps, cardVariants } from './card.variants';

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ as = 'div', size, variant, className, children, ...rest }, ref) => {
        return React.createElement(
            as,
            {
                ...rest,
                className: cardVariants({ size, variant, className }),
                ref,
            },
            children,
        );
    },
);

export default Card;
