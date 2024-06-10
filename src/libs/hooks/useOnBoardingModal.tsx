import { useState } from 'react';
import {
    useUpdateUserConfigurationMutation,
    useFetchUserConfigurationQuery,
} from '../api/user-configuration';

const useOnBoardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [postData] = useUpdateUserConfigurationMutation();
    const handleSubmit = () => {
        postData({
            onBoardingModal: true,
        });
    };

    useFetchUserConfigurationQuery({
        onCompleted: ({ userConfiguration }) => {
            if (!userConfiguration?.onBoardingModal) {
                setIsOpen(true);
                handleSubmit();
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
