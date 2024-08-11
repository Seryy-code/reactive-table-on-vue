<template>
  <div class="container-edit">
    <button @click="addRowShow">add row</button>
    <button @click="sendData">save</button>
  </div>
  <div class="container">
    <div class="container-table">
      <!-- <h1>{{ props.filter_index }}</h1> -->
      <table id="dataTable">
        <FilterCarsComponent />
        <tr>
          <th>№</th>
          <th>марка авто</th>
          <th>номер авто</th>
          <th>vin и номер телефона</th>
          <th>дата</th>
          <th>описание работы</th>
          <th>стоимость работы</th>
          <th>запчасти</th>
          <th>стоимость запчастей</th>
          <th>стоимость запчастей 20%</th>
          <th>предоплата</th>
          <th>записи</th>
          <th>Статус оплаты</th>
          <th>edit</th>
        </tr>
        <tr class="row" v-for="(row, index) in state.rows" :key="index">
          <td>{{ index + 1 }}</td>
          <td class="carMark">
            <input type="text" v-model="row.mark" />
          </td>
          <td class="carNum">
            <input type="text" v-model="row.num" />
          </td>
          <td>
            <input type="text" v-model="row.vin" />
            <input type="text" v-model="row.tel" />
          </td>

          <td class="carDate"><input type="text" v-model="row.data" /></td>
          <td>
            <tr
              v-for="(work, workIndex) in row.descWork"
              :key="(work.description, workIndex)"
            >
              <input type="text" v-model="work.description" />
            </tr>
          </td>
          <td>
            <tr
              v-for="(work, workIndex) in row.descWork"
              :key="(work.price, workIndex)"
            >
              <input type="number" v-model="work.price" />
              <button @click="deleteRowWorkShow(index, workIndex)">
                delete
              </button>
            </tr>
            <tr class="add">
              <button @click="addRowWorkShow(index)">add</button>
            </tr>
          </td>
          <td>
            <tr
              v-for="(part, partIndex) in row.parts"
              :key="(part.name, partIndex)"
            >
              <input type="text" v-model="part.name" />
            </tr>
          </td>
          <td>
            <tr
              v-for="(part, partIndex) in row.parts"
              :key="(part.price, partIndex)"
            >
              <input type="number" v-model="part.price" />
            </tr>
          </td>
          <td>
            <tr
              v-for="(part, partIndex) in row.parts"
              :key="(part.price20, partIndex)"
            >
              <input type="number" v-model="part.price20" />
              <button @click="deleteRowPartShow(index, partIndex)">
                delete
              </button>
            </tr>
            <tr class="add">
              <button @click="addRowPartShow(index)">add</button>
            </tr>
          </td>
          <td><input type="number" v-model="row.prepaid" /></td>
          <td class="expenses">
            <div
              class="expens"
              v-for="(expens, expensIndex) in row.expenses"
              :key="(expens.id, expensIndex)"
            >
              <input type="text" v-model="expens.name" />
              <textarea name="" id="" v-model="expens.notes"></textarea>
              <button @click="deleteExpensShow(index, expensIndex)">
                Delete
              </button>
            </div>
            <button @click="addExpensShow(index)">add</button>
          </td>
          <td>
            <button @click="changeStatePaidShow(index)">
              <span v-if="!row.paidstate">не </span>оплачено
            </button>
          </td>
          <td><button @click="deleteRowShow(index)">Delete</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import FilterCarsComponent from "./FilterCarsComponent.vue";
import { ref } from "vue";
import { useRows } from "../stores/storeRows";
import axios from "axios";

