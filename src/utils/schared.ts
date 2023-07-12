export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseDate(date: string) {
  return new Date(Number(date) * 1000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function parseTime(date: string) {
  return (
    new Date(Number(date) * 1000).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }) +
    ' @ ' +
    'UTC'
  );
}
