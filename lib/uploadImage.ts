import { ID, storage } from '@/appwrite';

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    '654013830ee680a5e72c',
    ID.unique(),
    file,
  );

  return fileUploaded;
};

export default uploadImage;
