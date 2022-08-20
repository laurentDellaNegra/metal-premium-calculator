import clsx from 'clsx'
import { DetailedHTMLProps, LabelHTMLAttributes } from 'react'

export default function Label(
  props: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
) {
  const { className = '', ...rest } = props
  return <label className={clsx('group-focus-within:text-input-value', className)} {...rest} />
}
