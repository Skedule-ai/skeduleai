import React from 'react';
import { Field } from 'formik';

type TextProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const Input: React.FC<TextProps> = ({ id, name, value, onChange, placeholder, type = 'text' }) => {
    return (
        <Field
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='w-full rounded-md border border-neutral-200 px-4 py-2.5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
        />
    );
};

export default Input;
