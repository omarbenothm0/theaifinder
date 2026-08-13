/**
 * One-off visual migration: slate/emerald SaaS palette → homepage design tokens.
 * Skips admin/, preserves semantic amber/rose/red.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'admin']);

const REPLACEMENTS = [
  // Dark hero bands
  ['bg-slate-900', 'bg-inverted'],
  ['border-slate-800', 'border-inverted-foreground/20'],
  ['bg-slate-800/90', 'bg-inverted-foreground/10'],
  ['bg-slate-800', 'bg-inverted-foreground/10'],
  ['border-slate-700/80', 'border-inverted-foreground/20'],
  ['border-slate-700', 'border-inverted-foreground/20'],
  ['text-slate-300', 'text-inverted-foreground/70'],
  ['text-slate-200', 'text-inverted-foreground/80'],

  // Brand emerald → accent / primary
  ['bg-emerald-950', 'bg-accent/10'],
  ['border-emerald-800', 'border-accent/30'],
  ['border-emerald-500/30', 'border-accent/30'],
  ['border-emerald-200', 'border-accent/20'],
  ['bg-emerald-500/10', 'bg-accent/10'],
  ['bg-emerald-50', 'bg-accent/10'],
  ['text-emerald-300', 'text-accent'],
  ['text-emerald-400', 'text-accent'],
  ['text-emerald-600', 'text-accent'],
  ['text-emerald-700', 'text-accent'],
  ['hover:text-emerald-600', 'hover:text-accent'],
  ['hover:text-emerald-500', 'hover:text-accent'],
  ['hover:text-emerald-400', 'hover:text-accent'],
  ['group-hover:text-emerald-400', 'group-hover:text-accent'],
  ['group-hover:text-emerald-600', 'group-hover:text-accent'],
  ['decoration-emerald-300', 'decoration-accent/40'],
  ['focus:ring-emerald-500', 'focus:ring-accent'],
  ['from-emerald-50', 'from-accent/5'],
  ['via-white', 'via-background-raised'],
  ['to-amber-50', 'to-rating/5'],

  // CTAs
  ['bg-emerald-600 hover:bg-emerald-500', 'bg-primary hover:bg-foreground/90'],
  ['bg-emerald-600 hover:bg-emerald-700', 'bg-primary hover:bg-foreground/90'],
  ['bg-emerald-600', 'bg-primary'],
  ['hover:bg-emerald-700', 'hover:bg-foreground/90'],
  ['hover:bg-emerald-500', 'hover:bg-foreground/90'],

  // Indigo persona accents → accent
  ['text-indigo-600', 'text-accent'],
  ['text-indigo-700', 'text-accent'],
  ['bg-indigo-50', 'bg-accent/10'],
  ['border-indigo-200', 'border-accent/20'],
  ['hover:text-indigo-600', 'hover:text-accent'],
  ['hover:bg-indigo-50', 'hover:bg-accent/10'],

  // Light surfaces
  ['bg-white', 'bg-background-raised'],
  ['border-slate-200', 'border-border/50'],
  ['border-slate-100', 'border-border/30'],
  ['border-slate-300', 'border-border'],
  ['text-slate-900', 'text-foreground-strong'],
  ['text-slate-800', 'text-foreground-strong'],
  ['text-slate-700', 'text-foreground'],
  ['text-slate-600', 'text-muted-foreground'],
  ['text-slate-500', 'text-muted-foreground'],
  ['hover:text-slate-900', 'hover:text-foreground-strong'],
  ['hover:text-slate-700', 'hover:text-foreground'],
  ['bg-slate-50', 'bg-background'],
  ['bg-slate-100', 'bg-foreground/5'],
  ['hover:bg-slate-100', 'hover:bg-foreground/5'],
  ['hover:bg-slate-200/80', 'hover:bg-foreground/8'],
  ['hover:bg-slate-200', 'hover:bg-foreground/8'],

  // Selected / inverted states on light UI
  ['bg-slate-900 text-white', 'bg-primary text-primary-foreground'],
  ['border-slate-900', 'border-primary'],

  // Ratings → semantic token (keep amber feel)
  ['fill-amber-400', 'fill-rating'],
  ['fill-amber-500', 'fill-rating'],
  ['text-amber-400', 'text-rating'],
  ['text-amber-500', 'text-rating'],
  ['text-amber-600', 'text-rating'],
  ['text-amber-700', 'text-rating'],
  ['bg-amber-50', 'bg-rating/10'],
  ['border-amber-200', 'border-rating/20'],

  // Typography weight — match homepage editorial feel
  ['font-extrabold', 'font-medium'],
];

function shouldProcess(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (!rel.endsWith('.tsx') && !rel.endsWith('.ts')) return false;
  if (rel.startsWith('app/admin/') || rel.startsWith('components/admin/')) return false;
  if (rel.includes('node_modules')) return false;
  return true;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, files);
    } else if (shouldProcess(full)) {
      files.push(full);
    }
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [from, to] of REPLACEMENTS) {
    content = content.split(from).join(to);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changed++;
    console.log('updated:', path.relative(ROOT, file));
  }
}

console.log(`\nDone. ${changed} files updated.`);
