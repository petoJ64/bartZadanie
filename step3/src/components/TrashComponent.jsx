/* eslint-disable react/prop-types */
import trash from '../images/trash.svg'

export const TrashComponent = ({onDeleteALbum = () => {}, name}) => {

    return(
        <img  src={trash} className=' trash pointer ' alt="" onClick={()=>onDeleteALbum(name)}/>
    )
}