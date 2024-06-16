import React, { PropsWithChildren } from 'react';

const ListItem: React.FC<PropsWithChildren> = ({ children }) => {
    return <li className='p-2 text-lg'>{children}</li>;
};

export default ListItem;
