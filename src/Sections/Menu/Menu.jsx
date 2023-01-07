import { useEffect, useState } from "react";
import { GetDataBaseContext } from "../../App";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import ItemCardV2 from "../../components/ItemCard_v2";
import indexedDBController from "../../indexedDB/indexedDB";

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
  };

  const addNewItem = async () => {
    // create empty item from db
    const data = {
      Title: undefined,
      Price: undefined,
      Notes: undefined,
      Count: undefined,
      Photo: undefined,
      DateAdded: new Date().toLocaleDateString("en-us"),
    };
    const id = await indexedDBController.addData(db, "Menu", data);
    console.log("id:" + id);
    data.id = id;
    setMenu([...menu, data]);
    //
  };

  useEffect(() => {
    const getMenu = async () => {
      setLoading(true);
      try {
        const retrievedMenu = await indexedDBController.getAllDataFromStore(
          db,
          "Menu"
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
          <button className="mt-4 btn bg-primary" onClick={addNewItem}>
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
            Conent={e.Content}
          />
        ))}
      </div>
    </>
  );
}

export default Menu;
