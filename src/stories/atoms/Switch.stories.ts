import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Switch from '../../components/atoms/switch';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onClick: fn(), size: 'md' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleSwitch: Story = {
    args: {
        size: 'lg',
    },
};