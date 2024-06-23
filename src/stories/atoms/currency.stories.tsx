import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import Currency from '@/components/atoms/currency/currency'; // Adjust the path as needed
import { action } from '@storybook/addon-actions';

const currencyItems = [
    { value: 'USD', label: '$' },
    { value: 'INR', label: '₹' },
];

const meta: Meta<typeof Currency> = {
    title: 'Atoms/Currency',
    component: Currency,
    decorators: [
        (Story) => (
            <Formik initialValues={{ currency: '' }} onSubmit={console.log}>
                <Story />
            </Formik>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        name: { control: 'text' },
        items: { control: 'object' },
        placeholder: { control: 'text' },
        size: {
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg'],
            },
        },
        color: {
            control: {
                type: 'select',
                options: ['primary', 'secondary'],
            },
        },
        onChange: { action: 'changed' },
    },
    args: {
        id: 'currency',
        name: 'currency',
        items: currencyItems,
        placeholder: 'Select a currency',
        size: 'md',
        color: 'primary',
        onChange: action('changed'),
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Select a currency',
    },
};

export const LargePrimary: Story = {
    args: {
        placeholder: 'Choose a currency',
        size: 'lg',
        color: 'primary',
        items: currencyItems,
    },
};

export const SmallSecondary: Story = {
    args: {
        placeholder: 'Pick a currency',
        size: 'sm',
        color: 'secondary',
        items: currencyItems,
    },
};
