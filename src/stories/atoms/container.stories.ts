import type { Meta, StoryObj } from '@storybook/react';
import Container from '../../components/atoms/container';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/Container',
    component: Container,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    args: { className: '' },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ResponsiveContainer: Story = {
    args: {
        children: 'This a responsive container, Change the size of preview.',
        className: 'w-screen h-screen shadow-lg border flex items-center justify-center',
    },
};
