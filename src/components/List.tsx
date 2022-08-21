import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'

interface Props {
  values: Array<string>
  selectedValue: string
  onChange: (value: string) => void
}

export default function List(props: Props) {
  const { values, selectedValue, onChange } = props

  return (
    <div className="mx-auto max-w-[100px]">
      <Listbox value={selectedValue} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-component-background border-2 border-border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-gold sm:text-sm">
            <span className="block truncate">{selectedValue}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-text-and-icon" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-component-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border-2 border-border">
              {values.map((value, currentIndex) => (
                <Listbox.Option
                  key={currentIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none px-4 py-2 ${
                      active ? 'bg-active-background' : 'bg-component-background'
                    }`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium text-input-value' : 'font-normal'
                        }`}
                      >
                        {value}
                      </span>
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