export default {
  name: "EditComponent",
  components: {
    FilterCarsComponent,
  },
  setup() {
    const {
      state,
      changeStatePaid,
      addExpens,
      addRow,
      addRowWork,
      addRowPart,
      deleteRow,
      deleteRowWork,
      deleteRowPart,
      deleteExpens,
    } = useRows();

    const newRow = ref({
      mark: "",
      num: "",
      vin: "",
      tel: "",
      data: "",
      descWork: [{ description: "", price: 0 }],
      parts: [{ name: "", price: 0, price20: 0 }],
      prepaid: 0,
      expenses: [{ name: "", notes: "" }],
      paidstate: false,
    });

    const newRowWork = ref({
      description: "",
      price: 0,
    });

    const newRowPart = ref({
      name: "",
      price: 0,
      price20: 0,
    });

    const newExpens = ref({
      name: "",
      notes: "",
    });
    const changeStatePaidShow = (index) => {
      changeStatePaid(index);
      console.log();
    };
    const addRowShow = () => {
      addRow({ ...newRow.value });
    };

    const addRowWorkShow = (index) => {
      addRowWork({ ...newRowWork.value }, index);
    };

    const addRowPartShow = (index) => {
      addRowPart({ ...newRowPart.value }, index);
    };
    const addExpensShow = (index) => {
      addExpens({ ...newExpens.value }, index);
    };
    const deleteRowShow = (index) => {
      deleteRow(index);
    };
    const deleteRowWorkShow = (index, workIndex) => {
      deleteRowWork(index, workIndex);
    };
    const deleteRowPartShow = (index, partIndex) => {
      deleteRowPart(index, partIndex);
    };
    const deleteExpensShow = (index, expensIndex) => {
      deleteExpens(index, expensIndex);
    };
    const sendData = async () => {
      if (confirm("Сохранить изменения?")) {
        const formattedRows = state.rows.map((row) => ({
          mark: row.mark,
          num: row.num,
          vin: row.vin,
          tel: row.tel,
          data: row.data,
          descWork: JSON.stringify(row.descWork),
          parts: JSON.stringify(row.parts),
          prepaid: row.prepaid,
          expenses: JSON.stringify(row.expenses),
          paidstate: row.paidstate,
        }));
        try {
          const response = await axios.post(
            "https://script.google.com/macros/s/AKfycbwgmmvyRVSpV7H7XUFiR5Ofj02esjHVWuUpwvx2YOQi0ijOUrGZc1bMtFX1FSrwNC_D-Q/exec",
            formattedRows
          );
          console.log("Data sent successfully:", response.data);
        } catch (error) {
          console.error("Error sending data:", error.message);
          alert("Ошибка при сохранении изменений!");
        }
      }
    };

    return {
      state,
      newRow,
      newRowWork,
      newRowPart,
      changeStatePaidShow,
      addRowShow,
      addRowWorkShow,
      addRowPartShow,
      addExpensShow,
      deleteRowWorkShow,
      deleteRowPartShow,
      deleteRowShow,
      deleteExpensShow,
      sendData,
    };
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}
.container {
  display: flex;
  justify-content: space-around;
}
.container-table {
  overflow-x: auto;
}
table {
  width: 200px;
  color: black;
}
table > tr {
  background-color: rgb(255, 255, 255);
}
table > tr:nth-child(even) {
  background-color: rgb(251, 251, 251);
}
table,
th,
td {
  border: 1px solid black;
}
table input {
  width: 100px;
}
.container-list ul {
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: gray;
  width: 100px;
  height: 150px;
}
.container-list ul input {
  position: fixed;
  left: 0;
  max-width: inherit;
  border: none;
}
.container-edit {
  z-index: 2;
  position: sticky;
  display: flex;
  top: 15px;
  left: 44%;
  justify-content: space-around;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px black;
  padding: 10px;
  width: 150px;
  max-height: 120px;
}
.container-edit > * {
  margin: 10px;
}
.cont-delete {
  display: flex;
  flex-wrap: nowrap;
}
.cont-delete input {
  width: 40px;
}
tr td tr {
  display: flex;
}
tr td {
  position: relative;
}
tr td {
  padding-bottom: 25px;
}
tr td tr.add {
  position: absolute;
  left: -20px;
  bottom: 1px;
}
table > tr:hover {
  transform: translate(0%, 0%) scale(1);
}
.expenses {
  display: flex;
  padding: 0;
  border: none;
  border-top: 1px solid black;
}
.expens {
  margin: 0 5px;
  width: 170px;
}
.expens input {
  width: 100%;
}
.expens textarea {
  max-width: 100%;
}
</style>
