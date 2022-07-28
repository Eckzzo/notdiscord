import { useState } from 'react';

const useImageInput = (file?: File) => {
  const [image, setImage] = useState<File | undefined>(file);
  const [imgData, setImgData] = useState<string | ArrayBuffer | null>(null);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target || !e.target.files) return;
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return { image, imgData, setImage, setImgData, handleChangeImage } as const;
};

export { useImageInput };
