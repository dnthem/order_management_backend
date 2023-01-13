const sampleData = {
    Menu: [
      {
        Title: "Bánh Tráng Trộn",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        DateAdded:  new Date() .toLocaleDateString("en-us"),
      },
      {
        Title: "Bánh Tráng Cuộn",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        DateAdded:  new Date() .toLocaleDateString("en-us"),
      },
      {
        Title: "Trứng Nướng",
        Price: 7,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        DateAdded: new Date() .toLocaleDateString("en-us"),
      },
      {
        Title: "Bắp Xào",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        DateAdded:  new Date() .toLocaleDateString("en-us"),
      },
      {
        Title: "Sữa Bắp",
        Price: 7,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        DateAdded:  new Date() .toLocaleDateString("en-us"),
      },
      {
        Title: "Xôi Xá Xíu",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        DateAdded:  new Date() .toLocaleDateString("en-us"),
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
    ]
  };
  
  export default sampleData;
  