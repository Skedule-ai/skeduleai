import { useState } from 'react';
import {
    useFetchUserConfigurationQuery,
    useUpdateUserConfigurationMutation,
} from '../api/userConfiguration';
import { FormikHelpers } from 'formik';

import { useCreateAvailabilityConfiguration } from '../api/availabilityConfiguration';
import { OnboardingFormValuesType } from '../form-helpers/fields';
import { OnboardingType } from '../enums';

const getFormattedAvailabilityAPIInputData = (values: OnboardingFormValuesType) => {
    return {
        availabilityConfiguration: {
            timezone: values.timezone,
            startTime: values.startTime,
            endTime: values.endTime,
            duration: values.duration,
            days: values.days,
        },
    };
};

const useOnBoardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [onboardingType, setOnboardingType] = useState(OnboardingType.ORGANIZATION);

    const [postData] = useUpdateUserConfigurationMutation();
    const handleUpdateOnboardingStatus = () => {
        postData({
            onBoardingModal: true,
        });
    };

    const [createAvailabilityConfiguration] = useCreateAvailabilityConfiguration({
        onCompleted: (data) => {
            if (data) {
                handleUpdateOnboardingStatus();
            }
        },
    });

    const handleToggle = (isChecked: boolean) => {
        const updateOnboardingType = isChecked
            ? OnboardingType.INDIVIDUAL
            : OnboardingType.ORGANIZATION;
        setOnboardingType(updateOnboardingType);
    };

    useFetchUserConfigurationQuery({
        onCompleted: ({ userConfiguration }) => {
            if (!userConfiguration?.onBoardingModal) {
                setIsOpen(true);
            }
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const handleSubmit = async (
        values: OnboardingFormValuesType,
        formikHelpers: FormikHelpers<OnboardingFormValuesType>,
    ) => {
        const data = getFormattedAvailabilityAPIInputData(values);

        try {
            await createAvailabilityConfiguration(data);
            formikHelpers.setStatus({ submitSuccess: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Error:', error);
            formikHelpers.setStatus({ submitError: 'Submission failed. Please try again.' });
        }

        formikHelpers.setSubmitting(false);
    };

    return {
        isOpen,
        setIsOpen,
        onboardingType,
        handleToggle,
        handleSubmit,
    };
};

export default useOnBoardingModal;
