import { useState, PropsWithChildren } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Flex } from '@/components/atoms/flex';
import Container from '@/components/atoms/container';
import Button from '@/components/atoms/button';
import Switch from '@/components/atoms/switch/index';

type ModalProps = PropsWithChildren & {
    show?: boolean;
    onClose?: (value: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ children, show = true, onClose = () => {} }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleClose = () => {
        onClose(false);
        // Redirect to the dashboard
        window.location.href = '/dashboard'; // Replace '/dashboard' with your actual dashboard route
    };

    return (
        <Transition show={show}>
            <Dialog className='relative z-10' onClose={handleClose}>
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
                                    onClick={handleClose}
                                >
                                    <span className='sr-only'>Close</span>
                                    &#10005;
                                </Button>
                                {/* switchcomponents */}
                                <Switch label1={'organization'} label2={'individual'} />
                                {/* switchcomponents */}
                            </DialogPanel>
                        </TransitionChild>
                    </Flex>
                </Container>
            </Dialog>
        </Transition>
    );
};

export default Modal;
