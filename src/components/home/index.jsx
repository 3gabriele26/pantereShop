import { useEffect } from 'react'
import { auth, control_summary_order, summary_order } from '../../firebase/firebase'
import Header from '../header'
import ItemViewer from '../itemViewer'
import './home.css'

const Home = () => {
    useEffect(() => {
        if(!control_summary_order(auth.currentUser)) {
            summary_order(auth.currentUser)
        }
    })

    return (
        <>
            <Header type={"ITEM-VIEW"}/>
            <ItemViewer />
        </>
    )
}

export default Home