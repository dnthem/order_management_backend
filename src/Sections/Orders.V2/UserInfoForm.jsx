
const customers = [
  {
    customerID: 1,
    customerName: "John Doe",
    phone: "123-456-7890",
    orderCount: 5,
  },
  {
    customerID: 2,
    customerName: "Jane Smith",
    phone: "555-123-4567",
    orderCount: 2,
  },
  {
    customerID: 3,
    customerName: "Bob Johnson",
    phone: "555-555-1212",
    orderCount: 3,
  },
  {
    customerID: 4,
    customerName: "Alice Lee",
    phone: "987-654-3210",
    orderCount: 1,
  },
  {
    customerID: 5,
    customerName: "Tom Green",
    phone: "555-888-9999",
    orderCount: 7,
  },
];

function autoComplete(query) {
    return customers.filter((customer) =>
         customer.customerName.toLowerCase().includes(query.toLowerCase())
    );
}

function UserInfoForm(props) {
    const [query, setQuery] = useState("");


    return ( 
        <div className="col-md-3 p-3" style={
            {
                border: '1px solid #ccc',
                borderRadius: '5px',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '1000',
                backgroundColor: 'white'
            }
        }>
            <div className="section-title text-center">
                <h2>Customer Info</h2>
            </div>
            <div className="section-content">
                <form className="row g-3">
                    <div className="col">
                        <label htmlFor="customerName" className="form-label">Customer Name</label>
                        <input type="text" className="form-control" id="customerName" placeholder="Customer Name"/>
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" placeholder="Phone"/>
                        
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
     );
}

export default UserInfoForm;