<template>
  <div>
    <div v-if="costumers.length">
      <form @submit.prevent="submit">
        <div class="valid">
          <div class="valid-item">
            <span>id</span>
            <select v-model="selected">
              <option v-for="(item, index) in costumers" :key="index">{{
                item.id
              }}</option>
            </select>
          </div>
          <Datepicker
            class="valid-item"
            placeholder="Select Date From"
            :value="selectDateFrom"
            format="yyyy-MM-dd"
            @input="selectDateFrom = fixDate($event)"
          ></Datepicker>
          <Datepicker
            class="valid-item"
            placeholder="Select Date To"
            :value="selectDateTo"
            format="yyyy-MM-dd"
            @input="selectDateTo = fixDate($event)"
          ></Datepicker>
        </div>
        <div class="text-center">
          <button type="submit" class="button" @click="getAllOrders()">
            Submit
          </button>
        </div>
      </form>
      <div v-if="orders.length">
        <div class="orders">
          <div class="summary">
            <div class="summary-num-orders">
              Number of orders: {{ orders.length }}
            </div>
            <div class="summary-total-invoice">
              The total amount to invoice:
              {{ totalAmountToInvoice(orders) }} EUR
            </div>
            <div class="summary-date-from">Date From: {{ selectDateFrom }}</div>
            <div class="summary-date-to">Select To: {{ selectDateTo }}</div>
            <div class="summary-diference-days">
              Diference in Days:
              {{ diferenceInDays(selectDateFrom, selectDateTo) }} days
            </div>
          </div>
          <ul id="orders-list">
            <li v-for="(order, index) in orders" v-bind:key="index">
              <div class="order-id">{{ order.id }}</div>
              <div class="order-recipient-name">{{ order.recipient.name }}</div>
              <div class="order-recipient-email">
                {{ order.recipient.email }}
              </div>
              <div class="order-total-price">
                {{ totalPriceOrder(order.items) }} EUR
              </div>
              <div class="order_created">{{ order.created_at }}</div>
              Items:
              <div
                v-for="(item, index) in order.items"
                v-bind:key="index"
                class="order-items"
              >
                <div class="order-item-id">{{ item.id }}</div>
                <div class="order-item-name">{{ item.name }}</div>
                <div class="order-item-quantity">{{ item.quantity }}</div>
                <div class="order-item-currency">
                  {{ item.total_price.currency }}
                </div>
                <div class="order-item-amount">
                  {{ item.total_price.amount }}
                </div>
              </div>
              Delivery Details:
              <div class="order-delivery">
                <div class="order-delivery-courier">
                  {{ order.delivery.courier }}
                </div>
                <div class="order-delivery-method">
                  {{ order.delivery.method }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="invalid" v-else>No data</div>
  </div>
</template>

<script>
import listAllCostumers from "../services/listAllCostumers";
import listAllOrdersByConsumer from "../services/listAllOrdersByCostumer";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
export default {
  name: "Costumers",
  components: {
    Datepicker
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
      listAllOrdersByConsumer
        .get(this.selected, this.selectDateFrom, this.selectDateTo)
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    totalPriceOrder(items) {
      let total = 0;
      items.forEach(element => {
        total += parseFloat(element.total_price.amount);
      });
      return total;
    },
    totalAmountToInvoice(orders) {
      let total = 0;
      orders.forEach(element => {
        total += parseFloat(element.charge_customer.total_price);
      });
      return total;
    },
    diferenceInDays(selectDateFrom, selectDateTo) {
      let dateFrom = new Date(selectDateFrom);
      let dateTo = new Date(selectDateTo);
      let differenceInTime = dateTo.getTime() - dateFrom.getTime();
      let differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays;
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
.button {
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
