import { tv, type VariantProps } from 'tailwind-variants';
import { type ElementType } from 'react';

export const notificationTypes = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
};

export const notificationWidth = {
    small: 'w-1/4',
    medium: 'w-1/2',
    full: 'w-full',
};

const notificationVariants = tv({
    base: 'p-4 w-68 rounded-md shadow-md flex items-center',
    variants: {
        type: notificationTypes,
        width: notificationWidth,
    },
});

type NotificationProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof notificationVariants> & {
        as?: ElementType;
        icon?: React.ReactNode; // New prop for icon
    };

export { type NotificationProps, notificationVariants };
