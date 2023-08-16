export async function getMetadata(url: string) {
  console.log(url)
  const fixedUrl = url.replace('https://www.arweave.net/https://arweave.net/', 'https://www.arweave.net/')
  const response = await fetch(fixedUrl);
  if (response && response?.ok) return await response.json();
}
