import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '@/components/Sidebar/Sidebar'


const meta: Meta<typeof Sidebar> = {
    component: Sidebar,
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const sidebar: Story = {
    args: {
        collapsible: true,
        hide: false
    }
}