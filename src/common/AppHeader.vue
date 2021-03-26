<template>
  <div class="app-header">
    <user-id />
  </div>
</template>

<script>
import UserId from '@/common/UserId'

export default {
  name: 'app-header',

  components: {
    UserId,
  },
}
</script>

<style lang="scss" scoped>
.app-header {
}
</style>
