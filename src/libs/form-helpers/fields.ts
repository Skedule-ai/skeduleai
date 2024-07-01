import {
    availabilityDetailsSchema,
    organizationDetailsSchema,
} from '@/components/organisms/validations/organization-form-validation';
import { getDefaultTimeZone } from '../utils/datetime-helpers';
import { DetailsType } from '../utils/enums';

export const Fields = {
    ORGANIZATION_NAME: {
        label: 'Business name',
        name: 'organizationName',
        placeholder: 'Enter your business name',
        required: true,
        type: 'text',
    },
    TIMEZONE: {
        label: 'Select time zone',
        name: 'timezone',
        placeholder: 'Select your time zone',
        required: true,
        type: 'timezone',
    },
    CURRENCY: {
        label: 'Currency',
        name: 'currency',
        placeholder: 'Select your currency',
        required: true,
        type: 'currency',
    },
    WORKING_HOURS: {
        type: 'WorkingHoursSelector',
        label: 'Business hours',
        placeholder: 'Select',
        startTimeField: {
            name: 'startTime',
            required: true,
        },
        endTimeField: {
            name: 'endTime',
            required: true,
        },
    },
    SLOT_DURATION: {
        label: 'Meeting Duration',
        name: 'duration',
        placeholder: 'Select',
        required: true,
        type: 'number',
    },
    WORKING_DAYS: {
        label: 'Business Days',
        name: 'days',
        placeholder: '',
        required: true,
        type: 'multi-select',
    },
};

export const ONBOARDING_FORM_INTIAL_VALUES = {
    organizationName: '',
    timezone: getDefaultTimeZone(),
    currency: 'inr',
    startTime: '',
    endTime: '',
    duration: 0,
    days: [],
    submitError: '',
    submitSuccess: '',
};

export type OnboardingFormValuesType = typeof ONBOARDING_FORM_INTIAL_VALUES;

export const getOnboardingFormFields = () => {
    return {
        organization: [Fields.ORGANIZATION_NAME, Fields.TIMEZONE, Fields.CURRENCY],
        availability: [Fields.WORKING_HOURS, Fields.SLOT_DURATION, Fields.WORKING_DAYS],
    };
};

export const getOnboardingFormSchemaValidator = (detailsType: DetailsType) => {
    return detailsType === DetailsType.organizationDetails
        ? organizationDetailsSchema
        : availabilityDetailsSchema;
};
