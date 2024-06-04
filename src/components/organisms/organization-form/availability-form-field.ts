const availabilityFormFields = [
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
];

export default availabilityFormFields;
