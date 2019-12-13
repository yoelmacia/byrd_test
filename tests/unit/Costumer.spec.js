import listAllCostumers from "../../src/services/listAllCostumers";
import { shallowMount } from "@vue/test-utils";
import Costumers from "../../src/components/Costumers.vue";

describe("Costumers", () => {
  it("match with the correct list of costumers", async () => {
    const response = await listAllCostumers.get();
    expect(response.data).toMatchObject([
      { id: "cust-1", name: "E. Corp", email: "admin@ecorp.net" },
      { id: "cust-2", name: "Acme Inc.", email: "logistics@acme.com" },
      { id: "cust-3", name: "Berliner Bär", email: "hello@bbaer.com" }
    ]);
  });

  it("Set data with costumers is the same as expected", () => {
    const wrapper = shallowMount(Costumers);
    wrapper.setData({
      costumers: [
        { id: "cust-1", name: "E. Corp", email: "admin@ecorp.net" },
        { id: "cust-2", name: "Acme Inc.", email: "logistics@acme.com" },
        { id: "cust-3", name: "Berliner Bär", email: "hello@bbaer.com" }
      ]
    });
    expect(wrapper.vm.costumers).toStrictEqual([
      { id: "cust-1", name: "E. Corp", email: "admin@ecorp.net" },
      { id: "cust-2", name: "Acme Inc.", email: "logistics@acme.com" },
      { id: "cust-3", name: "Berliner Bär", email: "hello@bbaer.com" }
    ]);
  });

  it("if the component get data, select is avaliable", () => {
    const wrapper = shallowMount(Costumers);
    wrapper.setData({
      costumers: [
        { id: "cust-1", name: "E. Corp", email: "admin@ecorp.net" },
        { id: "cust-2", name: "Acme Inc.", email: "logistics@acme.com" },
        { id: "cust-3", name: "Berliner Bär", email: "hello@bbaer.com" }
      ]
    });
    expect(wrapper.find("select").isVisible()).toBe(true);
  });

  it("if the component doesnt get data, the select isnt avaliable", () => {
    const wrapper = shallowMount(Costumers);
    wrapper.setData({
      costumers: []
    });
    expect(wrapper.find("div").isVisible()).toBe(true);
  });

  afterEach(() => {
    delete global.__mobxInstanceCount; // prevent warnings
  });
});
