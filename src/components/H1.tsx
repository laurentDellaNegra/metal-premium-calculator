import clsx from 'clsx'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function H1(
  props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
) {
  const { className = '', ...rest } = props
  return (
    <h1
      className={clsx('flex items-center justify-center text-lg mb-5 text-input-value', className)}
      {...rest}
    />
  )
}
