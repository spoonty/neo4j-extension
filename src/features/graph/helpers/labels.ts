import {storageImpl} from "@/data/services/Storage.impl";

const DEFAULT_COLOR = '#bdbdbd';

const Labels = [
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

export const defineLabelColor = (label?: string) => {
    if (!label) {
        return DEFAULT_COLOR;
    }

    return storageImpl.get('labels')[label] || DEFAULT_COLOR;
}

export const addLabelToStorage = (label: string) => {
    const labelsColor: KeyValue<string, string> = storageImpl.get('labels') || {};

    if (labelsColor) {
        const labels = Object.keys(labelsColor);

        if (!labels.includes(label)) {
            labelsColor[label] = Labels.find((color) => !Object.values(labelsColor).includes(color)) || Labels[labels.length % Labels.length];
            storageImpl.set('labels', labelsColor);
        }
    } else {
        labelsColor[label] = Labels[0];
        storageImpl.set('labels', labelsColor);
    }
}

export const removeLabelFromStorage = (label: string) => {
    const labelsColor = storageImpl.get('labels');

    if (labelsColor) {
        delete labelsColor[label]
        storageImpl.set('labels', labelsColor);
    }
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
