'use client';

interface WelcomeViewProps {
  onOpenFile?: (fileId: string) => void;
}

export default function WelcomeView({ onOpenFile }: WelcomeViewProps) {
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
      <div className="flex-1 flex flex-col pt-24 pl-24 space-y-12">
        {/* Main Title */}
        <div className="space-y-2">
          <div className="flex items-end justify-between max-w-2xl">
            <div>
              <h1 className="text-5xl font-light" style={{color: 'var(--accent-blue)'}}>{profileData.name}</h1>
              <p className="text-lg font-normal text-[var(--accent-blue)] tracking-wide mb-2">Portfolio Page</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-blue)]/80 flex items-center justify-center text-2xl font-bold">
              {profileData.avatar ? (
                <img 
                  src={profileData.avatar} 
                  alt={profileData.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                profileData.name.charAt(0)
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex w-full max-w-4xl space-x-16 mt-6">
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
        <div className="space-y-1 mt-8">
          <p className="text-xs text-[var(--accent-blue)] font-light tracking-wide">
            Desenvolvedor Full Stack • React • TypeScript • Node.js
          </p>
          <div className="flex space-x-6 text-xs text-[var(--accent-blue)] font-light tracking-wide">
            <span>📍 São Paulo, Brasil</span>
            <span>📧 seu.email@exemplo.com</span>
            <span>🐙 github.com/seuusuario</span>
          </div>
        </div>
      </div>
    </div>
  );
} 