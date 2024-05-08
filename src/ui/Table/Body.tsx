import { FC, useMemo } from 'react'
import { cn } from '@/utils/dom'

interface Props {
  data: any[][]
  deleteAction?: (i: number) => void
  activeProperty?: number
  setActiveProperty?: (idx: number) => void
}

const Body: FC<Props> = ({
  data,
  activeProperty,
  setActiveProperty,
  deleteAction,
}) => {
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
            i === activeProperty && 'bg-light-blue',
          )}
          onClick={() => row[0] !== 'ID' && setActiveProperty?.(i)}
        >
          {row.map((value, i) => (
            <td className="px-6 py-1.5">
              {row[0] === 'ID' && i !== 0 ? value.split(':').at(-1) : value}
            </td>
          ))}
          {!!deleteAction && row[0] !== 'ID' && (
            <td
              className="cursor-pointer px-6 py-1.5 text-red-500"
              onClick={() => deleteAction(i)}
            >
              DELETE
            </td>
          )}
        </tr>
      ))}
    </tbody>
  )
}

export default Body
