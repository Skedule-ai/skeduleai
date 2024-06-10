import * as Yup from 'yup';

const IndividualSchema = Yup.object().shape({
    organizationName: Yup.string().min(2, 'Minimum 2 characters required').required('Required'),
    service: Yup.string().min(2, 'Minimum 2 characters required').required('Required'),
});

export default IndividualSchema;