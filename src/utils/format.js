const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseCalendarDate(value) {
  if (!value) return null;
  const datePart = typeof value === 'string' ? value.match(/^(\d{4}-\d{2}-\d{2})(?:$|[T ])/)?.[1] : null;
  const date = datePart ? new Date(`${datePart}T00:00:00Z`) : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return { date, datePart };
}

export function formatCalendarDate(value) {
  const parsed = parseCalendarDate(value);
  if (!parsed) return '—';
  return parsed.date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(parsed.datePart ? { timeZone: 'UTC' } : {}),
  });
}

function dateParts(value) {
  const parsed = parseCalendarDate(value);
  if (!parsed) return null;
  return parsed.datePart
    ? { year: parsed.date.getUTCFullYear(), month: parsed.date.getUTCMonth(), day: parsed.date.getUTCDate() }
    : { year: parsed.date.getFullYear(), month: parsed.date.getMonth(), day: parsed.date.getDate() };
}

/** "19 Mar" — the date box used on the WordPress blog list */
export function dayMonth(iso) {
  const date = dateParts(iso);
  if (!date) return { day: '', month: '' };
  return { day: date.day, month: MONTHS[date.month] || '' };
}

/** "Mar 19th 2024" — the format used in the Recent Posts widget */
export function longDate(iso) {
  const date = dateParts(iso);
  if (!date) return '';
  const n = date.day;
  const suffix = n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th';
  return `${MONTHS[date.month] || ''} ${n}${suffix} ${date.year}`;
}

export function truncate(text, n = 60) {
  if (!text) return '';
  return text.length > n ? `${text.slice(0, n).replace(/\s+\S*$/, '')}...` : text;
}

export function decodeEntities(str) {
  if (!str) return '';
  const t = document.createElement('textarea');
  t.innerHTML = str;
  return t.value;
}
