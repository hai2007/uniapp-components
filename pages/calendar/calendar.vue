<template>
    <view>

        <hai2007-calendar ref='calendar' lang="en"></hai2007-calendar>

        <button class='button' @click="openCalendar">
            打开日历
        </button>

    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            openCalendar() {
                this.$refs.calendar.open([], data => {
                    console.log(data);
                    this.val1 = data;
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
