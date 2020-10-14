<template>
  <div class="home-main">
    <div>hello world</div>
    <button @click="setNumState(2)">修改</button>
    <div>从store中取持久化值：{{ numState }}</div>
    <div>从store中取非持久化值：{{ noState }}</div>
    <input type="text" v-model="num" />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "home-main",
  data() {
    return {
     
    };
  },
  components: {},
  props: {},
  computed: {
    ...mapState(["numState", "noState"]),
    // 在v-model中怎么用vuex中的state值
    num: {
      get() {
        return this.noState
      },
      set(val) {
        this.$store.commit('vModul',val)
      },
    },

  },
  methods: {
    ...mapMutations(["setNumState"]),
  },
};
</script>
<style scoped>
</style>