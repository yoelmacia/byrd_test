<template>
  <div>
    <div class="valid" v-if="costumers.length">
      <div class="valid-item">
        <span>id </span>
        <select v-model="selected">
          <option v-for="(item, index) in costumers" :key="index">
            {{ item.id }}
          </option>
        </select>
      </div>
      <Datepicker
        class="valid-item"
        placeholder="Select Date From"
        v-model="selectDateFrom"
      ></Datepicker>
      <Datepicker
        class="valid-item"
        placeholder="Select Date To"
        v-model="selectDateTo"
      ></Datepicker>
    </div>
    <div class="invalid" v-else>
      No data
    </div>
  </div>
</template>

<script>
import listAllCostumers from "../services/listAllCostumers";
import Datepicker from "vuejs-datepicker";
export default {
  name: "Costumers",
  components: {
    Datepicker
  },
  data() {
    return {
      costumers: [],
      selected: "",
      selectDateFrom: "",
      selectDateTo: ""
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

<style scoped>
.valid {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: aliceblue;
}
.valid-item {
  margin: 10px auto;
}
</style>
