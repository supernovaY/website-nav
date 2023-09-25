<template>
    <div class="search">
        <el-input v-model="inputValue"
                  ref="inputRef"
                  @focus="enterPick"
                  :class="{
                      'input': true,
                      'cancel-pick': !store.isPick,
                      'is-pick': store.isPick
                  }"
                  placeholder="随便搜点什么">
                <template v-slot:prefix>
                    <svg :class="iconLeft()" aria-hidden="true" @click="openDropDown">
                        <use :xlink:href="store.searchAddressImg"></use>
                    </svg>
                </template>
                <template v-slot:suffix>
                    <svg :class="iconRight()" aria-hidden="true" @click="goPage">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </template>
        </el-input>
        <svg  v-if="store.isPick" class="hide-page icon" aria-hidden="true" @click="cancelPick">
            <use xlink:href="#icon-fanhui"></use>
        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '@/store/store.js';

const inputValue = ref(null);
const store = useStore();
const iconLeft = ()=>{
    return {
        'icon': true,
        'icon-left': true,
        'icon-pick': store.isPick,
        'icon-style': !store.isPick,
    }
};
const iconRight = ()=>{
    return {
        'icon': true,
        'icon-right': true,
        'icon-pick': store.isPick,
        'icon-style': !store.isPick,
    }
};

const goPage = () => {
    window.open(store.searchAddress + inputValue.value);
}
const openDropDown = () => {
    store.isOpenDropDown();
}
const enterPick = (event) => {
    store.changePick(true);
    return event;
}
const cancelPick = (event) => {
    store.isOpenDropDown(false);
    store.changePick(false);
    return event;
}

</script>


<style scoped lang="scss">
    .search {
        .input {
            width: 35vw;
            :deep(.el-input__wrapper) {
                text-align: center;
                padding: 5px 0;
                box-shadow: none;
                border-radius: 20px;
                // 光标颜色
                caret-color: #1a1a1a;
                animation: color-return 0.4s forwards;
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

            .icon-style {
                color: #fff;
                &:hover {
                    cursor: pointer;
                    transform: scale(1.02);
                    background: rgb(0 0 0 / 40%);
                    transition: 0.3s;
                }
            }
            .icon-left {
                position: absolute;
                margin-left: 62px;
                padding: 8px 15px;
                border-radius: 25px;
            }
            .icon-right {
                position: absolute;
                margin-right: 62px;
                padding: 8px 15px;
                border-radius: 25px;
            }
            .icon-pick {
                color: #242424;
                &:hover {
                    cursor: pointer;
                    transform: scale(1.02);
                    background: rgb(0 0 0 / 30%);
                    transition: 0.3s;
                }
            }
        }
        .is-pick {
            :deep(.el-input__wrapper) {
                animation: color-none 0.4s forwards;
            }
            :deep(.el-input__inner) {
                color: #1a1a1a;
                text-align: left;
                margin-left: 60px;
            }
        }
        .hide-page {
            position: absolute;
            font-size: 24px;
            top: 0;
            padding: 5px;
            border-radius: 10px;
            box-shadow: 0 0 10px #eff4fc;

            &:hover {
                cursor: pointer;
                transform: scale(1.1);
            }
        }
    }
</style>
