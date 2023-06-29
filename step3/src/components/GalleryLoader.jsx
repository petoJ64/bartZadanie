import '../styles/galleryloader.css'


export const GalleryLoader = () => {
    return (
        <div className="container loading-container" >
            <div className='center-loading' >
                <div className="spinner-border loader-size" role="status"></div>
                <h2 className="blink" >Nahrávam galériu...</h2>
            </div>
        </div>
    )
}