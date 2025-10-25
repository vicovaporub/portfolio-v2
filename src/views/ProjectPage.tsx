'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';

export default function ProjectPage( { project } : { project: Project }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'code'>('overview');

    if (!project) {
        return (
            <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
                <p>Project not found</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{project.title}</h1>
        </div>
    //     <div className="h-full bg-[var(--background)] text-[var(--text-primary)] theme-transition">
    //       {/* Project Header */}
    //       <div className="border-b border-[var(--tab-border)] p-3 md:p-4 theme-transition">
    //         <h1 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h1>
    //         <p className="text-[13px] md:text-sm text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
        
    //         {/* Technologies */}
    //         <div className="flex flex-wrap gap-1 md:gap-2 mt-3 md:mt-4">
    //           {project.technologies.map((tech) => (
    //             <span
    //               key={tech}
    //               className="px-2 py-1 bg-[var(--accent-blue-light)] text-[var(--accent-blue)] text-xs rounded border border-[var(--accent-blue)]/20 theme-transition"
    //             >
    //               {tech}
    //             </span>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Tabs */}
    //       <div className="border-b border-[var(--tab-border)] theme-transition">
    //         <div className="flex">
    //           {[
    //             { id: 'overview', label: 'Overview' },
    //             { id: 'features', label: 'Features' },
    //             { id: 'code', label: 'Code' }
    //           ].map((tab) => (
    //             <button
    //               key={tab.id}
    //               onClick={() => setActiveTab(tab.id as 'overview' | 'features' | 'code')}
    //               className={`
    //                 px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors theme-transition
    //                 ${activeTab === tab.id 
    //                   ? 'text-[var(--accent-blue)] border-b-2 border-[var(--accent-blue)] bg-[var(--accent-blue-light)]' 
    //                   : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'
    //                 }
    //               `}
    //             >
    //               {tab.label}
    //             </button>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Tab Content */}
    //       <div className="p-3 md:p-4 h-[calc(100%-200px)] overflow-y-auto">
    //         {activeTab === 'overview' && (
    //           <div className="space-y-4 md:space-y-6">
    //             {project.imageUrl && (
    //               <div className="bg-[var(--background-secondary)] rounded-lg p-2 md:p-4 theme-transition">
    //                 <Image 
    //                   src={project.imageUrl} 
    //                   alt={project.title}
    //                   width={800}
    //                   height={400}
    //                   className="w-full h-32 md:h-48 object-cover rounded"
    //                 />
    //               </div>
    //             )}
            
    //             <div className="space-y-2 md:space-y-4">
    //               <h3 className="text-base md:text-lg font-semibold">About this project</h3>
    //               <p className="text-[13px] md:text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
    //             </div>

    //             <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
    //               {project.githubUrl && (
    //                 <a
    //                   href={project.githubUrl}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="px-3 md:px-4 py-2 bg-[var(--hover-bg)] hover:bg-[var(--border)] rounded text-xs md:text-sm transition-colors theme-transition text-center"
    //                 >
    //                   View on GitHub
    //                 </a>
    //               )}
    //               {project.liveUrl && (
    //                 <a
    //                   href={project.liveUrl}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="px-3 md:px-4 py-2 bg-[var(--accent-blue)] hover:bg-[var(--accent-blue-light)] rounded text-xs md:text-sm transition-colors text-white text-center"
    //                 >
    //                   Live Demo
    //                 </a>
    //               )}
    //             </div>
    //           </div>
    //         )}

    //         {activeTab === 'features' && (
    //           <div className="space-y-2 md:space-y-4">
    //             <h3 className="text-base md:text-lg font-semibold">Key Features</h3>
    //             <ul className="space-y-1 md:space-y-2">
    //               {project.features.map((feature, index) => (
    //                 <li key={index} className="flex items-start">
    //                   <span className="text-[var(--accent-blue)] mr-2 mt-1">•</span>
    //                   <span className="text-[13px] md:text-[var(--text-secondary)]">{feature}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         )}

    //         {activeTab === 'code' && (
    //           <div className="space-y-2 md:space-y-4">
    //             <h3 className="text-base md:text-lg font-semibold">Code Structure</h3>
    //             <div className="bg-[var(--background-secondary)] rounded-lg p-2 md:p-4 font-mono text-xs md:text-sm theme-transition">
    //               <pre className="text-[var(--text-secondary)]">
    // {`project-structure/\n├── src/\n│   ├── components/\n│   │   ├── Header.tsx\n│   │   ├── Footer.tsx\n│   │   └── ...\n│   ├── pages/\n│   │   ├── index.tsx\n│   │   └── ...\n│   ├── styles/\n│   │   └── globals.css\n│   └── utils/\n│       └── helpers.ts\n├── public/\n├── package.json\n└── README.md`}
    //               </pre>
    //             </div>
            
    //             <div className="bg-[var(--background-secondary)] rounded-lg p-2 md:p-4 theme-transition">
    //               <h4 className="font-semibold mb-2">Key Dependencies</h4>
    //               <div className="grid grid-cols-2 gap-1 md:gap-2 text-xs md:text-sm">
    //                 {project.technologies.map((tech) => (
    //                   <div key={tech} className="flex justify-between">
    //                     <span className="text-[var(--text-secondary)]">{tech}</span>
    //                     <span className="text-[var(--text-muted)]">latest</span>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    );
} 