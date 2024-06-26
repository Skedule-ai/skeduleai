import React from 'react';
import { Formik, Form, Field } from 'formik';
import Dropdown from '../dropdown';
import Container from '../container';
import Grid from '../grid';

interface FormValues {
    currency: string;
}

const Currency: React.FC = () => {
    const initialValues: FormValues = { currency: '' };

    const handleSubmit = (values: FormValues) => {
        console.log(values);
    };

    return (
        <Container>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid>
                            <Grid>
                                <Field
                                    className='font-semibold'
                                    name='currency'
                                    as={Dropdown}
                                    color='primary'
                                    items={[
                                        { label: '$', value: 'usd' },
                                        { label: '₹', value: 'inr' },
                                    ]}
                                    onChange={handleChange}
                                    placeholder='Select a Currency'
                                    size='large'
                                    value={values.currency}
                                />
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Currency;
