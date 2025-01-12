import { Storage } from '@/data/interfaces/services/Storage.interface'
import { storageImpl } from '@/data/services/Storage.impl'
import { NodeD3 } from '@/domain/entities/Node'
import { localStorageKeys } from '@/features/session/static/keys'

class LabelManager {
  private DEFAULT_COLOR = '#bdbdbd'
  private COLORS = [
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

  constructor(private readonly storage: Storage) {}

  getColor = (label?: string) => {
    return !label
      ? this.DEFAULT_COLOR
      : this.storage.get(localStorageKeys.labels)?.[label] || this.DEFAULT_COLOR
  }

  getLabels = () => {
    return this.storage.get(localStorageKeys.labels) as KeyValue<string, string>
  }

  addLabel = (label: string) => {
    const labelsColor: KeyValue<string, string> =
      storageImpl.get(localStorageKeys.labels) || {}

    if (labelsColor) {
      const labels = Object.keys(labelsColor)

      if (!labels.includes(label)) {
        labelsColor[label] =
          this.COLORS.find(
            (color) => !Object.values(labelsColor).includes(color),
          ) || this.COLORS[labels.length % this.COLORS.length]
        this.storage.set(localStorageKeys.labels, labelsColor)
      }
    } else {
      labelsColor[label] = this.COLORS[0]
      this.storage.set(localStorageKeys.labels, labelsColor)
    }
  }

  removeLabel = (label: string) => {
    const labelsColor = this.storage.get(localStorageKeys.labels)

    if (labelsColor) {
      delete labelsColor[label]
      this.storage.set(localStorageKeys.labels, labelsColor)
    }
  }

  getPropertyToDisplay = (node: NodeD3) => {
    if (node.settings.propertyToDisplay) {
      return node.settings.propertyToDisplay
    }

    const keys = Object.keys(node.properties).map((keys) => keys.toLowerCase())

    switch (true) {
      case keys.includes('name'):
        return node.properties['name']
      case keys.includes('title'):
        return node.properties['title']
      default:
        return node.properties[keys[0]]
    }
  }
}

export const labelManager = new LabelManager(storageImpl)
