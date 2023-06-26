import '../styles/styles.scss';
import plus from '../images/plus.png'
import { useState } from 'react';
import  CustomModal  from './CustomModal';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useQuery } from "@tanstack/react-query";
import { getAlbums, useDeleteAlbum, useAddAlbum  } from "../api/api";
import  AlbumList  from './AlbumList';
import { GalleryLoader } from './GalleryLoader';

export const Home = () =>{

    const [modalShow, setModalShow] = useState(false);
    const [newAlbums, setNewAlbums] = useState([])
    const {mutate: deleteAlbum} = useDeleteAlbum();
    const {mutate: addAlbum} = useAddAlbum();

    // fetch albums
    const {isLoading, data} = useQuery({
        queryKey: ["albums"],
        queryFn: getAlbums
    });

    useEffect(()=>{
    if(data ){
        setNewAlbums(data.galleries);
    }
    },[data])

      if(isLoading) { return <GalleryLoader/>}
      localStorage.setItem('categories', JSON.stringify(data.galleries));

    // deleting the album
      const handleDeleteAlbum = (albumName) => {
        deleteAlbum(albumName) 
      }

    // add album
    const handleAddAlbum = (albumName) => {
        addAlbum(albumName) 
    }

    return(<>

        <div className="container" >
        
            <div className="intro" >
                <h2 style={{ marginRight: 'auto' }}>Fotogaléria</h2>
                <div >
                <h5  style={{  opacity:'0.6'}}>Vyhľadávanie</h5>
                <Form>
                    <Form.Group >                  
                        <Form.Control 
                            type="text" 
                            id="categoryInput" 
                            placeholder="Názov albumu" 
                            onChange={(event) => {
                                const searchString = event.target.value.toLowerCase();
                                const filterAlbums = data.galleries.filter((album) => album.name.toLowerCase().includes(searchString));
                                setNewAlbums(filterAlbums);

                                }}
                        />
                    </Form.Group>
                    
                </Form>

                </div>
            </div>
        
        <p className=" mb-4 texts" >Kategórie</p>
        <div className="row " style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 232px)', gap: '30px', justifyContent: 'flex-start',margin:'0px' }}>      
            
            <AlbumList newAlbums={newAlbums} onDeleteALbum={handleDeleteAlbum}/>

            <div  style={{marginBottom:'30px',width:'232px', height:'240px'}}>
                <div className="h-100 ">
                    <div className="img-container text-center center-plus " onClick={() => setModalShow(true)}>
                        <img className="plus" src={plus} alt="gallery"/>
                        <p style={{marginTop:'1rem'}}> Pridať kategóriu </p>
                    </div>                    
                </div>
            </div>
            
            <CustomModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                onAlbumAdded={handleAddAlbum}
                type= "addAlbum"
            />
        </div>
    </div> 
    </>)

}

