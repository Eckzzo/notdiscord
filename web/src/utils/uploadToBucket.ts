const GET_PRESIGNED_URL_ENDPOINT = process.env.NEXT_PUBLIC_GET_PRESIGNED_URL_ENDPOINT as string;

const getPresignedUrl = async (path: string) => {
  const presignedUrl = await fetch(GET_PRESIGNED_URL_ENDPOINT, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify({
      fileName: path,
      fileType: 'image/jpeg',
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return presignedUrl.json();
};

const uploadToBucket = async (path: string, file: File) => {
  const presignedUrl = await getPresignedUrl(path);
  try {
    await fetch(presignedUrl.data, {
      method: 'PUT',
      mode: 'cors',
      body: file,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (err) {
    return err;
  }
};

export { uploadToBucket };
