import { FC } from 'react'
import StepArrow from '@/assets/icons/StepArrowIcon'
import Step from '@/ui/Stepper/Step'
import { cn } from '@/utils/dom'

interface Props {
  steps: string[]
  current: number
}

const Stepper: FC<Props> = ({ steps, current }) => (
  <ol className="text-main-gray dark:main-gray-400 flex w-full cursor-default items-center space-x-4 rounded-lg text-center text-sm font-medium shadow-sm sm:text-base rtl:space-x-reverse">
    {steps.map((step, i) => (
      <>
        <Step index={i} label={step} completed={i < current} />
        {i < steps.length - 1 && (
          <StepArrow
            className={cn(
              'ms-2 h-3 w-3 sm:ms-4 rtl:rotate-180',
              i < current ? 'text-light-blue' : 'text-main-gray',
            )}
          />
        )}
      </>
    ))}
  </ol>
)

export default Stepper
