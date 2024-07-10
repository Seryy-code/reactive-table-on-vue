<template>
  <EditComponent @sendEdit="Edit"></EditComponent>
  <TableComponent :getmodified="text"></TableComponent>
</template>
<script setup>
import { ref } from "vue";
import EditComponent from "./EditComponent.vue";
import TableComponent from "./TableComponent.vue";

let text = ref("");

function Edit(textFromEdit) {
  text.value = textFromEdit;
}
</script>
<style></style>
