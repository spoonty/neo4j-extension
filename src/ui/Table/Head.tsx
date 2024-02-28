import {FC} from 'react'

interface Props {
    labels: string[]
}

const Head: FC<Props> = ({labels}) => (
    <thead className="bg-dark-gray text-xs uppercase">
    <tr>
        {labels.map((label) => (
            <th className="px-6 py-1.5">{label}</th>
        ))}
    </tr>
    </thead>
)

export default Head
