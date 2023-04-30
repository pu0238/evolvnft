import { createData, ArweaveSigner, getSignatureAndId } from "arbundles";

export const jwk = {
  kty: "RSA",
  n: "kTuBmCmd8dbEiq4zbEPx0laVMEbgXNQ1KBUYqg3TWpLDokkcrZfa04hxYWVLZMnXH2PRSCjvCi5YVu3TG27kl29eMs-CJ-D97WyfvEZwZ7V4EDLS1uqiOrfnkBxXDfJwMI7pdGWg0JYwhsqePB8A9WfIfjrWXiGkleAAtU-dLc8Q3QYIbUBa_rNrvC_AwhXhoKUNq5gaKAdB5xQBfHJg8vMFaTsbGOxIH8v7gJyz7gc9JQf0F42ByWPmhIsm4bIHs7eGPgtUKASNBmWIgs8blP7AmbzyJp4bx_AOQ4KOCei25Smw2-UAZehCGibl50i-blv5ldpGhcKDBC7ukjZpOY99V0mdDynbQBi606DdTWGJSXGNkvpwYnLh53VOE3uX0zuxNnRlwA9BN_VisWMrQwk_KnB0Fz0qGlJsXNQEWb_TEaf6eWLcSIUZUUC9o0L6J6mI9hiJjf_sisiR6AsWF4UoA-snWsFNzgPdkeOHW_biJMep6DOnWX8lmh8meDGMi1XOxJ4hJAawD7uS3A8jL7Kn7eYtiQ7bnZG69WtBueyOQh78yStMvoKz6awzBt1IaTBUG9_CHrEy_Tx6aQZu1c2D_nZonTd0pV2ljC7E642VtOWsRFL78-1xF6P0FD4eWh6HoDpD05_3oUBrAdusLMkn8Gm5tl0wIwMrLF58FYk",
  e: "AQAB",
  d: "XKMTT8bD-32dkkP5gwZ32k3mDYw4Ep49ZdrHB7mX5f8VkI-IHmZta15ty8074QcqE9isppWNm_Xh3VkHvkjmwH2GHWzlPaCy993AqexYSJ6k_dgdSn8RidjCeNbK5JeO3jpaSSeGA2a5f1EAy6KPDvnrFjFbiWF2RS9D5GLrBEw_Gmx9tYpGQI6bmsbu8h3Y9IozhQ-ZJ40xiT7mj8W5d15yRiQwbZ5Rhw6q1uedkafGZbeEB_34GkiBwmusGmxfo0_d7fd176yvc7QR9jY7BrfUjHvMDbvuRoMl5gQBq-pntxb3u9t_fIFAoMPNA9EPvv8l3WMEds-SmHmDLXpNdTbIXn6yguGSs9Lci0o7jjLCigOX0qu73UqSuCbXY0TE39s4bAoFWFVcaIgyHWMkbt6BV_OERhbsU5K47NYRg__BUEr39ruG3BnuvWJFwIeLGp5OUDlvsvWQn9VkOSXNJi7kvrVucwwT95vYvGtgoQnU5csIIo66ciyvCatjVUy7YLS8kdoKjRdu57wQJXUsrH5PXgUnomIGO8NCrf0WB5XBFaPL8m5_nDs4_Ym_gD7A5rR-S0OHGDF6L4xDcStvmpeqHEmF1o872vKeayXi23pfsFWfpLM1WnuFcIGuqxjT6TQQZFL1Z-LwEQp5RyvnF8SBapLMJiQYXOcm0M8K2-0",
  p: "wNeunobSmEgjFw1uNyWMsXtCBFNQDs_XY1oYMq6S_Y9d6AQ0cVx7TFjikUb4ipzIenUc28PlAAGe1c7E6WjcSbIrcyiTT_vkSy6KJznlRYOMZkckRnkvm7f7w80OfSrb4kSUyyXhlL0XfH_WjG9CMGbwoA5MM-3NEyUCJ04cFBtCQC2Lx-lcT30HZKbjVCblVG9zNqu3FePcz90zKpxno6z9Ie9zkmO1xPjFNlUug3NFGj8GOVrii4PxXDIycinUv08zcxY5z9XqD3vUYk84N5JgGoHBsQ1BdbU2naGJ374RXueYb3Ogx-4wYfzp7l_CPqsQCcL9HEGKsM2QzVXniw",
  q: "wMwY5tm_Jj4V9eYQ_UgfWZkqtLzzhqVU_VFZ1G_6s36OGpSVevQKcEQpvFnCphihDzthW4N5sSyO0eBgwHdbuQ4tkS-iSNsKnASQVT81yQUanslI11-259L1aUNIJynAqSXFcoNPhyUMrouOR4bYCCFqnyXlpxSWg2zYQUDJnG5Uv_wGR5zizVAgYeWJyvlwUxBJIJUCaLbNs0hKK09OZ0Z0C7WSCcAKwDW6LK3KWZfFGedaMMQQTWCBpK14Y1WYAN67t7I9dEHimZI5jSNRmi2FX4NXrhNuORk20hcPT4s4Fdvuwu7yrlhg_5VOr7IpZY8mXtUgwmVHBFFGNko5uw",
  dp: "kEMJY5hShQ86CO3ILMMPbFpb-aZltp7vb2ifv5JvbfZJdt9maAOaTXQVEj84gWFmbI2d6B20-3s62pHTJxWF7i-2Z3DMO0Kh90g6m7uo84bEimLgFURlRCWv1ztYgnSEh9FsSkjtZ3rJzh5IX0iACHuJuQLZKOPVzWObJ9I8GSKHPkGUVxoRL3nGBRr_5x0t5Ct30kdFMMAEmQ_OTisxMPWhbDiYicPD4DWGOu4gXL_nywmo21FNNree4KzApjz65Z8XSxouZ3eMoMavDFhdIt2CvXGid5QGC0tkLyoAXXvvvMKee4nRlp9uXG96hRPn2T_ZQKQ4-2FgooE1uRZxnw",
  dq: "uVe8HLl57G7FN9bLwGJEWSNJDeWUC34HnVtGi1Z3YXUpcV4j8caH_nNY2AxGdty4gOcp6gsTwwK97f_Ro1VbZSS_I5LyZS3GHkS46GrS7wQsGjgRAZOvR1_jsyUOSS_3WeTI0xRvMNGqRmY9CoAUUISndoW9KAk_xOqvXtPEvdDHQqUq-E9XLd94sgQzmmB_3iqK0nrNjRMn3tGBE--yxM_TIaqU0TDAZRWBfBA6tjSUNBnX94eU0H4VQ9XMJVqUvUlilu8P6yKnj9El6Ivql9hpHnAqq1tcnCGkNQYcHvEMot8Cwn1p6bdm0G2d7oPNDig2z_X9_0PTqM_lOq3Snw",
  qi: "WA7rs38z_LZad6SFGJNUblyuJ-W7zFkFtHqh8_ToUVbS6wuNLbmsOr5_AsOWKWKils2eHWj5bA4Io5SajWl499JgGLS7nMwhn1gSzIfYskoHCl4_isEu7mB2uOWqPtSt6xYvCaxutyTQSbaUj9ioOsOU5Gjt-Vuigm3M5rmQS6Kli1rPgs1boYj8NPtou21SwrHXZnsfA2J7QqzDddhhLdd8U85_H4eFygiSwYbnnIkMSciWt6CAviPve-MeQMIKKtATjIUspUzBlbCuHR7WaMqyVvYfCRhsDg8WaRIsgebz4qSUwzuy-Lip8EFXcMbzocjP5JHE4eKFm5H9Iq0V5Q",
};

const signer = new ArweaveSigner(jwk);

export async function uploadBlob(bytes: Blob, type: string) {
  const bodyData = new Uint8Array(await bytes.arrayBuffer());
  if (bodyData.length === 0) {
    return console.error("Failed to upload image");
  }
  const tags = [
    {
      name: "Content-Type",
      value: type,
    },
  ];

  const u8 = new Uint8Array(32);
  crypto.getRandomValues(u8);
  const anchor = btoa(String.fromCharCode.apply(null, [...u8])).slice(0, 32);

  const item = createData(bodyData, signer, {
    tags,
    anchor,
  });

  const { signature } = await getSignatureAndId(item, signer);
  const raw = item.getRaw();
  raw.set(signature, 2);

  const result = await fetch("https://node2.bundlr.network:443/tx/arweave", {
    method: "POST",
    body: raw,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
  const bodyResult = await result.json();

  return bodyResult.id as string;
}
