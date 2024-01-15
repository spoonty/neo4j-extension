import { FC, PropsWithChildren } from 'react'
import QuestionIcon from '@/assets/icons/QuestionIcon'
import { cn } from '@/utils/dom'

interface Props extends PropsWithChildren {
  className?: string
}

const Clue: FC<Props> = ({ children, className }) => (
  <div
    className={cn(
      'flex cursor-default items-center text-sm leading-4 text-main-gray',
      className,
    )}
  >
    <QuestionIcon
      width="20"
      height="20"
      className="me-3 inline h-4 w-4 flex-shrink-0"
    />
    <span>{children}</span>
  </div>
)

export default Clue
