<template>
  <div class="graph-legend">
    <div>legend</div>
  </div>
</template>

<script>
export default {
  props: {
    runId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      workflow: {},
      graph: {},
      parentArray: [],
      parentRunId: null,
      btnText: null,
      routeId: null,
      clickedId: null,
      workflowName: null,
    };
  },
  watch: {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang="stylus"></style>