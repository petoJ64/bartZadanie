import arrow from '../images/arrow.svg';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState} from 'react';
import  CustomModal  from './CustomModal';
import { getAlbum, useAddPhotos} from "../api/api";
import { useQuery} from "@tanstack/react-query";
import ImageComponent from './ImageComponent';
import { API_URL } from '../constants/constants';
import { AddCard } from './AddCard';
import { PageHeader } from './PageHeader';

export const Category = () =>{
    const { categoryName } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [modalType, setModalType] = useState('');
    const [imageLink,setImageLink] = useState('');
    const {mutate: addPhotos} = useAddPhotos(categoryName,setModalShow);

    const handleModal = (type,link) => {
        setModalType(type);
        setModalShow(true);
        setImageLink(link);
      };

    const { data} = useQuery({
        queryKey: [categoryName],
        queryFn: () => getAlbum(categoryName)
    });
    let fullPathArray = [];
    if(data) { 
        const baseURL = `${API_URL}images/0x0/`;
        fullPathArray = data.data.images.map((image) => baseURL + image.fullpath);
        localStorage.setItem('categories', JSON.stringify(fullPathArray));
    }

   // Add photos to album
    const handleAddPhotos = async(photos) => {
        addPhotos(photos);
    }

    return (
        <>
            <div className="container">

                <PageHeader/>
                
                <p className="mb-4">
                    <Link to="/">
                        <img src={arrow} className="arrow" alt="gallery"/> 
                        <span className="ml-2"> {categoryName} </span>
                    </Link>
                </p>
            
                <div className="row" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 232px)', gap: '30px', justifyContent: 'flex-start',margin:'0px' }}>    
                    {data && data.data.images.map((a) => 
                        <div key={a.path} style={{width:'232px', height:'240px'}} onClick={() => handleModal('showImage',`${API_URL}images/0x0/${a.fullpath}`)}>
                            <div className="img-container center-loader rounded">
                                <ImageComponent src={`${API_URL}images/232x240/${a.fullpath}`}/>
                            </div>
                        </div>
                    )}
                    
                    <AddCard content="Pridať fotky" handleModal={handleModal} modalContent = {('addImages', '')}/>

                </div>
            </div> 

            <CustomModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                type={modalType}
                link={imageLink}
                albumName = {categoryName}
                onPhotoAdded={handleAddPhotos}
            />
        </>
    )
}