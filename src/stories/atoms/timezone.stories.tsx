import type { Meta, StoryObj } from '@storybook/react';
import TimeZone from '../../components/atoms/date/TimeZone';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Atoms/TimeZone',
    component: TimeZone,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    args: { className: '' },
} satisfies Meta<typeof TimeZone>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TimeZoneComponent: Story = {
    args: {
        className: '',
    },
};
