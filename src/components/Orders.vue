<template>
  <div v-if="orders.length">
    <div class="orders">
      <hr />
      <h1 class="summary-title">SUMMARY</h1>
      <div class="summary">
        <div class="summary-num-orders">
          <span><strong>Number of orders : </strong>{{ orders.length }}</span>
        </div>
        <div class="summary-total-invoice">
          <span>
            <strong>The total amount to invoice : </strong>
            {{ totalAmountToInvoice(orders) }} EUR
          </span>
        </div>
        <div class="summary-date-from">
          <span><strong>Date From : </strong> {{ selectDateFrom }}</span>
        </div>
        <div class="summary-date-to">
          <span><strong>Date To : </strong> {{ selectDateTo }}</span>
        </div>
        <div class="summary-diference-days">
          <span
            ><strong>Diference in Days : </strong>
            {{ diferenceInDays(selectDateFrom, selectDateTo) }} days</span
          >
        </div>
      </div>
      <hr />
      <ul id="orders-list">
        <h2 class="orders-title">ORDERS</h2>
        <li
          class="orders-list-element"
          v-for="(order, index) in orders"
          v-bind:key="index"
        >
          <div class="order-id">
            <span><strong>Order ID : </strong></span>{{ order.id }}
          </div>
          <div class="order-recipient-name">
            <span><strong>Name : </strong></span>{{ order.recipient.name }}
          </div>
          <div class="order-recipient-email">
            <span><strong>Email : </strong></span>{{ order.recipient.email }}
          </div>
          <div class="order-total-price">
            <span><strong>Total Price : </strong></span
            >{{ totalPriceOrder(order.items) }} EUR
          </div>
          <div class="order_created">
            <span><strong>Order Made at : </strong></span>{{ order.created_at }}
          </div>
          <h4>ITEMS</h4>
          <div
            v-for="(item, index) in order.items"
            v-bind:key="index"
            class="order-items"
          >
            <div class="order-item-id">
              <span><strong>Item ID : </strong></span>{{ item.id }}
            </div>
            <div class="order-item-name">
              <span><strong>Item Name : </strong></span>{{ item.name }}
            </div>
            <div class="order-item-quantity">
              <span><strong>Item Quantity : </strong></span>{{ item.quantity }}
            </div>
            <div class="order-item-currency">
              <span><strong>Total Price Currency : </strong></span
              >{{ item.total_price.currency }}
            </div>
            <div class="order-item-amount">
              <span><strong>Total Price Amount : </strong></span
              >{{ item.total_price.amount }}
            </div>
            <br />
          </div>
          <h4>DELIVERY DETAILS</h4>
          <div class="order-delivery">
            <div class="order-delivery-courier">
              <span><strong>Delivery Courier : </strong></span
              >{{ order.delivery.courier }}
            </div>
            <div class="order-delivery-method">
              <span><strong>Delivery Method : </strong></span
              >{{ order.delivery.method }}
            </div>
          </div>
          <hr />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Orders",
  props: {
    orders: {
      type: Array
    },
    selectDateFrom: {
      type: String
    },
    selectDateTo: {
      type: String
    }
  },
  methods: {
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
      let stringDateFrom = selectDateFrom.substring(
        0,
        selectDateFrom.indexOf("T")
      );
      let stringDateTo = selectDateTo.substring(0, selectDateTo.indexOf("T"));
      let dateFrom = new Date(stringDateFrom);
      let dateTo = new Date(stringDateTo);
      let differenceInTime = dateTo.getTime() - dateFrom.getTime();
      let differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays;
    }
  }
};
</script>

<style>
.orders-list-element {
  list-style: none;
  text-align: justify;
}
.summary-title,
.orders-title {
  text-align: justify;
}
.summary {
  text-align: justify;
  margin: 20px auto;
}
</style>
