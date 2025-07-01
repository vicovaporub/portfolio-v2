import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Victor Castro',
    title: 'Desenvolvedor Full Stack',
    description: 'Desenvolvedor apaixonado por criar soluções inovadoras com React, TypeScript e Node.js.',
    experience: '5+ anos',
    location: 'São Paulo, Brasil',
    email: 'victor@exemplo.com',
    github: 'github.com/victorcastro'
  });
} 