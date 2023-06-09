import '../styles/styles.scss';
import plus from '../images/plus.png'
import trash from '../images/trash.png'
import { useState } from 'react';
import  CustomModal  from './customModal';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import album from '../images/album.png';
import Form from 'react-bootstrap/Form';

export const Home = () =>{

    const [modalShow, setModalShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
 
    // Getting a list of albums and paths to cover images.
    const fetchData = async() =>{
        try {
            const response = await axios.get('http://api.programator.sk/gallery');
            const jsonData = await response.data;
            const albums = jsonData.galleries;
            const categories = await Promise.all(
              albums.map(async (album) => {
                const response = await fetch(`http://api.programator.sk/gallery/${album.path}`);
                const jsonData = await response.json();
                const imageCount = jsonData.images.length;
                const firstFullpath = jsonData.images[0]?.fullpath
                const imgs = jsonData.images;
                return {
                  name: album.name,
                  count: imageCount,
                  fullpath:firstFullpath,
                  images: imgs
                };
              })
            );
            setCategories(categories);
            setFilteredCategories(categories);
            localStorage.setItem('categories', JSON.stringify(categories));      
          } catch (error) {
            if (error.code === 'ECONNABORTED')
            return 'timeout';
        else
            throw error;
          }
    }
    

    useEffect(()=>{
        fetchData();
    },[]);


    // returning the correct text for the number of images in the album
    const getPhotoCountText = (count) => {
        if (count === 1) {
            return "1 fotka";
        } else if (count >= 2 && count <= 4) {
            return `${count} fotky`;
        } else {
            return `${count} fotiek`;
        }
    };

    // handling of adding a new album
    const handleAlbumAdded = async(newCategory) => {
        let imageCount = 0;
        let firstFullpath = '';
        let imgs=[];
        
        const temp = await Promise.all(
            newCategory.map(async (album) => {
              const response = await fetch(`http://api.programator.sk/gallery/${album.path}`);
              const jsonData = await response.json();
            if(jsonData.images){
                imageCount = jsonData.images?.length;
                firstFullpath = jsonData.images[0]?.fullpath
                imgs = jsonData.images;
            }
              return {
                name: album.name,
                count: imageCount,
                fullpath:firstFullpath,
                images: imgs
              };
            })
          );
          localStorage.setItem('categories', JSON.stringify(temp));
          setCategories(newCategory);
          setFilteredCategories(newCategory);
      };


      // deleting the album and calling the function for the next download of the updated album
      const handleDelete= async(name) =>{
        await axios.delete(`http://api.programator.sk/gallery/${name}`);
        fetchData();
      }

    return(
        <div className="container">
        
        <div className="intro">
            <h3 style={{ marginRight: 'auto' }}>Fotogaléria</h3>
            <div className="search-container">
            <h5 style={{ marginRight: '0.5rem', opacity:'0.6' }}>Vyhľadávanie</h5>
            <Form>
                  <Form.Group >                  
                      <Form.Control 
                        type="text" 
                        id="categoryInput" 
                        placeholder="Názov albumu" 
                        onChange={(event) => {
                            const searchString = event.target.value.toLowerCase();
                            const filterAlbums = categories.filter((album) => album.name.toLowerCase().includes(searchString));
                            setFilteredCategories(filterAlbums);
                            }}
                    />
                  </Form.Group>
                  
              </Form>

            </div>
  </div>
        
        <p className="mt-4">Kategórie</p>
        <div className="row">
            { filteredCategories.sort((a, b) => a.name.localeCompare(b.name)).map((category)=>     
                <div key={category.name} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <div className="img-container d-flex justify-content-center align-items-center">
                            {category.fullpath ? 
                                <>
                                    <img  src={trash} className=' trash pointer' alt="x" onClick={()=>handleDelete(category.name)}/>
                                    
                                    <Link className="img-fit" to={`/category/${category.name}`}>
                                        <img className="img-fit" src={`http://api.programator.sk/images/1000x1000/${category.fullpath}`} alt=" "/>
                                    </Link>
                                </>
                                
                            :
                                <>
                                    <img  src={trash} className=' trash pointer' alt="x" onClick={()=>handleDelete(category.name)}/>
                                    <Link to={`/category/${category.name}`}>
                                        <img className="img-fit" src={album} alt="gallery"/>  
                                    </Link> 
                                </>            
                            }
                            <div className="top-left">{getPhotoCountText(category.count)}</div>
                            <div className="bottom-desc"> {category.name} </div>
                        </div>
                </div>
            )}
 

            <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                <div className="h-100 ">
                    <div className="img-container text-center center-plus " onClick={() => setModalShow(true)}>
                        <img className="plus" src={plus} alt="gallery"/>
                        <p className="mt-3"> Pridať kategóriu </p>
                    </div>                    
                </div>
            </div>

            <CustomModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                onAlbumAdded={handleAlbumAdded}
                type= "addAlbum"
            />
        </div>
    </div> 
    )

}