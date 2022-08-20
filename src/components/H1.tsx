import clsx from 'clsx'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function H1(
  props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
) {
  const { className = '', ...rest } = props
  return <h1 className={clsx('text-lg mb-3 text-yellow-300', className)} {...rest} />
}
