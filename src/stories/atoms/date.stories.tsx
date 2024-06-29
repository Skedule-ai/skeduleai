import type { Meta, StoryObj } from '@storybook/react';
import Date from '../../components/atoms/date/Date';
const meta = {
    title: 'Atoms/Date',
    component: Date,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { className: '' },
} satisfies Meta<typeof Date>;

export default meta;
type Story = StoryObj<typeof meta>;
export const DateComponent: Story = {
    args: {
        className: '',
    },
};
