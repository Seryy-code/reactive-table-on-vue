import { createStore } from "vuex";
// import { listCars, authorize } from "./server.js";

const store = createStore({
  state() {
    return {
      rows: [
        {
          searchQuery: "",
          mark: "Nissan almera",
          num: "DW7XF23",
          vin: "SJNFHAN16U0596441",

          descWork: [
            { description: "Замена масла фильтры", price: 150 },
            { description: "Замена генератора", price: 200 },
            { description: "Замена генератора", price: 250 },
          ],
          parts: [
            { name: "Фильтр масляный", price: 150 },
            { name: "Масло", price: 85 },
            { name: "Фильтр топливный", price: 35 },
          ],
          prepaid: 400,
          data: "15.07.2024",
          isPaid: false,
          // paymentStatus: "paid",
        },
      ],
    };
  },
  mutations: {
    addRow(state, row) {
      state.rows.push(row);
    },
  },
});

export default store;
