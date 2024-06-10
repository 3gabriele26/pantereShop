import AdminHeader from './admin_header'
import AdminItems from './admin_items'
import CreateItem from './admin_items/create_item'
import Orders from './admin_orders'
import './orders.css'



function Admin() {

  
  return (
    <>
      <AdminHeader />
      <Orders />
      <AdminItems />
      <CreateItem />
    </>
  )
}

export default Admin
