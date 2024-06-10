import PropTypes from 'prop-types';

import './status_flag.css'
import arrowImg from '../../../../assets/right-arrow.png'
import { useEffect, useState } from 'react';
import { updateOrderStatus } from '../../../../firebase/firebase';



function StatusFlag({ID, STATUS}) {
    const [ordered, setOrdered] = useState(false)
    const [payed, setPayed] = useState(false)
    const [delivered, setDelivered] = useState(false)

    useEffect(() => {
        const items_ordered = document.querySelector("#items_ordered_" + ID)
        const order_info = document.querySelector("#order_info_" + ID)

        if(STATUS == "ORDERED") {
            setOrdered(true)

        } else if(STATUS == "PAYED") {
            setOrdered(true)
            setPayed(true)

        } else if(STATUS == "DELIVERED") {
            items_ordered.style.opacity = "0.4"
            order_info.style.opacity = "0.4"

            setOrdered(true)
            setPayed(true)
            setDelivered(true)
        }

    }, [STATUS, ID])


    
    
    function handleClickStatusFlag() {
        if(!ordered) {
            updateOrderStatus(ID, "ORDERED")
            setOrdered(true)

        } else if( ordered && !payed) {
            updateOrderStatus(ID, "PAYED")
            setPayed(true)

        } else {
            const items_ordered = document.querySelector("#items_ordered_" + ID)
            const order_info = document.querySelector("#order_info_" + ID)
            items_ordered.style.opacity = "0.4"
            order_info.style.opacity = "0.4"

            updateOrderStatus(ID, "DELIVERED")
            setDelivered(true)
        }
    }



  
    return (
    <>
        <div className='general-div-status'>
            <div className='div-status-flag PROCESSING'>
                <h4>DA ORDINARE</h4>
            </div>

            <div><img src={arrowImg} className='arrow-icon'/></div>

            {ordered ?  
            <div className='div-status-flag ORDERED'  style={{opacity: 1}}>
                <h4>ORDINATO</h4>
            </div>
            :  
            <div className='div-status-flag ORDERED'>
                <a onClick={() => handleClickStatusFlag()}><h4>ORDINATO</h4></a>
            </div>}

            <div><img src={arrowImg} className='arrow-icon'/></div>

            {payed ?  
            <div className='div-status-flag PAGATO'  style={{opacity: 1}}>
                <h4>PAGATO</h4>
            </div>
            :  
            <div className='div-status-flag PAGATO'>
                <a onClick={() => handleClickStatusFlag()}><h4>PAGATO</h4></a>
            </div>}

            <div><img src={arrowImg} className='arrow-icon'/></div>

            {delivered ?  
            <div className='div-status-flag CONSEGNATO' style={{opacity: 1}}>
                <h4>CONSEGNATO</h4>
            </div>
            :  
            <div className='div-status-flag CONSEGNATO'>
                <a onClick={() => handleClickStatusFlag()}><h4>CONSEGNATO</h4></a>
            </div>}
        </div>
    </>
  )
}

export default StatusFlag

StatusFlag.propTypes = {
    ID: PropTypes.string,
    STATUS: PropTypes.string
}