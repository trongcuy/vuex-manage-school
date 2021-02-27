<template>
  <div>
    <label><slot></slot></label>
    <input
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["value", "classN"],
  data(){
    return{
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin-bottom: 4px;
}
input {
  width: 100%;
}

</style>
