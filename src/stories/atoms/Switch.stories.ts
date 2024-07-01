import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Switch from '../../components/atoms/switch';
const meta = {
    title: 'Atoms/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onToggle: fn(),
    },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ToggleSwitch: Story = {
    args: {
        label1: 'Tab1',
        label2: 'Tab2',
    },
};
