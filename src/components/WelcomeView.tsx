'use client';

import { useState } from 'react';
import Image from 'next/image';

interface WelcomeViewProps {
  onOpenFile?: (fileId: string) => void;
}

export default function WelcomeView({ onOpenFile }: WelcomeViewProps) {
  const [apiResponse, setApiResponse] = useState<string>('');

  const callApi = async (endpoint: string) => {
    try {
      const response = await fetch(`/api/${endpoint}`);
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch {
      setApiResponse('Erro ao chamar API');
    }
  };

  const testAboutApi = () => callApi('get-about');
  const testProjectsApi = () => callApi('get-projects');
  const testSkillsApi = () => callApi('get-skills');
  const profileData = {
    name: 'Vico',
    avatar: '/avatar.jpg',
  };

  const leftActions = [
    { label: 'Sobre', action: () => onOpenFile?.('about'), icon: '📄' },
    { label: 'Projetos', action: () => onOpenFile?.('projects'), icon: '📁' },
    { label: 'Habilidades', action: () => onOpenFile?.('skills'), icon: '⚙️' },
    { label: 'Contato', action: () => onOpenFile?.('contact'), icon: '📧' },
  ];

  const apiActions = [
    { label: 'API About', action: testAboutApi, icon: '📄' },
    { label: 'API Projects', action: testProjectsApi, icon: '📁' },
    { label: 'API Skills', action: testSkillsApi, icon: '⚙️' },
  ];

  const rightItems = [
    { label: 'React', percentage: 90 },
    { label: 'TypeScript', percentage: 85 },
    { label: 'Node.js', percentage: 80 },
    { label: 'Python', percentage: 75 },
    { label: 'Docker', percentage: 70 },
  ];

  return (
    <div className="flex-1 bg-[var(--background)] text-[var(--text-primary)] flex flex-col theme-transition">
      {/* Header - Title */}
      <div className="flex-1 flex flex-col pt-8 md:pt-24 px-4 md:pl-24 space-y-8 md:space-y-12 w-full">
        {/* Main Title */}
        <div className="space-y-2">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between max-w-2xl w-full gap-4 md:gap-0">
            <div>
              <h1 className="text-3xl md:text-5xl font-light" style={{color: 'var(--accent-blue)'}}>{profileData.name}</h1>
              <p className="text-base md:text-lg font-normal text-[var(--accent-blue)] tracking-wide mb-2">Portfolio Page</p>
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-blue)]/80 flex items-center justify-center text-2xl font-bold">
              {profileData.avatar ? (
                <Image 
                  src={profileData.avatar} 
                  alt={profileData.name}
                  width={80}
                  height={80}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                profileData.name.charAt(0)
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-16 mt-4 md:mt-6">
          {/* Left Side - Actions */}
          <div className="flex-1 space-y-2">
            <h2 className="text-base font-semibold text-[var(--accent-blue)] mb-2 tracking-wide">Start</h2>
            {leftActions.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center space-x-3 p-2 text-left hover:bg-[var(--hover-bg)] rounded transition-colors group theme-transition"
              >
                <span className="text-base opacity-70 group-hover:opacity-100 text-[var(--accent-blue)]">{item.icon}</span>
                <span className="text-[var(--accent-blue)] group-hover:text-[var(--text-primary)] font-light tracking-wide text-[16px]">{item.label}</span>
              </button>
            ))}
            
            <h2 className="text-base font-semibold text-[var(--accent-blue)] mb-2 tracking-wide mt-6">API Tests</h2>
            {apiActions.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center space-x-3 p-2 text-left hover:bg-[var(--hover-bg)] rounded transition-colors group theme-transition"
              >
                <span className="text-base opacity-70 group-hover:opacity-100 text-[var(--accent-blue)]">{item.icon}</span>
                <span className="text-[var(--accent-blue)] group-hover:text-[var(--text-primary)] font-light tracking-wide text-[16px]">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Side - Skills with Percentage Bars */}
          <div className="flex-1 space-y-2">
            <h2 className="text-base font-semibold text-[var(--accent-blue)] mb-2 tracking-wide">Skills</h2>
            <div className="space-y-2">
              {rightItems.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--accent-blue)] font-light tracking-wide">{item.label}</span>
                    <span className="text-[var(--accent-blue)] font-light">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-[var(--border)] rounded-full h-1.5">
                    <div 
                      className="bg-[var(--accent-blue)] h-1.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Quick Info */}
        <div className="space-y-1 mt-6 md:mt-8">
          <p className="text-xs text-[var(--accent-blue)] font-light tracking-wide">
            Desenvolvedor Full Stack • React • TypeScript • Node.js
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-6 text-xs text-[var(--accent-blue)] font-light tracking-wide gap-1 sm:gap-0">
            <span>📍 São Paulo, Brasil</span>
            <span>📧 seu.email@exemplo.com</span>
            <span>🐙 github.com/seuusuario</span>
          </div>
        </div>

        {/* API Response */}
        {apiResponse && (
          <div className="mt-6 md:mt-8 p-4 bg-[var(--hover-bg)] rounded-lg border border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--accent-blue)] mb-2">Resposta da API:</h3>
            <pre className="text-xs text-[var(--text-primary)] whitespace-pre-wrap">{apiResponse}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 