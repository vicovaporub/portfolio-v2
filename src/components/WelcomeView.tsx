'use client';

interface WelcomeViewProps {
  onOpenFile?: (fileId: string) => void;
}

export default function WelcomeView({ onOpenFile }: WelcomeViewProps) {
  const profileData = {
    name: 'Nome',
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
    <div className="flex-1 bg-[#1e1e1e] text-white flex flex-col">
      {/* Header - Title */}
      <div className="flex-1 flex flex-col pt-24 pl-24 space-y-12">
        {/* Main Title */}
        <div className="space-y-2">
          <div className="flex items-end justify-between max-w-2xl">
            <div>
              <h1 className="text-5xl font-light text-blue-200 tracking-tight mb-1">{profileData.name}</h1>
              <p className="text-lg font-normal text-blue-300 tracking-wide mb-2">Portfolio evolved</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
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
            <h2 className="text-base font-semibold text-blue-200 mb-2 tracking-wide">Start</h2>
            {leftActions.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-700/40 rounded transition-colors group"
              >
                <span className="text-base opacity-70 group-hover:opacity-100 text-blue-300">{item.icon}</span>
                <span className="text-blue-200 group-hover:text-white font-light tracking-wide text-[16px]">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Side - Skills with Percentage Bars */}
          <div className="flex-1 space-y-2">
            <h2 className="text-base font-semibold text-blue-200 mb-2 tracking-wide">Skills</h2>
            <div className="space-y-2">
              {rightItems.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200 font-light tracking-wide">{item.label}</span>
                    <span className="text-blue-400 font-light">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-400 h-1.5 rounded-full transition-all duration-1000 ease-out" 
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
          <p className="text-xs text-blue-200 font-light tracking-wide">
            Desenvolvedor Full Stack • React • TypeScript • Node.js
          </p>
          <div className="flex space-x-6 text-xs text-blue-300 font-light tracking-wide">
            <span>📍 São Paulo, Brasil</span>
            <span>📧 seu.email@exemplo.com</span>
            <span>🐙 github.com/seuusuario</span>
          </div>
        </div>
      </div>
    </div>
  );
} 