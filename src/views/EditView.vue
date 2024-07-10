<template>
  <div class="edit">
    <h1>This is edit page</h1>
    <!-- <EditComponent /> -->
    <EmitWrapper />
  </div>
</template>

<script>
// import EditComponent from "@/components/EditComponent.vue";
import EmitWrapper from "@/components/EmitWrapper.vue";

export default {
  name: "EditView",
  components: {
    // EditComponent,
    EmitWrapper,
  },
};
</script>
