import {Storage} from '@/data/interfaces/services/Storage.interface'

export class StorageImpl implements Storage {
    set(key: string, value: string | number | boolean | KeyValue<string, any> | (string | number | boolean | KeyValue<string, any>)[]) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    get(key: string) {
        const item = localStorage.getItem(key) || '""'
        return JSON.parse(item)
    }

    delete(key: string) {
        localStorage.removeItem(key)
    }

}