import LabelsList from '@/features/filtration/ui/LabelsList'
import Pagination from '@/features/filtration/ui/Pagination'
import TypesList from '@/features/filtration/ui/TypesList'

export default function View() {
  return (
    <div className="fixed end-6 top-6 flex h-[calc(100%-48px)] w-[300px] flex-col gap-6 rounded-xl border border-border-dark bg-main-dark-opacity p-4 shadow-md backdrop-blur-md">
      <LabelsList />
      <TypesList />
      <Pagination />
    </div>
  )
}
