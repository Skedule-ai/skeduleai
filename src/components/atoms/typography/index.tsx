import Text from '../text';

export const Header1 = ({ children }: any) => {
    return (
        <Text as={'h1'} size='4xl' weight='semibold' color='secondary'>
            {children}
        </Text>
    );
};

export const Header2 = ({ children }: any) => {
    return (
        <Text as={'h2'} size='lg' weight='semibold' color='secondary'>
            {children}
        </Text>
    );
};

export const Header3 = ({ children }: any) => {
    return (
        <Text as={'h3'} size='md' weight='medium' color='secondary'>
            {children}
        </Text>
    );
};

export const Subtitle = ({ children }: any) => {
    return (
        <Text as={'p'} size='md' color='tertiary'>
            {children}
        </Text>
    );
};

export const Body = ({ children }: any) => {
    return (
        <Text as={'p'} size='sm' color='secondary'>
            {children}
        </Text>
    );
};

export const BodyHighlight = ({ children }: any) => {
    return (
        <Text as={'p'} weight='semibold'>
            {children}
        </Text>
    );
};

export const SmallText = ({ children }: any) => {
    return (
        <Text as={'p'} size='xs' weight='bold'>
            {children}
        </Text>
    );
};

export const TableLabel = ({ children }: any) => {
    return (
        <Text as={'p'} size='xxs' weight='bold'>
            {children}
        </Text>
    );
};

export const Label: React.FC<
    React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
> = ({ children, htmlFor }) => {
    return (
        <Text as={'label'} htmlFor={htmlFor} size='sm' weight='medium' color='secondary'>
            {children}
        </Text>
    );
};
