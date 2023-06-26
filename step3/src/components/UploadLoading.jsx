// animation when uploading images
export const UploadLoading = () => {

    return (
        <div className='custom'>
          <div className='balls'>
            <div className='ball ball1'></div>
            <div className='ball ball2'></div>
            <div className='ball ball3'></div>
          </div>
          <span className='customText'>Nahrávam...</span>
        </div>
    )
}