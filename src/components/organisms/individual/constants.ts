import { DetailsType } from '@/libs/utils/enums';

export const getFormFields = () => {
    return {
        individual: [
            {
                label: 'Your Name',
                name: 'name',
                placeholder: 'Enter your business name',
                required: true,
                type: 'text',
            },
            {
                label: 'Select time zone',
                name: 'timezone',
                placeholder: 'Select your time zone',
                required: true,
                type: 'text',
            },
            {
                label: 'Currency',
                name: 'currency',
                placeholder: 'Select your currency',
                required: true,
                type: 'text',
            },
        ],
        availability: [
            {
                label: 'Business hours',
                name: 'businessHours',
                placeholder: 'Select',
                required: true,
                type: 'time',
            },
            {
                label: 'Number of slots',
                name: 'numberOfSlots',
                placeholder: 'Select',
                required: true,
                type: 'number',
            },
            {
                label: 'Business Days',
                name: 'businessDays',
                placeholder: '',
                required: true,
                type: 'multi-select',
            },
        ],
    };
};

const organizationInitialValues = {
    organizationName: '',
    timezone: '',
    currency: '',
};
const availabilityInitialValues = {
    businessHours: '',
    businessHoursEnd: '',
    numberOfSlots: '',
    businessDays: [],
};

export const getInitialValues = (type: DetailsType) => {
    const defaultVal = { submitError: '', submitSuccess: '' };
    switch (type) {
        case DetailsType.organizationDetails:
            return {
                ...organizationInitialValues,
                ...defaultVal,
            };
        case DetailsType.availabilityDetails:
            return {
                ...availabilityInitialValues,
                ...defaultVal,
            };
        default:
            return defaultVal;
    }
};
