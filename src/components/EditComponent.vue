<template>
  <div class="container">
    <table id="dataTable">
      <thead>
        <tr>
          <th>№</th>
          <th>марка авто</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ row.mark }}</td>
        </tr>
        <tr>
          <td>+</td>
          <td><input type="text" v-model="newRow.mark" /></td>
        </tr>
      </tbody>
    </table>
    <button @click="addRowShow">add row</button>
    <button @click="sendData">save</button>
    <label for="">
      <input v-model="index" min="0" max="rows.value.length" type="number" />
      <button @click="deleteRow(index)">Delete</button>
    </label>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const rows = ref(JSON.parse(JSON.stringify(store.state.rows)));
console.log(rows.value);
const newRow = ref({
  mark: "",
});

const addRowShow = () => {
  rows.value.push({ ...newRow.value });
  newRow.value = { mark: "" };
};

const sendData = () => {
  store.state.rows = rows.value;
};

const deleteRow = (index) => {
  if (index > 0) {
    rows.value.splice(index - 1, 1);
  } else {
    console.log("Так не работает)");
  }
};
</script>

<style scoped>
table {
  width: 100%;
}
table input {
}
</style>
