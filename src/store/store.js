import { defineStore } from 'pinia';

export const useStore = defineStore('counter', {
    state: () => ({
        // 是否选中筛选
        isPick: false,
    }),
    actions: {
        changePick(value) {
            this.isPick = value;
        },
    },
});