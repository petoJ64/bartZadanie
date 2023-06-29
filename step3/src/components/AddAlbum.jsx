/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Xicon from '../images/xicon.svg';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import unorm from 'unorm';
import '../styles/addalbum.css';


export const AddAlbum = ({show = false, onHide = () => {}, onAlbumAdded = () => {}}) => {
    const [errorMessage,setErrorMessage] = useState('');
    const [categoryName,setCategoryName] = useState("");
    const storedData = localStorage.getItem('categories');
    const albumsData = JSON.parse(storedData);

    useEffect(()=>{
        setErrorMessage("");
      },[show])

    // logic for creating a new album
    const handleButtonClick=(e)=>{
        e.preventDefault()
        if(categoryName.includes("/")){
            setErrorMessage("Názov albumu nesmie obsahovať znak /");
        }else{ 
            const foundCategory = albumsData.find((item) => item.name === categoryName);
        if (foundCategory) {
            setErrorMessage("Táto kategória sa už v galérii nachádza!");
        } else {
            console.log("Kategória sa nenachádza v poli.");
            onAlbumAdded(unorm.nfd(categoryName).replace(/[\u0300-\u036f]/g, ''));
            onHide();
            }
        }
    }

    return(
        <Modal
          show = {show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body   className='p-5' >
              <h5 className="d-flex justify-content-between align-items-center mb-4">
                  <span>Pridať kategóriu</span> 
                  <img  src={Xicon} className='arrow pointer' alt="x" onClick={onHide} />
              </h5> 
          
              <Form>
                  <Form.Group className=" input-wrapper"> 
                      <p className='error-color'>{errorMessage}</p> 
                      <div className="input-wrapper">
                      <label className='label-class' htmlFor='first'> Názov kategórie *</label>
                      <input
                        className='input-class' 
                        id="categoryInput"
                        type="text" 
                        onChange={(e)=>setCategoryName(e.target.value)}
                      />
                      </div>
                  </Form.Group>
                  <button className='backg mt-3 p-3' onClick={handleButtonClick}> Pridať </button>
              </Form>
          </Modal.Body>
        </Modal>
    )
}