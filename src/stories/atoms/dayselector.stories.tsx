import type { Meta, StoryObj } from '@storybook/react';
import DaySelector from '@/components/atoms/dayselector';
import { DaysEnum } from '@/libs/utils/enums';
const meta = {
    title: 'Atoms/DaySelector',
    component: DaySelector,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof DaySelector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        value: [DaysEnum.MONDAY],
        onChange: () => {},
    },
};
