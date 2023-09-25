<template>
    <Transition name="fade" mode="out-in">
      <div :class="{
                'is-move': store.isPick,
                'is-return': !store.isPick
            }">
        <Time />
        <Search />
        <drop-down />
      </div>
    </Transition>
</template>

<script setup>
import Background from '@/components/background/index.vue';
import Time from '@/components/time/index.vue';
import Search from '@/components/search/index.vue';
import DropDown from '@/components/drop-down/index.vue';
import { useStore } from '@/store/store.js';

const store = useStore();
</script>


<style scoped lang="scss">
    .search-frame {
    }
    .is-move {
        animation: input-move 0.4s forwards;
    }
    .is-return {
        animation: input-return 0.4s forwards;
    }
</style>
