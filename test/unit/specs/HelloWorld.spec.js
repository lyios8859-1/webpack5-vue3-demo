import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

describe("HelloWorld.vue", () => {
  const wrapper = mount(HelloWorld);
  it("测试累加", () => {
    wrapper.setData({ count: 13 });
    const button = wrapper.find("button");
    button.trigger("click");
    expect((wrapper.vm).count).toBe(14);
  });
});
