import * as Yup from 'yup';

const individualSchema = Yup.object().shape({
    organizationName: Yup.string().min(2, 'Minimum 2 characters required').required('Required'),
    timezone: Yup.string().min(2, 'Minimum 2 characters required').required('Required'),
    currency: Yup.string().min(2, 'Minimum 2 characters required').required('Required'),
});

export default individualSchema;
