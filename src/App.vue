<template>
  <div>
    <div>解析Vue文件了哟~</div>
    <p>{{name}}</p>
    <HelloWorld></HelloWorld>
    <Home></Home>
    <Detail></Detail>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

import Home from './pages/home/main';
import Detail from './pages/detail/main';

export default defineComponent({
  components: {
    HelloWorld,
    Home,
    Detail
  },
  setup() {
    const name = ref('Tom');

    return {
      name
    };
  }
});
</script>
