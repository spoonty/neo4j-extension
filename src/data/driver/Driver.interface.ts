export interface Driver {
    connect(): void
    disconnect(): void
    execute(query: string): any
}