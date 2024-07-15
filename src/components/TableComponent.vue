<template>
  <div class="container-table">
    <table id="">
      <tr>
        <th>№</th>
        <th>марка авто</th>
        <th>номер авто</th>
        <th>дата</th>
        <th>описание работы</th>
        <th>стоимость работы</th>
        <th>общая стоимость работы</th>
        <th>запчасти</th>
        <th>стоимость запчастей</th>
        <th>общая цена запчастей</th>
        <th>предоплата</th>

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
      <tr v-for="(row, index) in $store.state.rows" :key="index">
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
    </table>
  </div>
</template>

<script setup>
let sum = 0;
function sumPrice(arr) {
  sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].price;
    console.log(arr[i].price);
  }
  return sum;
}
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
