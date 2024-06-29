import { DetailsType } from '@/libs/utils/enums';

export const getFormFields = () => {
    return {
        individual: [
            {
                label: 'Business name',
                name: 'organizationName',
                placeholder: 'Enter your business name',
                required: true,
                type: 'text',
            },
            {
                label: 'Select time zone',
                name: 'timezone',
                placeholder: 'Select your time zone',
                required: true,
                type: 'timezone',
            },
            {
                label: 'Currency',
                name: 'currency',
                placeholder: 'Select your currency',
                required: true,
                type: 'currency',
            },
        ],
        availability: [
            {
                label: 'Business hours',
                name: 'businessHours',
                placeholder: 'Select',
                required: true,
                type: 'WorkingHoursSelector',
            },
            {
                label: 'Meeting Duration',
                name: 'duration',
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

const individualInitialValues = {
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
        case DetailsType.individualDetails:
            return {
                ...individualInitialValues,
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
