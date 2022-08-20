import clsx from 'clsx'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}
export default function GroupInput(props: Props) {
  const { className = '', ...rest } = props
  return <div className={clsx('group', className)} {...rest} />
}
