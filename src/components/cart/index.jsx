import { auth, db, sendOrder } from '../../firebase/firebase'
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";


import './cart.css'
import CartItem from './cart_item';
import Header from '../header';

const Cart = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    

    useEffect(() => {

        async function getData() {

            const modifyTotal = (value, times) => {
                let elements = document.querySelectorAll(".hide-when-change")

                for(let i = 0; i < elements.length; i++){
                    elements[i].style.filter = 'blur(0.8rem)'
                }
                setTotal(total + value)
                setTotalItems(totalItems + times)
                setTimeout(function() {
                    for(let i = 0; i < elements.length; i++){
                        elements[i].style.filter = 'blur(0)'
                    }
                  }, 700)
            }

            const c_items = query(collection(db, "Users/" + auth.currentUser.uid  + "/cart-items"))
            const order_total = query(collection(db, "Users/" + auth.currentUser.uid  + "/order-summary"))
            const querySnapshotCart = await getDocs(c_items);
            const querySnapshotTotal = await getDocs(order_total);

            let items = []
            let item_number = 0
            querySnapshotCart.forEach((doc) => {
                items.push(<CartItem item={doc.data()} key={doc.data().code} user={auth.currentUser.uid} updateSubtotal={modifyTotal}/>)
                item_number += doc.data().timesAddedItem
            });
            setData(items)
            setTotalItems(item_number)

            querySnapshotTotal.forEach((doc) => {
                setTotal(doc.data().total)
            })
        }

        getData();
    }, [total, totalItems]);

    



    return (
        <>
            <Header type={"CART_VIEW"}/>
            {data.length == 0 ? 
            <div>
                <h1 className='title'>Aggiungi qualcosa al carrello</h1>
            </div>
            : 
            <>
                <div id="cartItemViewer">
                    <h1 className="title">Riepilogo Ordine</h1>
                    
                    <div className='items-checkout'>
                        <div className="div-cart-tems">
                            {data}
                        </div>

                        <div id='order-summary' className='hided-with-media-query'>
                        

                            <div className='total'>
                                <h2 className='title'>Totale:</h2>
                                <h2 className='hide-when-change'>{total + ",00 €"}</h2>
                            </div>

                            <div >
                                <em className='hide-when-change'>{totalItems}</em> articoli presenti
                            </div>


                            <hr></hr>

                            <div className='button_send_order'>
                                <button className='primary-btn' onClick={() => sendOrder(auth.currentUser, total)}>INVIA ORDINE</button>
                            </div>
                        </div>
                    </div>

                    <div className='footer-summary'>
                        <hr className='hided-with-media-query'></hr>

                        <div className='div-total-button-footer-query'>
                            <div  className='footer-total total'>
                                <h2 className='title'>Totale:</h2>
                                <h2 className='hide-when-change'>{total + ",00 €"}</h2>
                            </div>

                            <div className='show-with-media-query'>
                                <em className='hide-when-change' >{totalItems}</em> articoli presenti
                            </div>

                            <div className='button_send_order show-with-media-query'>
                                <button className='primary-btn' onClick={() => sendOrder(auth.currentUser, total)}>INVIA ORDINE</button>
                            </div>
                        </div>

                    </div>

                    
                </div> 

               <div className='thanks'>
                    <h1 className='title'>GRAZIE</h1>
                    <button className='primary-btn' onClick={() => window.location.href = "/home"}>CONTINUA GLI ACQUISTI</button>
                </div>
            </>}
        </>
    )
}

export default Cart

