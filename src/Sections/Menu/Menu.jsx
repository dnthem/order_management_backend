import { useEffect, useState } from "react";
import { GetDataBaseContext } from "../../App";
import Header from "../../components/Header";
import ItemCardV2 from "../../components/ItemCard_v2";
import indexedDBController from "../../indexedDB/indexedDB";

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
    // remove item from menu
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
      DateAdded: new Date().toLocaleDateString("en-us"),
    };
    const id = await indexedDBController.addData(db, STORE, data);
    console.log("id:" + id);
    data.id = id;
    setMenu([...menu, data]);
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
        console.error(error.message);
      }
      setLoading(false);
    };
    getMenu();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col">
          <Header title="Menu" />
        </div>
        <div className="col">
          <button className="mt-4 btn btn-primary" onClick={addNewItem}>
            Add new item
          </button>
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
          />
        ))}
      </div>
    </>
  );
}

export default Menu;
