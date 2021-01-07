<template>
    <view class='mask' :class='{show:flag}' @click.stop="close()">
        <view class='select-view' @click.stop>
            <view class="btns">
                <text @click="close()">取消</text>
                <text @click="doSelect()">确定</text>
            </view>
            <view class='list'>
                <view class='item' v-for='item in showlist' :key='item.val' :class="{selected:item.val==curVal}">
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

    let _callback = () => {};

    /**
     * Select 下拉
     * @description 单选下拉选择组件
     * @tutorial https://github.com/hai2007/uniapp-components/blob/master/docs/select.md
     * @property {String} item 数据循环条目的value，默认"item"
     * @property {String} index 数据循环条目的key，默认"index"
     * @property {String} label 显示格式，默认取循环条目的值
     * @property {String} val 值格式，默认取循环条目的值
     */
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
                curVal: "",
                showlist: [],
                flag: false
            };
        },
        methods: {
            initShowList(list) {
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
                        val: evalExpress(scope, this.val)
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
                this.curVal = init;

                // 初始化显示列表
                this.initShowList(list);

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
             * 确定选择
             */
            doSelect() {
                _callback(this.curVal);
                this.close();
            }
        }
    };
</script>
<style lang="scss">
    .mask {
        bottom: -100vh;
        position: fixed;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(156, 147, 147, 0.35);
        z-index: 1;

        &.show {
            bottom: 0;

            &>.select-view {
                bottom: 0;
            }
        }

        &>.select-view {
            position: fixed;
            bottom: -200rpx;
            transition-duration: 500ms;
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
                font-size: 26rpx;

                &>text {
                    padding: 10rpx;
                }
            }
        }
    }
</style>
