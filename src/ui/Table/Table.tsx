import { FC } from 'react'
import Body from '@/ui/Table/Body'
import Head from '@/ui/Table/Head'
import { cn } from '@/utils/dom'

interface Props {
  data: KeyValue<string, string | number[]>
  className?: string
  deleteAction?: (i: number) => void
}

const Table: FC<Props> = ({ data, deleteAction, className }) => {
  const header = (() => {
    const header = Object.keys(data)

    if (!!deleteAction) {
      header.push('Action')
    }

    return header
  })()

  return (
    <div className={cn('relative overflow-x-auto rounded-lg', className)}>
      <table className="w-full text-left text-sm text-main-gray">
        <Head labels={header} />
        <Body data={Object.keys(data).map((key) => data[key])} deleteAction={deleteAction} />
      </table>
    </div>
  )
}

export default Table
