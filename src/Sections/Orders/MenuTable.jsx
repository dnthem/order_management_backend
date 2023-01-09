import MenuTableCard from "../../components/MenuTableCard";

function MenuTable(props) {
    

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
                {props.menu.map(e => <MenuTableCard 
                    Photo={e.Photo}
                    Title={e.Title}
                    Price={e.Price}
                    key={e.id}
                    cardID={e.id}
                    select={props.select}
                    />
                )}
            </tbody>
        </table>
     );
}

export default MenuTable;