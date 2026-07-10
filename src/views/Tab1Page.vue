<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tasks</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list v-if="taskStore.tasks.length">
        <ion-item-sliding v-for="task in taskStore.tasks" :key="task.id">
          <ion-item button @click="taskStore.toggleTask(task.id)">
            <ion-checkbox
              slot="start"
              :checked="task.done"
              @click.stop="taskStore.toggleTask(task.id)"
            />
            <ion-label :class="{ 'ion-text-strikethrough': task.done }">
              {{ task.name }}
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="taskStore.removeTask(task.id)">
              <ion-icon slot="icon-only" :icon="trash" />
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <div v-else class="ion-padding ion-text-center">
        <p>No tasks yet. Tap + to add one.</p>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="presentAddTaskAlert">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonCheckbox,
  IonIcon,
  IonFab,
  IonFabButton,
  alertController,
} from '@ionic/vue';
import { add, trash } from 'ionicons/icons';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();

async function presentAddTaskAlert() {
  const alert = await alertController.create({
    header: 'New Task',
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Task name',
      },
    ],
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Add',
        handler: (data: { name?: string }) => taskStore.addTask(data.name ?? ''),
      },
    ],
  });
  await alert.present();
}
</script>
