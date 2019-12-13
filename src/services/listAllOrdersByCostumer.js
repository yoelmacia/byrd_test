import orders from "./orders";

export default {
  get(id, from, to) {
    return orders.get(`/${id}?start_date=${from}&end_date=${to}`);
  }
};
