/* eslint-disable react/prop-types */
import { getAlbumData } from '../api/api';
import { AlbumCard } from './AlbumCard';
import { TrashComponent } from './TrashComponent';
import '../styles/albumlist.css'


function AlbumList({newAlbums, onDeleteALbum = () => {}}){

      const pathArray = newAlbums.map(obj => obj.path);
      const data = getAlbumData(pathArray);

    // returning the correct text for the number of images in the album
    const getPhotoCountText = (name) => {
        let count = data.find(obj => obj.name === name);
        if(count == undefined) { return "Načítavam";}
        if (count.count === 1) {
            return "1 fotka";
        } else if (count.count >= 2 && count.count <= 4) {
            return `${count.count} fotky`;
        } else {
            return `${count.count} fotiek`;
        }
        
    };
 
    return (
        <>
        {  newAlbums && newAlbums.sort((a, b) => a.name.localeCompare(b.name)).map((category)=>     
                <div key={category.name}  className='card-size'>
                        <div className="img-container center-loader rounded yellow-backg" >
                            <div >
                                <TrashComponent onDeleteALbum={onDeleteALbum} name={category.name}/>
                                <AlbumCard name={category.name} fullpath={category.image?.fullpath} />
                            </div> 
                            <div className="top-left">{getPhotoCountText(category.name)}</div>
                            <div className="bottom-desc " > {category.name} </div>
                        </div>
                </div>
            )}
        </>
    )
}

export default AlbumList;