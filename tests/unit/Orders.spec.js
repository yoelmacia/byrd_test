import listAllOrdersByCostumer from "../../src/services/listAllOrdersByCostumer";
import Costumers from "../../src/components/Costumers.vue";
import { shallowMount } from "@vue/test-utils";

describe("Orders", () => {
  it("match with the correct list of orders", async () => {
    const response = await listAllOrdersByCostumer.get(
      "cust-1",
      "2019-12-02",
      "2019-12-03"
    );
    expect(response.data).toMatchObject([{}, {}, {}]);
  });

  it("if the component get no orders, div orders isnt avaliable", () => {
    const wrapper = shallowMount(Costumers);
    wrapper.setData({
      orders: []
    });
    expect(wrapper.findAll(".orders").length).toEqual(0);
  });

  it("if the component get orders, div orders is avaliable", () => {
    const wrapper = shallowMount(Costumers);
    wrapper.setData({
      orders: [{}, {}, {}]
    });
    expect(wrapper.find(".orders")).toEqual({ selector: ".orders" });
  });
});
