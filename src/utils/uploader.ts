export async function uploadFile(file: any) {
  const bodyData = Object.values(new Uint8Array(await file.arrayBuffer()));
  if (bodyData.length === 0) {
    return console.error("Failed to upload image");
  }
  const tags = [
    {
      name: "Content-Type",
      value: file.type,
    },
  ];

  const result = await fetch(
    "https://tGY64E3EMTOBP20R85p9HAwtIHJImucrwPU8j4Z2EUg.exm.run",
    {
      method: "POST",
      body: JSON.stringify({
        data: bodyData,
        type: "buffer",
        tags,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const bodyResult = await result.json();
  const uploadId = bodyResult.data.execution.result.id as string;
  return uploadId;
}

export async function uploadArray(bytes: Blob, type: string) {
  const bodyData = Object.values(new Uint8Array(await bytes.arrayBuffer()));
  if (bodyData.length === 0) {
    return console.error("Failed to upload image");
  }
  const tags = [
    {
      name: "Content-Type",
      value: type,
    },
  ];

  const result = await fetch(
    "https://tGY64E3EMTOBP20R85p9HAwtIHJImucrwPU8j4Z2EUg.exm.run",
    {
      method: "POST",
      body: JSON.stringify({
        data: bodyData,
        type: "buffer",
        tags,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const bodyResult = await result.json();
  const uploadId = bodyResult.data.execution.result.id as string;
  return uploadId;
}
