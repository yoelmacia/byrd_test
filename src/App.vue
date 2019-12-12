<template>
  <div id="app">
    <Costumers></Costumers>
  </div>
</template>

<script>
import Costumers from "./components/Costumers";
export default {
  name: "app",
  components: {
    Costumers
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
