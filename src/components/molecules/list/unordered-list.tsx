import React, { PropsWithChildren } from 'react';
import ListItem from '../../atoms/list/list-item';

type UnorderedListProps = PropsWithChildren & {
    items: string[];
};

const UnorderedList: React.FC<UnorderedListProps> = ({ items }) => {
    return (
        <ul className='list-none p-0'>
            {items.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
            ))}
        </ul>
    );
};

export default UnorderedList;
