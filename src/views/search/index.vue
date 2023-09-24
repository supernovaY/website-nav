<template>
    <transition name="fade" mode="out-in">
      <div class="is-flex">
        <Time />
        <Search />
        <Background />
      </div>
    </transition>
</template>

<script setup>
  import Background from '@/components/background/index.vue';
  import Time from '@/components/time/index.vue';
  import Search from '@/components/search/index.vue';

</script>


<style scoped lang="scss">
</style>
