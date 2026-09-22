/** Tailwind config for the PrefBench leaderboard only. Loaded by src/app/(leaderboard)/leaderboard.css via @config,
 * so none of it reaches the personal site, whose styles come from tailwind.config.js. Colours are CSS variables so the
 * light and dark palettes (defined in leaderboard.css) switch with one class on <html>. */
module.exports = {
  content: ['./src/app/(leaderboard)/**/*.{js,jsx,ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: 'var(--lb-paper)',
        tint: 'var(--lb-tint)',
        ink: 'var(--lb-ink)',
        ink2: 'var(--lb-ink-2)',
        ink3: 'var(--lb-ink-3)',
        rule: 'var(--lb-rule)',
        api: 'var(--lb-api)',
        open: 'var(--lb-open)',
      },
      fontFamily: {
        serif: ['var(--font-lb-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-lb-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-lb-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { page: '1120px', prose: '68ch' },
    },
  },
  plugins: [],
};
