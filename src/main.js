
import Vue from "vue";

//var nodeTemplate = Handlebars.compile($('#node-template').html());

import App from "./Tree.vue";

new Vue({
  render: h => h(App)
}).$mount("#app");