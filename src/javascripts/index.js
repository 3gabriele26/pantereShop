import { removeItemDB } from "../firebase/firebase"

export function cart_view(view) {
    let itemsViewer = document.getElementById('itemViewer')
    let cart_view = document.getElementById('cartItemViewer')

    if(view == "VIEW-CART-ITEMS"){
        itemsViewer.style.display = 'none'
        cart_view.style.display = 'block'
    } else {
        itemsViewer.style.display = 'block'
        cart_view.style.display = 'none'
    }
}

export function control_if_size_chosen(item) {

    if(item.size) {
        if(item.size_chosen == "") {
            return false
        } else {
            return true
        }
    } else return true   
}

export function checkIfDeleteItem(itemCode, item) {
    if (confirm("Vuoi davvero cancellare questo articolo ?")) {
        let itemToRemove = document.querySelector("#" + itemCode)
        itemToRemove.style.display = "none"
        removeItemDB(item)

        window.alert("Articolo cancellato con successo!")

      } else {
        alert("Articolo non cancellato!")
      }
}


/*

let status = true
data.forEach((reactItem) => {
        let item = reactItem.props.item

        console.log(item)

        if(item.size) {
            if(item.size_chosen == "") {
                status = !status
            }
        }
        console.log(status)
    });

    return status
*/
