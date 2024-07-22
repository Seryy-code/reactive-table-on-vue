<template>
  <tr class="row">
    <td>{{ index + 1 }}</td>
    <td class="carMark">{{ row.mark }}</td>
    <td class="carNum">{{ row.num }}</td>
    <td class="carDate" style="white-space: nowrap">{{ row.data }}</td>
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
    <button class="button_edit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        height="18"
        version="1"
        width="18"
        viewBox="0 0 24 24"
      >
        <g transform="translate(0 -1028.4)">
          <g transform="matrix(1.0607 1.0607 -1.0607 1.0607 1146.8 34.926)">
            <path
              d="m-63 1003.4v11.3 0.7 1l2 2 2-2v-1-0.7-11.3h-4z"
              fill="#ecf0f1"
            />
            <path d="m-61 1003.4v15l2-2v-1-0.7-11.3h-2z" fill="#bdc3c7" />
            <rect fill="#e67e22" height="11" width="4" x="-63" y="1004.4" />
            <path
              d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h4v-1c0-1.1-0.895-2-2-2z"
              fill="#7f8c8d"
            />
            <g transform="translate(-7,1)">
              <path
                d="m-55.406 1016 1.406 1.4 1.406-1.4h-1.406-1.406z"
                fill="#34495e"
              />
              <path d="m-54 1016v1.4l1.406-1.4h-1.406z" fill="#2c3e50" />
            </g>
            <path d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h2v-3z" fill="#95a5a6" />
            <rect fill="#d35400" height="11" width="2" x="-61" y="1004.4" />
          </g>
        </g>
      </svg>
    </button>
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
    // Navigate(index) {
    //   this.$router.push({ name: "edit", params: { filter_index: index } });
    // },
  },
};
</script>

<style scoped>
tr {
  position: relative;
}
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
td:nth-last-child(2):before {
  border: none;
}
td > tr {
  width: 100%;
  border: none;
  border-bottom: 1px dashed black;
}
td > tr:last-child {
  border: none;
}

tr:hover .button_edit {
  display: none;
  z-index: 2;
  cursor: pointer;
}
tr .button_edit:hover svg {
  width: 20px;
  height: 20px;
}

tr .button_edit {
  z-index: -1;
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  align-items: center;
}
tr .button_edit:hover {
  cursor: pointer;
}
</style>
