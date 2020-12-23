import Vue from 'vue';

Vue.use({
  install(vue) { 
    vue.prototype.$broadcast = null; 
    vue.mixin({
      beforeCreate() { 
        if (this.$options.$module) {
          this.$broadcast = new Vue()
        } else if (this.$parent && this.$parent.$broadcast) { 
          this.$broadcast = this.$parent.$broadcast
        }
      }
    })
  }
})