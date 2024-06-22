import type { Meta, StoryObj } from '@storybook/react';
import Notification from '@/components/atoms/notification';
import { Information, CheckCircle, ExclamationMarkCircle } from '@strapi/icons';
import {
    notificationTypes,
    notificationWidth,
} from '@/components/atoms/notification/notification.variants';

const meta: Meta<typeof Notification> = {
    title: 'Atoms/Notification',
    component: Notification,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: { control: 'select', options: Object.keys(notificationTypes) },
        width: { control: 'select', options: Object.keys(notificationWidth) },
    },
    args: {},
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof Notification>;

export const SuccessNotification: Story = {
    args: {
        type: 'success',
        // width: 'medium',
        icon: <CheckCircle className='text-green-800' />, // Using Strapi icon
        children: 'This is a success notification.',
    },
};

export const WarningNotification: Story = {
    args: {
        type: 'warning',
        // width: 'full',
        icon: <ExclamationMarkCircle />, // Using Strapi icon
        children: 'This is a warning notification.',
    },
};

export const InfoNotification: Story = {
    args: {
        type: 'info',
        width: 'medium',
        icon: <Information />, // Using Strapi icon
        children: 'This is an info notification.',
    },
};

export const ErrorNotification: Story = {
    args: {
        type: 'error',
        // width: 'small',
        icon: <ExclamationMarkCircle />, // Using Strapi icon
        children: 'This is an error notification.',
    },
};
