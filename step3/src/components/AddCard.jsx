/* eslint-disable react/prop-types */
import plus from '../images/plus.svg';

//export const AddCard = ({content,handleModal = () => {}}, modalContent) => {
    export const AddCard = (props) => {
    const {content, handleModal = () => {}, modalContent} = props;
    return(
        <div style={{marginBottom:'30px',width:'232px', height:'240px'}}>
            <div className="h-100 ">
                <div className="img-container text-center center-plus " onClick={() => handleModal('addImages',modalContent)}>
                    <img className="plus" src={plus} alt="gallery"/>
                    <p  style={{marginTop:'8px'}}> {content} </p>
                </div>                    
            </div>
        </div>
    )
}