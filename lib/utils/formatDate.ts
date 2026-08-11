/** Human-readable date for public "Information verified" display (e.g. August 11, 2026). */
export function formatInformationVerifiedDate(isoDate: string): string {
  const trimmed = isoDate.trim();
  if (!trimmed) return '';

  const dateOnly = trimmed.includes('T') ? trimmed.split('T')[0]! : trimmed;
  const parsed = new Date(`${dateOnly}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return trimmed;
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
