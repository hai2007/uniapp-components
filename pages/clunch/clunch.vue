<template>
    <view>
        <hai2007-clunch style="width: 100vw; height: 500px" ref='clunch'>
            <circle c-for="(item, key) in position" c-bind:cx="_width*0.5" c-bind:cy="item[0]" c-bind:radius="size"
                c-bind:fill-color="item[1]" c-bind:_id="key" c-on:click='doit'></circle>
        </hai2007-clunch>
        {{ size }}
        <view v-on:click='doit2'>
            点击我
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                position: [
                    [100, "red"],
                    [200, "blue"],
                    [300, "green"]
                ],
                size: 10
            };
        },
        methods: {
            doit2() {
                // 面前改变这里无效
                this.size += 10;
            },
            doit(target, clunch) {
                // 需要改变这里
                clunch.size += 10;
                console.log(target, clunch, this);
            }
        }
    };
</script>
