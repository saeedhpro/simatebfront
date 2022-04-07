<template>
  <div v-if="loading" class="loading-page">
<!--    <div class="loading">-->
<!--      <img src="static/images/Pulse-1s-200px.gif" class="text-center m-auto">-->
<!--    </div>-->
    <div ><img src="/images/Spin-1s-200px.gif" alt="" class="w-32"/></div>
  </div>
</template>
<script>
    export default {
        data: () => ({
            loading: false,
        }),
        methods: {
            start() {
                this.loading = true
            },
            finish() {
                this.loading = false
            },
        },
    }
</script>
<style scoped>
  .loading-page {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 88000;
    padding: 1rem;
    text-align: center;
    font-size: 3rem;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .loading {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border: 4px solid rgba(9, 133, 81, 0.705);
    border-radius: 50%;
    border-top-color: #158876;
    animation: spin 1s ease-in-out infinite;
  }
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
