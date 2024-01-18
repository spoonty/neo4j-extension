import { FC, useMemo } from 'react'
import ScrollArea from '@/ui/ScrollArea'
import { cn } from '@/utils/dom'

interface Props {
  data: any[][],
  deleteAction?: (i: number) => void
}

const Body: FC<Props> = ({ data, deleteAction }) => {
  const rows = useMemo(
    () => data[0].map((_, index) => data.map((row) => row[index])),
    [data],
  )

  return (
    <tbody>
      {rows.map((row, i) => (
        <tr
          className={cn(
            i % 2 ? 'bg-light-dark' : 'bg-transperent',
            i < rows.length - 1 && 'border-b border-border-dark',
          )}
        >
          {row.map((value) => (
            <td className="px-6 py-1.5">{value}</td>
          ))}
          {
            !!deleteAction && <td className="px-6 py-1.5" onClick={() => deleteAction(i)}>delete</td>
          }
        </tr>
      ))}
    </tbody>
  )
}

export default Body
