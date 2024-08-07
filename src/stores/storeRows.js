import { reactive } from "vue";

const state = reactive({
  rows: [],
});

export function useRows() {
  return {
    state,
    setRows(rows) {
      state.rows = rows;
    },
    // updateRow(index, updatedRow) {
    //   state.rows[index] = updatedRow;
    // },
    addRow(newRow) {
      state.rows.push(newRow);
    },
    addRowWork(newRowWork, index) {
      console.log(newRowWork);
      console.log(state.rows[index].descWork);
      state.rows[index].descWork.push(newRowWork);
    },
    addRowPart(newRowPart, index) {
      state.rows[index].parts.push(newRowPart);
    },
    addExpens(newExpens, index) {
      state.rows[index].expenses.push(newExpens);
    },

    deleteRowWork(index, workIndex) {
      state.rows[index].descWork.splice(workIndex, 1);
    },
    deleteRowPart(index, partIndex) {
      state.rows[index].parts.splice(partIndex, 1);
    },
    deleteExpens(index, expensIndex) {
      state.rows[index].expenses.splice(expensIndex, 1);
    },
    deleteRow(index) {
      state.rows.splice(index, 1);
    },
    changeStatePaid(index) {
      state.rows[index].paidstate = !state.rows[index].paidstate;
    },
  };
}
