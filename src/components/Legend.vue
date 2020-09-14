<template>
  <div class="graph-legend">
    <!--  <button @click="toggleAllCollapse">Expand/Collapse</button> -->
    <span class="pic arrow-left"></span>
    <hr />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style  scoped lang="stylus">
.graph-legend {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  width: 100px;
  position: absolute;
  right: 20px;
  top: 80px;
}

.pic {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
}

.arrow-left {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #5879DA;
  margin-left: 20px;
}

hr {
  border-top: 2px dashed #5879DA;
  margin: 20px 20px 20px 2px;
}
</style>