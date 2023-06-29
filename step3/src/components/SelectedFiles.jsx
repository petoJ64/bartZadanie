/* eslint-disable react/prop-types */
import '../styles/selectedfiles.css';


export const SelectedFiles = ({selectedFiles}) => {

    return(
        <>
        <p><b>Sem presuňte fotky</b></p>
        <p className="text-opacity">alebo</p>
        <label htmlFor="imgs" className='imgBtn mt-1 mb-4  p-2 pl-3 pr-3'>Vyberte súbory</label> 
        <div className="selected-files">{selectedFiles.map(img => <p key={img}>{img}</p>)}</div>
        </>
    )
}