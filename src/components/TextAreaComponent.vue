<template>
  <div class="container_notes" :class="{ active: isActive }">
    <div class="note" v-for="arr in arrExp" :key="arr.id">
      <h1>{{ arr.name }}</h1>
      <p>{{ arr.notes }}</p>
    </div>
    <button @click="toggleIsActive">
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
          fill="#000"
        ></path>
      </svg>
    </button>
  </div>
</template>
<script>
import { ref, watch, defineComponent } from "vue";

export default defineComponent({
  name: "TextAreaComponent",
  props: {
    getbool: {
      type: Boolean,
      default: false,
    },
    getArrExp: Object,
  },
  setup(props, { emit }) {
    const isActive = ref(props.getbool);
    const arrExp = ref(props.getArrExp);

    watch(
      () => props.getbool,
      (newValue) => {
        isActive.value = newValue;
      }
    );
    watch(
      () => props.getArrExp,
      (newValue) => {
        arrExp.value = newValue;
      }
    );
    const toggleIsActive = () => {
      isActive.value = !isActive.value;
      console.log(arrExp.value);

      emit("update:isActive", isActive.value);
    };
    return {
      isActive,
      toggleIsActive,
      arrExp,
    };
  },
});
</script>
<style scoped>
.container_notes {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: -50%;
  top: 50%;
  transition: 0.3s ease-out;
  width: 75%;

  height: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 0 5px black;
  z-index: 2;
  overflow-y: auto;
}
.container_notes.active {
  left: 50%;
}
.container_notes button {
  position: absolute;
  right: 10px;
  top: 10px;
}
.container_notes button:hover {
  cursor: pointer;
}
.container_notes .note {
  box-shadow: 0 0 1px black;
  width: 200px;
  height: 90%;
  margin: 10px;
  background-color: rgb(243, 243, 243);
}
.container_notes .note h1 {
  margin-top: 15px;
}
.container_notes .note p {
  padding: 0 10px;
  text-align: left;
  margin-top: 15px;
}
button {
  border: none;
  background: none;
}
</style>
