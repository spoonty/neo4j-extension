import { useState } from 'react'
import LabelsList from '@/features/filtration/ui/LabelsList'
import Pagination from '@/features/filtration/ui/Pagination'
import Search from '@/features/filtration/ui/Search'
import TypesList from '@/features/filtration/ui/TypesList'
import { useGraphContext } from '@/features/graph/context'

export default function View() {
  const { labels, types, getByLabels, getByTypes, searchNodes } =
    useGraphContext()

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const labelsFiltrationHandler = async (label: string) => {
    let labels: string[] = []

    if (selectedLabels.includes(label)) {
      labels = selectedLabels.filter((l) => l !== label)
    } else {
      labels = [...selectedLabels, label]
    }

    setSelectedLabels(labels)

    await getByLabels(labels)
    setSelectedTypes([])
  }

  const typesFiltrationHandler = async (type: string) => {
    let types: string[] = []

    if (selectedTypes.includes(type)) {
      types = selectedTypes.filter((t) => t !== type)
    } else {
      types = [...selectedTypes, type]
    }

    setSelectedTypes(types)
    await getByTypes(types)
    setSelectedLabels([])
  }

  const searchByProperty = async (key: string, value: string) => {
    await searchNodes(key, value)

    setSelectedTypes([])
    setSelectedLabels([])
  }

  return (
    <div className="fixed end-6 top-6 flex h-[calc(100%-48px)] w-[300px] flex-col gap-6 rounded-xl border border-border-dark bg-main-dark-opacity p-4 shadow-md backdrop-blur-md">
      <h2 className="px-2 text-2xl font-bold leading-6 text-main-gray">
        Filtration
      </h2>
      <Search onSearch={searchByProperty} />
      <LabelsList
        labels={labels}
        selectedLabels={selectedLabels}
        handler={labelsFiltrationHandler}
      />
      <TypesList
        types={types}
        selectedTypes={selectedTypes}
        handler={typesFiltrationHandler}
      />
      {!selectedLabels.length && !selectedTypes.length && <Pagination />}
    </div>
  )
}
