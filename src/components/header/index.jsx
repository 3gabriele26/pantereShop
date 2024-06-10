import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { auth, handleSignOut } from "../../firebase/firebase";

import logo from '../../assets/pantereLogo.png'
import cartIcon from "../../assets/cart.png"
import itemsIcon from "../../assets/items.png"
import './header.css'
import '../../micro_components/tooltip.css'


const Header = ({type}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [imgIcon, setImgIcon] = useState(cartIcon)
    const [link, setLink] = useState("/cart")
    const [position, setPosition] = useState("Vai al carrello")

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                setIsLoggedIn(true)
            }
        });

        if(type == "CART_VIEW") {
            setImgIcon(itemsIcon)
            setLink("/home")
            setPosition(" Torna agli articoli")
        } else {
            setImgIcon(cartIcon)
            setLink("/cart")
            setPosition("Vai al carrello")
        }
    }, [type, link]);

    function handleCLick() {
        window.location.href = link
    }

    return (
        <>
            {isLoggedIn ? 
                <div className='header'>
                    <div className='div-logo-button'>
                        <a href='/'><img src={logo} alt='Logo Pantere' className='logoPantere'/></a>
                        <button onClick={handleSignOut} className="primary-btn"> LOG OUT </button>
                    </div>


                    <div className="header-button-div">
                        <button href='' className='button-cart tooltip' onClick={handleCLick}>
                            <img src={imgIcon} alt='cart icon' className='cartIcon'/>
                            <span className='tooltiptext'>{position}</span>
                        </button>
                    </div> 
                </div> : 

                <div className='header'>
                    <a href='/'><img src={logo} alt='Logo Pantere' className='logoPantere'/></a>

                </div>
            }
        </>
    )
}

export default Header 

Header.propTypes = {
    type: PropTypes.string
}