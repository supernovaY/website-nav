<template>
    <div class="search">
        <el-input v-model="inputValue"
                  ref="inputRef"
                  @focus="enterPick"
                  @blur="cancelPick"
                  :class="{
                      'input': true,
                      'cancel-pick': !store.isPick,
                      'is-pick': store.isPick
                  }"
                  placeholder="随便搜点什么"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '@/store/store.js';

const inputRef = ref(null);
const inputValue = ref(null);
const store = useStore();

const enterPick = (event) => {
    store.changePick(true);
    return event;
}
const cancelPick = (event) => {
    store.changePick(false);
    return event
}

</script>


<style scoped lang="scss">
    .search {
        margin-bottom: 180px;
        animation: input-move 0.4s forwards;
        .input {
            width: 35vw;
            :deep(.el-input__wrapper) {
                background-color: #00000040;
                backdrop-filter: blur(10px);
                text-align: center;
                padding: 5px 0;
                box-shadow: none;
                border-radius: 20px;
                // 光标颜色
                caret-color: #1a1a1a;
            }
            :deep(.el-input__inner) {
                color: #eff4fc;
                text-align: center;
                letter-spacing: 2px;
            }
            :deep(.el-input__inner::placeholder) {
                color: #eee;
            }
            :deep(.is-focus) {
                box-shadow: none;
            }
        }
        .is-pick {
            animation: input-move 0.4s forwards;
            :deep(.el-input__wrapper) {
                background-color: #eee;
                backdrop-filter: none;
            }
            :deep(.el-input__inner) {
                color: #eff4fc;
                text-align: left;
                margin-left: 60px;
            }
        }
        .cancel-pick {
            animation: input-return 0.4s forwards;
        }
    }
</style>
