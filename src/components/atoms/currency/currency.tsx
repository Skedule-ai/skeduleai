import React from 'react';
import { Field } from 'formik';
import Dropdown from '../dropdown';
import Container from '../container';
import Grid from '../grid';

const CURRENCY_LIST = [
    { label: '$', value: 'usd' },
    { label: '₹', value: 'inr' },
];

const Currency: React.FC<{
    name: string;
    handleFieldValueChange: (currency: string) => void;
}> = ({ name, handleFieldValueChange }) => {
    return (
        <Container>
            <Grid>
                <Field
                    className='font-semibold'
                    name={name}
                    as={Dropdown}
                    color='primary'
                    items={CURRENCY_LIST}
                    onChange={(val: string) => handleFieldValueChange(val)}
                    placeholder='Select a Currency'
                    size='medium'
                />
            </Grid>
        </Container>
    );
};

export default Currency;
