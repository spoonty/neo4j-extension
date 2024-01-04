import { FC, useMemo } from 'react'
import ScrollArea from '@/ui/ScrollArea'
import { cn } from '@/utils/dom'

interface Props {
  data: string[][]
}

const Body: FC<Props> = ({ data }) => {
  const rows = useMemo(
    () => data[0].map((_, index) => data.map((row) => row[index])),
    [data],
  )

  return (
    <tbody>
      {rows.map((row, i) => (
        <tr
          className={cn(
            'bg-main-dark',
            i < rows.length - 1 && 'border-b border-border-dark',
          )}
        >
          {row.map((value) => (
            <td className="px-6 py-1.5">{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default Body
