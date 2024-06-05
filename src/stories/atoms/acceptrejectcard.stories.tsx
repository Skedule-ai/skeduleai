// src/stories/AcceptRejectCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AcceptRejectCard from '@/components/atoms/card/AcceptRejectCard';

const meta: Meta<typeof AcceptRejectCard> = {
    title: 'Atoms/AcceptRejectCard',
    component: AcceptRejectCard,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        title: { control: 'text' },
        timing: { control: 'text' },
        userImages: { control: 'array' },
        size: {
            control: { type: 'select', options: ['sm', 'md', 'lg'] },
        },
        variant: {
            control: { type: 'select', options: ['default', 'error'] },
        },
    },
    args: {
        onAccept: action('accepted'),
        onReject: action('rejected'),
    },
} satisfies Meta<typeof AcceptRejectCard>;

export default meta;

type Story = StoryObj<typeof AcceptRejectCard>;

export const DefaultAcceptRejectCard: Story = {
    args: {
        size: 'lg',
        variant: 'default',
        title: 'Brainstorming session',
        timing: '12:30 PM -> 04:36 PM IST (Free)',
        userImages: [
            'https://randomuser.me/api/portraits/women/1.jpg',
            'https://randomuser.me/api/portraits/men/1.jpg',
            'https://randomuser.me/api/portraits/women/2.jpg',
            'https://randomuser.me/api/portraits/men/2.jpg',
            'https://randomuser.me/api/portraits/women/3.jpg',
            'https://randomuser.me/api/portraits/men/3.jpg',
        ],
    },
};
