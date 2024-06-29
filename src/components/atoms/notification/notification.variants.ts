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
    base: 'w-68 flex items-center rounded-md p-4 shadow-md',
    variants: {
        type: notificationTypes,
        width: notificationWidth,
    },
});

type NotificationProps = React.ComponentPropsWithRef<'div'> &
    VariantProps<typeof notificationVariants> & {
        as?: ElementType;
        icon?: React.ReactNode;
    };

export { type NotificationProps, notificationVariants };
