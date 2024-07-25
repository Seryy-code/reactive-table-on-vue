<template>
  <div class="container-table">
    <table class="table">
      <FilterCarsComponent />
      <tr>
        <th>№</th>
        <th>марка авто</th>
        <th>номер авто</th>
        <th>vin</th>
        <th>дата</th>
        <th>описание работы</th>
        <th>стоимость работы</th>
        <th>общая стоимость работы</th>
        <th>запчасти</th>
        <th>стоимость запчастей</th>
        <th>стоимость запчастей 20%</th>
        <th>общая цена запчастей</th>
        <th>общая цена запчастей 20%</th>
        <th>предоплата</th>
        <th>Конечная цена</th>
        <th>Сколько заработали</th>
        <th>Расходы</th>

        <!-- <th>
        <router-link to="/edit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            height="24"
            version="1.1"
            width="24"
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
                <path
                  d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h2v-3z"
                  fill="#95a5a6"
                />
                <rect fill="#d35400" height="11" width="2" x="-61" y="1004.4" />
              </g>
            </g>
          </svg>
        </router-link>
      </th> -->
      </tr>
      <RowComponent
        v-for="(row, index) in state.rows"
        :key="row.id || index"
        :row="row"
        :index="index"
        @sendDataTextArea="activeTextArea"
      />
    </table>
    <TextAreaComponent
      :getbool="isClicked"
      :getArrExp="arrExp"
      @update:isActive="handleUpdateIsActive"
    />
  </div>
</template>

<script>
import RowComponent from "./RowComponent.vue";
import FilterCarsComponent from "./FilterCarsComponent.vue";
import TextAreaComponent from "./TextAreaComponent.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRows } from "../stores/storeRows";

export default {
  name: "TableComponent",
  components: {
    RowComponent,
    FilterCarsComponent,
    TextAreaComponent,
  },
  props: ["sheet"],
  setup() {
    const { state, setRows } = useRows();
    const isClicked = ref(false);
    const arrExp = ref();

    const activeTextArea = (obj) => {
      isClicked.value = !isClicked.value;
      arrExp.value = obj;
      return isClicked, arrExp;
    };
    const handleUpdateIsActive = () => {
      isClicked.value = false;
    };
    onMounted(() => {
      const url =
        "https://script.google.com/macros/s/AKfycbx1a9P464nhFIqaH_KbsNGTCuWmCoo9hneifr83GZVzq7aoUA3izm2UQzWxvNYhEJeTVg/exec";
      axios.get(url).then((data) => {
        setRows(data.data);
      });
    });

    return { state, activeTextArea, isClicked, handleUpdateIsActive, arrExp };
  },
};
</script>
<!-- <script>
import RowComponent from "./RowComponent.vue";

export default {
  name: "TableComponent",
  components: {
    RowComponent,
  },
  props: ["sheet"],
  data() {
    return {
      rows: [],
      loading: true,
    };
  },
  methods: {
    loadGapiClient() {
      return new Promise((resolve, reject) => {
        if (typeof gapi !== "undefined") {
          gapi.load("client", {
            callback: resolve,
            onerror: reject,
            timeout: 5000, // 5 seconds
            ontimeout: reject,
          });
        } else {
          reject(new Error("gapi not loaded"));
        }
      });
    },
    async initGapiClient() {
      await gapi.client.init({
        apiKey: "YOUR_API_KEY", // Замените YOUR_API_KEY на ваш API ключ
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
      });
    },
    async accessSpreadSheet() {
      try {
        await this.loadGapiClient();
        await this.initGapiClient();
        const response = await gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: "159BewtqQtENsCT68y3yFnXcWyEsYWBDB-Wlds76icOA",
          range: "Sheet1!A2:E",
        });

        this.rows = response.result.values;
        this.loading = false;
      } catch (error) {
        console.error("Error accessing Google Sheets:", error);
      }
    },
  },
  created() {
    this.accessSpreadSheet();
  },
};
</script> -->
<style>
.container-table {
  margin: 0 auto 0 auto;
  box-shadow: 0px 0px 10px rgb(7, 7, 7);
  border: 1px black solid;
  max-width: 95%;
}
table {
  font-size: 12px;
  width: 100%;
  color: rgb(0, 0, 0);
}
table,
th {
  position: relative;
  padding: 10px 5px;
  border-collapse: collapse;
}
th:before {
  content: "";
  position: absolute;
  height: 60%;
  top: 20%;
  right: 0;
  border-right: 1px solid rgba(90, 90, 90, 0.459);
}

table > tr:hover {
  transform: translate(0%, 0%) scale(1.05);
}
table > tr:nth-child(1):hover,
table > tr:nth-child(2):hover {
  transform: scale(1);
}
table > tr {
  transition: 0.2s;
  background-color: rgb(255, 255, 255);
}
table > tr:nth-child(even) {
  background-color: rgb(243, 243, 243);
}
table > tr .carVin div {
  background-color: white;
}
table > tr:nth-child(even) .carVin div {
  background-color: rgb(243, 243, 243);
}
th {
  height: 20px;
}
table .filters {
}
table .filters div {
  position: relative;
  width: 100%;
  height: 50px;
}
table .filters input {
  transform: translate(-50%, 0);
  left: 50%;
  position: absolute;
  transition: 0.3s ease;
  padding: 10px 5%;
  margin: 5px 0;
  width: 85%;
  top: 0;
}
table .filters input:focus {
  top: -5px;
  z-index: 1;
  width: 120%;
}
</style>
