<template>
  <tr class="filters">
    <td></td>
    <td>
      <div>
        <input
          type="text"
          id="input_mark"
          @keyup="performAction"
          placeholder="Марка..."
        />
      </div>
    </td>
    <td>
      <div>
        <input
          type="text"
          id="input_num"
          @keyup="performAction"
          placeholder="Номер..."
        />
      </div>
    </td>
    <td></td>
    <td>
      <div>
        <input
          type="text"
          id="input_date"
          @keyup="performAction"
          placeholder="Дата..."
        />
      </div>
    </td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</template>
<script>
import { useRoute } from "vue-router";

export default {
  name: "FileterCarComponent",
  setup() {
    const route = useRoute();

    const performAction = () => {
      switch (route.path) {
        case "/":
          homePageAction();
          break;
        case "/edit":
          editPageAction();
          break;
        default:
          defaultAction();
      }
    };

    const homePageAction = () => {
      filterCars_homepage();
    };

    const editPageAction = () => {
      filterCars_editpage();
    };

    const defaultAction = () => {
      console.log("Default Action");
    };

    const filterCars_homepage = () => {
      var inputMark = document.getElementById("input_mark");
      var filterMark = inputMark.value.toUpperCase();
      var inputNum = document.getElementById("input_num");
      var filterNum = inputNum.value.toUpperCase();
      var inputDate = document.getElementById("input_date");
      var filterDate = inputDate.value.toUpperCase();
      var rows = document.querySelectorAll(".row");

      rows.forEach((row) => {
        var carMark = row.querySelector(".carMark");
        var carNum = row.querySelector(".carNum");
        var carDate = row.querySelector(".carDate");

        var markText = carMark
          ? (carMark.textContent || carMark.innerText).toUpperCase()
          : "";
        var numText = carNum
          ? (carNum.textContent || carNum.innerText).toUpperCase()
          : "";
        var dateText = carDate
          ? (carDate.textContent || carDate.innerText).toUpperCase()
          : "";

        if (
          markText.indexOf(filterMark) > -1 &&
          numText.indexOf(filterNum) > -1 &&
          dateText.indexOf(filterDate) > -1
        ) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    };
    const filterCars_editpage = () => {
      var inputMark = document.getElementById("input_mark");
      var filterMark = inputMark.value.toUpperCase();
      var inputNum = document.getElementById("input_num");
      var filterNum = inputNum.value.toUpperCase();
      var inputDate = document.getElementById("input_date");
      var filterDate = inputDate.value.toUpperCase();
      var rows = document.querySelectorAll(".row");

      rows.forEach((row) => {
        var carMark = row.querySelector(".carMark");
        var carMark_input = carMark.querySelector("input");

        var carNum = row.querySelector(".carNum");
        var carNum_input = carNum.querySelector("input");

        var carDate = row.querySelector(".carDate");
        var carDate_input = carDate.querySelector("input");

        var markText = carMark ? carMark_input.value.toUpperCase() : "";
        var numText = carNum ? carNum_input.value.toUpperCase() : "";
        var dateText = carDate ? carDate_input.value.toUpperCase() : "";

        if (
          markText.indexOf(filterMark) > -1 &&
          numText.indexOf(filterNum) > -1 &&
          dateText.indexOf(filterDate) > -1
        ) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    };

    return {
      performAction,
    };
  },
  methods: {},
};
</script>
<style></style>
