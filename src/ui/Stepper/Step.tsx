import { FC } from 'react'
import StepArrow from '@/assets/icons/StepArrowIcon'
import { cn } from '@/utils/dom'

interface Props {
  index: number
  label: string
  completed: boolean
  className?: string
}

const Step: FC<Props> = ({ index, label, completed, className }) => (
  <li
    className={cn(
      'flex items-center',
      completed ? 'text-light-blue' : 'text-text-gray',
    )}
  >
    <span
      className={cn(
        'me-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs',
        completed ? 'border-light-blue' : 'border-text-gray',
      )}
    >
      {index + 1}
    </span>
    <span className="text-sm">{label}</span>
  </li>
)

export default Step
