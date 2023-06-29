/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Img from '../images/pic.svg'
import { useState, useEffect } from 'react';
import { UploadLoading } from './UploadLoading';
import Xicon from '../images/xicon.svg';
import { imageUtilities } from './ImageUtilities';
import { SelectedFiles } from './SelectedFiles';
import '../styles/addimages.css'


export const AddImages = ({show = false, onHide = () => {},onPhotoAdded = () => {}}) => {

    const [imagesReady, setImagesReady] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedFiles,setSelectedFiles] = useState([]); 
    const [data,setData] = useState('');

    useEffect(()=>{
        setLoading(false);
        setData('');
        setSelectedFiles([]);
      },[show])

    // draged file handling
    const handleDragOver = (e) =>{
        e.preventDefault();
    }

    // confirmation of the selected files for uploading to the API
    const handleSubmit = async(event) => {
        event.preventDefault()
        if(data.length>0){
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
    }

    // handle of the selected file via the button
    const handleFileSelect = async(event) => {
        event.preventDefault();
        setImagesReady(false);
        let files = [];
        let uploadedImages = [];
        if(event.dataTransfer != undefined){
            files = Array.from(event.dataTransfer.files);
            for( let i = 0; i < event.dataTransfer.files.length; i++) {
                uploadedImages.push(event.dataTransfer.files[i].name)
            }
        }else{
            files = Array.from(event.target.files);
            for( let i = 0; i < event.target.files.length; i++) {
                uploadedImages.push(event.target.files[i].name)
            }
        }
        
        //const resizedFiles = await resizeImages(files);
        const resizedFiles = await imageUtilities(files, setImagesReady);
        setData(resizedFiles);
        setSelectedFiles(uploadedImages);
    }

    return(
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
                <div className='addImages' onDragOver={handleDragOver} onDrop={handleFileSelect} >
                  <img className='mt-5 mb-3' src={Img} alt=" " />
                    {loading ? 
                      <UploadLoading/>
                    :
                      <SelectedFiles selectedFiles={selectedFiles} />
                    }
                </div>
                <form onSubmit={handleSubmit}>
                  {imagesReady ? 
                    <button type='submit' className='backg mt-3 p-3' disabled={!imagesReady}> Pridať </button> 
                  : 
                    <button  className='backg mt-3 p-3 wait-cursor'>
                      <span className='blink'>Spracuju sa obrazky</span> 
                    </button> 
                  }
                  <input id="imgs" type="file" hidden multiple accept="image/jpeg" onChange={handleFileSelect} />
                </form>
          </Modal.Body>
        </Modal> 
    )
}