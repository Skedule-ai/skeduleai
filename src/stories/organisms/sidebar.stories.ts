import type { Meta, StoryObj } from '@storybook/react';
import SidebarFC from '@/components/organisms/sidebar';

const meta = {
    title: 'Organisms/Sidebar',
    component: SidebarFC,
    parameters: {},
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof SidebarFC>;

export default meta;
type Story = StoryObj<typeof SidebarFC>;

export const Sidebar: Story = {
    args: {
        collapse: true,
    },
};
