import { TableData, Value } from "../../types";
import { faker } from "@faker-js/faker";

const data = (): { table: TableData } => {
  const getNum = faker.helpers.shuffle([100, 150, 140, 200, 400, 4354, 324324]);

  const fakeValue: Value = {
    Units: faker.number.int(100),
    "Unit Price": getNum[0],
    "Gross Revenue": getNum[1],
  };

  const countryId = faker.helpers.shuffle(["france", "spain", "italy"])[0];

  const germanyCityId = faker.helpers.shuffle([
    "berlin",
    "hamburg",
    "munich",
    "cologne",
    "frankfurt",
  ])[0];
  return {
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
                  id: germanyCityId, // Change the ID to a Bamberg ID
                  displayName: germanyCityId, // Change the display name to the Bamberg name
                },
              ],
            },
            {
              id: countryId,
              displayName: countryId,
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
                ...fakeValue,
              },
            },
            {
              columnId: germanyCityId, // Change the columnId to the Bamberg ID
              collapsed: false,
              values: {
                ...fakeValue,
              },
            },
            {
              columnId: countryId,
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
                  columnId: germanyCityId, // Change the columnId to the Bamberg ID
                  collapsed: false,
                  values: {
                    ...fakeValue,
                  },
                },
                {
                  columnId: countryId,
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
                      columnId: germanyCityId, // Change the columnId to the Bamberg ID
                      collapsed: false,
                      values: {
                        ...fakeValue,
                      },
                    },
                    {
                      columnId: countryId,
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
                      columnId: germanyCityId, // Change the columnId to the Bamberg ID
                      collapsed: false,
                      values: {
                        ...fakeValue,
                      },
                    },
                    {
                      columnId: countryId,
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
                  columnId: germanyCityId, // Change the columnId to the Bamberg ID
                  collapsed: false,
                  values: {
                    ...fakeValue,
                  },
                },
                {
                  columnId: countryId,
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
};

export default data;
