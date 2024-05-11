import { useState } from 'react'
import LabelsList from '@/features/filtration/ui/LabelsList'
import Pagination from '@/features/filtration/ui/Pagination'
import TypesList from '@/features/filtration/ui/TypesList'
import { useGraphContext } from '@/features/graph/context'

export default function View() {
  const { labels, types, getByLabels, getByTypes } = useGraphContext()

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

  return (
    <div className="fixed end-6 top-6 flex h-[calc(100%-48px)] w-[300px] flex-col gap-6 rounded-xl border border-border-dark bg-main-dark-opacity p-4 shadow-md backdrop-blur-md">
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
