<template>
    <view class='view' :class="[{disabled:disabled},value_?'open':'close']" @click="doChange()">
        <view></view>
    </view>
</template>
<script>
    /**
     * Switch 开关
     * @description 一个用来切换状态的组件，可以在true和false之间互换
     * @tutorial https://github.com/hai2007/uniapp-components/blob/master/docs/switch.md
     * @property {Boolean} disabled = [false|true] 是否禁用
     *  @value false 未禁用
     *  @value true 禁用
     * @event {Function} input 按钮值改变触发
     * */
    export default {
        name: "hai2007Switch",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                value_: this.value
            };
        },
        methods: {
            doChange() {

                // 如果不可点击
                if (this.disabled) return;

                // 切换值
                this.value_ = !this.value_;
                this.$emit('input', this.value_);
            }
        }
    };
</script>
<style scoped lang='scss'>
    .view {
        display: inline-block;
        position: relative;
        width: 30px;
        height: 17px;
        border-radius: 8.5px;
        transition: background-color .4s;

        &>view {
            border-radius: 50%;
            position: absolute;
            background-color: #ffffff;
            width: 13px;
            height: 13px;
            top: 2px;
            transition: left .4s;
        }

        /* 状态 */

        &.open {
            background-color: #0e75c6;

            &>view {
                left: 15px;
            }
        }

        &.close {
            background-color: #C8C7CC;

            &>view {
                left: 2px;
            }
        }

        /* 不可点击 */

        &.disabled {
            &.open {
                background-color: #9dc2e0;
            }

            &.close {
                background-color: #efedf4;
            }
        }

    }
</style>
