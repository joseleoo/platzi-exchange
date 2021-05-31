<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PxAssetsTable from '@/components/PxAssetsTable'

export default {
  name: 'Home',

  components: { PxAssetsTable },

  data() {
    return {}
  },
  computed: {
    ...mapState({
      assets: (state) => state.assets,
      isLoading: (state) => state.isLoading,
    }),
  },

  methods: {
    ...mapActions({
      getAssets: 'getAssets',
    }),
  },

  created() {
    this.getAssets()
  },
}
</script>
