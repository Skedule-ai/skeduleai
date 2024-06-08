'use client';
import { useState, PropsWithChildren } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Header1, Subtitle } from '@/components/atoms/typography';
import { Flex } from '@/components/atoms/flex';
import OrganizationForm from '@/components/organisms/organization-form';
import IndividualForm from '@/components/organisms/individual';
import Container from '@/components/atoms/container';
import Button from '@/components/atoms/button';

type ModalProps = PropsWithChildren & {
    show?: boolean;
    onClose?: (value: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ children, show = true, onClose = () => {} }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Transition show={show}>
            <Dialog className='relative z-10' onClose={() => onClose(false)}>
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
                                <Button
                                    size='xs'
                                    color='tertiary'
                                    type='button'
                                    className='absolute right-6 top-5 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                    onClick={() => onClose(false)}
                                >
                                    <span className='sr-only'>Close</span>
                                    &#10005;
                                </Button>
                                <Flex dir='column' gap={6}>
                                    <Flex dir='column'>
                                        <center>
                                            <div className='border-rounded w-60 bg-gray-100'>
                                                <label className='themeSwitcherTwo shadow-card bg-gray relative inline-flex cursor-pointer select-none items-center justify-center rounded-md p-1'>
                                                    <input
                                                        type='checkbox'
                                                        className='sr-only'
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <span
                                                        className={`flex items-center space-x-[6px] rounded border px-[18px] py-2 text-sm font-medium ${
                                                            isChecked
                                                                ? 'text-black'
                                                                : 'body-color bg-white text-blue-600/100'
                                                        }`}
                                                    >
                                                        Organization
                                                    </span>
                                                    <span
                                                        className={`ml-space-x-[6px] ml-2 flex items-center rounded border px-[18px] py-2 text-sm font-medium ${
                                                            !isChecked
                                                                ? 'text-black'
                                                                : 'body-color bg-white text-blue-600/100'
                                                        }`}
                                                    >
                                                        Individual
                                                    </span>
                                                </label>
                                            </div>
                                        </center>
                                        {isChecked ? (
                                            <div className='mt-5'>
                                                <Subtitle>Tell Us About</Subtitle>
                                                <Header1>Your Business</Header1>
                                                <div className='mt-8'>
                                                    <IndividualForm submitBtnText='Continue' />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='mt-5'>
                                                <Subtitle>Tell Us About</Subtitle>
                                                <Header1>Your Organization</Header1>
                                                <div className='mt-8'>
                                                    <OrganizationForm submitBtnText='Continue' />
                                                </div>
                                            </div>
                                        )}
                                    </Flex>
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
