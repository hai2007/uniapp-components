<template>
    <view class='mask' :class='{show:flag}' @click.stop="close()">
        <view class='select-view'>
            <view class="btns">
                <text>取消</text>
                <text>确定</text>
            </view>
            <view class='list'>
                <view class='item' v-for='item in showlist' @click.stop="doSelect(item.val)" :class="{selected:item.selected}">
                    <text>{{item.label}}</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import {
        evalExpress
    } from '@hai2007/algorithm/value.js';

    /**
     * Select 下拉
     * @description 单选下拉选择组件
     * @tutorial https://github.com/hai2007/uniapp-components/blob/master/docs/select.md
     * @property {String} item 数据循环条目的value，默认"item"
     * @property {String} index 数据循环条目的key，默认"index"
     * @property {String} label 显示格式，默认取循环条目的值
     * @property {String} val 值格式，默认取循环条目的值
     */

    let _callback = () => {};

    export default {
        name: "hai2007Select",
        props: {
            item: {
                type: String,
                default: "item"
            },
            index: {
                type: String,
                default: "index"
            },
            label: {
                type: String,
                // 非必输,默认我们显示item
                default: ""
            },
            val: {
                type: String,
                default: ""
            }
        },
        data() {

            return {
                value_: this.value,
                showlist: [],
                flag: false
            };
        },
        methods: {
            initShowList(list, init) {
                // 对一些特殊的非必输项进行初始化
                if (this.label == "") this.label = this.item;
                if (this.val == "") this.val = this.item;

                // 开始生成内部使用的迭代列表
                let showlist = [];
                for (let key in list) {
                    let scope = {};
                    scope[this.index] = key;
                    scope[this.item] = list[key];

                    let val_temp = evalExpress(scope, this.val);
                    showlist.push({
                        label: evalExpress(scope, this.label),
                        val: val_temp,
                        selected: val_temp == init ? true : false
                    });
                }
                this.showlist = showlist;
            },

            /**
             * @param {any} list 下拉列表
             * @param {any} init 初始化参数
             * @param {function} callback 回调函数
             * 打开下拉
             */
            open(list, init, callback) {

                _callback = callback;

                // 初始化显示列表
                this.initShowList(list, init);

                // 显示
                this.flag = true;

            },

            /**
             * 关闭下拉
             */
            close() {
                this.flag = false;
            },

            /**
             * @param {any} val 选择的数据
             * 确定选择
             */
            doSelect(val) {
                _callback(val);
                this.close();
            }
        }
    };
</script>
<style lang="scss">
    .mask {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(156, 147, 147, 0.35);
        ;
        z-index: 1;

        &.show {
            display: block;

            &>.select-view {
                bottom: 0;
            }
        }

        &>.select-view {
            position: fixed;
            bottom: -150rpx;
            transition-duration: 200ms;
            transition-property: bottom;
            width: 100vw;
            background-color: white;

            &>.list {
                text-align: center;
                font-size: 26rpx;
                height: 150rpx;
                overflow-y: auto;

                &.selected {
                    color: red;
                    font-size: 30rpx;
                }
            }

            &>.btns {
                display: flex;
                justify-content: space-between;

                &>text {
                    padding: 10rpx;
                }
            }
        }
    }
</style>
