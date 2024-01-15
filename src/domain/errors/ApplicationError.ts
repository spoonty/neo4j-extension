import { IError } from '@/domain/errors/IError.interface'

export abstract class ApplicationError extends Error implements IError {}
