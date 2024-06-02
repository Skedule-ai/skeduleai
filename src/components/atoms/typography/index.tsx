import Text from '../text';

export const Header1 = ({ children }: any) => {
    return (
        <Text as={'h1'} size='4xl' weight='semibold' color='neutral800'>
            {children}
        </Text>
    );
};

export const Header2 = ({ children }: any) => {
    return (
        <Text as={'h2'} size='lg' weight='semibold' color='neutral800'>
            {children}
        </Text>
    );
};

export const Header3 = ({ children }: any) => {
    return (
        <Text as={'h3'} size='md' weight='medium' color='neutral800'>
            {children}
        </Text>
    );
};

export const Subtitle = ({ children }: any) => {
    return (
        <Text as={'p'} size='md' color='neutral400'>
            {children}
        </Text>
    );
};

export const Body = ({ children }: any) => {
    return (
        <Text as={'p'} size='sm' color='neutral800'>
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
