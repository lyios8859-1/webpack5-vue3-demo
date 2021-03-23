import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Index',
  setup() {
    const title = '首页'
    return () => (
      <div class="index">
        {title}
        <a href="./about.html">详情页</a>
      </div>
    );
  }
});