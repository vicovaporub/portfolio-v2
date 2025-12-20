interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    className?: string;
}

export default function ErrorMessage({ message, onRetry, className = '' }: ErrorMessageProps) {
    return (
        <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
            <div className="mb-4 text-4xl">⚠️</div>
            <p className="text-[var(--text-secondary)] mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 rounded-md border border-[var(--tab-border)] bg-[var(--tab-bg)] hover:bg-[var(--tab-hover-bg)] text-[var(--text-secondary)] theme-transition"
                >
                    Try again
                </button>
            )}
        </div>
    );
}

