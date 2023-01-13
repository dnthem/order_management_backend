import ListItem from "../ListItem";
import DownloadBtn from "../../../components/Downloadbtn";

function DownloadSection(props) {
    return ( 
        <div className="list-group mb-5 shadow my-2 py-2">
                <h2 className="ms-4">Download </h2>
                <div className="ms-4">
                <ListItem 
                    title='Save all data' 
                    detail='Take a snapshot of all your data into a single file so you can save it wherever you want'
                >
                    <DownloadBtn data={JSON.stringify(props.allData)} contentFormat={null} fileName='All_Data_'/>
                </ListItem>
                <ListItem
                    title='Save all your Income information'
                    detail='Take a snapshot of all your income history into a single file'
            
                >
                    <DownloadBtn data={JSON.stringify(props.income)} contentFormat={null} fileName='Income_'/>
                </ListItem>
                <ListItem
                    title='Save all your Menu information'
                    detail="Take a snapshot of all your menu into a single file, but cannot save items' photos"
          
                >
                    <DownloadBtn data={JSON.stringify(props.menu)} contentFormat={null} fileName='Menu_'/>
                </ListItem>
                <ListItem
                    title='Save all your Order history'
                    detail="Take a snapshot of all your orders into a single file"
                >
                    <DownloadBtn data={JSON.stringify(props.orders)} contentFormat={null} fileName='Orders_'/>
                </ListItem>
                </div>
            </div>
     );
}

export default DownloadSection;