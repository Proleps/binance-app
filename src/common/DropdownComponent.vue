<template>
  <div
    class="dropdown"
    @click="setDropdownListIsOpen"
  >
    {{activeOption}}
    <div
      v-if="dropdownListIsOpen"
      class="dropdown__list list"
    >
      <div
        v-for="(option, key) in options"
        :key="key"
        class="list_item"
        @click="$emit('setOption', option)"
      >
        {{option.firstCurrency}}-{{option.secondCurrency}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownComponent',
  data() {
    return {
      dropdownListIsOpen: false,
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    activeOption: {
      type: String,
      required: true,
    },
  },
  methods: {
    setDropdownListIsOpen() {
      this.dropdownListIsOpen = !this.dropdownListIsOpen;
    },
  },
};
</script>

<style lang="sass" scoped>
  .dropdown
    position: relative
    height: 100%
    width: 11rem
    background-color: rgb(22, 27, 34)
    box-sizing: border-box
    border: 1px solid #42b983
    border-radius: 1rem
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    font-size: 1.5rem
    .list
      position: absolute
      width: 100%
      top: calc( 100% + 0.5rem )
      box-sizing: border-box
      border: 1px solid #42b983
      border-radius: 1rem
      background-color: rgb(22, 27, 34)
      font-size: 1rem
      z-index: 100
      &_item
        height: 2rem
        margin: 0.5rem
        border-radius: 1rem
        display: flex
        justify-content: center
        align-items: center
        &:hover
          background-color: rgba(66, 185, 131, 0.4)
        &:active
          background-color: rgba(66, 185, 131, 0.8)
    &:hover
      background-color: rgba(0, 0, 0, 0.4)
</style>
