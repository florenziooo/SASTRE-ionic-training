<template>
  <ion-page mode="md">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="app-title">Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="app-bg">
      <!-- Stat cards -->
      <div class="grid grid-cols-3 gap-4 px-5 pt-6">
        <div class="rounded-xl border border-muted/30 bg-card p-4 text-center shadow-sm">
          <ion-icon :icon="layersOutline" class="mx-auto mb-2 block text-xl text-muted" />
          <p class="m-0 text-3xl font-semibold leading-none text-foreground">{{ totalTasks }}</p>
          <p class="mx-0 mb-0 mt-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted">Total</p>
        </div>
        <div class="rounded-xl border border-muted/30 bg-card p-4 text-center shadow-sm">
          <ion-icon :icon="checkmarkDoneOutline" class="mx-auto mb-2 block text-xl text-muted" />
          <p class="m-0 text-3xl font-semibold leading-none text-foreground">{{ completedTasks }}</p>
          <p class="mx-0 mb-0 mt-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted">Done</p>
        </div>
        <div class="rounded-xl border border-muted/30 bg-card p-4 text-center shadow-sm">
          <ion-icon :icon="hourglassOutline" class="mx-auto mb-2 block text-xl text-muted" />
          <p class="m-0 text-3xl font-semibold leading-none text-foreground">{{ pendingTasks }}</p>
          <p class="mx-0 mb-0 mt-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted">Pending</p>
        </div>
      </div>

      <div class="px-5 pb-8">
        <!-- Preferences -->
        <p class="mb-3 mt-8 px-2 text-sm font-semibold uppercase tracking-wider text-muted">Preferences</p>
        <div class="overflow-hidden rounded-xl border border-muted/30 bg-card shadow-sm">
          <div class="flex items-center gap-4 border-b border-muted/20 px-5 py-4">
            <ion-icon :icon="moonOutline" class="text-2xl text-muted" />
            <span class="flex-1 text-base font-medium text-foreground">Appearance</span>
            <span class="text-sm font-medium text-muted">Light</span>
          </div>
          <div class="flex items-center gap-4 px-5 py-4">
            <ion-icon :icon="colorPaletteOutline" class="text-2xl text-muted" />
            <span class="flex-1 text-base font-medium text-foreground">Theme</span>
            <span class="text-sm font-medium text-primary">Indigo</span>
          </div>
        </div>

        <!-- Data -->
        <p class="mb-3 mt-8 px-2 text-sm font-semibold uppercase tracking-wider text-muted">Data</p>
        <div class="overflow-hidden rounded-xl border border-muted/30 bg-card shadow-sm ">
          <button
            type="button"
            class="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors active:bg-muted/10"
            @click="confirmClearAll"
          >
            <ion-icon :icon="trashOutline" class="text-2xl text-danger" />
            <span class="flex-1 text-base font-medium text-danger">Clear all tasks</span>
            <ion-icon :icon="chevronForwardOutline" class="text-lg text-muted" />
          </button>
        </div>

        <!-- About -->
        <p class="mb-3 mt-8 px-2 text-sm font-semibold uppercase tracking-wider text-muted">About</p>
        <div class="overflow-hidden rounded-xl border border-muted/30 bg-card shadow-sm">
          <div class="flex items-center gap-4 px-5 py-4">
            <ion-icon :icon="informationCircleOutline" class="text-2xl text-muted" />
            <span class="flex-1 text-base font-medium text-foreground">Version</span>
            <span class="text-sm font-medium text-muted">TaskFlow 1.0.0</span>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, alertController
} from '@ionic/vue';
import {
  layersOutline, checkmarkDoneOutline, hourglassOutline,
  moonOutline, colorPaletteOutline, trashOutline, chevronForwardOutline, informationCircleOutline
} from 'ionicons/icons';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

const totalTasks = computed(() => taskStore.tasks.length);
const completedTasks = computed(() => taskStore.tasks.filter(t => t.done).length);
const pendingTasks = computed(() => totalTasks.value - completedTasks.value);

async function confirmClearAll() {
  const alert = await alertController.create({
    header: 'Clear all tasks?',
    message: 'This will permanently remove every task. This cannot be undone.',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      { text: 'Clear All', role: 'destructive', handler: () => taskStore.clearAll() },
    ],
  });
  await alert.present();
}
</script>

<style scoped>
.text-danger {
  color: var(--ion-color-danger, #ef4444);
}

/* Ionic's normalize.css resets `button { padding: 0 }` as unlayered CSS,
   which always beats Tailwind's layered px-5/py-4 utilities regardless of
   specificity. Restore the matching padding explicitly. */
button {
  padding: 1rem 1.25rem;
}

.app-title {
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>