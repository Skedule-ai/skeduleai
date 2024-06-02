import type { Meta, StoryObj } from '@storybook/react';
import Header from '../../components/atoms/header';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/Header',
    component: Header,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    args: { className: '' },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AuthHeader: Story = {
    args: {
        children: 'Header component design is in progress.',
        className: '',
    },
};
