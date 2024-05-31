// src/components/FormInput/FormInput.tsx
import React, { useState } from 'react';
// import JoditEditor from 'jodit-react';

// import { useRef } from 'react';

interface FormInputProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

// rich text editor
// const editor = useRef(null);

// const [content, setContent] = useState('');

// rich text editor

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, placeholder }) => {
    return (
        <>
            <h1 className='mb-3 text-center text-4xl'>Form Design</h1>
            <div className='box-border border-4 p-4'>
                <div className='space-y-12'>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-4'>
                                <label
                                    htmlFor='username'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Input Field
                                </label>
                                <div className='mt-2'>
                                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                                        {/* <!-- <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> --> */}
                                        <input
                                            type='text'
                                            name='username'
                                            id='username'
                                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                                            placeholder='Roy'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-span-full'>
                                <label
                                    htmlFor='about'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Rich Text Editor
                                </label>
                                <div className='mt-2'>
                                    {/* <!-- richtext editor  --> */}
                                    {/* <textarea
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        name='descriptions'
                                        id='description'
                                    ></textarea> */}
                                    {/* <JoditEditor
                                        ref={editor}
                                        value={content}
                                        onChange={(newContent) => setContent(newContent)}
                                    />
                                    <br /> */}
                                    {/* <!-- richtext editor  --> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='border-b border-gray-900/10 pb-12'>
                        <div className='mt-10 space-y-10'>
                            <fieldset>
                                <legend className='text-sm font-semibold leading-6 text-gray-900'>
                                    Check box
                                </legend>
                                <div className='mt-6 space-y-6'>
                                    <div className='relative flex gap-x-3'>
                                        <div className='flex h-6 items-center'>
                                            <input
                                                id='comments'
                                                name='comments'
                                                type='checkbox'
                                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                            />
                                        </div>
                                        <div className='text-sm leading-6'>
                                            <label
                                                htmlFor='comments'
                                                className='font-medium text-gray-900'
                                            >
                                                Comments
                                            </label>
                                        </div>
                                    </div>
                                    <div className='relative flex gap-x-3'>
                                        <div className='flex h-6 items-center'>
                                            <input
                                                id='candidates'
                                                name='candidates'
                                                type='checkbox'
                                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                            />
                                        </div>
                                        <div className='text-sm leading-6'>
                                            <label
                                                htmlFor='candidates'
                                                className='font-medium text-gray-900'
                                            >
                                                Candidates
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className='mt-6 space-y-6'>
                                    <legend className='text-sm font-semibold leading-6 text-gray-900'>
                                        Radio Button
                                    </legend>
                                    <div className='flex items-center gap-x-3'>
                                        <input
                                            id='push-everything'
                                            name='push-notifications'
                                            type='radio'
                                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                        />
                                        <label
                                            htmlFor='push-everything'
                                            className='block text-sm font-medium leading-6 text-gray-900'
                                        >
                                            Everything
                                        </label>
                                    </div>
                                    <div className='flex items-center gap-x-3'>
                                        <input
                                            id='push-email'
                                            name='push-notifications'
                                            type='radio'
                                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                        />
                                        <label
                                            htmlFor='push-email'
                                            className='block text-sm font-medium leading-6 text-gray-900'
                                        >
                                            Same as email
                                        </label>
                                    </div>
                                    <div className='flex items-center gap-x-3'>
                                        <input
                                            id='push-nothing'
                                            name='push-notifications'
                                            type='radio'
                                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                        />
                                        <label
                                            htmlFor='push-nothing'
                                            className='block text-sm font-medium leading-6 text-gray-900'
                                        >
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            {/* <!-- toggle button  --> */}

                            <label className='inline-flex cursor-pointer items-center'>
                                <input type='checkbox' value='' className='peer sr-only' />
                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
                                <span
                                    className='mr-3 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300
                                '
                                >
                                    Red
                                </span>
                            </label>
                            <label className='inline-flex cursor-pointer items-center'>
                                <input type='checkbox' value='' className='peer sr-only' />
                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-green-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-green-800"></div>
                                <span
                                    className='mr-3 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300
                                '
                                >
                                    Green
                                </span>
                            </label>
                            <label className='inline-flex cursor-pointer items-center'>
                                <input type='checkbox' value='' className='peer sr-only' />
                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-purple-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-purple-800"></div>
                                <span
                                    className='mr-3 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300
                                '
                                >
                                    Purple
                                </span>
                            </label>
                            <label className='inline-flex cursor-pointer items-center'>
                                <input type='checkbox' value='' className='peer sr-only' />
                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-yellow-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-yellow-800"></div>
                                <span
                                    className='mr-3 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300
                                '
                                >
                                    Yellow
                                </span>
                            </label>
                            <label className='inline-flex cursor-pointer items-center'>
                                <input type='checkbox' value='' className='peer sr-only' />
                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-teal-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-teal-800"></div>
                                <span
                                    className='mr-3 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300
                                '
                                >
                                    Teal
                                </span>
                            </label>
                            <label className='inline-flex cursor-pointer items-center'>
                                <input type='checkbox' value='' className='peer sr-only' />
                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-orange-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-orange-800"></div>
                                <span
                                    className='mr-3 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300
                                '
                                >
                                    Orange
                                </span>
                            </label>
                            <label className='inline-flex cursor-pointer items-center'>
                                <input type='checkbox' value='' className='peer sr-only' />
                                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                    Toggle me
                                </span>
                            </label>

                            {/* <!-- toggle button  --> */}
                        </div>
                    </div>
                    {/* <!-- notifications  --> */}

                    {/* <!-- notifications  --> */}
                </div>
            </div>
        </>
    );
};

export default FormInput;
