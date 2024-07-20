<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ row.mark }}</td>
    <td>{{ row.num }}</td>
    <td>{{ row.data }}</td>
    <td>
      <tr
        style="white-space: nowrap"
        v-for="work in row.descWork"
        :key="work.description"
      >
        {{
          work.description
        }}
      </tr>
    </td>
    <td>
      <tr v-for="work in row.descWork" :key="work.price">
        {{
          work.price
        }}zł
      </tr>
    </td>

    <td>{{ sumPrice(row.descWork) }}zł</td>
    <td>
      <tr
        v-for="part in row.parts"
        :key="part.name"
        style="white-space: nowrap"
      >
        {{
          part.name
        }}
      </tr>
    </td>
    <td>
      <tr v-for="part in row.parts" :key="part.price">
        {{
          part.price
        }}zł
      </tr>
    </td>
    <td>{{ sumPrice(row.parts) }}zł</td>
    <td>{{ row.prepaid }}zł</td>
  </tr>
</template>
<script>
export default {
  name: "RowComponent",
  props: { row: Object, index: Number },
  methods: {
    sumPrice(arr) {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i].price;
      }
      return sum;
    },
  },
};
</script>

<style scoped>
td {
  position: relative;
  padding: 15px;
  border-collapse: collapse;
}
td:before {
  content: "";
  position: absolute;
  height: 60%;
  top: 20%;
  right: 0;
  border-right: 1px solid rgba(90, 90, 90, 0.459);
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
