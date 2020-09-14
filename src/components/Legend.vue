<template>
  <div v-on:click="showLegend =!showLegend" class="legend">
    <div v-if="!showLegend" class="legend-example">
      <div class="arrow-container">
        <span class="pic arrow chron"></span>
        <hr class="chron" />
      </div>
    </div>
    <div v-if="showLegend" class="legend-content">
      <transition-group appear name="fade">
        <div v-for="connection in connections" :key="connection" class="wrapper">
          <div class="legend-example">
            <div class="arrow-container">
              <span :class="connection.name" class="pic arrow"></span>
              <hr :class="connection.name" />
            </div>
            <div class="text">{{connection.text}}</div>
          </div>
          <hr />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      showLegend: false,
      connections: [
        { name: "chron", text: "Represents chronological connections" },
        {
          name: "direct",
          text:
            "Represents direct connections, when a child has the id of the parent",
        },
        {
          name: "inferred",
          text:
            "Represents connections between a signal and its triggered child ",
        },
      ],
    };
  },
  watch: {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style  scoped lang="stylus">
.legend {
  background-color: white;
  border: 1px solid #eaeaea;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  position: absolute;
  right: 20px;
  top: 80px;

  &-example {
    display: flex;
    margin: 20px;
    flex-direction: column;
    text-align: left;

    hr {
      width: 60px;
      margin-left: 4px;

      &.direct {
        border-top: 2px solid black;
      }

      &.chron {
        border-top: 2px dashed #5879DA;
      }

      &.inferred {
        border-top: 2px dashed #ECAB20;
      }
    }
  }

  &-content {
    > hr {
      border: 0;
      margin: 0;
      border-top: 1px solid #eaeaea;
      width: 100%;
      padding: 0;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.text {
  margin-top: 10px;
  max-width: 300px;
}

.break {
  flex-basis: 100%;
  height: 0;
}

.pic {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
}

.arrow-container {
  display: flex;
  align-items: center;
}

.arrow {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;

  &.direct {
    border-right: 6px solid black;
  }

  &.chron {
    border-right: 6px solid #5879DA;
  }

  &.inferred {
    border-right: 6px solid #ECAB20;
  }
}

ul {
  list-style-position: inside;
}
</style>