<template>
    <view>

        <hai2007-calendar ref='calendar' lang="zh-cn"></hai2007-calendar>

        <button class='button' @click="openCalendar">
            打开日历
        </button>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                curDate:[]
            }
        },
        methods: {
            openCalendar() {
                this.$refs.calendar.open(this.curDate, data => {
                    // console.log(data);
                    this.curDate = data;
                });
            }
        }
    }
</script>

<style>
    .button {
        margin: 50rpx;
    }
</style>
