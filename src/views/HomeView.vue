<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TableComponent msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";

export default {
  name: "HomeView",
  components: {
    TableComponent,
  },
};
</script>
