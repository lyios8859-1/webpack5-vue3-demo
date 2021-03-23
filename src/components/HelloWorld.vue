<template>
  <div>
    <span class="count">{{ count }}</span>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    return {
      increment,
      count
    };
  }
});
</script>
