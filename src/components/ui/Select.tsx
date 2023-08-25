import { Fragment, useState, FC } from 'react';
import { Listbox, Transition } from '@headlessui/react'

import { getSelectValueOption } from '../../helpers'
import { IOptionSelect } from "../../interfaces"


interface Props {
    optionKey: string
    options  : IOptionSelect[]
    setOption: ( value:string ) => void
}

export const Select: FC<Props> = ({ optionKey, options, setOption }) => {

    const [selected, setSelected] = useState<string>( optionKey )
    const [selectedValue, setSelectedValue] = useState(getSelectValueOption( options, optionKey ))
    
    const onChangeOption = ( value:string ) => {
        setSelected(value)
        setSelectedValue(getSelectValueOption( options, value ))        
        setOption(value)
    }

    return (
        <div className="flex w-full">
            <span className="flex justify-center items-center px-3 py-2 border border-r-0 rounded-tl-md rounded-bl-md">
                <i className='bx bx-calendar-event text-slate-700' ></i>
            </span>
            <Listbox value={selected} onChange={(value)=> onChangeOption( value )}>
                <div className="relative w-full">
                    <Listbox.Button className="relative w-full border px-3 py-2 rounded-tr-md rounded-br-md flex-1 bg-white pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                        <span className="block truncate">{ selectedValue }</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <i className='bx bx-expand-vertical'></i>
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.key}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-200 text-slate-800' : 'text-gray-900'
                                        }`
                                    }
                                    value={option.key}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {option.value}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-800">
                                                    <i className='bx bx-check'></i>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
