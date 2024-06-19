// 'use client';

// import React from 'react';
// import { Formik, Form } from 'formik';
// import { Flex, FlexItem } from '@/components/atoms/flex';
// import Button from '@/components/atoms/button';
// import { FormSubmitMessage } from '@/components/molecules/message';
// import { getFormFields, getInitialValues } from './constants';
// import { DetailsType } from '@/libs/utils/enums';
// import IndividualFields from './fields';
// import AvailabilityFields from '../availability-fields';
// import { availabilityDetailsSchema } from '../validations/organization-form-validation';
// import individualSchema from './individual-form-validation';
// import { DaysEnum } from '@/libs/utils/enums';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@clerk/nextjs';

// type OrganizationFormType = {
//     submitBtnText?: string;
//     onClose?: (value: boolean) => void;
// };

// const IndividualForm: React.FC<OrganizationFormType> = () => {
//     const router = useRouter();
//     const { getToken } = useAuth();
//     const [detailsType, setDetailsType] = React.useState<DetailsType>(
//         DetailsType.individualDetails,
//     );
//     const formFields = getFormFields();
//     const initValues = getInitialValues(detailsType);

//     const handleSubmitForm = async (values: any, actions: any) => {
//         const token = await getToken();
//         const data = {
//             organizationId: '',
//             availabilityConfiguration: {
//                 timezone: values.timezone,
//                 startTime: '2024-06-14T08:00:00Z',
//                 endTime: '2024-06-14T17:00:00Z',
//                 duration: values.duration,
//                 days: values.businessDays.map((day: keyof typeof DaysEnum) => DaysEnum[day]),
//             },
//         };

//         console.log('Form values:', values);
//         console.log('Payload:', data);

//         try {
//             const response = await fetch('http://localhost:3000/api/availability', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(data),
//             });

//             console.log('Response status:', response.status);

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const result = await response.json();
//             console.log('Response data:', result);
//             actions.setStatus({ submitSuccess: 'Form submitted successfully!' });
//             router.push('/dashboard');
//         } catch (error) {
//             console.error('Error:', error);
//             actions.setStatus({ submitError: 'Submission failed. Please try again.' });
//         } finally {
//             actions.setSubmitting(false);
//         }
//     };

//     return (
//         <Formik
//             initialValues={initValues}
//             validationSchema={
//                 detailsType === DetailsType.individualDetails
//                     ? individualSchema
//                     : availabilityDetailsSchema
//             }
//             validateOnMount
//             onSubmit={handleSubmitForm}
//         >
//             {({
//                 isSubmitting,
//                 values,
//                 errors,
//                 status,
//                 isValid,
//                 handleChange,
//                 handleSubmit,
//                 setFieldValue,
//             }) => {
//                 return (
//                     <Form>
//                         <Flex dir='column' fullWidth gap={6}>
//                             {detailsType === DetailsType.individualDetails ? (
//                                 <IndividualFields
//                                     fields={formFields.individual}
//                                     errors={errors}
//                                     handleChange={handleChange}
//                                 />
//                             ) : (
//                                 <AvailabilityFields
//                                     fields={formFields.availability}
//                                     errors={errors}
//                                     handleChange={handleChange}
//                                     values={values}
//                                     setFieldValue={setFieldValue}
//                                 />
//                             )}

//                             {values.submitError && (
//                                 <FlexItem className='col-span-2 mt-2 w-full'>
//                                     <FormSubmitMessage type='error' name='submitError' />
//                                 </FlexItem>
//                             )}
//                             {values.submitSuccess && (
//                                 <FlexItem className='col-span-2 mt-2 w-full'>
//                                     <FormSubmitMessage type='success' name='submitSuccess' />
//                                 </FlexItem>
//                             )}

