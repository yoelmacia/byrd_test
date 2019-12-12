<template>
  <div>
    {{ costumers }}
  </div>
</template>

<script>
import listAllCostumers from "../services/listAllCostumers";
export default {
  name: "Costumers",
  data() {
    return {
      costumers: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      listAllCostumers
        .get()
        .then(response => (this.costumers = response.data))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped></style>
