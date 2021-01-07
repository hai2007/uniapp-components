<template>
    <view>

        <hai2007-select ref='select' item='item' index='index' val="item.key" label='item.value'></hai2007-select>

        <button class='button' @click="openSelect">
            打开下拉
        </button>

    </view>
</template>
<script>
    export default {
        data() {
            return {
                val1: "",
                itemlist: [{
                    key: "A",
                    value: "Angularjs"
                }, {
                    key: "B",
                    value: "Vue"
                }, {
                    key: "C",
                    value: "Clunch"
                }, {
                    key: "D",
                    value: "React"
                }, {
                    key: "E",
                    value: "Clay"
                }, {
                    key: "F",
                    value: "Jquery"
                }, {
                    key: "G",
                    value: "WebGL"
                }]
            };
        },
        methods: {
            openSelect() {
                this.$refs.select.open(this.itemlist, this.val1, data => {
                    console.log(data);
                    this.val1 = data;
                });
            }
        }
    };
</script>
<style lang='scss'>
    .button {
        margin: 50rpx;
    }
</style>
