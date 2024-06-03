'use client';
import { useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Header1, Subtitle } from '@/components/atoms/typography';
import { Flex } from '@/components/atoms/flex';
import OrganizationForm from '@/components/organisms/organization-form';
import Container from '@/components/atoms/container';

const Modal = () => {
    const [open, setOpen] = useState(true);

    return (
        <Transition show={open}>
            <Dialog className='relative z-10' onClose={setOpen}>
                <TransitionChild
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500/75 transition-opacity' />
                </TransitionChild>

                <Container fullWidth fullscreen className='fixed inset-0 z-10 overflow-y-auto'>
                    <Flex
                        alignItems='center'
                        justifyContent='center'
                        className='min-h-full p-4 text-center sm:items-center sm:p-0'
                    >
                        <TransitionChild
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <DialogPanel className='relative overflow-hidden rounded-lg bg-white p-8 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                <Flex dir='column' gap={6}>
                                    <Flex dir='column'>
                                        <Header1>Organization Details</Header1>
                                        <Subtitle>
                                            Please fill in the details of your organization.
                                        </Subtitle>
                                    </Flex>
                                    <OrganizationForm submitBtnText='Submit' />
                                </Flex>
                            </DialogPanel>
                        </TransitionChild>
                    </Flex>
                </Container>
            </Dialog>
        </Transition>
    );
};

export default Modal;
