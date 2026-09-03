import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Status signals. Use these instead of literal palette classes
        // (emerald-400 / amber-400 / red-400) so status colour follows the theme.
        live: 'hsl(var(--live))',
        warn: 'hsl(var(--warn))',
        critical: 'hsl(var(--critical))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      /*
       * 15 and 25 are absent from Tailwind's default opacity scale, so `bg-live/15`,
       * `bg-live/25` and friends silently generated no rule at all — the affected
       * chips and buttons rendered with a fully transparent background. Pre-existing:
       * the same classes were previously written as `bg-emerald-500/15` and were just
       * as dead. Adding the two stops makes the intended tints real.
       */
      opacity: {
        15: '0.15',
        25: '0.25',
      },
      /*
       * `text-primary` resolves to the contrast-corrected token while `bg-primary`,
       * `border-primary` and `ring-primary` keep the true brand crimson. Configuring
       * textColor separately is what makes this a one-line fix rather than a rename
       * across ~200 usages.
       */
      textColor: {
        primary: {
          // `text-primary` — the brand colour used as text, contrast-corrected per theme.
          DEFAULT: 'hsl(var(--primary-text))',
          // `text-primary-foreground` — the label ON a primary fill. Must be restated:
          // extending textColor.primary replaces the whole key, so declaring only
          // DEFAULT silently destroyed this one and every primary button rendered its
          // label in the inherited colour instead of white.
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
      maxWidth: {
        'site': '1280px',
        'prose': '720px',
      },
      fontSize: {
        'body': ['17px', { lineHeight: '1.65' }],
        'mono-sm': ['11px', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'mono-md': ['13px', { lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'patrol-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'hero-grid-pan': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '120px 120px' },
        },
        'hero-glow-drift-a': {
          '0%, 100%': { transform: 'translate(-6%, -4%) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate(4%, 6%) scale(1.15)', opacity: '0.85' },
        },
        'hero-glow-drift-b': {
          '0%, 100%': { transform: 'translate(5%, 4%) scale(1.05)', opacity: '0.4' },
          '50%': { transform: 'translate(-5%, -6%) scale(0.92)', opacity: '0.7' },
        },
        'logo-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'hero-scan-sweep': {
          '0%': { transform: 'translateY(-20%)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(120%)', opacity: '0' },
        },
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        'patrol-sweep': 'patrol-sweep 14s linear infinite',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'hero-grid-pan': 'hero-grid-pan 26s linear infinite',
        'hero-glow-drift-a': 'hero-glow-drift-a 16s ease-in-out infinite',
        'hero-glow-drift-b': 'hero-glow-drift-b 19s ease-in-out infinite',
        'hero-scan-sweep': 'hero-scan-sweep 9s cubic-bezier(0.4,0,0.2,1) infinite',
        'logo-marquee': 'logo-marquee 38s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
