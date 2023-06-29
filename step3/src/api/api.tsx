import axios from "axios"
import { useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";

// Get list of all albums
export function getAlbums() {
  return axios
      .get(`${API_URL}gallery`)
      .then(res => res.data)
}

// Get single album 
export function getAlbum(albumName) {
  return axios.get(`${API_URL}gallery/${albumName}`)
}

// Get number of images of given album
const fetchAlbum = (albumName) => {
  return axios.get(`${API_URL}gallery/${albumName}`)
        
}

export const getAlbumData = (albumNames) => {
  const queryResults = useQueries({
    queries: albumNames.map((name) => ({
      queryKey: ['album', name],
      queryFn: () => fetchAlbum(name),
    })),
  });
  if(queryResults && queryResults[0]){
    const imageCounts = queryResults.map(obj => ({name:obj.data?.data?.gallery.name ,count:obj.data?.data?.images.length}));
    return(imageCounts)
  }
};


// Delete Album 
const deleteAlbum = (albumName) => {
  return axios.delete(`${API_URL}gallery/${albumName}`)
}

export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation((albumName) => deleteAlbum(albumName),{
    onSuccess: () => {
      queryClient.invalidateQueries(['albums'])
    }
  })
}

// Add album
const addAlbum = (albumName) => {
  return axios.post(`${API_URL}gallery`,{"name": albumName});
}

export const useAddAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation((albumName) => addAlbum(albumName),{
    onSuccess: () => {
      queryClient.invalidateQueries(['albums'])
    }
  })
}

// Add photos to album
const addPhotos = async (albumName, photos) => {
  try {
    await axios.post(`${API_URL}gallery/${albumName}`, photos, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error(error);
  }
};

export const useAddPhotos = (albumName, setModalShow) => {
   const queryClient = useQueryClient();
  return useMutation((photos) => addPhotos(albumName, photos), {
    onSuccess: () => {
      queryClient.invalidateQueries([albumName])
      setModalShow(false);
    }
  }) 
}

