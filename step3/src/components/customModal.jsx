/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Xicon from '../images/xicon.png';
import Img from '../images/pic.png'
import { useEffect, useState } from 'react';
import FormData from 'form-data';
import unorm from 'unorm';
import { UploadLoading } from './UploadLoading';
import { DisplayImage } from './DisplayImage';


function CustomModal({show = false, onHide = () => {}, onAlbumAdded = () => {},onPhotoAdded = () => {}, type='default',link = '' } ) {
  const [categoryName,setCategoryName] = useState("");
  const storedData = localStorage.getItem('categories');
  const albumsData = JSON.parse(storedData);
  const [selectedFiles,setSelectedFiles] = useState([]); 
  const [data,setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');

  useEffect(()=>{
    setLoading(false);
    setErrorMessage("");
    setSelectedFiles([]);
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

  // uploading images that were uploaded using drag and drop
  const handleDrop = (e) =>{
    e.preventDefault();
    setData(e.dataTransfer.files);
    let uploadedImages = [];
    for( let i = 0; i < e.dataTransfer.files.length; i++) {
      uploadedImages.push(e.dataTransfer.files[i].name)
    }
     setSelectedFiles(uploadedImages);
  }

  // draged file handling
  const handleDragOver = (e) =>{
    e.preventDefault();
  }

  // confirmation of the selected files for uploading to the API
  const handleSubmit = async(event) => {
      event.preventDefault()
      const formData = new FormData();
      for( let i = 0; i < data.length; i++) {
        formData.append(`selectedFile[${i}]`, data[i]);
      }
    try { 
      setLoading(true);
      onPhotoAdded(formData);
      } 
      catch(error) {
          console.log(error);
      }
  }

  // handle of the selected file via the button
  const handleFileSelect = (event) => {
    setData(event.target.files);
    let uploadedImages = [];
    for( let i = 0; i < event.target.files.length; i++) {
      uploadedImages.push(event.target.files[i].name)
    }
    setSelectedFiles(uploadedImages)
  }

  return (
    <>
    
      {type === 'addAlbum' && (
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
                      <p style={{color:'red'}}>{errorMessage}</p> 
                      <div className="input-wrapper">
                      <label className='label-class' htmlFor='first'> Názov kategórie *</label>
                      <input 
                      id="categoryInput"
                      type="text" 
                      style={{width:'100%', outline: 'none',paddingLeft:'12px'}}
                      onChange={(e)=>setCategoryName(e.target.value)}
                      />
                      </div>
                  </Form.Group>
                  <button className='backg mt-3 p-3' onClick={handleButtonClick}> Pridať </button>
              </Form>
          </Modal.Body>
        </Modal>
      )}

      {type === 'addImages' && (
        <Modal
          show = {show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body   className='p-5'>
            <h5 className="d-flex justify-content-between align-items-center mb-3">
                <span><b>Pridať fotky</b></span> 
                <img  src={Xicon} className='arrow pointer' alt="x" onClick={onHide} />
            </h5> 
                <div className='addImages' onDragOver={handleDragOver} onDrop={handleDrop} >
                  <img className='mt-5 mb-3' src={Img} alt=" " />
                    {loading ? 
                      <>
                        <UploadLoading/>
                      </>
                    :
                      <>
                        <p><b>Sem presuňte fotky</b></p>
                        <p style={{opacity:'0.6'}}>alebo</p>
                        <label htmlFor="imgs" className='imgBtn mt-1 mb-4  p-2 pl-3 pr-3'>Vyberte súbory</label> 
                        <div style={{color:'green'}}>{selectedFiles.map(img => <p key={img}>{img}</p>)}</div>
                      </>
                    }
                </div>
                <form onSubmit={handleSubmit}>
                  <button type='submit' className='backg mt-3 p-3' > Pridať </button>
                  <input id="imgs" type="file" hidden multiple accept="image/jpeg" onChange={handleFileSelect} />
                </form>
          </Modal.Body>
        </Modal>
      )}

      {type === 'showImage' && (
        <DisplayImage link={link} onHide={onHide} show={show } albumsData={albumsData} />
      )}

  </>
  );
}

export default CustomModal;