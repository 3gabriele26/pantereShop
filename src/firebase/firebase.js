import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth"
import { getFirestore, setDoc, doc , collection, query, getDocs, updateDoc, increment, deleteDoc, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { control_if_size_chosen } from "../javascripts";

const firebaseConfig = {
  apiKey: "AIzaSyB6ohIJoI8Dxp1x2w1WGefI507NcD52vPo",
  authDomain: "panterebaseball.firebaseapp.com",
  projectId: "panterebaseball",
  storageBucket: "panterebaseball.appspot.com",
  messagingSenderId: "672666353637",
  appId: "1:672666353637:web:71a2ae4ef6ab3197ebb90c",
  measurementId: "G-L1QNDGN797"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

//Funzione utilizzata per il logout dell'utente
export async function handleSignOut(e) {
  e.preventDefault();
  try {
    await signOut(auth);
    window.location.href = "/login";
    
  } catch (error) {
    console.log(error.message);
  }
}



/* 
      SEZIONE MODIFICA GENERALE DB
*/

//utilizzato per aggiungere l'articolo, dalla pagina home al carrello e quindi al database
export function addItemToCart(item, user) { 
  
  if(item.size) {
    setDoc( doc(db, "Users/" + user.uid + "/cart-items", item.item), {
      article: item.item,
      code: item.code,
      brand: item.brand,
      cost: item.cost,
      tag: item.tag,
      img_src: item.img_src,
      size: item.size,
      size_chosen: "",
      size_form: item.size_form,
      timesAddedItem: item.timesAddedItem
    })
  } else {
    setDoc( doc(db, "Users/" + user.uid + "/cart-items", item.item), {
      article: item.item,
      code: item.code,
      brand: item.brand,
      cost: item.cost,
      tag: item.tag,
      img_src: item.img_src,
      size: item.size,
      timesAddedItem: item.timesAddedItem
    })
  }


  control_summary_order(user).then((value) => {
    console.log(value)
    if(value) {
      setDoc( doc(db, "Users/" + user.uid + "/order-summary", "order-summary"), {
        total: item.cost
      })
  
    } else {
      updateDoc( doc(db, "Users/" + user.uid + "/order-summary", "order-summary"),  {
        total: increment(item.cost)
      })
    }
  })
}


//Cancella definitivamente l'articolo dal database
export function removeItemToCart(item, user) { 
  updateDoc( doc(db, "Users/" + user + "/order-summary", "order-summary"),  {
    total: increment(-item.cost)
  })
  deleteDoc( doc(db, "Users/" + user + "/cart-items", item.article))
}

//Cancela definitivamente un articolo dal database, non sarà piu visibile da nessun utente
export function removeItemDB(item) { 
  console.log(item)
  deleteDoc( doc(db, "Items",  item.item))
}

//Azzera il documento  di riepilogo costi 
export function summary_order(user) { 
  setDoc( doc(db, "Users/" + user.uid + "/order-summary", "order-summary"),  {
    total: 0
  })
}

//Funzione utilizzata al momento dell'invio dell'ordine; crea un documento negli ordini effettuati per poter essere visionato dall'admin, 
//cancella gli articoli dal carrello dell'utente e azzera il totale del carrello
export function sendOrder(user, total) {
  const date = new Date()
  let thanks_quote = document.querySelector(".thanks")
  let cart_item_viewer = document.querySelector("#cartItemViewer")
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let status = true

  getCartItem().then((items) => {
    let status = true

    items.forEach((item) => {
      console.log(item)

      if(item.size) {
        if(item.size_chosen == "") {
            status = !status
        }
      }
    })

   if(status == false) {
      window.alert("Seleziona le taglie per tutti gli articoli")
    } else {

      cart_item_viewer.style.display = "none"
      thanks_quote.style.display = "flex"

      setTimeout(function() {

        addDoc( collection(db, "Orders"), {
          user: user.displayName,
          day: day,
          month: month,
          year: year,
          items_ordered: items,
          order_status: "PROCESSING",
          total: total
        })

        items.forEach((item) => {
          deleteDoc( doc(db, "Users/" + user.uid + "/cart-items", item.article))
        })

        summary_order(user)
  
      }, 5000) 
    }
  })
}





/* 
      SEZIONE FUNZIONI ARTICOLI HOMEPAGE
*/

//Utilizzata per aggiornare la quantità dell'articolo in questione e il totale che sarà cambiato a causa dell'aggiunta di un articolo
export function update_item(item, user_uid, times, cost) { 
  updateDoc( doc(db, "Users/" + user_uid + "/cart-items", item.article), {
    timesAddedItem: increment(times)
  })

  updateDoc( doc(db, "Users/" + user_uid + "/order-summary", "order-summary"),  {
    total: increment(cost)
  })
}

//Controlla la presenza del sommario
export async function control_summary_order(user) {
  const q = query( collection(db, "Users/" + user.uid + "/order-summary") )
  const querySnapshot = await getDocs(q);

  return querySnapshot.empty
}





/* 
      SEZIONE FUNZIONI ARTICOLI CARRELLO
*/
//Mi ritorna tutti gli articoli prensenti nel carrello dell'utente
async function getCartItem() {
  let items = []
  const cart_items = query(collection(db, "Users/" + auth.currentUser.uid  + "/cart-items"))
  const querySnapshotCart = await getDocs(cart_items);

  querySnapshotCart.forEach((doc) => {
    items.push(doc.data())
  });

  return items
}

//Aggiorna la taglia da noi scelta per l'articolo selezionato
export function update_size_item(item, user_uid, size_chosen) {  
  updateDoc( doc(db, "Users/" + user_uid + "/cart-items", item.article), {
    size_chosen: size_chosen
  })
}

export async function getItem() {
  const q = query(collection(db, "Items"))
  const querySnapshot = await getDocs(q);
  let items = []

  querySnapshot.forEach((doc) => {
    items.push(doc.data())
  });

  return items
}





/* 
      SEZIONE FUNZIONI GENERALI ADMIN PAGE
*/


export function createItem(article, code, brand, cost, tags, fileName, size, size_form) {
  getDownloadURL(ref(storage, 'images/' + fileName))
  .then((url) => {
    
    setDoc(doc(db, "Items", article), {
      item: article,
      code: code,
      brand: brand,
      cost: cost,
      tag: tags,
      img_src: url,
      size: size,
      size_form: size_form
      
    })
  })
  .catch((error) => {
    console.log(error)
  });
}


//
export function updateItemFromModify(article, brand, cost, code, fileName) {
  getDownloadURL(ref(storage, 'images/' + fileName))
  .then((url) => {
    
    updateDoc( doc(db, "Items", article), {
      brand: brand,
      cost: cost,
      code: code,
      img_src: url
    })
  })
  .catch((error) => {
    console.log(error)
  });
}


//
export function updateOrderStatus(orderID, newStatus) {
  updateDoc(doc(db, "Orders", orderID), {
    order_status: newStatus
  })
}


//Crea il riferimento per l'immagine
export function createRef(fileName, blob) {
  const imgRef = ref(storage, 'images/' + fileName)

  console.log(fileName, blob)

  uploadBytes(imgRef, blob).then((snapshot) => {
    console.log(snapshot)
  })
}



export { app, auth, db };




































/*
export function create_obj_list_db() {let SHEET_ID = '1HdIMQMAqihv9EI-i2b1DjYqqjiEjz6PwtLYB_eukmAU' 
  let SHEET_TITLE = '2024'
  let FULL_URL = ('https://docs.google.com/spreadsheets/d/' +  SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE)

  fetch(FULL_URL)
  .then(res => res.text())
  .then(rep => {
    let data = JSON.parse(rep.substring(47).slice(0,-2))

    createObject(data.table.rows)
  })
} 

async function createObject(rows){

  for(let i = 0; i < 29; i++){
    let articolo = rows[i].c[0].v
    let codice = rows[i].c[1].v
    let marca = rows[i].c[2].v
    let costo = rows[i].c[3].v

    let tag = rows[i].c[4].v
    let multiTag = []

    let immagine = rows[i].c[5].v
    let taglie = rows[i].c[6].v


    if(tag.includes(',')){
      multiTag = tag.split(',')

      await setDoc(doc(db, "Items", articolo), {
        item: articolo,
        code: codice,
        brand: marca,
        cost: costo,
        tag: multiTag,
        img_src: immagine,
        size: taglie
      })
    }else{

      await setDoc(doc(db, "Items", articolo), {
        item: articolo,
        code: codice,
        brand: marca,
        cost: costo,
        tag: tag,
        img_src: immagine,
        size: taglie
      })
    }
    
  }
}
*/
