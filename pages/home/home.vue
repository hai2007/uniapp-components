<template>
    <view class="view">
        <view>
            <text class='title'>1.复选框</text>
        </view>
        <view>
            <text class='title'>2.单选框</text>
        </view>
        <view>
            <text class='title'>3.开关</text>
            <hai2007-switch v-model='switch_flag'></hai2007-switch>
            当前状态：{{switch_flag}}

        </view>
        <view>
            <text class='title'>4.日历</text>
        </view>
        <view>
            <text class='title'>5.时间</text>
        </view>
        <view>
            <text class='title'>6.下拉</text>
        </view>
        <view>
            <text class='title'>7.轮播</text>
        </view>
    </view>
</template>

<script>
    export default {

        data() {
            return {
                // 1.复选框

                // 2.单选框

                // 3.开关
                switch_flag: true,

                // 4.日历

                // 5.时间

                // 6.下拉

                // 7.轮播

            };
        }

    }
</script>

<style scoped lang="scss">
    .view {
        &>view {
            border: 1px solid gray;
            margin: 20rpx;
            padding: 20rpx;

            &>text {
                &.title {
                    color: red;
                    display: block;
                }
            }
        }
    }
</style>
