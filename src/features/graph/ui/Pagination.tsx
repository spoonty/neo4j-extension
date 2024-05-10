import { useState } from 'react'
import { storageImpl } from '@/data/services/Storage.impl'
import { useGraphContext } from '@/features/graph/context'
import { localStorageKeys } from '@/features/session/static/keys'
import Button from '@/ui/Button/Button'

export default function Pagination() {
  const { graphSize, getGraphByRange } = useGraphContext()

  const [page, setPage] = useState(1)
  const size = Number(storageImpl.get(localStorageKeys.configuration).maxSize)

  const handler = (updatedPage: number) => {
    setPage(updatedPage)
    getGraphByRange(updatedPage, size)
  }

  return (
    <div className="fixed bottom-6 end-6 flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{' '}
        <span className="font-semibold text-white">
          {(page - 1) * size + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold text-white">
          {(page - 1) * size + size < graphSize
            ? (page - 1) * size + size
            : graphSize}
        </span>{' '}
        of <span className="font-semibold text-white">{graphSize}</span> nodes
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <Button
          className="h-8 items-center border-0 p-1 px-3 text-sm font-medium"
          onClick={() => handler(page - 1)}
          disabled={page <= 1}
        >
          Prev
        </Button>
        <Button
          className="h-8 items-center border-0 p-1 px-3 text-sm font-medium"
          onClick={() => handler(page + 1)}
          disabled={page * size > graphSize}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
