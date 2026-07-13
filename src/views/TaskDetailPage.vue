<template>
  <ion-page mode="md">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks"></ion-back-button>
        </ion-buttons>
        <ion-title class="app-title">Task Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="app-bg">
      <div class="p-5">
        <div v-if="task" class="rounded-2xl border border-muted/30 bg-card p-6 shadow-sm">
          <p class="m-0 text-sm font-semibold uppercase tracking-wider text-primary">Task #{{ task.id }}</p>
          <h1
            class="mx-0 mb-0 mt-3 text-2xl font-bold leading-snug text-foreground"
            :class="{ 'text-muted line-through': task.done }"
          >
            {{ task.name }}
          </h1>

          <div class="mt-8 flex items-center gap-4 rounded-xl border border-muted/25 bg-background px-5 py-4 shadow-inner">
            <ion-icon
              :icon="task.done ? checkmarkCircleOutline : timeOutline"
              class="text-3xl"
              :class="task.done ? 'text-primary' : 'text-muted'"
            />
            <div>
              <p class="m-0 text-base font-semibold text-foreground">{{ task.done ? 'Completed' : 'Pending' }}</p>
              <p class="mx-0 mb-0 mt-1 text-sm font-medium text-muted">Status</p>
            </div>
          </div>
        </div>

        <div v-else class="mt-32 flex flex-col items-center text-center">
          <ion-icon :icon="alertCircleOutline" class="text-6xl text-muted" />
          <p class="mx-0 mb-0 mt-4 text-lg font-medium text-muted">Task not found.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon
} from '@ionic/vue';
import { checkmarkCircleOutline, timeOutline, alertCircleOutline } from 'ionicons/icons';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const taskStore = useTaskStore();

const task = computed(() => taskStore.tasks.find(t => t.id === Number(route.params.id)));
</script>