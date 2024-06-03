import type { Meta, StoryObj } from '@storybook/react';
import Container from '../../components/atoms/container';

const meta = {
    title: 'Atoms/Container',
    component: Container,
    parameters: {},
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullScreenContainer: Story = {
    args: {
        children: 'This a responsive container, Change the size of preview.',
        fullscreen: true,
        className: 'flex items-center justify-center border shadow',
    },
};

export const FullWidthContainer: Story = {
    args: {
        children: 'This a responsive container, Change the size of preview.',
        fullWidth: true,
        className: 'flex items-center justify-center border shadow',
    },
};

export const CenteredContainer: Story = {
    args: {
        children: 'This a responsive container, Change the size of preview.',
        center: true,
        className: 'flex items-center justify-center border shadow',
    },
};
