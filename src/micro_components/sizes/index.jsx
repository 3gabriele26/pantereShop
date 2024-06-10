import PropTypes from 'prop-types';
import { update_size_item } from '../../firebase/firebase';
import { useEffect, useState } from 'react';


import './size_option.css'

const SizeOption = ({item, user}) => {
    const [size, setSize] = useState(item.size_chosen)

    useEffect(() => {
        let ID = size + item.code

        if(size != "") {
            document.querySelector("#" + ID).style.opacity = "1"
        }
    })


    function handleChoiseSize(size_c, item_code) {
        let ID = size_c + item_code
        let previous_ID = size + item_code

        if(size == "") {
            document.querySelector("#" + ID).style.opacity = "1"
            setSize(size_c)
            update_size_item(item, user, size_c, ID)
        } else {
            document.querySelector("#" + previous_ID).style.opacity = "0.5"
            document.querySelector("#" + ID).style.opacity = "1"
            setSize(size_c)
            update_size_item(item, user, size_c, ID)
        }
    }
    

    return (    
        <>
        {item.size_form == "HAT" ? 

        <div className='div-size'>
            <a className='size-button' onClick={() => handleChoiseSize("S-M", item.code)} id={"S-M" + item.code}>S/M</a>
            <a className='size-button' onClick={() => handleChoiseSize("L-XL", item.code)} id={"L-XL" + item.code}>L/XL</a>
        </div> 
        :
        <div className='div-size'>
            <a className='size-button' onClick={() => handleChoiseSize("S", item.code)} id={"S" + item.code}>S</a>
            <a className='size-button' onClick={() => handleChoiseSize("M", item.code)} id={"M" + item.code}>M</a>
            <a className='size-button' onClick={() => handleChoiseSize("L", item.code)} id={"L" + item.code}>L</a>
            <a className='size-button' onClick={() => handleChoiseSize("XL", item.code)} id={"XL" + item.code}>XL</a>
            <a className='size-button' onClick={() => handleChoiseSize("XXL", item.code)} id={"XXL" + item.code}>XXL</a>
            <a className='size-button' onClick={() => handleChoiseSize("XXXL", item.code)} id={"XXXL" + item.code}>XXXL</a>
        </div> }
        </>  
    )
}

export default SizeOption

SizeOption.propTypes = {
    item: PropTypes.object,
    user: PropTypes.string
}

/*


<div className='div-size'>
    <a className='size-button' onClick={() => handleChoiseSize("S/M", item.code)} id={"S/M" + item.code}>S/M</a>
    <a className='size-button' onClick={() => handleChoiseSize("L/XL", item.code)} id={"L/XL" + item.code}>L/XL</a>
</div> 
        
        */