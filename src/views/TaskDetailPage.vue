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
            <PriorityBadge :priority="task.priority ?? 'medium'" class="ml-auto" />
          </div>

          <ion-img v-if="task.photo" :src="task.photo" class="mt-8 rounded-xl border border-muted/25" />

          <ion-button expand="block" fill="outline" class="mt-8" @click="takePhoto">
            <ion-icon slot="start" :icon="cameraOutline" />
            {{ task.photo ? 'Retake Photo' : 'Add Photo' }}
          </ion-button>

          <ion-button expand="block" color="danger" fill="outline" class="mt-4" @click="presentDeleteConfirm">
            <ion-icon slot="start" :icon="trashOutline" />
            Delete Task
          </ion-button>
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
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon,
  IonButton, IonImg, alertController, onIonViewWillEnter
} from '@ionic/vue';
import { checkmarkCircleOutline, timeOutline, alertCircleOutline, trashOutline, cameraOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useTaskStore } from '@/stores/taskStore';
import PriorityBadge from '@/components/PriorityBadge.vue';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

// Ionic keeps previously-visited pages alive and reuses the same
// component instance for the `tasks/:id` route across different ids,
// so `setup()` only runs the first time this page is created. Reading
// `route.params.id` once here would freeze the id at the first task
// forever. Instead we refresh it every time the page becomes the active
// view via `onIonViewWillEnter`, which fires on both fresh and reused
// instances — and, unlike a computed bound to the live route, does not
// re-point background pages when navigation happens elsewhere.
const taskId = ref(Number(route.params.id));

onIonViewWillEnter(() => {
  taskId.value = Number(route.params.id);
});

const task = computed(() => taskStore.tasks.find(t => t.id === taskId.value));

async function takePhoto() {
  if (!task.value) return;
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 90,
  });
  if (photo.webPath) {
    taskStore.addPhotoToTask(taskId.value, photo.webPath);
  }
}

async function presentDeleteConfirm() {
  const alert = await alertController.create({
    header: 'Delete this task?',
    message: 'This cannot be undone.',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          if (task.value) {
            taskStore.removeTask(task.value.id);
            router.replace('/tabs/tasks');
          }
        },
      },
    ],
  });
  await alert.present();
}
</script>