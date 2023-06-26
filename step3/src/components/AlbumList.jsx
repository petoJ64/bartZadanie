/* eslint-disable react/prop-types */
import album from '../images/album.png';
import trash from '../images/trash.png'
import { Link } from 'react-router-dom';
import { getAlbumData } from '../api/api';
import ImageComponent from './ImageComponent';
import { API_URL } from '../constants/constants';

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
                <div key={category.name}  style={{width:'232px', height:'240px'}}>
                        <div className="img-container d-flex justify-content-center align-items-center rounded">
                            {category.image && category.image.fullpath ? 
                                <>
                                    <img  src={trash} className=' trash pointer ' alt="" onClick={()=>onDeleteALbum(category.name)}/>
                                    
                                    <Link className="img-fit center-loader" to={`/category/${category.name}`} >
                                        <ImageComponent src={`${API_URL}images/0x0/${category.image.fullpath}`} />
                                    </Link>
                                </>
                                
                            :
                                <>
                                    <img  src={trash} className=' trash pointer' alt="x" onClick={()=>onDeleteALbum(category.name)}/>
                                    <Link className="img-fit" to={`/category/${category.name}`}>
                                        <img className="img-fit" src={album} alt="gallery"/>  
                                    </Link> 
                                </>            
                            }
                            <div className="top-left">{getPhotoCountText(category.name)}</div>
                            <div className="bottom-desc " > {category.name} </div>
                        </div>
                </div>
            )}
        </>
    )
}

export default AlbumList;