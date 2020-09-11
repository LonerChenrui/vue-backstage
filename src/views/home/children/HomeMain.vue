<template>
  <div class="home-main">
    <div>hello world</div>
    <button @click="setNumState(2)">修改</button>
    <div>从store中取持久化值：{{numState}}</div>
    <div>从store中取非持久化值：{{noState}}</div>
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
    ...mapState(['numState','noState']),
  },
  methods: {
    ...mapMutations(['setNumState'])

  }
};
</script>
<style scoped>
</style>