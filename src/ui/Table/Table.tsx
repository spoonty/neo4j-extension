import { FC } from 'react'
import Body from '@/ui/Table/Body'
import Head from '@/ui/Table/Head'
import { cn } from '@/utils/dom'

interface Props {
  data: KeyValue<string, string[]>
  className?: string
}

const Table: FC<Props> = ({ data, className }) => (
  <div className="relative overflow-x-auto rounded-lg">
    <table className={cn('text-main-gray w-full text-left text-sm', className)}>
      <Head labels={Object.keys(data)} />
      <Body data={Object.keys(data).map((key) => data[key])} />
    </table>
  </div>
)

export default Table
