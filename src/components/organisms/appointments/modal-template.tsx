'use client';
import React, { useState } from 'react';
import Modal from '@/components/molecules/modal';
import OrganizationForm from '../organization-form';
// import IndividualForm from '../individual-form'; // Assuming you have this component
import Switch from '@/components/atoms/switch';
import IndividualForm from '@/components/organisms/individual';

const ApponitmentsModalTemplate = () => {
    const [isOrganization, setIsOrganization] = useState(true);

    const handleToggle = (isChecked: boolean) => {
        setIsOrganization(!isChecked);
    };

    return (
        <Modal>
            <Switch label1='Organization' label2='Individual' onToggle={handleToggle} />
            {isOrganization ? <OrganizationForm /> : <IndividualForm />}
        </Modal>
    );
};

export default ApponitmentsModalTemplate;
