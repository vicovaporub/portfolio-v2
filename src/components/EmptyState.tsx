'use client';

import React from 'react';
import { useLocale } from '@/hooks/useLocale';
import { getLocalizedText, portfolioTexts } from '@/lib/base';

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export default function EmptyState({
    title,
    message,
    icon,
    actionLabel,
    onAction,
    className = ""
}: EmptyStateProps) {
    const { locale } = useLocale();
    
    const displayTitle = title || getLocalizedText(portfolioTexts.common.noData, locale);
    const displayActionLabel = actionLabel || getLocalizedText(portfolioTexts.common.retry, locale);

    return (
        <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[300px] animate-in fade-in zoom-in duration-300 ${className}`}>
            <div className="mb-4 text-text-muted opacity-50">
                {icon || (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="48" 
                        height="48" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                    </svg>
                )}
            </div>
            
            <h3 className="text-lg font-semibold text-text-primary mb-2">
                {displayTitle}
            </h3>
            
            {message && (
                <p className="text-text-muted max-w-sm mb-6 text-sm">
                    {message}
                </p>
            )}

            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-accent-blue text-white hover:opacity-90 transition-opacity"
                >
                    {displayActionLabel}
                </button>
            )}
        </div>
    );
}
