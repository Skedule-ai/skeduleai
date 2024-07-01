import type { Meta, StoryObj } from '@storybook/react';
import WorkingHoursSelector from '@/components/atoms/timeInput';

const meta = {
    title: 'Atoms/WorkingHoursSelector',
    component: WorkingHoursSelector,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { size: 'md' },
} satisfies Meta<typeof WorkingHoursSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'md',
        startTimeField: {
            name: 'startTime',
            label: 'Start Time',
        },
        endTimeField: {
            name: 'endTime',
            label: 'End Time',
        },
        onChange: (e) => {
            console.log(e.target.name, e.target.value);
        },
    },
};
