'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

interface ProjectViewProps {
  projectId: string;
}

const projectData: Record<string, ProjectData> = {
  'project1': {
    id: 'project1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. Features include user authentication, product management, shopping cart, and payment integration.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Stripe'],
    imageUrl: '/project1-preview.png',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://ecommerce-platform.vercel.app',
    features: [
      'User authentication and authorization',
      'Product catalog with search and filtering',
      'Shopping cart and checkout process',
      'Payment integration with Stripe',
      'Admin dashboard for product management',
      'Responsive design for all devices'
    ]
  },
  'project2': {
    id: 'project2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Material-UI'],
    imageUrl: '/project2-preview.png',
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://task-manager-app.vercel.app',
    features: [
      'Real-time task updates',
      'Drag-and-drop task organization',
      'Team collaboration and sharing',
      'Task categories and priorities',
      'Progress tracking and analytics',
      'Mobile-responsive design'
    ]
  },
  'project3': {
    id: 'project3',
    title: 'Weather Dashboard',
    description: 'A weather application that provides current weather conditions, forecasts, and interactive maps using weather APIs.',
    technologies: ['Vue.js', 'Vuex', 'Axios', 'Chart.js', 'OpenWeather API', 'Vuetify'],
    imageUrl: '/project3-preview.png',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-dashboard.netlify.app',
    features: [
      'Current weather conditions',
      '5-day weather forecast',
      'Interactive weather maps',
      'Location-based weather data',
      'Weather alerts and notifications',
      'Historical weather data charts'
    ]
  }
};

export default function ProjectView({ projectId }: ProjectViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'code'>('overview');
  const project = projectData[projectId];

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-[var(--background)] text-[var(--text-primary)] theme-transition">
      {/* Project Header */}
      <div className="border-b border-[var(--tab-border)] p-4 theme-transition">
        <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-[var(--accent-blue-light)] text-[var(--accent-blue)] text-xs rounded border border-[var(--accent-blue)]/20 theme-transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--tab-border)] theme-transition">
        <div className="flex">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'features', label: 'Features' },
            { id: 'code', label: 'Code' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'features' | 'code')}
              className={`
                px-4 py-2 text-sm font-medium transition-colors theme-transition
                ${activeTab === tab.id 
                  ? 'text-[var(--accent-blue)] border-b-2 border-[var(--accent-blue)] bg-[var(--accent-blue-light)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 h-[calc(100%-200px)] overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {project.imageUrl && (
              <div className="bg-[var(--background-secondary)] rounded-lg p-4 theme-transition">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About this project</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
            </div>

            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--hover-bg)] hover:bg-[var(--border)] rounded text-sm transition-colors theme-transition"
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--accent-blue)] hover:bg-[var(--accent-blue-light)] rounded text-sm transition-colors"
                  style={{ color: 'white' }}
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[var(--accent-blue)] mr-2 mt-1">•</span>
                  <span className="text-[var(--text-secondary)]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Code Structure</h3>
            <div className="bg-[var(--background-secondary)] rounded-lg p-4 font-mono text-sm theme-transition">
              <pre className="text-[var(--text-secondary)]">
{`project-structure/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── index.tsx
│   │   └── ...
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── helpers.ts
├── public/
├── package.json
└── README.md`}
              </pre>
            </div>
            
            <div className="bg-[var(--background-secondary)] rounded-lg p-4 theme-transition">
              <h4 className="font-semibold mb-2">Key Dependencies</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">{tech}</span>
                    <span className="text-[var(--text-muted)]">latest</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 