<template>
  <div class="about">
    <h1 class="w-icon-icon-chongzhi">This is an about page</h1>
    <img src="~IMG/logo.png" alt="">
    <p>呵呵</p>
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
    p {
      font-size: 16px;
      width: 100px;
      background: #ccc;
    }
  }
</style>
