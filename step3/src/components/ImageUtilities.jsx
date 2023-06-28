import Resizer from 'react-image-file-resizer';

export async function imageUtilities(files, setImagesReady = () =>{}){
    let uploadedImages = [];
  
    await Promise.all(files.map((file) => {
      return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          800, 
          800, 
          'JPEG',
          100,
          0,
          (resizedImage) => {
            uploadedImages.push(resizedImage);
            resolve();
          },
          'file' 
        );
      });
    }));
    setImagesReady(true);
    return uploadedImages;
}