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
        imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        title: 'Default Title',
        subtitle: 'This is a subtitle',
        buttonText: 'designation',
        batchState: 'default',
        batchColor: 'green',
    },
};
