import React from 'react';
import { ButtonProps, buttonVariants } from './button.variants';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ size, color = 'primary', className, loading, children, ...rest }, ref) => {
        return (
            <button ref={ref} className={buttonVariants({ size, color, className })} {...rest}>
                {loading && 'Loading...'}
                {children}
            </button>
        );
    },
);

export default Button;

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
    return <Button color='primary' {...props} />;
};

export const PrimaryOutlineButton: React.FC<ButtonProps> = (props) => {
    return <Button color='outline' {...props} />;
};
