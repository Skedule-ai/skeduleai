import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '@/components/atoms/dropdown';
import { fn } from '@storybook/test';

interface DrpdownItem {
    label: string;
    value: string;
}

const defaultItems: DrpdownItem[] = [
    { label: 'Account settings', value: 'account' },
    { label: 'Support', value: 'support' },
    { label: 'License', value: 'license' },
    { label: 'Sign Out', value: 'signout' },
];

const meta = {
    title: 'Atoms/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: { control: 'text' },
        size: {
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg'],
            },
        },

        color: {
            control: {
                type: 'select',
                options: ['primary', 'secondary'],
            },
        },

        items: { control: 'object' },
        onChange: { action: 'changed' },
    },
    args: {
        placeholder: 'Select an option',
        size: 'md',
        color: 'primary',
        items: defaultItems,
        onChange: fn(),
    },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Select an option',
    },
};

export const LargePrimary: Story = {
    args: {
        placeholder: 'Choose an item',
        size: 'lg',
        color: 'primary',
        items: defaultItems,
    },
};

export const SmallSecondary: Story = {
    args: {
        placeholder: 'Pick one',
        size: 'sm',
        color: 'secondary',
        items: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ],
    },
};
