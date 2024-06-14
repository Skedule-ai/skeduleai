'use client';
import React, { PropsWithChildren, useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Flex } from '@/components/atoms/flex';
import Container from '@/components/atoms/container';
import Button from '@/components/atoms/button';

type ModalProps = PropsWithChildren & {
    show?: boolean;
    onClose?: (value: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ children, show = true, onClose = () => {} }) => {
    return (
        <Transition show={show}>
            <Dialog className='relative z-10' onClose={onClose}>
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
                                <div className='mt-5'>{children}</div>
                            </DialogPanel>
                        </TransitionChild>
                    </Flex>
                </Container>
            </Dialog>
        </Transition>
    );
};

export default Modal;
