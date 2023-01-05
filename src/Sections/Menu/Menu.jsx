import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";

function Menu(props) {
    return ( 
        <>
        <div className="row">
            <div className="col">
                <Header title='Menu'/>
            </div>
            <div className="col">
                <button className="mt-4">Add new item</button>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-3 col-md-6">
                <ItemCard title="example" price="3" content="nothing"/>
            </div>
        </div>
        </>
     );
}

export default Menu;