// src/components/Form/Form.tsx
'use client';
import React, { useState } from 'react';

import FormInput from '../FormInput/FormInput';

const Form: React.FC = () => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form Data Submitted: ', formData);
        // Add form submission logic here
    };
    return (
        <form onSubmit={handleSubmit}>
            <FormInput label='Name' value={formData.firstName || ''} onChange={handleInputChange} />
        </form>
    );
};

export default Form;
