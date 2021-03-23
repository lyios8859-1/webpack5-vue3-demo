<template>
  <div class="hello">
    <h1>{{ tom.name }}={{tom.age}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
interface Parson {
  name: string;
  age: number;
}
export default defineComponent({
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  setup() {
    const tom = reactive<Parson>({
      name: 'tom',
      age: 34
    });
    return {
      tom
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


