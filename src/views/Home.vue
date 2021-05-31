<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PxAssetsTable from '@/components/PxAssetsTable'

export default {
  name: 'Home',

  components: { PxAssetsTable },

  data() {
    return {

    }
  },
  methods: {
    ...mapActions({
      
      setAssets: 'setAssets',
    }),
  },

  created() {
    this.setAssets(this.assets)
  },
}
</script>
