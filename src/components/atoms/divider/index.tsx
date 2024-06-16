import React from 'react';

const Divider = ({ color = 'gray-300', thickness = '1px', marginY = '4' }) => {
    return <hr className={`border-${color} border-t-${thickness} my-${marginY}`} />;
};

export default Divider;
