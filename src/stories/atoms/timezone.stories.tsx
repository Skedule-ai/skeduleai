import type { Meta, StoryObj } from '@storybook/react';
import TimeZone from '../../components/atoms/date/TimeZone';

// Define meta information for the TimeZone component
const meta: Meta<typeof TimeZone> = {
    title: 'Atoms/TimeZone',
    component: TimeZone,
    parameters: {
        // Optional parameter to center the component in the Canvas
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry
    tags: ['autodocs'],
    args: {
        // className: '',
        // Add default args for other required props
        // onTimeZoneChange: (zone: string) => {
        //     console.log('TimeZone changed to:', zone);
        // },
        // showDropdown: false,
        // toggleDropdown: () => {
        //     console.log('Dropdown toggled');
        // },
        // searchQuery: '',
        // onSearchQueryChange: (query: string) => {
        //     console.log('Search query changed to:', query);
        // },
        field: { name: 'timeZone', value: '', onChange: () => {}, onBlur: () => {} },
        form: { setFieldValue: () => {} } as any,
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Define a story for the TimeZone component
export const TimeZoneComponent: Story = {
    args: {
        // className: 'lg',
        // Optionally, override any default args here if necessary
    },
};
