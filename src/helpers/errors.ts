import { Request, Response } from 'express'

export class ErrorHandler extends Error {
    statusCode: number
    message: string

    constructor (statusCode: number, message: string) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

export const handleError = (
    error: any,
    request: Request,
    response: Response,
    next: any
) => {
    console.log(typeof error)
    const { statusCode, message } = error
    response.status(statusCode).json({
        error: {
            statusCode,
            message
        }
    })
}
