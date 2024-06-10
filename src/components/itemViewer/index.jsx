import Item from './item'
import './itemViewer.css'
import { db } from '../../firebase/firebase'
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const ItemViewer = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const q = query(collection(db, "Items"))
            const querySnapshot = await getDocs(q);
            let items = []
            querySnapshot.forEach((doc) => {
                items.push(<Item item={doc.data()} key={doc.data().code}/>)
            });

            setData(items)
        }

        getData();
    }, []);
    

    return (
        <>
        <div id="itemViewer">
            <h1 className="title">Scegli cosa ordinare !</h1>
            <div className="divItems">
                {data}
            </div>
        </div>
        </>
    )
}

export default ItemViewer