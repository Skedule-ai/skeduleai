import type { Meta, StoryObj } from '@storybook/react';
import BookingModalVariants from '@/components/atoms/modals/booking-modal-variants';
import { fireEvent, within } from '@storybook/test';
const meta: Meta<typeof BookingModalVariants> = {
    title: 'Atoms/BookingModal',
    component: BookingModalVariants,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof BookingModalVariants>;
export default meta;
type Story = StoryObj<typeof BookingModalVariants>;

export const Default: Story = {
    args: {},
};
export const SignInFormActive: Story = {
    args: {},
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const signInTab = await canvas.findByText('Sign In');
        fireEvent.click(signInTab);
    },
};
