import { useEffect, useState } from "react";
import { GetDataBaseContext } from "../../App";
import Header from "../../components/Header";
import ItemCardV2 from "../../components/ItemCard_v2";
import indexedDBController from "../../indexedDB/indexedDB";
import {GrFormAdd} from 'react-icons/gr';
import {MdMenuBook} from 'react-icons/md';
import { dateFormat } from "../../utils";
const STORE = 'Menu';

function Menu(props) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { db } = GetDataBaseContext();

  /**
   * Callback function passed to itemCard, and is called from item card
   * @param {Number} key item identifier, it is uneque to each item
   */
  const removeItemFromMenu = (key) => {
    //remove item from menu
    setMenu(menu.filter((e) => e.id !== key));
    // remove item from indexedDB
    indexedDBController.deleteARecord(db, STORE, key);
  };

  const addNewItem = async () => {
    // create empty item from db
    const data = {
      Title: undefined,
      Price: 0,
      Notes: undefined,
      Count: 0,
      Photo: undefined,
      Hidden: false,
      DateAdded: dateFormat(),
    };
    const id = await indexedDBController.addData(db, STORE, data);
    data.id = id;
    setMenu([data, ...menu]);
    //
  };

  const updateMenu = (newItem) => {
    const temp = menu.map(e => e.id != newItem.id? e: 
      {
        id: newItem.id,
        Title: newItem.Title,
        Price: newItem.Price,
        Content: newItem.Content,
        Photo: newItem.Photo, 
        Count: newItem.Count,
        DateAdded: newItem.DateAdded,
        Hidden: newItem.Hidden
      })
      setMenu(temp);
  }

  useEffect(() => {
    const getMenu = async () => {
      setLoading(true);
      try {
        const retrievedMenu = await indexedDBController.getAllDataFromStore(
          db,
          STORE
        );
        setMenu(retrievedMenu);
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    };
    getMenu();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col">
          <Header icon={<MdMenuBook/>} title="Menu" />
        </div>
        <div className="col">
          <div className="d-flex justify-content-center">
            <button className="mt-4 btn border-black" onClick={addNewItem}>
            <GrFormAdd/>Add new item 
            </button>
          </div>
          
        </div>
      </div>
      <div className="row">
        {loading && <div>Loading...</div>}
        {menu.map((e) => (
          <ItemCardV2
            remove={removeItemFromMenu}
            key={e.id}
            cardID={e.id}
            Title={e.Title}
            Price={e.Price}
            Content={e.Content}
            Photo={e.Photo}
            updateMenu={updateMenu}
            Count={e.Count}
            Hidden={e.Hidden}
          />
        ))}
      </div>
    </>
  );
}

export default Menu;
