export async function getMetadata(url: string) {
  const fixedUrl = url.replace('https://www.arweave.net/https://arweave.net/', 'https://www.arweave.net/')
  const response = await fetch(fixedUrl);
  if (response && response?.ok) return await response.json();
}
