/* eslint-disable react/prop-types */
import plus from '../images/plus.svg';
import '../styles/addcard.css'


export const AddCard = (props) => {
    const {content, handleModal = () => {}, modalContent} = props;
    return(
        <div className='card-size'>
            <div className="h-100 ">
                <div className="img-container text-center center-plus " onClick={() => handleModal('addImages',modalContent)}>
                    <img className="plus" src={plus} alt="gallery"/>
                    <p  className='card-content'> {content} </p>
                </div>                    
            </div>
        </div>
    )
}