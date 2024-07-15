<template>
  <div class="container">
    <div class="container-table">
      <table id="dataTable">
        <thead>
          <tr>
            <th>№</th>
            <th>марка авто</th>
            <th>номер авто</th>
            <th>Описание работы</th>
            <th>стоимость работы</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <input type="text" v-model="row.mark" />
            </td>
            <td>
              <input type="text" v-model="row.num" />
            </td>

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
                <button @click="deleteRowWork(index, workIndex)">delete</button>
              </tr>
              <tr class="add">
                <button @click="addRowWorkShow(index)">add</button>
              </tr>
            </td>
            <td><button @click="deleteRow(index)">Delete</button></td>
          </tr>
        </tbody>
      </table>
      <div class="container-edit">
        <button @click="addRowShow">add row</button>
        <button @click="sendData">save</button>
      </div>
    </div>

    <!-- <div class="container-list">
      <ul>
        <div><input type="text" placeholder="Поиск" /></div>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
      </ul>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const rows = ref(JSON.parse(JSON.stringify(store.state.rows)));
console.log(rows.value);
const newRow = ref();

const newRowWork = ref();

const addRowShow = () => {
  newRow.value = {
    mark: "",
    num: "",
    descWork: [{ description: "", price: 0 }],
  };
  rows.value.push({ ...newRow.value });
};

const addRowWorkShow = (index) => {
  newRowWork.value = {
    description: "",
    price: 0,
  };
  rows.value[index].descWork.push({ ...newRowWork.value });
};
const deleteRow = (index) => {
  rows.value.splice(index, 1);
};
const deleteRowWork = (index, workIndex) => {
  rows.value[index].descWork.splice(workIndex, 1);
  // rows.value.descWork.
};
const sendData = () => {
  store.state.rows = rows.value;
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
  width: 300px;
}
table,
th,
td {
  border: 1px solid black;
}
table input {
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
  top: 0;
  right: -170px;
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
</style>
