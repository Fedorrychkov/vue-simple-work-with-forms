<template>
<div>
  <label v-if="label">{{label}}</label>
  <input
    :type="type"
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
  <p v-if="error">{{error}}</p>
</div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: String,
    label: String,
    error: String,
    type: {
     type: String,
     default: 'text' // даст возможность не указывать type для текстовых полей типом 'text'
    }
  }
}
</script>
