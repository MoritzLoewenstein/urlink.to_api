export interface IStore {
    get: (key: string) => Promise<string | null>
    put: (value: string) => Promise<string>
}