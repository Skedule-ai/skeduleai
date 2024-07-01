import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import Currency from '@/components/atoms/currency/currency';
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
        name: { control: 'text' },
    },
    args: {
        name: 'currency',
    },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {},
};
export const LargePrimary: Story = {
    args: {},
};
export const SmallSecondary: Story = {
    args: {},
};
