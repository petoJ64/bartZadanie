/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Xicon from '../images/xicon.png';
import Xiconw from '../images/Xiconw.png';
import Img from '../images/img.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import arrow from '../images/arrow.png';
import unorm from 'unorm';

function CustomModal({show = false, onHide = () => {}, onAlbumAdded = () => {}, type='default',link = '', albumName =' ' } ) {
  const [categoryName,setCategoryName] = useState("");
  const storedData = localStorage.getItem('categories');
  const albumsData = JSON.parse(storedData);
  const [selectedFiles,setSelectedFiles] = useState([]); 
  const [data,setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageLink,setImageLink] = useState(link);
  const [errorMessage,setErrorMessage] = useState('');
  

  useEffect(()=>{
    let arr;
    let albumArray;
    if(albumsData){albumArray = albumsData.find(a => a.name == albumName);}
    
    if(albumArray){
      albumArray = ((albumsData.find(a => a.name == albumName)).images);
      arr = albumArray.map((album)=> `http://api.programator.sk/images/1000x1000/${album.fullpath}` );
      setImageLink(arr[index]);
    }
  },[index])

  useEffect(()=>{
    currentImageIndex();
    setErrorMessage("");
    setSelectedFiles([]);
  },[show])

  // finding the index of the image in the array 
  function currentImageIndex(){
    let i = 0;  
    let albumArray = albumsData.find(a => a.name == albumName);
      if(albumArray){
        albumArray = ((albumsData.find(a => a.name == albumName)).images);
        let arr = albumArray.map((album)=> `http://api.programator.sk/images/1000x1000/${album.fullpath}` );
        i = arr.indexOf(link);
        setIndex(i);
      }
    return i;
  }

  // logic for creating a new album
  const handleButtonClick=(e)=>{
    e.preventDefault()
    
    if(categoryName.includes("/")){
      setErrorMessage("Názov albumu nesmie obsahovať znak /");
    }else{ 

      const foundCategory = albumsData.find((item) => item.name === categoryName);

      if (foundCategory) {
        console.log("Kategória sa nachádza v poli.");
        setErrorMessage("Táto kategória sa už v galérii nachádza!");
      } else {
          console.log("Kategória sa nenachádza v poli.");
          axios.post("http://api.programator.sk/gallery",{"name": unorm.nfd(categoryName).replace(/[\u0300-\u036f]/g, '')});
          onAlbumAdded([...albumsData, { name: categoryName, count: 0 }]);
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
      let newData = albumsData;
      if (newData.length === 0) {
        newData.push({ images: [] });
      }

      const index = newData.findIndex(obj => obj.name === albumName);
      let arr = [];

      for( let i = 0; i < data.length; i++) {
        formData.append(`selectedFile[${i}]`, data[i]);
        arr.push({fullpath: `${albumName}/${data[i].name}`})
      }

    try { 
      setLoading(true);
      const response = await axios({
          method: "post",
          url: `http://api.programator.sk/gallery/${albumName}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
      })
      onHide();
      if(index > -1){
        newData[index].images = newData[index].images.concat(arr);
      }else {
        newData[0].images.push(arr);
      }
      localStorage.setItem('categories', JSON.stringify(newData));
      console.log(response);

      } 
      catch(error) {
          console.log(error);
          
      }
      finally{
        setLoading(false);
      }

      currentImageIndex()
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


  // display following image
  const changeBlogPicForwards = () => {
    let i = index;
    let albumArray = ((albumsData.find(a => a.name == albumName)).images);
    if( i < albumArray.length -1 ){
      i = i+1;
    }
    setIndex(i);
    };

    // display previous image
    const changeBlogPicBackwards = () => {
      let i = index;
      if( i > 0 ){
        i = i-1;
      }
      setIndex(i);
    };

  // animation when uploading images
  const CustomLoading = () =>{
    return(
      <>
        <div className='custom'>
          <div className='balls'>
            <div className='ball ball1'></div>
            <div className='ball ball2'></div>
            <div className='ball ball3'></div>
          </div>
          <span className='customText'>Nahrávam...</span>
        </div>
      </>
    )
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
          <Modal.Body   className='p-5'>
              <h5 className="d-flex justify-content-between align-items-center mb-3">
                  <span>Pridať kategóriu</span> 
                  <img  src={Xicon} className='arrow pointer' alt="x" onClick={onHide} />
              </h5> 
          
              <Form>
                  <Form.Group className="mb-3 "> 
                      <p style={{color:'red'}}>{errorMessage}</p>                  
                      <Form.Control type="text" id="categoryInput" placeholder="Názov kategórie*" onChange={(e)=>setCategoryName(e.target.value)}/>
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
            
                <div className='addImages' onDragOver={handleDragOver} onDrop={handleDrop}>
                
                  <img className='mt-4 mb-4' src={Img} alt=" "/>
                    {loading ? 
                      <>
                        <CustomLoading/> 
                      </>
                    :
                      <>
                        <p><b>Sem presuňte fotky</b></p>
                        <p style={{opacity:'0.6'}}>alebo</p>
                        <label htmlFor="imgs" className='imgBtn mt-1 mb-4  p-2 pl-3 pr-3'>Vyberte súbory</label> 
                        <p style={{color:'green'}}>{selectedFiles.map(img => <p key={img}>{img}</p>)}</p>
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
        <Modal
          show = {show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size= 'lg'
        >
          <Modal.Body   className='p-0' >
            <div className='top-right'>
              <img  src={Xiconw} className=' pointer arrow' alt="x" onClick={onHide} />
            </div>
            
              <img className="img-fit" style={{height:'100%'}} src={imageLink ? imageLink : link} alt=" "/>
              <div className={`arrow-left ${index !== 0 ? 'pointer' : 'disabled'}`} onClick={changeBlogPicBackwards}>
                <img src={arrow} className='next-arrow' alt="left arrow" />
              </div>
              <div className={`arrow-right ${index !== ((albumsData.find(a => a.name == albumName)).images).length-1 ? 'pointer' : 'disabled'}`} onClick={changeBlogPicForwards} >
                <img src={arrow} className='next-arrow' alt="right arrow" />
              </div>
              
          </Modal.Body>
        </Modal>
      )}

  </>
  );
}

export default CustomModal;