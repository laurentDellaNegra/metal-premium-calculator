import clsx from 'clsx'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

function Container(props: ContainerProps) {
  const { className = '', ...rest } = props
  return (
    <div
      className={clsx(
        'bg-component-background border-2 border-border rounded border-b-8',
        className
      )}
      {...rest}
    />
  )
}

interface ContentProps {
  children: ReactNode
  className?: string
}

function Content(props: ContentProps) {
  const { className = '', ...rest } = props
  return <div className={clsx('p-5', className)} {...rest} />
}

interface FooterProps {
  children: ReactNode
  className?: string
}

function Footer(props: FooterProps) {
  const { className = '', ...rest } = props
  return (
    <div className={clsx('border-2 border-border rounded-b -m-[2px] p-5', className)} {...rest} />
  )
}

const Card = {
  Container,
  Content,
  Footer,
}
export default Card
