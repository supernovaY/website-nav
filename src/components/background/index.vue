<template>
      <div class="background">
            <transtion>
                  <img :class="{ 'is-pick': store.isPick, 'cancel-pick': !store.isPick  }"
                       :src="getBg" />
            </transtion>
      </div>
</template>

<script setup>
import { useStore } from '@/store/store.js';
const store = useStore();

//
const getBg = `images/background/background${Math.floor(Math.random() * 5 + 1)}.jpg`;
</script>




<style scoped lang="scss">
  .is-pick {
        filter: blur(3px); /* 调整值以增加或减少模糊程度 */
        animation: pick-on 0.3s forwards;
  }
  .cancel-pick {
        animation: pick-cancel 0.3s forwards;
  }
</style>
