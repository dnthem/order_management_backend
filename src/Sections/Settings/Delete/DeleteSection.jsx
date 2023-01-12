import { GetDataBaseContext } from "../../../App";
import indexedDBController from "../../../indexedDB/indexedDB";
import ListItem from "../ListItem";

const MENU = 'Menu', INCOME = 'Income', ORDERS = 'Orders', ALL = 'All';

function DeleteSection(props) {
    const {db} = GetDataBaseContext();
    
    const handleOnClick = () => {
        alert('Make sure that you have saved all your nesscessary information!');
        const randomNumber = Math.floor(Math.random() * 10000 * new Date().getMilliseconds());
        const answer = prompt(`Please, enter the following number to confirm: ${randomNumber}`);
        if (Number(answer) === randomNumber) {
            try {
                indexedDBController.deleteAllRecord(db, MENU);
                indexedDBController.deleteAllRecord(db, INCOME);
                indexedDBController.deleteAllRecord(db, ORDERS);
                alert('All data has been deleted!');
            } catch (error) {
                alert('Error occured: ' + error);
            } 
        } else {
            alert('Incorrect');
        }
        
    }

    return ( 
        <div className="list-group mb-5 shadow my-2 py-2" style={{outline: 'red 1px solid'}}>
            <h2 className="ms-4 text-danger">Delete</h2>
            <aside className="text-danger ms-4"> (danger zone)</aside>
            <div className="ms-4">
                <ListItem
                    title='Delete All your data'
                    detail='Please, make sure you have saved all your data before proceeding furthur in this step'
                >
                    <button onClick={handleOnClick} className="btn btn-danger">Delete</button>
                </ListItem>
            </div>
        </div>
     );
}

export default DeleteSection;