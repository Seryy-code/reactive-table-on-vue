<template>
  <div class="container">
    <div class="container-table">
      <!-- <h1>{{ props.filter_index }}</h1> -->
      <table id="dataTable">
        <FilterCarsComponent />
        <tr>
          <th>№</th>
          <th>марка авто</th>
          <th>номер авто</th>
          <th>дата</th>
          <th>описание работы</th>
          <th>стоимость работы</th>
          <th>запчасти</th>
          <th>стоимость запчастей</th>
          <th>стоимость запчастей 20%</th>
          <th>предоплата</th>
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
          <td><button @click="deleteRowShow(index)">Delete</button></td>
        </tr>
      </table>
      <div class="container-edit">
        <button @click="addRowShow">add row</button>
        <button @click="sendData">save</button>
      </div>
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
      addRow,
      addRowWork,
      addRowPart,
      deleteRow,
      deleteRowWork,
      deleteRowPart,
    } = useRows();

    const newRow = ref({
      mark: "",
      num: "",
      data: "",
      descWork: [{ description: "", price: 0 }],
      parts: [{ name: "", price: 0, price20: 0 }],
      prepaid: 0,
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

    const addRowShow = () => {
      addRow({ ...newRow.value });
    };

    const addRowWorkShow = (index) => {
      addRowWork({ ...newRowWork.value }, index);
    };

    const addRowPartShow = (index) => {
      addRowPart({ ...newRowPart.value }, index);
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
    const sendData = async () => {
      if (confirm("Сохранить изменения?")) {
        const formattedRows = state.rows.map((row) => ({
          mark: row.mark,
          num: row.num,
          data: row.data,
          descWork: JSON.stringify(row.descWork),
          parts: JSON.stringify(row.parts),
          prepaid: row.prepaid,
        }));
        try {
          const response = await axios.post(
            "https://script.google.com/macros/s/AKfycbxsNR62J90qYW84qz1q6FLYZBhMZRxt_Rw2PICee15gt68riMQ_OeJ9UzU_Cms0RN-7Lg/exec",
            formattedRows
          );
          console.log("Data sent successfully:", response.data);
          alert("Изменения сохранены!");
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
      addRowShow,
      addRowWorkShow,
      addRowPartShow,
      deleteRowWorkShow,
      deleteRowPartShow,
      deleteRowShow,
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
  position: relative;
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
  position: absolute;
  top: -65px;
  right: 0;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  padding: 10px;
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
</style>
