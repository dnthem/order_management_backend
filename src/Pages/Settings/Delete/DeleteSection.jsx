import { GetDataBaseContext } from "../../../App";
import indexedDBController, { STORES } from "../../../indexedDB/indexedDB";
import ListItem from "../ListItem";


const DB_LIST = [];
for (const key in STORES) {
    DB_LIST.push(STORES[key].name);
}
const DB_NAME = 'ORDER_MANAGEMENT';
function DeleteSection(props) {
    const {db} = GetDataBaseContext();

    const deleteGuard = () => {
        alert('Make sure that you have saved all your nesscessary information!');
        const randomNumber = Math.floor(Math.random() * 10000 * new Date().getMilliseconds());
        const answer = prompt(`Please, enter the following number to confirm: ${randomNumber}`);
        if (Number(answer) === randomNumber) {
            return true;
        } else {
            alert('Incorrect');
            return false;
        }
    }
    
    const onDeleteAll = () => {
        if (!deleteGuard()) return;
        try {
            DB_LIST.forEach(async (db_name) => {
                await indexedDBController.deleteAllRecord(db, db_name);
            });
            alert('All data has been deleted!');
        } catch (error) {
            alert('Error occured: ' + error);
        } 

        
    }

    const onDeleteAllOrders = async () => {
        if (!deleteGuard()) return;

        try {
            await indexedDBController.deleteAllRecord(db, STORES.ORDERSV2.name);
            alert('All orders has been deleted!');
        } catch (error) {
            alert('Error occured: ' + error);
        }

    }

    const onDeleteAllCustomers = async () => {
        if (!deleteGuard()) return;
        try {
            await indexedDBController.deleteAllRecord(db, STORES.CUSTOMERS.name);
            alert('All customers has been deleted!');
        } catch (error) {
            alert('Error occured: ' + error);
        }
    }

    const onDeleteAllIncomeUpToDate = async () => {
        if (!deleteGuard()) return;
        try {
            await indexedDBController.deleteAllRecord(db, STORES.INCOMEUPTODATE.name);
            alert('All income up to date has been deleted!');
        } catch (error) {
            alert('Error occured: ' + error);
        }
    }

    return ( 
        <div className="list-group mb-5 shadow my-2 py-2" style={{outline: 'red 1px solid'}}>
            <h2 className="ms-4 text-danger">Delete</h2>
            <aside className="text-danger ms-4 my-2"> (danger zone)</aside>
            <div className="ms-4">
                <ListItem
                    title='Delete all your orders'
                    detail='Please make sure you have saved all your orders before proceeding further in this step.'
                >
                    <button onClick={onDeleteAllOrders} className="btn btn-danger">Delete</button>
                </ListItem>

                <ListItem
                    title='Delete all your customers'
                    detail='Please make sure you have saved all your customers before proceeding further in this step.'
                >
                    <button onClick={onDeleteAllCustomers} className="btn btn-danger">Delete</button>
                </ListItem>

                <ListItem
                    title='Delete data income up to date table'
                    detail='This will reset your income up to date table. Please make sure you have saved all your data before proceeding further in this step.'
                >
                    <button onClick={onDeleteAllIncomeUpToDate} className="btn btn-danger">Delete</button>

                </ListItem>

                <ListItem
                    title='Delete All your data'
                    detail='Please make sure you have saved all your data before proceeding further in this step.'
                >
                    <button onClick={onDeleteAll} className="btn btn-danger">Delete</button>
                </ListItem>


            </div>
        </div>
     );
}

export default DeleteSection;