//                             <FlexItem alignSelf='end' className='col-span-2'>
//                                 <Button
//                                     type='button'
//                                     size={'xl'}
//                                     color='outline'
//                                     className='cursor-pointer'
//                                     disabled={isSubmitting || status?.submitSuccess || !isValid}
//                                     loading={isSubmitting}
//                                     onClick={() => {
//                                         if (
//                                             detailsType === DetailsType.individualDetails &&
//                                             isValid
//                                         ) {
//                                             setDetailsType(DetailsType.availabilityDetails);
//                                         } else {
//                                             handleSubmit();
//                                         }
//                                     }}
//                                 >
//                                     {detailsType === DetailsType.individualDetails
//                                         ? 'Continue'
//                                         : 'Submit'}
//                                 </Button>
//                             </FlexItem>
//                         </Flex>
//                     </Form>
//                 );
//             }}
//         </Formik>
//     );
// };

// export default IndividualForm;
'use client';

import React from 'react';
import { Formik, Form } from 'formik';
import { Flex, FlexItem } from '@/components/atoms/flex';
import Button from '@/components/atoms/button';
import { FormSubmitMessage } from '@/components/molecules/message';
import { getFormFields, getInitialValues } from './constants';
import { DetailsType } from '@/libs/utils/enums';
import IndividualFields from './fields';
import AvailabilityFields from '../availability-fields';
import { availabilityDetailsSchema } from '../validations/organization-form-validation';
import individualSchema from './individual-form-validation';
// import { DaysEnum } from '@/libs/utils/enums';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

type OrganizationFormType = {
    submitBtnText?: string;
    onClose?: (value: boolean) => void;
};

const IndividualForm: React.FC<OrganizationFormType> = () => {
    const router = useRouter();
    const { getToken } = useAuth();
    const [detailsType, setDetailsType] = React.useState<DetailsType>(
        DetailsType.individualDetails,
    );
    const formFields = getFormFields();
    const initValues = getInitialValues(detailsType);

    const handleSubmitForm = async (values: any, actions: any) => {
        const token = await getToken();
        const data = {
            organizationId: '',
            availabilityConfiguration: {
                timezone: values.timezone,
                startTime: '2024-06-14T08:00:00Z',
                endTime: '2024-06-14T17:00:00Z',
                duration: values.duration,
                days: values.businessDays,
            },
        };

        console.log('Form values:', values);
        console.log('Payload:', data);

        try {
            const response = await fetch('http://localhost:3000/api/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Response data:', result);
            actions.setStatus({ submitSuccess: 'Form submitted successfully!' });
            router.push('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            actions.setStatus({ submitError: 'Submission failed. Please try again.' });
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initValues}
            validationSchema={
                detailsType === DetailsType.individualDetails
                    ? individualSchema
                    : availabilityDetailsSchema
            }
            validateOnMount
            onSubmit={handleSubmitForm}
        >
            {({
                isSubmitting,
                values,
                errors,
                status,
                isValid,
                handleChange,
                handleSubmit,
                setFieldValue,
            }) => (
                <Form>
                    <Flex dir='column' fullWidth gap={6}>
                        {detailsType === DetailsType.individualDetails ? (
                            <IndividualFields
                                fields={formFields.individual}
                                errors={errors}
                                handleChange={handleChange}
                            />
                        ) : (
                            <AvailabilityFields
                                fields={formFields.availability}
                                errors={errors}
                                handleChange={handleChange}
                                values={values}
                                setFieldValue={setFieldValue}
                            />
                        )}

                        {status?.submitError && (
                            <FlexItem className='col-span-2 mt-2 w-full'>
                                <FormSubmitMessage type='error' name='submitError' />
                            </FlexItem>
                        )}
                        {status?.submitSuccess && (
                            <FlexItem className='col-span-2 mt-2 w-full'>
                                <FormSubmitMessage type='success' name='submitSuccess' />
                            </FlexItem>
                        )}

                        <FlexItem alignSelf='end' className='col-span-2'>
                            <Button
                                type='button'
                                size={'xl'}
                                color='outline'
                                className='cursor-pointer'
                                disabled={isSubmitting || status?.submitSuccess || !isValid}
                                loading={isSubmitting}
                                onClick={() => {
                                    if (detailsType === DetailsType.individualDetails && isValid) {
                                        setDetailsType(DetailsType.availabilityDetails);
                                    } else {
                                        handleSubmit();
                                    }
                                }}
                            >
                                {detailsType === DetailsType.individualDetails
                                    ? 'Continue'
                                    : 'Submit'}
                            </Button>
                        </FlexItem>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default IndividualForm;
