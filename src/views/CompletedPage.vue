<template>
  <ion-page mode="md">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="app-title">Completed</ion-title>
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
          <p class="m-0 text-3xl font-semibold leading-none text-foreground">{{ completedCount }}</p>
          <p class="mx-0 mb-0 mt-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted">Done</p>
        </div>
        <div class="rounded-xl border border-muted/30 bg-card p-4 text-center shadow-sm">
          <ion-icon :icon="hourglassOutline" class="mx-auto mb-2 block text-xl text-muted" />
          <p class="m-0 text-3xl font-semibold leading-none text-foreground">{{ pendingTasks }}</p>
          <p class="mx-0 mb-0 mt-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted">Pending</p>
        </div>
      </div>

      <!-- Completed list -->
      <div class="px-5">
        <div v-if="completedTasks.length" class="mb-3 mt-8 flex items-center justify-between px-2">
          <p class="m-0 text-sm font-semibold uppercase tracking-wider text-muted">Finished</p>
          <span class="text-sm font-medium text-primary">{{ completedTasks.length }} done</span>
        </div>

        <div v-if="completedTasks.length" class="overflow-hidden rounded-xl border border-muted/30 bg-card shadow-sm">
          <ion-list class="ds-list">
            <ion-item
              v-for="task in completedTasks"
              :key="task.id"
              button
              :detail="false"
              @click="router.push(`/tabs/tasks/${task.id}`)"
            >
              <ion-checkbox slot="start" v-model="task.done" @click.stop class="mr-4" />
              <ion-label class="text-muted line-through text-base font-medium">
                {{ task.name }}
              </ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- Empty state -->
        <div v-else class="mt-24 flex flex-col items-center px-8 text-center">
          <div class="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-muted/30 bg-card shadow-sm">
            <ion-icon :icon="checkmarkDoneOutline" class="text-4xl text-muted" />
          </div>
          <h2 class="m-0 text-lg font-semibold text-foreground">Nothing finished yet</h2>
          <p class="mx-0 mb-0 mt-2 max-w-xs text-base leading-relaxed text-muted">
            Completed tasks will show up here once you check them off.
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonCheckbox, IonIcon
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { layersOutline, checkmarkDoneOutline, hourglassOutline } from 'ionicons/icons';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
const router = useRouter();

const completedTasks = computed(() => taskStore.tasks.filter(task => task.done === true));

const totalTasks = computed(() => taskStore.tasks.length);
const completedCount = computed(() => completedTasks.value.length);
const pendingTasks = computed(() => totalTasks.value - completedCount.value);
</script>

<style scoped>
.ds-list {
  background: transparent;
  padding: 0;
}
.ds-list ion-item {
  --background: var(--card-bg, #1e293b);
  --padding-start: 16px;
  --inner-padding-end: 16px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --min-height: 60px;
}
.ds-list ion-item:last-of-type {
  --inner-border-width: 0;
}
.ds-list ion-item ion-label {
  margin-top: 6px;
  margin-bottom: 6px;
  padding-inline-start: 4px;
}

.app-title {
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>