<template>
  <div>
    sign in page
    <p>{{ title }}</p>
    <p> {{ (user && user.state) ? user.state.username : '' }}</p>
    <div>
      <input type="text"
        v-bind:value="user.state.username"
        v-on:input="(event) => { user.updateUsername(event.target.value); }">
    </div>
  </div>
</template>

<script lang="ts" src="./sign-in-page.component.ts"></script>
<style lang="scss" scoped src ="./sign-in-page.component.scss"></style>