import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const timezones = [
    { id: 1, name: 'UTC' },
    { id: 2, name: 'GMT' },
];

const currencies = [
    { id: 1, name: 'USD' },
    { id: 2, name: 'EUR' },
];

const DropdownIndividual = ({ label, name, options, value, onChange }) => {
    return (
        <Listbox value={value} onChange={onChange}>
            <div className='relative mt-1'>
                <Listbox.Button className='relative w-full cursor-default rounded-lg border-2 border-neutral-200 bg-white p-3 text-left focus:outline-none focus:ring-1 focus:ring-blue-300 sm:text-sm'>
                    <span className='block truncate'>{value?.name || `Select ${label}`}</span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'></span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Listbox.Options className='ring-opacity absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm'>
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.id}
                                value={option}
                                className={({ active }) =>
                                    `${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'} relative cursor-default select-none py-2 pl-10 pr-4`
                                }
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                                        >
                                            {option.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`${active ? 'text-amber-600' : 'text-amber-600'} absolute inset-y-0 left-0 flex items-center pl-3`}
                                            ></span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export const TimezoneDropdown = ({ value, onChange }) => (
    <DropdownIndividual
        label='Timezone'
        name='timezone'
        options={timezones}
        value={value}
        onChange={onChange}
    />
);

export const CurrencyDropdown = ({ value, onChange }) => (
    <DropdownIndividual
        label='Currency'
        name='currency'
        options={currencies}
        value={value}
        onChange={onChange}
    />
);
