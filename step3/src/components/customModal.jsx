/* eslint-disable react/prop-types */
import { DisplayImage } from './DisplayImage';
import { AddImages } from './AddImages';
import { AddAlbum } from './AddAlbum';


function CustomModal({show = false, onHide = () => {}, onAlbumAdded = () => {},onPhotoAdded = () => {}, type='default',link = '' } ) {
  const storedData = localStorage.getItem('categories');
  const albumsData = JSON.parse(storedData);

  console.log("OTVARAM");
  console.log("type", type);
  return (
    <>
      {type === 'addAlbum' && (
        <AddAlbum show={show} onHide={onHide} onAlbumAdded={onAlbumAdded}/>
      )}

      {type === 'addImages' && (
        <AddImages  show = {show} onHide={onHide}  onPhotoAdded={onPhotoAdded}/>
      )}

      {type === 'showImage' && (
        <DisplayImage link={link} show={show } onHide={onHide} albumsData={albumsData} />
      )}
    </>
  );
}

export default CustomModal;