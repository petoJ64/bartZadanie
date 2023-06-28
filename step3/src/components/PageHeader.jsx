/* eslint-disable react/prop-types */

export const PageHeader = ({children}) => {

    return(
    <>
        <div className="intro" >
                <h2 style={{ marginRight: 'auto' }}>Fotogaléria</h2>
                {children}
        </div>
        
    </>
        
    )
}