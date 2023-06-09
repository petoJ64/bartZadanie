import arrow from '../images/arrow.png';
import plus from '../images/plus.png';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState} from 'react';
import  CustomModal  from './customModal';


export const Category = () =>{
    
    const { categoryName } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [modalType, setModalType] = useState('');
    const [imageLink,setImageLink] = useState('');
    const storedData = localStorage.getItem('categories');
    const albumsData = JSON.parse(storedData);
    const album = albumsData.find(a => a.name == categoryName);

    const handleModal = (type,link) => {
        setModalType(type);
        setModalShow(true);
        setImageLink(link);
      };


    return (
        <>
            <div className="container">
                <h3>Fotogaléria</h3>
                <p className="mt-4">
                    <Link to="/">
                        <img src={arrow} className="arrow" alt="gallery"/> 
                        <span className="ml-2"> {categoryName} </span>
                    </Link>
                </p>
            
                <div className="row">    
                    {album?.images.map((a) => 
                        <div key={a.path} className="col-lg-3 col-md-4 col-sm-6 mb-3" onClick={() => handleModal('showImage',`http://api.programator.sk/images/1000x1000/${a.fullpath}`)}>
                            <div className="img-container">
                            <img className="img-fit" src={`http://api.programator.sk/images/1000x1000/${a.fullpath}`} alt=" "/>
                            </div>
                        </div>
                    )}

                    <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <div className="h-100 ">
                            <div className="img-container text-center center-plus " onClick={() => handleModal('addImages', '')}>
                                <img className="plus" src={plus} alt="gallery"/>
                                <p className="mt-3"> Pridať fotky </p>
                            </div>                    
                        </div>
                    </div>

                </div>
            </div> 

            <CustomModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                type={modalType}
                link={imageLink}
                albumName = {categoryName}
            />

        </>
    )
}