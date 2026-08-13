/**
 * Cleanup pass: fix broken token replacements and remaining legacy palette in public pages.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'admin']);

const REPLACEMENTS = [
  // Fix broken merges from prior pass
  ['bg-accent/100/10', 'bg-accent/10'],
  ['bg-accent/10/50', 'bg-accent/10'],
  ['border-accent/20/80', 'border-accent/20'],
  ['hover:bg-accent/100', 'hover:bg-foreground/90'],
  ['bg-accent/100', 'bg-accent'],

  // Indigo → accent
  ['text-indigo-800', 'text-accent'],
  ['text-indigo-900', 'text-foreground-strong'],
  ['text-indigo-400', 'text-accent'],
  ['text-indigo-300', 'text-accent'],
  ['text-indigo-200/90', 'text-inverted-foreground/70'],
  ['text-indigo-600', 'text-accent'],
  ['border-indigo-500/30', 'border-accent/30'],
  ['border-indigo-300', 'border-accent/30'],
  ['hover:bg-indigo-100', 'hover:bg-accent/15'],
  ['hover:border-indigo-300', 'hover:border-accent/30'],
  ['bg-indigo-600', 'bg-primary'],
  ['bg-indigo-100', 'bg-accent/10'],
  ['hover:text-indigo-800', 'hover:text-foreground-strong'],

  // Remaining emerald brand accents
  ['text-emerald-950', 'text-foreground-strong'],
  ['text-emerald-900', 'text-accent'],
  ['text-emerald-800', 'text-accent'],
  ['hover:text-emerald-900', 'hover:text-foreground-strong'],
  ['hover:bg-emerald-100', 'hover:bg-accent/15'],
  ['border-emerald-600', 'border-accent'],
  ['border-emerald-400/40', 'border-accent/40'],
  ['border-emerald-300', 'border-accent/30'],
  ['border-emerald-100', 'border-accent/20'],
  ['bg-emerald-100', 'bg-accent/10'],
  ['bg-emerald-900', 'bg-inverted'],
  ['text-emerald-100', 'text-inverted-foreground/80'],

  // Remaining slate in public UI
  ['text-slate-400', 'text-muted-foreground'],
  ['bg-slate-400', 'bg-muted-foreground'],
  ['divide-slate-100', 'divide-border/30'],
  ['bg-slate-200', 'bg-border'],
  ['from-slate-900 to-slate-800', 'from-inverted to-inverted'],
];

function shouldProcess(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (!rel.endsWith('.tsx') && !rel.endsWith('.ts')) return false;
  if (rel.startsWith('app/admin/') || rel.startsWith('components/admin/')) return false;
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
    console.log('cleaned:', path.relative(ROOT, file));
  }
}

console.log(`\nDone. ${changed} files cleaned.`);
