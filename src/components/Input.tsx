import clsx from 'clsx'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export default function Input(
  props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  const { className = '', ...rest } = props
  return (
    <input
      className={clsx(
        'bg-inherit border-0 border-b-2 focus:ring-0 focus:border-b-gold focus:text-gold w-full',
        className
      )}
      {...rest}
    />
  )
}
