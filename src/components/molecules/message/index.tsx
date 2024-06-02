import { Body } from '@/components/atoms/typography';
import { ErrorMessage } from 'formik';

export const FormSubmitMessage: React.FC<{ name?: string; type: 'error' | 'success' }> = ({
    name = 'submitError',
    type,
}) => {
    return (
        <ErrorMessage name={name}>
            {(msg) => (
                <Body color={type} align='center'>
                    {msg}
                </Body>
            )}
        </ErrorMessage>
    );
};
