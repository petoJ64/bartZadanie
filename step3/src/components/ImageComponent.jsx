/* eslint-disable react/prop-types */
import {useState, useEffect} from "react";


export default function ImageComponent({src}) {
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(()=>{
        const img = new Image()
        img.onload = () => {
            setImageLoaded(true)
        }
        img.src = src
    },[src])

    return (
        <>
            {!imageLoaded && ( 
                <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status" >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {imageLoaded && 
                <img 
                    className="img-fit rounded"
                    src={src}
                    alt=""
                />
            }
        </>
    )
}