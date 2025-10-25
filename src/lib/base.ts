import { Locale } from '@/types/locale';

export function parseLocalizedText(text: string, languageTag: Locale): string {
    if (!text.includes('^^')) {
        return text;
    }

    const parts = text.split('^^');
    const mainText = parts[0]; 

    for (let i = 1; i < parts.length; i++) {
        const [lang, ...content] = parts[i].split(':');
        if (lang.trim() === languageTag) {
            return content.join(':').trim();
        }
    }

    return mainText; 
}

export function getLocalizedText(text: string, languageTag: Locale): string {
    return parseLocalizedText(text, languageTag);
}

export function validateLocalizedTextFormat(text: string): boolean {
    if (!text.includes('^^')) {
        return true;
    }

    const parts = text.split('^^');
    if (parts.length < 2) {
        return false;
    }

    for (let i = 1; i < parts.length; i++) {
        if (!parts[i].includes(':')) {
            return false;
        }
    }

    return true;
}

export const portfolioTexts = {
    pages: {
        welcome: {
            title: 'Portfolio page ^^pt-BR:Página de Portfólio',
            mostUsedSkills: 'Most used skills ^^pt-BR:Habilidades mais usadas',
        },
        about: {
            title: 'About ^^pt-BR:Sobre',
        },
        projects: {
            title: 'Projects ^^pt-BR:Projetos',
            project: {
                title: 'Project ^^pt-BR:Projeto',
                description: 'Project description ^^pt-BR:Descrição do projeto',
                technologies: 'Technologies ^^pt-BR:Tecnologias',
                link: 'Link ^^pt-BR:Link'
            }
        },
        skills: {
            title: 'Skills ^^pt-BR:Habilidades',
            skill: {
                title: 'Skill ^^pt-BR:Habilidade',
                description: 'Skill description ^^pt-BR:Descrição da habilidade',
            }
        },
        contact: {
            title: 'Contact ^^pt-BR:Contato',
        }
    },
    menu: {
        menuLabel: 'Menu ^^pt-BR:Menu',
        menuItem: {
            about: 'About ^^pt-BR:Sobre',
            projects: 'Projects ^^pt-BR:Projetos',
            skills: 'Skills ^^pt-BR:Habilidades',
            contact: 'Contact ^^pt-BR:Contato'
        }
    }
}