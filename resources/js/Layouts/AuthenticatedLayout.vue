<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="absolute-center"> My App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer :breakpoint="768" v-model="leftDrawerOpen" show-if-above bordered>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding dense>
          <q-item clickable v-ripple :active="true" @click="router.get(route('dashboard'))">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :active="false" @click="router.get('/about')">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>
              <q-item-label>About</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="router.post(route('logout'))">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item dense expand-separator icon="mail" label="Inbox">
            <q-expansion-item dense :header-inset-level="0.55" expand-separator icon="receipt" label="Receipts">
              <q-expansion-item dense switch-toggle-side dense-toggle label="Today" :header-inset-level="0.55"
                :content-inset-level="1.1">
                <q-item dense>To</q-item>
              </q-expansion-item>
              <q-expansion-item dense switch-toggle-side dense-toggle label="Yesterday" :header-inset-level="0.55"
                :content-inset-level="1.1">
                <q-item dense>To</q-item>
              </q-expansion-item>

            </q-expansion-item>

            <q-expansion-item dense :header-inset-level="0.55" :content-inset-level="1.1" expand-separator icon="schedule"
              label="Postponed">
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                  commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                  eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <slot></slot>
    </q-page-container>

    <!-- Footer hanya tampil jika di tampilan screen kecil, lihat di bagian style di bawah pada file ini -->
    <!-- <q-footer elevated>
      <q-tabs v-model="tab" indicator-color="yellow" class="bg-primary text-white shadow-2">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>
    </q-footer> -->
  </q-layout>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { router, usePage } from "@inertiajs/vue3";

const tab = ref();
const page = usePage();
const user = page.props.auth.user;

defineComponent({
  name: "AuthenticatedLayout",
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
</style>
