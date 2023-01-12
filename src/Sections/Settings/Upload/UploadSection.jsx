import ListItem from "../ListItem";
import InputFile from "../InputFile";
import indexedDBController from "../../../indexedDB/indexedDB";
import { GetDataBaseContext } from "../../../App";

const MENU = 'Menu', INCOME = 'Income', ORDERS = 'Orders', ALL = 'All Data';

function UploadSection(props) {
    const {db} = GetDataBaseContext();

    const saveData = async (db, store, data) => {
        try {
            data.forEach(async e => {
                await indexedDBController.updateARecord(db, store, e);
            })
        } catch(error) {
            alert (error);
        }
    }

    const handleOnChange = (e, store) => {
        if (!confirm('Are you sure to load ' + store + ' from this file')) return;

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            // this will then display a text file
            const str = reader.result;
            const newLindIdx = str.indexOf('\n');
            if (newLindIdx != -1)
                var res = str.slice(0, newLindIdx);
            else 
                var res = str.slice(0, str.length);
            const data = JSON.parse(res);
            if (store === ALL)
            {
                saveData(db, INCOME, data[INCOME]);
                saveData(db, MENU, data[MENU]);
                saveData(db, ORDERS, data[ORDERS]);
            }
            else 
                saveData(db, store, data);
        };

        if (file) {
             reader.readAsText(file); 
        } else {
            alert ('Cannot read file');
        }
    }

    return ( 
        <div className="list-group mb-5 shadow my-2 py-2">
            <h2 className="ms-4">Upload</h2>
            <aside className="my-2 text-muted">All files in this section must be in correct format, which means only files that are downloaded from this app</aside>
            <div className="ms-4">
                <ListItem
                    title='All'
                    detail="Load all data from a file "
                >
                    <InputFile onChange={(e) => handleOnChange(e, ALL)} />
                </ListItem>
                <ListItem
                    title='Menu'
                    detail="Load menu from a file"
                >
                    <InputFile onChange={(e) => handleOnChange(e, MENU)} />
                </ListItem>
                <ListItem
                    title='Income'
                    detail="Load Income from a file"
                >
                    <InputFile onChange={(e) => handleOnChange(e, INCOME)} />
                </ListItem>
                <ListItem
                    title='Orders'
                    detail="Load Orders from a file"
                >
                    <InputFile onChange={(e) => handleOnChange(e, 'Orders')} />
                </ListItem>
            </div>
        </div>
     );
}

export default UploadSection;