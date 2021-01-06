<template>
    <view class="view">
        <navigator url="../calendar/calendar">
            <button type="primary">
                日历
            </button>
        </navigator>
        <navigator url="../select/select">
            <button type="primary">
                下拉
            </button>
        </navigator>
    </view>
</template>

<script>
    export default {

        data() {
            return {


            };
        }

    }
</script>

<style scoped lang="scss">
    button {
        margin: 30rpx;
    }
</style>
