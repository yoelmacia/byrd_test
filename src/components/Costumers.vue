<template>
  <div>
    <div v-if="costumers.length">
      <form @submit.prevent="getAllOrders">
        <div class="valid">
          <div class="valid-item">
            <select v-model="selected" class="select">
              <option value="" selected="selected" hidden="hidden"
                >Select Id</option
              >
              <option v-for="(item, index) in costumers" :key="index">{{
                item.id
              }}</option>
            </select>
          </div>
          <Datepicker
            input-class="input-item"
            class="valid-item"
            placeholder="Select Date From"
            :value="selectDateFrom"
            format="yyyy-MM-dd"
            @input="selectDateFrom = fixDate($event)"
          ></Datepicker>
          <Datepicker
            input-class="input-item"
            class="valid-item"
            placeholder="Select Date To"
            :value="selectDateTo"
            format="yyyy-MM-dd"
            @input="selectDateTo = fixDate($event)"
          ></Datepicker>
        </div>
        <div class="text-center">
          <button type="submit" class="button">
            Submit
          </button>
        </div>
      </form>
      <Orders
        :orders="this.orders"
        :selectDateFrom="this.selectDateFrom"
        :selectDateTo="this.selectDateTo"
      ></Orders>
    </div>
    <div class="invalid" v-else>No data</div>
  </div>
</template>

<script>
import listAllCostumers from "../services/listAllCostumers";
import listAllOrdersByConsumer from "../services/listAllOrdersByCostumer";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import Orders from "./Orders";
export default {
  name: "Costumers",
  components: {
    Datepicker,
    Orders
  },
  data() {
    return {
      costumers: [],
      orders: [],
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
    },
    fixDate(event) {
      return moment(event).format("YYYY-MM-DDTH:MM:SSZ");
    },
    getAllOrders() {
      if (this.selectDateFrom === "") {
        alert("Select date from");
      } else if (this.selectDateTo === "") {
        alert("Select date to");
      } else if (this.selected === "") {
        alert("Select one id");
      } else {
        listAllOrdersByConsumer
          .get(this.selected, this.selectDateFrom, this.selectDateTo)
          .then(response => {
            this.orders = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style>
.valid {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: aliceblue;
}
.input-item {
  text-align: center;
  font-size: larger;
  width: 200px;
  height: 50px;
}
.select {
  font-size: large;
  color: grey;
  border: none;
  text-align-last: center;
  background-color: white;
  width: 200px;
  height: 28px;
}
.valid-item {
  margin: 30px auto;
}
.button {
  margin: 10px;
  background: #3ab409;
  padding: 0.5rem 1rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 3px;
  border-radius: 2px;
  border-bottom: 2px solid #2e9106;
  transition: 0.3s;
}
</style>
