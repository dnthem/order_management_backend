import Header from "../../components/Header";
import ItemCardV2 from "../../components/ItemCard_v2";

function Orders(props) {
    return ( 
        <>
            <div className="row">
                <div className="col-8">
                    <Header title='Orders'/>
                </div>
                <div className="col-4">
                    <div className="d-flex justify-content-between">
                        <button className="mt-4 btn btn-primary">Undo</button>
                        <button className="mt-4 btn btn-primary">Complete</button>
                        <button className="mt-4 btn btn-primary">Save to local</button>
                    </div>
                    
                </div>
            </div>
            <div className="row">
                <div className="col-6 bg-primary vh-100">
                    abc
                </div>
                <div className="col-6 bg-success vh-100">
                    <h2 className="h2">Completed Orders Today</h2>
                    <h3>Date:</h3> <h3>Total:</h3>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th >1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th >2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                    
                    </tbody>
                    </table>

                </div>
            </div>
        </>
     );
}

export default Orders;