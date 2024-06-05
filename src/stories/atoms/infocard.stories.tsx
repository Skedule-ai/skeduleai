import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InfoCard from '@/components/atoms/card/InfoCard';

const meta: Meta<typeof InfoCard> = {
    title: 'Atoms/InfoCard',
    component: InfoCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        imageUrl: { control: 'text' },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        buttonText: { control: 'text' },
        size: {
            control: { type: 'select', options: ['sm', 'md', 'lg'] },
        },
        variant: {
            control: { type: 'select', options: ['default', 'error'] },
        },
        batchState: {
            control: { type: 'select', options: ['default', 'active'] },
        },
        batchColor: {
            control: { type: 'select', options: ['red', 'green', 'blue', 'yellow'] },
        },
    },
    args: {
        onClick: action('clicked'),
    },
} satisfies Meta<typeof InfoCard>;

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const DefaultInfoCard: Story = {
    args: {
        size: 'lg',
        variant: 'default',
        imageUrl:
            'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        title: 'Default Title',
        subtitle: 'This is a subtitle',
        buttonText: 'designation',
        batchState: 'default',
        batchColor: 'green',
    },
};
