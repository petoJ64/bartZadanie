/* eslint-disable react/prop-types */
import { API_URL } from "../constants/constants"
import { Link } from "react-router-dom"
import ImageComponent from "./ImageComponent"
import album from '../images/album.svg';

export const AlbumCard = ({name,fullpath}) => {
    let src = "";
    
    if(fullpath == undefined) {
        src = album;
    }else{
        src = `${API_URL}images/232x240/${fullpath}`
    }

    return(
        <Link className="img-fit center-loader" to={`/category/${name}`} >
            <ImageComponent src={src} />
         </Link>
    )
}