<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title align="center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <my-link class="q-pl-md text-white" :href="route('home')" label="My App" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, onMounted, onUnmounted } from "vue";

defineComponent({
  name: 'AuthLayout'
})
</script>
