/* eslint-disable react/prop-types */
import '../styles/pageheader.css'


export const PageHeader = ({children}) => {

    return(
    <>
        <div className="intro" >
                <h2 className = 'page-header'>Fotogaléria</h2>
                {children}
        </div>
        
    </>
        
    )
}