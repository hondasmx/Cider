<template>
  <div>
    <v-alert dismissible error @input="onClose" :value="true">{{text}}</v-alert>
  </div>
</template>

<script>
  export default {
    name: 'Alerts',
    methods: {
      onClose() {
        this.$emit('dismissed')
      },
    }, props: {
      text: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style scoped>

</style>
