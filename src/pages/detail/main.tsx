import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Detail',
  setup () {
    const title = '详情页'
    return () => (
      <div class="detail">
        {title}
        <a href="./home.html">首页</a>
      </div>
    );
  }
});