<template>
  <div class="container-table">
    <table v-if="rows.length > 0">
      <thead>
        <tr>
          <th>№</th>
          <th>Марка авто</th>
          <th>Номер авто</th>
          <th>Дата</th>
          <th>Описание работы</th>
          <th>Стоимость работы</th>
          <th>Общая стоимость работы</th>
          <th>Запчасти</th>
          <th>Стоимость запчастей</th>
          <th>Общая цена запчастей</th>
          <th>Предоплата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ row.mark }}</td>
          <td>{{ row.num }}</td>
          <td>{{ row.data }}</td>
          <td>
            <div v-for="work in row.descWork" :key="work.description">
              {{ work.description }}
            </div>
          </td>
          <td>
            <div v-for="work in row.descWork" :key="work.price">
              {{ work.price }}zł
            </div>
          </td>
          <td>{{ sumPrice(row.descWork) }}zł</td>
          <td>
            <div v-for="part in row.parts" :key="part.name">
              {{ part.name }}
            </div>
          </td>
          <td>
            <div v-for="part in row.parts" :key="part.price">
              {{ part.price }}zł
            </div>
          </td>
          <td>{{ sumPrice(row.parts) }}zł</td>
          <td>{{ row.prepaid }}zł</td>
        </tr>
      </tbody>
    </table>
    <div v-else>Загрузка данных...</div>
    <div v-if="error">Error: {{ error }}</div>
  </div>
</template>
<script>
import { useDataStore } from "@/stores/table";
import { ref, watch, onMounted } from "vue";

export default {
  setup() {
    const dataStore = useDataStore();
    const rows = ref([]);
    const error = ref(null);

    onMounted(() => {
      watch(
        () => dataStore.rows,
        (newRows) => {
          rows.value = newRows;
        }
      );

      dataStore.fetchData().catch((err) => {
        error.value = err.message;
      });
    });

    function sumPrice(arr) {
      return arr.reduce((sum, item) => sum + item.price, 0);
    }

    return {
      rows,
      error,
      sumPrice,
    };
  },
};
</script>
<style scoped>
.container-table {
  margin: 100px auto 0 auto;
  box-shadow: 0px 0px 10px rgb(7, 7, 7);
  border: 1px black solid;
  max-width: 95%;
}
table {
  font-size: 13px;
  width: 100%;
  color: rgb(0, 0, 0);
}
table,
th,
td {
  position: relative;
  padding: 15px;
  border-collapse: collapse;
}
th:before,
td:before {
  content: "";
  position: absolute;
  height: 60%;
  top: 20%;
  right: 0;
  border-right: 1px solid rgba(90, 90, 90, 0.459);
}
table > tr:hover {
  transform: translate(0%, 0%) scale(1.1);
  transition: 0.2s;
}
table > tr:nth-child(1):hover {
  transform: scale(1);
}
table > tr {
  background-color: rgb(255, 255, 255);
}
table > tr:nth-child(even) {
  background-color: rgb(243, 243, 243);
}
th,
td {
  height: 20px;
}
td > tr {
  width: 100%;
  border: none;
  border-bottom: 1px dashed black;
}
td > tr:last-child {
  border: none;
}
</style>
