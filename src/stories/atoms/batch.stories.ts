import type { Meta, StoryObj } from '@storybook/react';
import Batch from '@/components/atoms/batch';


const meta = {
    title: 'Atoms/Batch',
    component: Batch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        state: 'default',
        color: 'gray',
    },
} satisfies Meta<typeof Batch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Graybatch: Story = {
    args: {
        state: 'default',
        color: 'gray',
        children: 'Batch', 
    },
};

export const Redbatch: Story = {
    args: {
        state: 'active',
        color: 'red', 
        children: 'Batch', 
    },
};