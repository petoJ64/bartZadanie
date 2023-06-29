/* eslint-disable react/prop-types */
import Form  from 'react-bootstrap/Form';


export const CustomForm = ({data,setNewAlbums = () => {}}) => {

    return (
        <div>
            <h5  className='text-opacity'>Vyhľadávanie</h5>
            <Form>
                <Form.Group >                  
                    <Form.Control 
                        type="text" 
                        id="categoryInput" 
                        placeholder="Názov albumu" 
                        onChange={(event) => {
                            const searchString = event.target.value.toLowerCase();
                            const filterAlbums = data.galleries?.filter((album) => album.name.toLowerCase().includes(searchString));
                            setNewAlbums(filterAlbums);
                            }}
                    />
                </Form.Group>
                
            </Form>
        </div>
    )
}