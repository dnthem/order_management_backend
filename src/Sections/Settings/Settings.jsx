import Header from "../../components/Header";
import {RiSettings5Line} from 'react-icons/ri'
function Settings(props) {
    return ( 
        <>
        <div className="row">
            <Header icon={<RiSettings5Line/>} title='Settings'/>
        </div>
        </>
     );
}

export default Settings;