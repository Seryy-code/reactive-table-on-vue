import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      rows: [{ mark: "Nissan almera" }],
    };
  },
  mutations: {
    addRow(state, row) {
      state.rows.push(row);
    },
  },
});

export default store;
