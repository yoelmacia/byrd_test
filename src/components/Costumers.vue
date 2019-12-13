<template>
  <div>
    <div class="valid" v-if="costumers.length">
      <div>
        <span>id </span>
        <select v-model="selected">
          <option v-for="(item, index) in costumers" :key="index">
            {{ item.id }}
          </option>
        </select>
      </div>
    </div>
    <div class="invalid" v-else>
      No data
    </div>
  </div>
</template>

<script>
import listAllCostumers from "../services/listAllCostumers";
export default {
  name: "Costumers",
  data() {
    return {
      costumers: [],
      selected: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      listAllCostumers
        .get()
        .then(response => {
          this.costumers = response.data;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped></style>
