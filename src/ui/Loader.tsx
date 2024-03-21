import { FC } from 'react'
import Spinner from '@/assets/icons/SpinnerIcon'
import { cn } from '@/utils/dom'

interface Props {
  className?: string
}

const Loader: FC<Props> = ({ className }) => (
  <Spinner
    className={cn(
      'h-8 w-8 animate-spin fill-light-blue text-dark-gray',
      className,
    )}
  />
)

export default Loader
