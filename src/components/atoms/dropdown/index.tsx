import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DropdownProps, dropdownVariants } from './dropdown.variants';
import { ChevronDown } from '@strapi/icons';

interface DropdownItem {
    label: string;
    value: string;
}

interface Props extends DropdownProps {
    placeholder: string;
    items: DropdownItem[];
    onChange: (value: string) => void;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Dropdown: React.FC<Props> = ({ placeholder, items, size, color = 'primary', ...rest }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (item: DropdownItem) => {
        setSelected(item.value);
        rest.onChange(item.value);
    };

    return (
        <Menu as={'div'} className={dropdownVariants({ size, color })}>
            <div>
                <Menu.Button className='flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50'>
                    {selected
                        ? items.find((item: any) => item.value === selected)?.label
                        : placeholder}
                    <ChevronDown className='ml-2 mt-1' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items
                    className={
                        'absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'
                    }
                >
                    <div className='py-1'>
                        {items.map((item) => (
                            <Menu.Item key={item.value}>
                                {({ active }) => (
                                    <a
                                        onClick={() => handleSelect(item)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block cursor-pointer px-4 py-2 text-sm',
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Dropdown;
