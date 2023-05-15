import MenuTable from "../../Orders/MenuTable";
function Menu({menu, selectOrder}) {
    return ( 
        <div className="col-8 px-4 h-100 position-relative overflow-auto">
            <div className="section-title text-center">
                <h2>Menu</h2>
            </div>
            <div className="row overflow-auto h-100">
                <div className="col-12">
                    <MenuTable menu={menu} select={selectOrder}/>
                </div>
            </div>
        </div>
     );
}

export default Menu;