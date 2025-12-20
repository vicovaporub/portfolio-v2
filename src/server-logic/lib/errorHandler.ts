import { NextResponse } from 'next/server';
import { AppError, ErrorCode } from './errors';

export interface ErrorResponse {
    error: {
        message: string;
        code: ErrorCode;
        statusCode: number;
    };
}

export function handleError(error: unknown): NextResponse<ErrorResponse> {
    // Se for uma instância de AppError, usa os dados dela
    if (error instanceof AppError) {
        return NextResponse.json(
            {
                error: {
                    message: error.message,
                    code: error.code,
                    statusCode: error.statusCode,
                },
            },
            { status: error.statusCode }
        );
    }

    // Se for um Error comum, converte para AppError
    if (error instanceof Error) {
        const appError = new AppError(
            error.message || 'An unexpected error occurred',
            500,
            ErrorCode.INTERNAL_ERROR
        );
        return NextResponse.json(
            {
                error: {
                    message: appError.message,
                    code: appError.code,
                    statusCode: appError.statusCode,
                },
            },
            { status: appError.statusCode }
        );
    }

    // Erro desconhecido
    const appError = new AppError(
        'An unexpected error occurred',
        500,
        ErrorCode.INTERNAL_ERROR
    );
    return NextResponse.json(
        {
            error: {
                message: appError.message,
                code: appError.code,
                statusCode: appError.statusCode,
            },
        },
        { status: 500 }
    );
}

export function asyncHandler<T>(
    handler: () => Promise<T>
): Promise<NextResponse<T | ErrorResponse>> {
    return handler().catch((error) => {
        return handleError(error);
    });
}

