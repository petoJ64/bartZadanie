
export const GalleryLoader = () => {
    return (
        <div className="container" style={{ justifyContent: 'center', display: 'flex', textAlign: 'center', height: '100vh', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                <h2 className="blink" >Nahrávam galériu...</h2>
            </div>
        </div>
    )
}