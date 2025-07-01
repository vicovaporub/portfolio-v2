import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    skills: [
      {
        id: 1,
        name: 'React',
        category: 'Frontend',
        level: 90,
        icon: '⚛️',
        color: '#61DAFB'
      },
      {
        id: 2,
        name: 'TypeScript',
        category: 'Frontend',
        level: 85,
        icon: '📘',
        color: '#3178C6'
      },
      {
        id: 3,
        name: 'Node.js',
        category: 'Backend',
        level: 80,
        icon: '🟢',
        color: '#339933'
      },
      {
        id: 4,
        name: 'Python',
        category: 'Backend',
        level: 75,
        icon: '🐍',
        color: '#3776AB'
      },
      {
        id: 5,
        name: 'Docker',
        category: 'DevOps',
        level: 70,
        icon: '🐳',
        color: '#2496ED'
      }
    ]
  });
} 