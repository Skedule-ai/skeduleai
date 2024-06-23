import React from 'react';
import { NotificationProps, notificationVariants } from './notification.variants';

const Notification = React.forwardRef<HTMLElement, NotificationProps>(
    ({ as = 'div', type, width, className, icon, children, ...rest }, ref) => {
        return React.createElement(
            as,
            {
                ...rest,
                className: notificationVariants({ type, width, className }),
                ref,
            },
            <>
                {icon && <span className='mr-2'>{icon}</span>}
                {children}
            </>,
        );
    },
);

export default Notification;
