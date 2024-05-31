import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '@/components/cards/Card';

const meta: Meta<typeof Card> = {
    component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Errorcard: Story = {
    args: {
        size: 'sm',
        variant: 'error',
    },
};

export const DefaultCard: Story = {
    args: {
        size: 'sm',
        variant: 'default',
    },
};
