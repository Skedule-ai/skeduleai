import { twMerge } from 'tailwind-merge';
import { btnSize, btnVariant, ButtonProps } from './definitions';

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    size = 'md',
    variant = 'primary',
    ...props
}) => {
    const style = twMerge([btnSize[size] ?? 'md', btnVariant[variant], className]);
    return (
        <button className={style} {...props}>
            {children}
        </button>
    );
};

export default Button;
