const sampleData = {
    Menu: [
      {
        Title: "Banh Trang Tron",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        DateAdded: "Fri Jan 06 2023 17:23:39 GMT-0800 (Pacific Standard Time)",
      },
      {
        Title: "Banh Trang Nuong",
        Price: 12,
        Content: undefined,
        Photo: undefined,
        Count: 0,
        DateAdded: "Fri Jan 06 2023 15:22:00 GMT-0800 (Pacific Standard Time)",
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
      },
      {
        Date: new Date(2023, 0, 7).toLocaleDateString("en-us"),
        ItemKeys: [1, 2, 3],
        ItemNames: ["Banh Trang Tron", "Banh Trang Nuong", "Banh Trang Cuon"],
        Prices: [12, 12, 12],
        Quantities: [3, 1, 2],
        Totals: [36, 12, 24],
      },
    ],
  };
  
  export default sampleData;
  