<template>
  <q-layout view="hHh lpR fFf" style="background:#f5f5f5">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar style="max-width: 980px; margin:0 auto;">
        <q-toolbar-title align="left">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <my-link class="q-pl-md text-white" :href="route('home')" label="My App" />
        </q-toolbar-title>
        <div class="q-gutter-md q-ma-none">
          <my-link label="Login" :href="route('login')" />
          <my-link label="Register" :href="route('register')" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container style="max-width: 1024px; margin:0 auto;">
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: 'AuthLayout'
})
</script>
<style scoped>
  .q-toolbar a {
    color: #ddd;
  }
  .q-toolbar a:hover {
    color: #fff;
  }
</style>
