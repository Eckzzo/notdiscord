const IMAGE_BUCKET = process.env.NEXT_PUBLIC_IMAGE_BUCKET as string;

const getImagePath = (key: string) => {
  const config = JSON.stringify({
    bucket: IMAGE_BUCKET,
    key: key,
    edits: {
      resize: {
        width: 300,
        height: 300,
        fit: 'cover',
      },
    },
  });

  return Buffer.from(config).toString('base64');
};

export { getImagePath };
