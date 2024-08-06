<template>
  <tr class="row">
    <td>{{ index + 1 }}</td>
    <td class="carMark">{{ row.mark }}</td>
    <td class="carNum">{{ row.num }}</td>
    <td class="carVin">
      <div v-if="row.vin == '1'">-</div>
      <div class="active vin" v-else>
        vin: {{ row.vin }}<br />
        tel: {{ row.tel }}
      </div>
      <!-- <div v-if="row.tel == ''">-</div>
      <div class="active tel" v-else>{{ row.tel }}</div> -->
    </td>
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
    <!-- <button class="button_edit">
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
    </button> -->
    <td>
      <button class="button_note" @click="sendDataTextArea(row.expenses)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="24"
          height="24"
          viewBox="0 0 128 128"
        >
          <g>
            <g>
              <path
                d="M101.53,92.93L82.56,73.98c13.78-18.01,12.49-43.86-3.99-60.34c-17.94-17.93-47.02-17.93-64.97,0 c-17.93,17.94-17.93,47.03,0,64.96c16.48,16.47,42.34,17.78,60.35,3.99l18.97,18.96L101.53,92.93z"
                style="fill: #78a3ad"
              />
              <path
                d="M20.44,71.77c-14.16-14.17-14.16-37.15,0-51.31c14.17-14.17,37.12-14.16,51.3,0 c14.16,14.16,14.16,37.12,0,51.31C57.55,85.93,34.6,85.93,20.44,71.77z"
                style="fill: #ffffff"
              />
            </g>
            <g>
              <defs>
                <path
                  id="SVGID_1_"
                  d="M126.53,110.53L101,84.94c-6.5-6.5-22.18,9.77-15.97,15.97c0.03,0.03,25.53,25.59,25.53,25.59 c2.64,2.63,8.36,1.19,12.75-3.23C127.72,118.87,129.16,113.16,126.53,110.53z"
                />
              </defs>
              <use
                style="overflow: visible; fill: #f79329"
                xlink:href="#SVGID_1_"
              />
              <clipPath id="SVGID_2_">
                <use style="overflow: visible" xlink:href="#SVGID_1_" />
              </clipPath>
              <path
                d="M111.23,125.77c0.18-2.04,1.51-4.45,2.37-5.81 c2.57-4.07,5.8-7.44,10.62-8.72c4.9-1.31,5.39,2.38,4.22,6.12c-1.41,4.51-4.22,7.9-8.36,10.27c-0.97,0.56-2.26,1.35-3.38,1.52 C113.96,129.54,110.94,129.19,111.23,125.77z"
                style="clip-path: url(#SVGID_2_); fill: #855c52"
              />
            </g>
          </g>
        </svg>
      </button>
    </td>
  </tr>
</template>
<script>
export default {
  emits: ["sendDataTextArea"],
  name: "RowComponent",
  props: { row: Object, index: Number },
  methods: {
    sendDataTextArea(dataRow) {
      this.$emit("sendDataTextArea", dataRow);
    },
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
.carVin {
  width: 50px;
  position: relative;
}
.carVin .vin {
  top: -10px;
}
.carVin .active {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  padding: 10px 0;
  width: 90%;
  z-index: 1;
  transition: 0.3s ease;
}
.carVin:hover .active {
  box-shadow: 0 0 1px black;
  padding-right: 110px;
  padding-left: 10px;
  transition: 0.3s ease;
}
.carVin:hover:before {
  border-right: none;
}
button:hover {
  cursor: pointer;
}
.button_note {
  border: none;
  background: none;
  height: 28px;
}
</style>
