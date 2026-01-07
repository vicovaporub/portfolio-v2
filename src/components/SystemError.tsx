'use client';

import React from 'react';

interface SystemErrorProps {
    error?: Error & { digest?: string };
    reset?: () => void;
}

export default function SystemError({ error, reset }: SystemErrorProps) {
    const title = "System Critical Failure";
    const subtitle = "The application encountered an unrecoverable error during the boot sequence.";
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0d1117] text-[#c9d1d9] font-mono p-4">
            <div className="max-w-md w-full border border-red-500/30 bg-red-950/10 rounded-lg p-6 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-red-500/20 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <h1 className="text-xl font-bold text-red-400 tracking-tight">ERROR: CONNECTION_REFUSED</h1>
                </div>

                <div className="space-y-4 mb-8">
                    <p className="text-sm leading-relaxed opacity-90">
                        <span className="text-blue-400">root@portfolio:~$</span> <span className="text-yellow-300">./init.sh --force</span>
                        <br/>
                        <span className="text-red-400">Error:</span> {title}
                        <br/>
                        <span className="text-gray-500 text-xs mt-2 block">{subtitle}</span>
                    </p>

                    {error && (
                        <div className="bg-black/50 rounded p-3 text-xs font-mono text-red-300 overflow-x-auto border border-red-900/50">
                            <p className="whitespace-pre-wrap break-all">
                                {error.message || "Unknown error occurred"}
                            </p>
                            {error.digest && (
                                <p className="mt-2 text-gray-500">Digest: {error.digest}</p>
                            )}
                        </div>
                    )}
                </div>

                {reset && (
                    <button
                        onClick={reset}
                        className="w-full group relative px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 hover:border-red-400 text-red-400 text-sm font-medium rounded transition-all duration-200"
                    >
                        <span className="absolute inset-y-0 left-0 w-1 bg-red-500 group-hover:w-full group-hover:opacity-10 transition-all duration-300 rounded-l" />
                        <span className="relative flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            REBOOT_SYSTEM()
                        </span>
                    </button>
                )}
            </div>
            
            <footer className="mt-12 text-center text-xs text-gray-600">
                <p>KERNEL_PANIC_HANDLER_V2.0.4</p>
                <p className="mt-1">Please check your internet connection or database configuration.</p>
            </footer>
        </div>
    );
}
