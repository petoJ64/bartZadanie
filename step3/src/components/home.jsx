import '../styles/styles.scss';
import { useState } from 'react';
import  CustomModal  from './CustomModal';
import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getAlbums, useDeleteAlbum, useAddAlbum  } from "../api/api";
import  AlbumList  from './AlbumList';
import { GalleryLoader } from './GalleryLoader';
import { CustomForm } from './CustomForm';
import { AddCard } from './AddCard';
import { PageHeader } from './PageHeader';


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

    return(

        <div className="container" >
            <PageHeader>
                <CustomForm data={data} setNewAlbums={setNewAlbums} />
            </PageHeader>
            <p className=" mb-4" >Kategórie</p>
        
            <div className="row row-class" >      
            
                <AlbumList newAlbums={newAlbums} onDeleteALbum={handleDeleteAlbum}/>

                <AddCard content="Pridať kategóriu" handleModal = {()=>setModalShow(true)}/>
                
                <CustomModal 
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onAlbumAdded={handleAddAlbum}
                    type= "addAlbum"
                />
            </div>
        </div> 
    )

}

