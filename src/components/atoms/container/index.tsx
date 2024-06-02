import { twMerge } from 'tailwind-merge';

const Container: React.FC<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className, ...props }) => {
    const style = twMerge(['container mx-auto', className]);
    return (
        <div className={style} {...props}>
            {children}
        </div>
    );
};

export default Container;
