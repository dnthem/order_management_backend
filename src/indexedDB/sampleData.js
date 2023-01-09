const sampleData = {
    Menu: [
      {
        Title: "Banh Trang Tron",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 12,
        DateAdded: "Fri Jan 06 2023 17:23:39 GMT-0800 (Pacific Standard Time)",
      },
      {
        Title: "Banh Trang Nuong",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 5,
        DateAdded: "Fri Jan 06 2023 15:22:00 GMT-0800 (Pacific Standard Time)",
      },
      {
        Title: "Trứng Nướng",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 7,
        DateAdded: "Fri Jan 07 2023 15:22:00 GMT-0800 (Pacific Standard Time)",
      },
      {
        Title: "Bắp Xào",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 5,
        DateAdded: "Fri Jan 07 2023 15:22:00 GMT-0800 (Pacific Standard Time)",
      },
    ],
    Orders: [
      {
        Date: new Date() .toLocaleDateString("en-us"),
        ItemKeys: [1, 2],
        ItemNames: ["Banh Trang Tron", "Banh Trang Nuong"],
        Prices: [12, 12],
        Quantities: [1, 1],
        Totals: [12, 12],
        IsComplete: false
      },
    ],
    Income: [
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
        Income: 200
      },
      {
        Date: new Date(2023,0,6).toLocaleDateString('en-us'),
        Income: 145
      },
    ]
  };
  
  export default sampleData;
  