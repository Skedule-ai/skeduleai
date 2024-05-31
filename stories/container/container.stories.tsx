import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@/components/container/container';

const meta: Meta<typeof Container> = {
    component: Container,
};

export default meta;
type Story = StoryObj<typeof Container>;

export const container: Story = {
    args: {
        fullWidth: true,
        center: false,
        fullScreen: false, 
    }
} 