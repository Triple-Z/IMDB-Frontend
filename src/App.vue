<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import index from './components/index'
import searchTitles from './components/searchTitles'

export default {
  name: 'App',
  components: {
    index,
    searchTitles
  }
}
</script>

<style>

</style>
