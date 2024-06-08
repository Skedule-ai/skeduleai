import { useState } from 'react';
import { useFetchUserConfigurationQuery } from '../api/user-configuration';

const useOnBoardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useFetchUserConfigurationQuery({
        onCompleted: ({ userConfiguration }) => {
            if (!userConfiguration) {
                setIsOpen(true);
            }
        },
        onError: (err) => {
            console.error(err);
        },
    });

    return {
        isOpen,
        setIsOpen,
    };
};

export default useOnBoardingModal;
