<template>
    <view class='mask' :class='{show:flag}' @click.stop="close()">
        <view class='calendar-view' @click.stop>

            <!-- 选择年视图 -->
            <view class='item year' v-if='view=="year"'>
                <view class="title">
                    <text class='btn left' @click="current[0]-=10;openYearView()">《</text>
                    <text class='btn center'>
                        {{yearView[0]}}{{lang_.unit[0]}}-{{yearView[yearView.length-1]}}{{lang_.unit[0]}}
                    </text>
                    <text class='btn right' @click="current[0]+=10;openYearView()">》</text>
                </view>
                <view class='btns'>
                    <view class="nouse">
                        <text>{{yearView[0]}}{{lang_.unit[0]}}</text>
                    </view>
                    <view class="click" @click="current[0]=item;openMonthView()" v-for='(item,index) in yearView' :key='index'>
                        <text>{{item}}{{lang_.unit[0]}}</text>
                    </view>
                    <view class="nouse">
                        <text>{{yearView[yearView.length-1]}}{{lang_.unit[0]}}</text>
                    </view>
                </view>
            </view>

            <!-- 选择月视图 -->
            <view class='item month' v-if='view=="month"'>
                <view class="title">
                    <text class='btn left' @click="openMonthView(-1)">《</text>
                    <text class='btn center' @click="openYearView()">
                        {{current[0]+lang_.unit[1]}}
                    </text>
                    <text class='btn right' @click="openMonthView(+1)">》</text>
                </view>
                <view class='btns'>
                    <!-- 点击条目 -->
                    <view class="click" @click="current[1]=index+1;openDayView()" v-for='(item,index) in 12' :key='index'>
                        <text>{{lang_.month[index]}}</text>
                    </view>
                </view>
            </view>

            <!-- 选择天视图 -->
            <view class='item day' v-if='view=="day"'>
                <view class="title">
                    <text class='btn left' @click="openDayView(-1)">《</text>
                    <text class='btn center' @click="openMonthView()">
                        {{current[0]+lang_.view.day[0]+current[1]+lang_.view.day[1]}}
                    </text>
                    <text class='btn right' @click="openDayView(+1)">》</text>
                </view>
                <view class='btns'>

                    <!-- 星期头 -->
                    <view class='title' v-for='item in lang_.week' :key='item'>
                        <text>{{item}}</text>
                    </view>

                    <!-- 点击条目 -->
                    <view :class="item.type" @click="doSelect(item)" v-for='(item,index) in dayView' :key='index'>
                        <text>{{item.num}}</text>
                    </view>

                </view>
            </view>

        </view>
    </view>
</template>
<script>
    import zhCn from './zh-cn.js';
    import en from './en.js';
    import {
        getPreDayArray,
        getNextDayArray,
        getMonthDays,
        getDecYears
    } from '../tools/calendar.js';

    let _callback = () => {};

    /**
     * Calendar 日历
     * @description 日历（年月日）选择组件
     * @tutorial https://github.com/hai2007/uniapp-components/blob/master/docs/calendar.md
     * @property {String} lang = [zh-cn|en] 语言，默认zh-cn简体中文
     *  @value zh-cn 简体中文
     *  @value en 英文
     */
    export default {
        name: "hai2007Calendar",
        props: {
            lang: {
                type: String,
                default: "zh-cn"
            }
        },
        data() {

            let today = new Date();

            return {
                flag: false,
                today: [today.getFullYear(), today.getMonth() + 1, today.getDate()],
                init: [],
                current: [],
                view: "day",
                lang_: {
                    "zh-cn": zhCn,
                    en
                } [this.lang],
                dayView: [],
                yearView: []
            };
        },
        methods: {
            /**
             * @param {Array[number,number,number]} init 初始化参数
             * @param {function} callback 回调函数
             * 打开日历
             */
            open(init, callback) {

                _callback = callback;
                this.init = init;
                this.current = init.length >= 3 ? init : this.today;

                // 显示
                this.flag = true;

                // 初始化显示选择天视图
                this.openDayView();
            },

            /**
             * 关闭日历
             */
            close() {
                this.flag = false;
            },

            /**
             * 打开选择天视图
             */
            openDayView(changeNum = 0) {

                if (changeNum == 1) {
                    if (this.current[1] + 1 > 12) {
                        this.current[1] = 1;
                        this.current[0] += 1;
                    } else {
                        this.current[1] += 1;
                    }
                } else if (changeNum == -1) {
                    if (this.current[1] - 1 < 1) {
                        this.current[1] = 12;
                        this.current[0] -= 1;
                    } else {
                        this.current[1] -= 1;
                    }
                }

                let temp = [];

                getPreDayArray(this.current[0], this.current[1]).forEach(item => {
                    temp.push(item);
                });

                for (let i = 0; i < getMonthDays(this.current[0], this.current[1]); i++) {
                    temp.push({
                        num: i + 1,
                        type: 'click'
                    });
                }

                getNextDayArray(this.current[0], this.current[1]).forEach(item => {
                    temp.push(item);
                });

                this.dayView = temp;
                this.view = 'day';
            },

            /**
             * 打开选择月视图
             */
            openMonthView(changeNum = 0) {
                this.current = [this.current[0] + changeNum, this.current[1], this.current[2]];
                this.view = 'month';
            },

            /**
             * 打开选择年视图
             */
            openYearView(year) {
                this.yearView = getDecYears(year || this.current[0]);
                this.view = 'year';
            },

            /**
             * 确定选择
             */
            doSelect(item) {
                if (item.type == 'nouse') return;

                _callback([this.current[0], this.current[1], item.num]);
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

            &>.calendar-view {
                bottom: 0;
            }
        }

        &>.calendar-view {
            position: fixed;
            bottom: -600rpx;
            transition-duration: 500ms;
            transition-property: bottom;
            width: 100vw;
            background-color: white;
            right: 0;
            overflow: hidden;
            white-space: nowrap;

            &>.item {
                text-align: center;
                white-space: normal;
                width: 100vw;
                display: inline-block;
                line-height: 2em;

                &>.title {
                    padding: 20rpx 0;

                    &>.btn {
                        text-align: center;
                        margin: 0 10rpx;

                        &.left {
                            float: left;
                        }

                        &.center {
                            font-weight: 800;
                        }

                        &.right {
                            float: right;
                        }
                    }
                }

                &>.btns {
                    &>view {
                        display: inline-block;

                        &.nouse {
                            color: gray;
                        }

                        &.title {
                            font-weight: 800;
                        }
                    }
                }

                // 选择天视图
                &.day {

                    &>.btns {
                        &>view {
                            width: 14%;
                        }
                    }
                }

                // 选择月和年视图
                &.month,
                &.year {

                    &>.btns {
                        &>view {
                            width: 33.33%;
                        }
                    }
                }
            }
        }
    }
</style>
