export function getTimeStraing(ts: number): string {
  const d = new Date(ts);
  const delta: number = (Date.now() - ts) / 1000;

  if (delta < 60) return '1 минуту назад';
  else if (delta < 5 * 60) return '5 минуту назад';
  else if (delta < 10 * 60) return '10 минуту назад';
  else if (delta < 30 * 60) return '30 минуту назад';
  else if (delta < 24 * 60 * 60) return zeroPad(d.getHours(), 2) + ':' + zeroPad(d.getMinutes(), 2);
  else if (delta < 30 * 24 * 60 * 60) return zeroPad(d.getDay(), 2) + '.' + zeroPad(d.getMonth(), 2);
  else return zeroPad(d.getDay(), 2) + '.' + zeroPad(d.getMonth(), 2) + '.' + d.getFullYear();
}

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');
