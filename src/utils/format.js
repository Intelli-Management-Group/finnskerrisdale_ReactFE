const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "19 Mar" — the date box used on the WordPress blog list */
export function dayMonth(iso) {
  if (!iso) return { day: '', month: '' };
  const d = new Date(iso);
  return { day: d.getUTCDate(), month: MONTHS[d.getUTCMonth()] };
}

/** "Mar 19th 2024" — the format used in the Recent Posts widget */
export function longDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const n = d.getUTCDate();
  const suffix = n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th';
  return `${MONTHS[d.getUTCMonth()]} ${n}${suffix} ${d.getUTCFullYear()}`;
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
