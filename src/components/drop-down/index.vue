<template>
    <div class="drop-down-frame" v-if="store.isDropDown">
        <span class="drop-down">
            <div :class="{'option-box': true, 'is-select': item.isSelect}" v-for="(item, index) in store.searchAddressList" :key="index" @click="setSearchAddress(index)">
                <svg class="icon icon-style" aria-hidden="true">
                    <use :xlink:href="item.img"></use>
                </svg>
                {{ item.name }}
            </div>
        </span>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useStore } from '@/store/store.js';


    const inputValue = ref(null);
    const store = useStore();
    const setSearchAddress = (index)=>{
        store.changeSearchAddress(index);
    };

</script>


<style scoped lang="scss">
    .drop-down-frame {
        animation: drop-down 0.6s forwards;
        background-color: #00000040;
        border-radius: 20px;
        margin: 2px 62px 0;

        @media (max-width: 720px) {
            margin: 5px 0 0;
        }

        .drop-down {
            width: 35vw;
            display: flex;
            flex-wrap: wrap;
            text-indent:30px;

            @media (max-width: 720px) {
                width: 100%;
            }

            .option-box {
                font-family: 'qiu-hong';
                color: lightgray;
                width: 100px;
                padding: 5px 0;
                margin: 5px;
                background-color: #00000040;
                backdrop-filter: blur(5px);
                border-radius: 20px;
                &:hover {
                    cursor: pointer;
                    animation: mouse-shadow 0.4s forwards;
                }

            }
            .icon-style {
                position: absolute;
                left: 10px;
            }
            .is-select {
                color: #fff;
                border: 1px solid #ccc;
                box-shadow: 0 0 10px #eff4fc;
            }
        }
    }
</style>
