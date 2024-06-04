import React from 'react';
import { batchVariants, type BatchProps } from './batch.variants';

const Batch = React.forwardRef<HTMLDivElement, BatchProps>(
    ({ state = 'default', color = 'gray', className, children, ...rest }, ref) => {
        return (
            <div ref={ref} className={batchVariants({ state, color, className })} {...rest}>
                {children}
            </div>
        );
    },
);

export default Batch;
