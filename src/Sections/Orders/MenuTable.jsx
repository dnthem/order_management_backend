import { useEffect, useState } from "react";
import { GetDataBaseContext } from "../../App";
import OrderItemCard from "../../components/OrderMenuItemCard";
import indexedDBController from "../../indexedDB/indexedDB";

const STORE = 'Menu';

function MenuTable(props) {
    const {db} = GetDataBaseContext();
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const getMenu = async () => {
            try {
                const res = await indexedDBController.getAllDataFromStore(db, STORE)
                setMenu(res);
            } catch (error) {
                console.error(error);
            }
        }
        getMenu();
    },[])
    return ( 
        <table className="table">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th></th><th></th>
                </tr>
            </thead>
            <tbody>
                {menu.map(e => <OrderItemCard 
                    Photo={e.Photo}
                    Title={e.Title}
                    Price={e.Price}
                    key={e.id}/>
                )}
            </tbody>
        </table>
     );
}

export default MenuTable;