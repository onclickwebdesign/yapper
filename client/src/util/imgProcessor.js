const readImage = image => {
  return new Promise((resolve, reject) => {
    //Read the image
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', event => {
      resolve({ url: event.target.result, name: image.name });
    });
  });
};

const ImageProcessor = {
  readMultipleImages: images => {
    return Promise.all(images.map(readImage));
  },
  readSingleImage: image => readImage(image)
};

export default ImageProcessor;