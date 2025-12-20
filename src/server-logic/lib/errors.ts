export enum ErrorCode {
    DATABASE_ERROR = 'DATABASE_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
}

interface SupabaseError {
    message?: string;
    code?: string;
    details?: string;
    hint?: string;
}

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: ErrorCode;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode: number = 500,
        code: ErrorCode = ErrorCode.INTERNAL_ERROR,
        isOperational: boolean = true
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }

    static fromSupabaseError(error: SupabaseError | Error | unknown, defaultMessage: string = 'Database operation failed'): AppError {
        // Supabase errors geralmente têm uma estrutura específica
        const message = (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string')
            ? error.message
            : defaultMessage;
        const errorCode = (error && typeof error === 'object' && 'code' in error && typeof error.code === 'string')
            ? error.code
            : undefined;
        const code = errorCode === 'PGRST116' ? ErrorCode.NOT_FOUND : ErrorCode.DATABASE_ERROR;
        const statusCode = errorCode === 'PGRST116' ? 404 : 500;

        return new AppError(message, statusCode, code);
    }

    static notFound(resource: string, identifier?: string): AppError {
        const message = identifier
            ? `${resource} with id "${identifier}" not found`
            : `${resource} not found`;
        return new AppError(message, 404, ErrorCode.NOT_FOUND);
    }

    static validation(message: string): AppError {
        return new AppError(message, 400, ErrorCode.VALIDATION_ERROR);
    }
}

