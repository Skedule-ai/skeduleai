import React from 'react';
import { sidebarVariants } from './sidebar.variants';

import Container from '@/components/atoms/container';
import { Flex, FlexItem } from '@/components/atoms/flex';

type SidebarProps = {
    collapse?: boolean;
};

const SideBar: React.FC<SidebarProps> = ({ collapse, ...props }) => {
    const contatinerClass = sidebarVariants({ collapse });
    return (
        <Container className={contatinerClass} {...props}>
            <Flex dir='column' alignItems='center' justifyContent='center'>
                <FlexItem>Sidebar</FlexItem>
            </Flex>
        </Container>
    );
};

export default SideBar;
