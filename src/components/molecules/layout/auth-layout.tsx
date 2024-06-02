import { type PropsWithChildren } from 'react';
import Container from '../../atoms/container';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Container className='flex h-screen w-screen items-center justify-center dark:bg-neutral-950'>
            {children}
        </Container>
    );
};

export default AuthLayout;
