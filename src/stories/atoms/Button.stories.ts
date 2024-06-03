import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '../../components/atoms/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onClick: fn(), size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Button',
    },
};

export const Medium: Story = {
    args: {
        size: 'md',
        children: 'Button',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Button',
    },
};

export const ExtraSmall: Story = {
    args: {
        size: 'xs',
        children: 'Button',
    },
};
