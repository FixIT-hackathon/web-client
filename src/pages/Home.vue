<template>
  <div class="home">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/common/AppHeader'

export default {
  name: 'home',
  components: {
    AppHeader,
  },
}
</script>
