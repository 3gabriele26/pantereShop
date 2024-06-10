import './admin_header.css'



function AdminHeader() {

  function showItemsPage() {
    let items_page = document.querySelector(".admin-items")
    let orders_page = document.querySelector(".admin-orders")
    let create_item_button = document.querySelector(".create-item")
    let create_item_page = document.querySelector(".div-create-item")

    orders_page.style.display = "none"
    items_page.style.display = "flex"
    create_item_button.style.display = "flex"
    create_item_page.style.display = "none"
  }

  function showOrdersPage() {
    let orders_page = document.querySelector(".admin-orders")
    let items_page = document.querySelector(".admin-items")
    let create_item_button = document.querySelector(".create-item")
    let create_item_page = document.querySelector(".div-create-item")

    items_page.style.display = "none"
    orders_page.style.display = "flex"
    create_item_button.style.display = "none"
    create_item_page.style.display = "none"
  }

  function showPageCreateItem() {
    let items_page = document.querySelector(".admin-items")
    let create_item_page = document.querySelector(".div-create-item")

    items_page.style.display = "none"
    create_item_page.style.display = "flex"
  }

  
  return (
    <div className='div-admin-header'>
       <div className='div-admin-links'>
          <a className='admin-selector-page' onClick={() => showItemsPage()}>ARTICOLI</a>
          <a className='admin-selector-page' onClick={() => showOrdersPage()}>ORDINI</a>
      </div>

      <div className='create-item'>
        <a className='admin-selector-page' onClick={() => showPageCreateItem()}>CREA ARTICOLO</a>
      </div>
    </div>
  )
}

export default AdminHeader
