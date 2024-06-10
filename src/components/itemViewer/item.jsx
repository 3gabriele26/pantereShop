import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { addItemToCart } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import Tag from '../../micro_components/tag';
import Badge from '../../micro_components/badge';

import './item.css'

const Item = (item) => {
    const [user, setUser] = useState();
    const [timesAdded, setTimesAdd] = useState(1)

    let tags = []

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        setUser(user);
        });
    });

    let itemComponent = {
        item: item.item.item,
        code: item.item.code,
        brand: item.item.brand,
        cost: item.item.cost,
        tag: item.item.tag,
        img_src: item.item.img_src,
        size: item.item.size,
        size_chosen: "",
        size_form: item.item.size_form,
        timesAddedItem: timesAdded
    }

    if(typeof(itemComponent.tag) == 'object'){
        for(let i = 0; i < itemComponent.tag.length; i++){
            tags.push(<Tag tag={itemComponent.tag[i]} key={i}/>)
        }
    } else {
        tags.push(<Tag tag={itemComponent.tag} key={1}/>)
    }

    function handleAdding() {
        addItemToCart(itemComponent, user);
        setTimesAdd(timesAdded + 1)
    }

    return (
        <>
        <div className="item"> 

            <div className="imgDiv">
                <img src={itemComponent.img_src} className="imgItem" alt={itemComponent.item}/>
                <span className="badgeItem badgeDiv" id={itemComponent.code}><Badge times={1} /></span>
            </div>

            <div className="itemInfo">

                <div className="divInfoItem">
                    <h3>{itemComponent.item}</h3>
                    <h6>{itemComponent.brand}</h6>
                </div>

                <div className="divCostItem">
                    <h3>{itemComponent.cost}€</h3>
                    <button className="addToOrderBtn" 
                    onClick={handleAdding} type="submit">AGGIUNGI</button>
                </div>
            </div> 

            <div className="itemTags">
                {tags}
            </div>

        </div>
        </>
    )
}

export default Item

Item.propTypes = {
    item: PropTypes.object
}