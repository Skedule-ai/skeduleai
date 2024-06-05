import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Card from '@/components/atoms/card';

const meta: Meta<typeof Card> = {
    title: 'Atoms/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onClick: fn() },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const DefaultCard: Story = {
    args: {
        size: 'sm',
        variant: 'default',
    },
};

export const ErrorCard: Story = {
    args: {
        size: 'sm',
        variant: 'error',
    },
};
