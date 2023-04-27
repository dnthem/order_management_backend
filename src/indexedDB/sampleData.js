const sampleData = {
    Menu: [
      {
        Title: "Bánh Tráng Trộn",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        Title: "Bánh Tráng Cuộn",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        Title: "Trứng Nướng",
        Price: 7,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        Title: "Bắp Xào",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
      {
        Title: "Sữa Bắp",
        Price: 7,
        Content: undefined,
        Photo: undefined,
        Count: 0,
       
      },
      {
        Title: "Xôi Xá Xíu",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        
      },
    ],
    Orders: [
      {
        Date: new Date().toLocaleDateString("en-us"),
        ItemKeys: [1, 2],
        ItemNames: ["Banh Trang Tron", "Banh Trang Nuong"],
        Prices: [12, 12],
        Quantities: [1, 1],
        Totals: [12, 12],
        IsComplete: false,
        
      },
    ],
    Income: [
      {
        Date: new Date(2022,11,31).toLocaleDateString('en-us'),
        Income: 128
      },
      {
        Date: new Date(2023,0,1).toLocaleDateString('en-us'),
        Income: 128
      },
      {
        Date: new Date(2023,0,2).toLocaleDateString('en-us'),
        Income: 80
      },
      {
        Date: new Date(2023,0,3).toLocaleDateString('en-us'),
        Income: 140
      },
      {
        Date: new Date(2023,0,4).toLocaleDateString('en-us'),
        Income: 180
      },
      {
        Date: new Date(2023,0,5).toLocaleDateString('en-us'),
        Income: 350
      },
      {
        Date: new Date(2023,0,6).toLocaleDateString('en-us'),
        Income: 145
      },
      {
        Date: new Date(2023,0,7).toLocaleDateString('en-us'),
        Income: 100
      },
      {
        Date: new Date(2023,0,8).toLocaleDateString('en-us'),
        Income: 250
      },
      {
        Date: new Date(2023,0,9).toLocaleDateString('en-us'),
        Income: 175
      },
      {
        Date: new Date(2023,0,10).toLocaleDateString('en-us'),
        Income: 270
      },
    ],
    OrdersV2: [
      {
        userID: 1,
        date: "4/26/2023",
        order: ["Item A", "Item B", "Item C"],
        total: 150.25,
        paymentType: "Credit Card",
        notes: "Delivery address: 123 Main St, Anytown, USA",
        status: true, // true = complete, false = pending
      },
      {
        userID: 2,
        date: "4/26/2023",
        order: ["Item D", "Item E"],
        total: 75.5,
        paymentType: "PayPal",
        notes: "",
        status: false,
      },
      {
        userID: 3,
        date: new Date().toLocaleDateString("en-us"),
        order: ["Item F", "Item G", "Item H", "Item I"],
        total: 225.75,
        paymentType: "Cash on Delivery",
        notes: "Please call before delivery",
        status: true,
      },
      {
        userID: 4,
        date: new Date().toLocaleDateString("en-us"),
        order: ["Product K", "Product L", "Product M"],
        total: 95.75,
        paymentType: "Credit Card",
        notes: "Please include a free sample",
        status: true,
      },
      {
        userID: 5,
        date: new Date().toLocaleDateString("en-us"),
        order: ["Product N"],
        total: 15.0,
        paymentType: "PayPal",
        notes: "",
        status: false,
      },
      {
        userID: 6,
        date: new Date().toLocaleDateString("en-us"),
        order: ["Product O", "Product P", "Product Q", "Product R"],
        total: 175.25,
        paymentType: "Credit Card",
        notes: "Please call before delivery",
        status: true,
      },
      {
        userID: 2,
        date: new Date().toLocaleDateString("en-us"),
        order: ["Product S", "Product T"],
        total: 60.0,
        paymentType: "Cash on Delivery",
        notes: "",
        status: false,
      },
      {
        userID: 1,
        date: new Date().toLocaleDateString("en-us"),
        order: ["Product U", "Product V", "Product W"],
        total: 120.75,
        paymentType: "Credit Card",
        notes: "Please deliver after 5pm",
        status: true,
      },
    ],
    Users: [
      {
        userName: "John Smith",
        phone: "+1 123-456-7890",
      },
      {
        userName: "Jane Doe",
        phone: "+1 234-567-8901",
      },
      {
        userName: "Bob Johnson",
        phone: "+1 345-678-9012",
      },
      {
        userName: "Sara Lee",
        phone: "+1 456-789-0123",
      },
    ]
  };

  
  export default sampleData;
  