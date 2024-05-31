import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/components/cards/Card';

const meta: Meta<typeof Card> = {
    component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const defaultCard: Story = {
    args: {
        size: 'sm',
        variant: 'default'
    }
};


export const errorCard: Story = {
    args: {
        size: 'sm',
        variant: 'error'
    }
}