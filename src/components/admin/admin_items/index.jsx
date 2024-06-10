import './admin_items.css'

import { db } from '../../../firebase/firebase'
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Admin_Item from './admin-item';


function AdminItems() {
  const [data, setData] = useState([]);

  useEffect(() => {
      async function getData() {
          const q = query(collection(db, "Items"))
          const querySnapshot = await getDocs(q);
          let items = []
          querySnapshot.forEach((doc) => {
              items.push(<Admin_Item item={doc.data()} key={doc.data().code}/>)
          });

          setData(items)
      }

      getData();
  }, []);

  
  return (
    <>
      <div className='admin-items'>
        {data}
      </div>
    </>
  )
}

export default AdminItems
