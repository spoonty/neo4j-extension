import { FC, useMemo } from 'react'
import { cn } from '@/utils/dom'

interface Props {
  data: string[][]
}

const Body: FC<Props> = ({ data }) => {
  const rows = useMemo(() => {
    let res: string[][] = []

    for (let i = 0; i < data.length; i++) {
      res.push([])

      for (let j = 0; j < data[i].length; j++) {
        res[i].push(data[j][i])
      }
    }

    return res
  }, [data])

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
