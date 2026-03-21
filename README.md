# Learn with Miz

> 日本人のためのやさしいオランダ語レッスン  
> Friendly Dutch lessons for Japanese learners in the Netherlands

A modern, responsive MVP website for a Dutch language teaching platform aimed at Japanese people living in the Netherlands.

## ✨ Features

- 🌐 **Bilingual**: Japanese (default) and English support
- 📱 **Responsive**: Works beautifully on mobile, tablet, and desktop
- 🎨 **Modern Design**: Clean, minimalist, Japanese-friendly aesthetics
- ⚡ **Fast**: Built with Next.js App Router and optimized for performance
- 🔍 **SEO Ready**: Proper metadata and semantic HTML
- ♿ **Accessible**: Focus states, semantic markup, and screen reader friendly

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- Custom i18n implementation - Lightweight localization

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About Miz page
│   ├── contact/           # Contact / Waitlist page
│   ├── faq/               # FAQ page
│   ├── learn-dutch/       # Dutch learning guide page
│   ├── lessons/           # Lessons page
│   ├── globals.css        # Global styles and Tailwind config
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ContactForm.tsx
│   ├── CTASection.tsx
│   ├── FAQAccordion.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── InstructorCard.tsx
│   ├── LanguageSwitcher.tsx
│   ├── LessonCard.tsx
│   ├── Navbar.tsx
│   ├── NewsletterSignup.tsx
│   ├── SectionHeader.tsx
│   └── index.ts
└── i18n/                  # Internationalization
    ├── config.ts          # Language configuration
    ├── dictionaries/      # Translation files
    │   ├── ja.ts          # Japanese (default)
    │   ├── en.ts          # English
    │   └── index.ts
    ├── LanguageContext.tsx # React context for language
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/learnwithmiz.git
cd learnwithmiz
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📄 Pages

| Page | Description |
|------|-------------|
| `/` | Home - Hero, value proposition, learning path overview |
| `/about` | About Miz - Instructor introduction and teaching philosophy |
| `/learn-dutch` | Dutch Learning Guide - Free guidance and study tips |
| `/lessons` | Lessons - Available lesson types and future offerings |
| `/faq` | FAQ - Common questions about learning Dutch |
| `/contact` | Contact / Waitlist - Lead capture form |

## 🎨 Brand Colors

| Color | Value | Usage |
|-------|-------|-------|
| Sage Green | `#5a7d5a` | Primary accent, CTAs |
| Warm White | `#faf9f7` | Background |
| Stone | Tailwind default | Text and borders |
| Dusty Red | `#c44e4e` | Optional highlight accent |

## 🌍 Localization

The site supports Japanese (default) and English. Language preference is stored in localStorage.

### Adding a New Language

1. Create a new dictionary file in `src/i18n/dictionaries/`:
```typescript
// src/i18n/dictionaries/nl.ts
import { Dictionary } from './ja';

export const nl: Dictionary = {
  // Copy structure from ja.ts and translate
};
```

2. Add the locale to `src/i18n/config.ts`:
```typescript
export const locales = ['ja', 'en', 'nl'] as const;
```

3. Import in `src/i18n/dictionaries/index.ts`:
```typescript
import { nl } from './nl';

const dictionaries = { ja, en, nl };
```

## 🔮 Future Development

The codebase is structured to easily add:

- 💳 Stripe payment integration
- 📺 Course/video content system
- 🔐 User authentication
- 📅 Lesson booking system
- 📝 Blog/articles
- 👥 Multi-instructor support

## 📝 License

MIT License - feel free to use this as a template for your own projects.

---

Built with 💚 for Japanese learners in the Netherlands
