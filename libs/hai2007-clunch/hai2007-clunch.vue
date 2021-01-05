<template>
  <div ref="clunch">
    <slot></slot>
  </div>
</template>
<script>
import Clunch from "clunch/dist/clunch-template.js";
import { isFunction } from "@hai2007/tool";

export default {
  mounted: function() {
    var clunch,
      parentVue = this.$parent;

    //  数据
    var data = parentVue._data;

    // 方法
    var methods = {};
    for (var key in parentVue) {
      if (/^\$/.test(key) || /^\_/.test(key)) {
        // 如果是内部变量
      } else if (key in parentVue._data) {
        // 如果是数据
      } else if (isFunction(parentVue[key])) {
        (function(key) {
          methods[key] = function(target) {
            try {
              parentVue[key].call(parentVue, target, clunch);
            } catch (e) {
              console.error(e);
            }
          };
        })(key);
      }
    }

    clunch = new Clunch({
      el: this.$refs.clunch,
      data: data,
      template: this.$refs.clunch.innerHTML,
      methods: methods
    });
    
    console.log(clunch);
    
    debugger
  }
};
</script>
