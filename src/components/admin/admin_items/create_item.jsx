import { useState } from 'react'
import Tag from "../../../micro_components/tag"
import './create_item.css'
import { createItem, createRef } from '../../../firebase/firebase'


function CreateItem() {

    const [isSizeRequires, setIsSizeRequired] = useState(false)
    const [itemSizeForm, setItemSizeForm] = useState("")

    const [itemImg, setItemImg] = useState()
    const [itemImgFIleName, setItemImgFielName] = useState()

    const [itemCode, setItemCode] = useState()
    const [itemName, setItemName] = useState()
    const [itemBrand, setItemBrand] = useState()
    const [itemCost, setItemCost] = useState()

    const [itemTags, setItemTags] = useState([])
    const [itemTagsString, setItemTagsString] = useState([])

    

    function sizeRequired() {
        setIsSizeRequired(!isSizeRequires)
    }

    function createTags(value) {
        if(itemTags.length == 0) {

            let tag_to_add = <Tag tag={value} key={value}/>
            setItemTags([tag_to_add])
            setItemTagsString([value])

        } else {
            let tag_to_add = <Tag tag={value} key={value}/>
            let status = true

            itemTags.forEach((tag) => {

                if(tag.key == value) {
                    const newListTags = itemTags.filter((tag) => tag.key !== value);
                    const newListTagsString = itemTags.filter((tag_string) => tag_string !== value);

                    setItemTags(newListTags)
                    setItemTagsString(newListTagsString)
                    status = false
                }
            })

            if(status) {
                setItemTags([...itemTags, tag_to_add])
                setItemTagsString([...itemTagsString, value])
            }
        }
    }

    function getImg(imageFile) {
        let src = URL.createObjectURL(imageFile)
        createRef(imageFile.name, imageFile)
        setItemImgFielName(imageFile.name)
        
        setItemImg(src)
    }

    

  
  return (
    <>
      <div className='div-create-item'>

        <div className='form-create-item'>        

            <div className="inputSection">
                <label className='input-label'>NOME ARTICOLO</label>
                <input 
                className="form-control"
                onChange={(e) => setItemName(e.target.value.toUpperCase())}
                />
            </div>

            <div className="inputSection">
                <label className='input-label'>MARCA</label>
                <input 
                className="form-control"
                onChange={(e) => setItemBrand(e.target.value.toUpperCase())}
                />
            </div>

            <div className="inputSection">
                <label className='input-label'>COSTO</label>
                <input 
                className="form-control"
                onChange={(e) => setItemCost(e.target.value)}
                />
            </div>

            <div className="inputSection">
                <label className='input-label'>CODICE</label>
                <input 
                className="form-control"
                onChange={(e) => setItemCode(e.target.value.toUpperCase())}
                />
            </div>            
            
            <div>
                <label>Taglia richiesta ?</label>
                <input 
                    type='checkbox' 
                    className='checkbox-size-required'
                    onChange={() => sizeRequired()}
                />
            </div>

            {isSizeRequires ? 
            
                <select name="size_form" id="size_form" onChange={(e) => setItemSizeForm(e.target.value)}>
                    <option disabled selected>Scegli la tipologia di taglie</option>
                    <option value="NORMAL">ABBIGLIAMENTO</option>
                    <option value="HAT">CAPPELLO</option>
                </select>

            : <></>}

            <div className='div-tag-section'>
                <div className="tag-section">
                    <input 
                    value="ABBIGLIAMENTO"
                    onClick={(e) => createTags(e.target.value)}
                    type='checkbox'
                    />
                    <label>ABBIGLIAMENTO</label>
                </div>

                <div className="tag-section">
                    <input 
                    value="TECNICO"
                    onClick={(e) => createTags(e.target.value)}
                    type='checkbox'
                    />
                    <label>TECNICO</label>
                </div>

                <div className="tag-section">
                    <input 
                    value="RAPPRESENTANZA"
                    onClick={(e) => createTags(e.target.value)}
                    type='checkbox'
                    />
                    <label>RAPPRESENTANZA</label>
                </div>

                <div className="tag-section">
                    <input 
                    value="TEMPO LIBERO"
                    onClick={(e) => createTags(e.target.value)}
                    type='checkbox'
                    />
                    <label>TEMPO LIBERO</label>
                </div>

                <div className="tag-section">
                    <input 
                    value="ACCESSORI"
                    onClick={(e) => createTags(e.target.value)}
                    type='checkbox'
                    />
                    <label>ACCESSORI</label>
                </div>
            </div>

            <input type="file" id="img" accept="image/*" onChange={(e) => getImg(e.target.files[0])}/>

            <button className='create-item-button' onClick={() => createItem(itemName, itemCode, itemBrand, itemCost, itemTagsString, itemImgFIleName, isSizeRequires, itemSizeForm)}>CREA ARTICOLO</button>
        </div>

        <div className='item-preview'>
            <div className="item"> 

            <div className="imgDiv">
                <img src={itemImg} className="imgItem" alt={itemName}/>
                <span className="badgeItem badgeDiv" id={itemCode}></span>
            </div>

            <div className="itemInfo">

                <div className="divInfoItem">
                    <h3>{itemName}</h3>
                    <h6>{itemBrand}</h6>
                </div>

                <div className="divCostItem">
                    <h3>{itemCost}€</h3>
                </div>
            </div> 

            <div className="itemTags">
                {itemTags}
            </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default CreateItem
