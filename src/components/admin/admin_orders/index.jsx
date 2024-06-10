import './admin_orders.css'

import { useEffect, useState } from "react";
import { db } from '../../../firebase/firebase'
import { collection, query, getDocs } from "firebase/firestore";
import Order_item from './order_item';


function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
      async function getData() {
          const q = query(collection(db, "Orders"))
          const querySnapshot = await getDocs(q);
          let items = []

          querySnapshot.forEach((doc) => {
              items.push(<Order_item order={doc.data()} key={doc.id} ID={doc.id}/>)
          });

          setData(items)
      }

      getData();
  }, []);

  
  return (
    <>
        <div className='admin-orders'>
          {data}
        </div>
    </>
  )
}

export default Orders
