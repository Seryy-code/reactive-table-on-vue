import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      rows: [
        {
          mark: "Nissan almera",
          num: "DW7XF23",
          descWork: [
            { description: "Замена масла фильтры", price: 150 },
            { description: "Замена генератора", price: 250 },
            { description: "Замена генератора", price: 250 },
          ],
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
