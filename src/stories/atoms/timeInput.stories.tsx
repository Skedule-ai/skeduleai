import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import WorkingHoursSelector from '@/components/atoms/timeInput';

const meta = {
    title: 'Atoms/WorkingHoursSelector',
    component: WorkingHoursSelector,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: { onStartChange: fn(), onEndChange: fn(), size: 'md' },
} satisfies Meta<typeof WorkingHoursSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'md',
    },
};
