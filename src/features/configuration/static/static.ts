export type Configuration = {
  maxSize: number
  checkAccessRights: boolean
  nodeFocus: boolean
  animations: boolean
}

export const DEFAULT_CONFIGURATION: Configuration = {
  maxSize: 300,
  checkAccessRights: true,
  nodeFocus: true,
  animations: true,
}
