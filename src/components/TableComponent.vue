<template>
  <table id="">
    <tr>
      <th>{{ getmodified }}</th>
      <th>text2</th>
      <th>text3</th>
      <th>text4</th>
      <th>
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
      </th>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>
        <tr>
          1
        </tr>
        <tr>
          2
        </tr>
      </td>
      <td></td>
    </tr>
  </table>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  getmodified: String,
});
</script>

<style scoped>
table {
  margin: auto;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  height: 20px;
}
td > tr {
  width: 100%;
  border-bottom: 1px dashed black;
}
</style>
