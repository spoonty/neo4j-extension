const Labels = [
  '#bdbdbd',
  '#29b6f6',
  '#ffee58',
  '#66bb6a',
  '#ef5350',
  '#78909c',
  '#ff7043',
  '#7e57c2',
  '#26c6da',
  '#ffca28',
  '#9ccc65',
  '#ec407a',
  '#8d6e63',
  '#5c6bc0',
  '#26a69a',
  '#ffa726',
  '#d4e157',
  '#ab47bc',
]

export const defineLabelColor = (labels: string[], label?: string) => {
  if (!label?.length) {
    return Labels[0]
  }

  const labelIndex = labels.findIndex((l) => l === label) + 1

  return labelIndex === -1 ? Labels[labels.length] : Labels[labelIndex]
}

export const getPropertyToDisplay = (node: any) => {
  const keys = Object.keys(node.properties).map((keys) => keys.toLowerCase())

  if (keys.includes('name')) {
    return node.properties['name']
  }

  if (keys.includes('title')) {
    return node.properties['title']
  }

  return node.properties[keys[0]]
}