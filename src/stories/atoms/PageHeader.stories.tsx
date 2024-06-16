import type { Meta, StoryObj } from '@storybook/react';
import PageHeader from '../../components/atoms/pageheader/index';
const meta: Meta<typeof PageHeader> = {
    title: 'Atoms/Header',
    component: PageHeader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        logoSrc: 'https://via.placeholder.com/150',
        // logoAlt: 'Logo',
        OrganizationName: 'Organization Name',
    },
};
