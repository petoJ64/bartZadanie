/* eslint-disable react/prop-types */
import {useState, useEffect} from "react";
import notVisible from "../images/notVisible.svg";

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
      {error && <div style={{background:'lightgrey',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',minHeight:'240px'}}><img src={notVisible} className="img-fit" style={{maxWidth:'60px'}}/><p style={{width:'80%'}}>Bohuzial obrazok nie je mozne zobrazit.</p></div>}
        </>
    )
}