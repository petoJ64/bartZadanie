/* eslint-disable react/prop-types */
import arrow from '../images/arrow.svg';


export const ImageArrow = ({activeChild, changeBlogPicBackwards = () =>{}, changeBlogPicForwards = () => {}, length}) => {

    return(
        <>
            <div className={`arrow-left ${activeChild !== 0 ? 'pointer' : 'disabled'}`} onClick={changeBlogPicBackwards}>
                <img src={arrow} className='next-arrow img-fit' alt="left arrow" />
            </div>
            
            <div className={`arrow-right ${activeChild !== length - 1 ? 'pointer' : 'disabled'}`} onClick={changeBlogPicForwards}>
                <img src={arrow} className='next-arrow img-fit' alt="right arrow" />
            </div>
        </>
    )
}