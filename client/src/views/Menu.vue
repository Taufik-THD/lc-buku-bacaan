<template>
  <div class="Home">
    <Header />
    <Menu />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'

  export default{
    name: 'home',
    components: {
      Header,
      Menu
    }
  }
</script>
