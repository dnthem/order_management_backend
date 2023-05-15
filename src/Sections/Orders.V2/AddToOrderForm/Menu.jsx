import MenuTable from "../../Orders/MenuTable";
function Menu({menu, selectOrder}) {
    return ( 
        <div className="col-8 px-4 h-100 position-relative">
            <div className="section-title text-center">
                <h2>Menu</h2>
            </div>
            <div className="row" style={{
                height: "90%",
                border: "1px solid black",
            }}>
                <div className="col-12">
                    <div style={{overflow:'auto', height: '75vh'}}>
                    <MenuTable menu={menu} select={selectOrder}/>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}

export default Menu;