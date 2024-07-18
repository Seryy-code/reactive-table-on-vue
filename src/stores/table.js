import { defineStore } from "pinia";
import axios from "axios";
import { reactive } from "vue";

const SPREADSHEET_ID = "159BewtqQtENsCT68y3yFnXcWyEsYWBDB-Wlds76icOA";
const RANGE = "Page1!A2:H";
const API_KEY = "AIzaSyB0HKJ_8G4uFCARtmRdpGg-cSKv9l1PpWg";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    rows: reactive([]),
    error: null,
    isLoading: false,
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        console.log("Raw data:", response.data.values);
        this.rows = response.data.values.map((row) => ({
          mark: row[0],
          num: row[1],
          vin: row[2],
          descWork: JSON.parse(row[3]),
          parts: JSON.parse(row[4]),
          prepaid: parseInt(row[5]),
          data: row[6],
          isPaid: row[7],
        }));
        console.log("Ready data:", this.rows);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

// class Row {
//   constructor(mark, num, vin, descWork, parts, prepaid, data, isPaid) {
//     (this.mark = mark),
//       (this.num = num),
//       (this.vin = vin),
//       (this.descWork = descWork),
//       (this.parts = parts),
//       (this.prepaid = prepaid),
//       (this.data = data),
//       (this.isPaid = isPaid);
//   }

//   data = [new Row()];
// }
// export const useTableStore = defineStore("table", {
//   state: () => {
//     return { count: 0 };
//   },
//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
// });
