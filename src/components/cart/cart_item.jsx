import PropTypes from 'prop-types';


import './cart_item.css'
import SizeOption from '../../micro_components/sizes';
import { removeItemToCart, update_item } from '../../firebase/firebase';
import { useState } from 'react';

const CartItem = ({item, user, updateSubtotal}) => {
    const [times_item, setTimes_item] = useState(item.timesAddedItem)

    function handleModifyTimeItem(times) {
        if(times_item + times == 0) { //Controllo se devo rimuovere definitivamente l'articolo dal carrello
            removeItemToCart(item, user)
            document.getElementById(item.code).style.display = "none"
            updateSubtotal(-item.cost, times)

        } else {
            if(times < 0) { //Se sto diminuendo la quantità dell'articolo devo anche togliere l'ammontare dal totale
                setTimes_item(times_item + times)
                update_item(item, user, times, -item.cost)
                updateSubtotal(-item.cost, times)

            } else { //Qui invece aumento il totale dato che non sto sottraendo nessuna quantità ma, anzi, sto aumentando la quantità dell'articolo
                setTimes_item(times_item + times)
                update_item(item, user, times, item.cost)
                updateSubtotal(item.cost, times)
            }
        }
    }    

    return (
        <>
        <div className="cartItem" id={item.code}> 
            <img src={item.img_src} className="cartImgItem" alt={item.code} />

            <div className="div-general-cart">

                <div className="cartItemInfo">
                    <div className="item-description">
                        <h3>{item.article}</h3>
                        <h6>{item.brand}</h6>
                    </div>

                    <div className="div-item-cost-times">
                        <h2>{item.cost}€</h2>

                        <div className='div-item-times'>
                            <button className='removeItemBtn' type='submit' onClick={() =>  handleModifyTimeItem(-1)}>-</button>
                            <h2 className='inputFieldItem'>{times_item}</h2>
                            <button className='addItemBtn' type='submit' onClick={() => handleModifyTimeItem(1)}>+</button>
                        </div>
                    </div>
                </div>

                { item.size ? <SizeOption item={item} user={user}/> : <></>}
            </div>      
        </div>
        </>
    )
}

export default CartItem

CartItem.propTypes = {
    item: PropTypes.object,
    user: PropTypes.string,
    updateSubtotal: PropTypes.func
}