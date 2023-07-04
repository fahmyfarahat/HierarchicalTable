const data = {
  table: {
    columns: [
      {
        id: "europe",
        displayName: "Europe",
        collapsed: false,
        children: [
          {
            id: "germany",
            displayName: "Germany",
            collapsed: false,
            children: [
              {
                id: "berlin",
                displayName: "Berlin",
              },
            ],
          },
          {
            id: "greatBritain",
            displayName: "Great Britain",
          },
        ],
      },
    ],
    rows: [
      {
        id: "allArticles",
        displayName: "All Articles",
        values: [
          {
            columnId: "europe",
            collapsed: false,
            values: {
              Units: 15876,
              "Unit Price": 17128,
              "Gross Revenue": 1404,
            },
          },
          {
            columnId: "germany",
            collapsed: false,
            values: {
              Units: 554,
              "Unit Price": 537,
              "Gross Revenue": 59.317,
            },
          },
          {
            columnId: "berlin",
            collapsed: false,
            values: {
              Units: 0,
              "Unit Price": 0,
              "Gross Revenue": 59.317,
            },
          },
          {
            columnId: "greatBritain",
            collapsed: false,
            values: {
              Units: 8792973,
              "Unit Price": 8760990,
              "Gross Revenue": 9199039,
            },
          },
        ],
        children: [
          {
            id: "bikes",
            displayName: "Bikes",
            values: [
              {
                columnId: "europe",
                collapsed: false,
                values: {
                  Units: 9876,
                  "Unit Price": 7128,
                  "Gross Revenue": 1004,
                },
              },
              {
                columnId: "germany",
                collapsed: false,
                values: {
                  Units: 354,
                  "Unit Price": 437,
                  "Gross Revenue": 29,
                },
              },
              {
                columnId: "berlin",
                collapsed: false,
                values: {
                  Units: 0,
                  "Unit Price": 0,
                  "Gross Revenue": 59.317,
                },
              },
              {
                columnId: "greatBritain",
                collapsed: false,
                values: {
                  Units: 6792973,
                  "Unit Price": 60990,
                  "Gross Revenue": 9039,
                },
              },
            ],
            children: [
              {
                id: "mountainBikes",
                displayName: "Mountain Bikes",
                values: [
                  {
                    columnId: "europe",
                    collapsed: false,
                    values: {
                      Units: 3876,
                      "Unit Price": 3128,
                      "Gross Revenue": 504,
                    },
                  },
                  {
                    columnId: "germany",
                    collapsed: false,
                    values: {
                      Units: 154,
                      "Unit Price": 237,
                      "Gross Revenue": 19,
                    },
                  },
                  {
                    columnId: "berlin",
                    collapsed: false,
                    values: {
                      Units: 0,
                      "Unit Price": 537,
                      "Gross Revenue": 59.317,
                    },
                  },
                  {
                    columnId: "greatBritain",
                    collapsed: false,
                    values: {
                      Units: 2792973,
                      "Unit Price": 30990,
                      "Gross Revenue": 3039,
                    },
                  },
                ],
              },
              {
                id: "roadBikes",
                displayName: "Road Bikes",
                values: [
                  {
                    columnId: "europe",
                    collapsed: false,
                    values: {
                      Units: 6000,
                      "Unit Price": 4000,
                      "Gross Revenue": 500,
                    },
                  },
                  {
                    columnId: "germany",
                    collapsed: false,
                    values: {
                      Units: 200,
                      "Unit Price": 200,
                      "Gross Revenue": 10,
                    },
                  },
                  {
                    columnId: "berlin",
                    collapsed: false,
                    values: {
                      Units: 55334,
                      "Unit Price": 537,
                      "Gross Revenue": 59.317,
                    },
                  },
                  {
                    columnId: "greatBritain",
                    collapsed: false,
                    values: {
                      Units: 4000000,
                      "Unit Price": 30000,
                      "Gross Revenue": 6000,
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "complementaryProducts",
            displayName: "Complementary Products",
            values: [
              {
                columnId: "europe",
                collapsed: false,
                values: {
                  Units: 6000,
                  "Unit Price": 5000,
                  "Gross Revenue": 400,
                },
              },
              {
                columnId: "germany",
                collapsed: false,
                values: {
                  Units: 200,
                  "Unit Price": 100,
                  "Gross Revenue": 30,
                },
              },
              {
                columnId: "berlin",
                collapsed: false,
                values: {
                  Units: 554,
                  "Unit Price": 537,
                  "Gross Revenue": 59.317,
                },
              },
              {
                columnId: "greatBritain",
                collapsed: false,
                values: {
                  Units: 2000000,
                  "Unit Price": 266000,
                  "Gross Revenue": 6000,
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export default data;
