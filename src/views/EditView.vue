<template>
  <div class="edit">
    <h1>Cтраница редактирования</h1>
    <EditComponent />
  </div>
</template>

<script>
import EditComponent from "@/components/EditComponent.vue";

export default {
  name: "EditView",
  components: {
    EditComponent,
  },
};
</script>
<style>
h1 {
  margin-bottom: 50px;
}
</style>
