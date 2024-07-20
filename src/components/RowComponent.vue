<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ row.mark }}</td>
    <td>{{ row.num }}</td>
    <td style="white-space: nowrap">{{ row.data }}</td>
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
        <span v-if="work.price == ''"> - </span>
        <span v-else> {{ work.price }}zł </span>
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
        <span v-if="part.price == ''"> - </span>
        <span v-else> {{ part.price }}zł </span>
      </tr>
    </td>
    <td>
      <tr v-for="part in row.parts" :key="part.price20">
        <span v-if="part.price20 == ''"> - </span>
        <span v-else> {{ part.price20 }}zł </span>
      </tr>
    </td>
    <td>{{ sumPrice(row.parts) }}zł</td>
    <td>{{ sumPrice20(row.parts) }}zł</td>

    <td>
      <span v-if="row.prepaid == ''"> - </span>
      <span v-else> {{ row.prepaid }}zł </span>
    </td>
    <td>{{ finalPrice(row.descWork, row.parts, row.prepaid) }}zł</td>
    <td>{{ calculateEarnings(row.descWork, row.parts) }}zł</td>
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
        if (arr[i].price != "") {
          sum += arr[i].price;
        }
      }
      return sum;
    },
    sumPrice20(arr) {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].price20 != "") {
          sum += arr[i].price20;
        }
      }
      return sum;
    },
    finalPrice(arrWork, arrPart, prepaid) {
      let res = 0;
      for (let i = 0; i < arrWork.length; i++) {
        if (arrWork[i].price != "") {
          res += arrWork[i].price;
        }
      }
      for (let i = 0; i < arrPart.length; i++) {
        if (arrPart[i].price20 != "") {
          res += arrPart[i].price20;
        } else {
          if (arrPart[i].price != "") {
            res += arrPart[i].price;
          }
        }
      }
      res = res - prepaid;
      return res;
    },
    calculateEarnings(arrWork, arrPart) {
      let res = 0;
      for (let i = 0; i < arrWork.length; i++) {
        if (arrWork[i].price != "") {
          res += arrWork[i].price;
        }
      }
      for (let i = 0; i < arrPart.length; i++) {
        if (arrPart[i].price20 != "") {
          res += arrPart[i].price20 - arrPart[i].price;
        }
      }
      return res;
    },
  },
};
</script>

<style scoped>
td {
  position: relative;
  padding: 10px 5px;
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
