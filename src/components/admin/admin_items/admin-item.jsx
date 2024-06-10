import './admin_item.css'

import PropTypes from 'prop-types';
import modifyIcon from "../../../assets/edit-button.png"
import { useState } from 'react';
import { updateItemFromModify } from '../../../firebase/firebase';
import { checkIfDeleteItem } from '../../../javascripts';
import { createRef } from '../../../firebase/firebase'


function Admin_Item({item}) {

  const [itemModified, setItemModified] = useState(false)

  const [itemImg, setItemImg] = useState(item.img_src)
  const [itemImgFIleName, setItemImgFielName] = useState()

  const [itemBrand, setItemBrand] = useState(item.brand)
  const [itemCost, setItemCost] = useState(item.cost)
  const [itemCode, setItemCode] = useState(item.code)


  function saveItemModified() {
    updateItemFromModify(item.item, itemBrand, itemCost, itemCode, itemImgFIleName)  
    setItemModified(false)
  }

  function getImg(imageFile) {
    let src = URL.createObjectURL(imageFile)
    createRef(imageFile.name, imageFile)

    setItemImg(src)
    setItemImgFielName(imageFile.name)
  } 
  
  function modifyItem(thingToModify) {

    if(thingToModify == "itemBrand") {
      setItemModified(true)
      let brand = prompt("Modifica marca dell'articolo");
      if(brand != null) {
        setItemBrand(brand)
      }
    } else if( thingToModify == "itemCost") {
      setItemModified(true)
      let cost = prompt("Modifica costo dell'articolo");
      if(cost != null) {
        setItemCost(cost)
      }
    } else if( thingToModify == "itemCode") {
      setItemModified(true)
      let code = prompt("Modifica codice dell'articolo");
      if(code != null) {
        setItemCode(code)
      }
    } else if( thingToModify == "itemImg") {
      setItemModified(true)
    }
  }
  
  return (
    <>
      { itemModified ?
        <div className="item" id={item.code}> 

          <div className="imgDiv choose-file-edit">
            <input type="file" id="img" accept="image/*" onChange={(e) => getImg(e.target.files[0])}/>
          </div>

          <div className="itemInfo">
            <div className="divInfoItem">

              <div>
                <h3>{item.item}</h3>
              </div>

              <div className='editable'>
                <h6>{itemBrand}</h6>
                <span className='div-modify-icon' onClick={() => modifyItem("itemBrand")}><img src={modifyIcon} className='modify-icon'/></span>
              </div>

              <div className='editable'>
                  <h3>{itemCode}</h3>
                  <span className='div-modify-icon' onClick={() => modifyItem("itemCode")}><img src={modifyIcon} className='modify-icon'/></span>
                </div>
            </div>

            <div className="divCostItem editable">
              <h3>{itemCost}€</h3>
              <span className='div-modify-icon' onClick={() => modifyItem("itemCost")}><img src={modifyIcon} className='modify-icon'/></span>
            </div>
          </div> 

          <div className='div-btn'>
            <button onClick={() => setItemModified(false)} className='button-to-decline'>ANNULLA</button>
            <button onClick={() => saveItemModified()} className='button-to-save'>SALVA</button>
          </div>
        </div> 
        
        :

        <div className="item" id={item.code}> 

            <div className="imgDiv ">
                <img src={itemImg} className="imgItem" alt={item.item}/>
                <div className='div-modify-img'>
                  <span className='div-modify-icon' onClick={() => modifyItem("itemImg")}><img src={modifyIcon} className='modify-icon'/></span>
                  <h6>MODIFICA IMMAGINE</h6>
                </div>
            </div>

            <div className="itemInfo">
              <div className="divInfoItem">

                <div className='editable'>
                  <h3>{item.item}</h3>
                </div>

                <div className='editable'>
                  <h6>{itemBrand}</h6>
                  <span className='div-modify-icon' onClick={() => modifyItem("itemBrand")}><img src={modifyIcon} className='modify-icon'/></span>
                </div>

                <div className='editable'>
                  <h3>{itemCode}</h3>
                  <span className='div-modify-icon' onClick={() => modifyItem("itemCode")}><img src={modifyIcon} className='modify-icon'/></span>
                </div>
              </div>

              <div className="divCostItem editable">
                <h3>{itemCost}€</h3>
                <span className='div-modify-icon' onClick={() => modifyItem("itemCost")}><img src={modifyIcon} className='modify-icon'/></span>
              </div>
            </div> 

            <button onClick={() => checkIfDeleteItem(item.code, item)} className='button-to-delete'>ELIMINA</button>
        </div>
      }
    </>
  )
}

export default Admin_Item

Admin_Item.propTypes = {
  item: PropTypes.object
}