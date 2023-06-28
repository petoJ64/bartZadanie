/* eslint-disable react/prop-types */


export const SelectedFiles = ({selectedFiles}) => {

    return(
        <>
        <p><b>Sem presuňte fotky</b></p>
        <p style={{opacity:'0.6'}}>alebo</p>
        <label htmlFor="imgs" className='imgBtn mt-1 mb-4  p-2 pl-3 pr-3'>Vyberte súbory</label> 
        <div style={{color:'green'}}>{selectedFiles.map(img => <p key={img}>{img}</p>)}</div>
        </>
    )
}