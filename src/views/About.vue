<template>
  <div class="about">
    <h1>This is an about page</h1>
    <img src="~IMG/logo.png" alt="">
  </div>
</template>

<script>

export default {
  name: 'About',
  component: {},
  mounted() {},
  methods: {
    handlerClose() {
      console.log('close');
    }
  },
}
</script>

<style lang="scss" scoped>
  .about {
    h1 {
      color: $color;
      @include test();
    }
  }
</style>