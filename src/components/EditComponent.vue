<template>
  <label for="">
    <input v-model="input" id="Text" type="text" placeholder="tr_1  th_1" />
    <button @click="sendData">save</button>
  </label>
</template>
<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

let input = ref("");
const emit = defineEmits(["sendEdit"]);
function sendData() {
  console.log("sendEdit: " + input.value);
  emit("sendEdit", input.value);
}
</script>
