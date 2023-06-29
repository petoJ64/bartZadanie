/* eslint-disable react/prop-types */
import {useState, useEffect} from "react";
import notVisible from "../images/notVisible.svg";
import '../styles/imagecomponent.css';

// display image or loader
export default function ImageComponent({src}) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const img = new Image()
        img.onload = () => {
            setImageLoaded(true)
        }
        img.onerror = () => {
            setImageLoaded(false)
            setError(true);
          };
        img.src = src
    },[src])

    return (
        <>
            {!imageLoaded && !error && ( 
                <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status" >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
           {imageLoaded && !error && (
            <img
              className="img-fit rounded"
              src={src}
              alt=""
              onError={(e) => {
                setError(true);
                console.log(e);
              }}
            />
          )}
          {error && 
          <div className="sorry-image">
            <img src={notVisible} className="img-fit sorry-width" />
            <p >Bohužiaľ obrazok nie je možné zobraziť.</p>
          </div>
          }
        </>
    )
}