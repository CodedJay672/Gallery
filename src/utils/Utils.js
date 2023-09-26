// This function accepts the search param from the loader
// then, if there is a search parameter, it assigns the url
// to either fetch images from the topic entered in the
// search box, else it searches and fetches the curated photos
// and returns the appropriate image frm pexel.
export const getPhotos = async (param) => {
  const url = param ? 
  `https://api.pexels.com/v1/search?query=${param}&per_page=24page=1` :
  "https://api.pexels.com/v1/curated?per_page=24page=1";
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: "7fQk0TG3hoyDmB691bLA045LeFQYs8E1styCrV3rTcDJsg5VGozmBlzz"
      }
    })
    const { photos } = await response.json();
    return photos;
  } catch (error) {
    console.log("Error fetching photos");
  }
}