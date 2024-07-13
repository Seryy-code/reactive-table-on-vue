<template>
  <div class="edit">
    <h1>This is edit page</h1>
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
