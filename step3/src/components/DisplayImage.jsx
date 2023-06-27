/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Xiconw from '../images/Xiconw.png';
import arrow from '../images/arrow.png';
import { useEffect, useState,useCallback } from 'react';

export const DisplayImage = ({show = false, onHide = () => {},albumsData = [], link = '' }) =>{
    const [activeChild, setActiveChild] = useState(0);
    console.log("TU SOM: ", link);
    useEffect(()=>{
        setActiveChild(currentImageIndex())
        currentImageIndex();
    },[show])

    useEffect(() => {
    document.addEventListener("keydown", changeChild);
    return function cleanup() {
        document.removeEventListener("keydown", changeChild);
    };
    });

    const changeChild = useCallback(
        (e) => {
          if (e.key === "ArrowLeft") {
            setActiveChild((a) => (a - 1 < 0 ? a : a - 1));
          } else if (e.key === "ArrowRight") {
            setActiveChild((a) => (a + 1 > albumsData.length - 1 ? a : a + 1));
          }
        },
        []
     );

    function currentImageIndex(){
        let i = 0;  
          if(albumsData){
            i = albumsData.indexOf(link);
            setActiveChild(i);
          }
        return i;
    }

    // display following image
    const changeBlogPicForwards = () => {
        let i = activeChild;
        if( i < albumsData.length -1 ){
        i = i+1;
        }
        setActiveChild(i);
    };

    // display previous image
    const changeBlogPicBackwards = () => {
      let i = activeChild;
      if(  i > 0 ){
        i = i-1;
      }
      setActiveChild(i);
    };
    
    return (
        <>
        <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size='lg'
        className="custom-modal"
        style={{display:'flex',justifyContent:'center'}}
      >
        <Modal.Body className='p-0'>
          
          <div className="modal-content">
            <img className="img-fit" style={{ objectFit: 'contain', maxHeight: "660px", width: 'auto',height:'auto' }} src={albumsData[activeChild]} alt=" " />
          </div>
          <div className='top-right'>
            <img src={Xiconw} className='pointer arrow' alt="x" onClick={onHide} />
          </div>
          <div className={`arrow-left ${activeChild !== 0 ? 'pointer' : 'disabled'}`} onClick={changeBlogPicBackwards}>
            <img src={arrow} className='next-arrow img-fit' alt="left arrow" />
          </div>
          <div className={`arrow-right ${activeChild !== (albumsData).length - 1 ? 'pointer' : 'disabled'}`} onClick={changeBlogPicForwards}>
            <img src={arrow} className='next-arrow' alt="right arrow" />
          </div>
        </Modal.Body>
      </Modal>
        </>
    )
}