import type { Meta, StoryObj } from '@storybook/react';
import TimeZone from '../../components/atoms/date/TimeZone';
const meta: Meta<typeof TimeZone> = {
    title: 'Atoms/TimeZone',
    component: TimeZone,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        field: { name: 'timeZone', value: '', onChange: () => {}, onBlur: () => {} },
        form: { setFieldValue: () => {} } as any,
    },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const TimeZoneComponent: Story = {
    args: {},
};
