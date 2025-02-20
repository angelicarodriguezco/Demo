const apiKey = "426b851b1c5883e41e0403fa08f710ae";

export const getPhotos = () => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&nojsoncallback=1&per_page=50`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.photos.photo;
    })
    .catch((error) => {
      console.error("Error fetching images: " + error);
      return [];
    });
};
