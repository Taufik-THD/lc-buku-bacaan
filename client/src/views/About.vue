<template>
  <div class="Home">
    <Header />
    <Detail />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Detail from '@/components/Detail.vue'

  export default{
    name: 'home',
    components: {
      Header,
      Detail
    }
  }
</script>
