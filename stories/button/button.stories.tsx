import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/button/Button';

const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        size: 'md',
        color: 'primary',
        children: 'Primary',
    },
};
export const Secondary: Story = {
    args: {
        size: 'md',
        color: 'secondary',
        children: 'Secondary',
    },
};
