<template>
  <ion-page mode="md">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="ds-tab-bar">
        <ion-tab-button tab="tasks" href="/tabs/tasks">
          <ion-icon aria-hidden="true" :icon="listOutline" />
          <ion-label class="tab-label">Tasks</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="completed" href="/tabs/completed">
          <ion-icon aria-hidden="true" :icon="checkmarkDoneOutline" />
          <ion-label class="tab-label">Completed</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon aria-hidden="true" :icon="settingsOutline" />
          <ion-label class="tab-label">Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { listOutline, checkmarkDoneOutline, settingsOutline } from 'ionicons/icons';
</script>

<style>
/* Import Inter Font for clean, modern typography */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Global Font Application */
  --ion-font-family: 'Inter', sans-serif;
  font-family: 'Inter', sans-serif;

  /* Modern Indigo & Slate Palette — Light mode */
  --bg-color: #f8fafc;       /* slate-50 */
  --card-bg: #ffffff;        /* white */
  --text-fg: #0f172a;        /* slate-900 */
  --text-muted: #64748b;     /* slate-500 */
  --primary: #6366f1;        /* indigo-500 */
  --border-muted: rgba(100, 116, 139, 0.2);
  --ion-color-danger: #ef4444; /* red-500 */
  --ion-color-primary: #6366f1;
}

/* Base Tailwind-like Utility Mapping for Vue */
.bg-background { background-color: var(--bg-color); }
.bg-card { background-color: var(--card-bg); }
.text-foreground { color: var(--text-fg); }
.text-muted { color: var(--text-muted); }
.text-primary { color: var(--primary); }
.border-muted\/30 { border-color: var(--border-muted); }

/* Overriding Ionic core variables for seamless dark mode */
body {
  --ion-background-color: var(--bg-color);
  --ion-text-color: var(--text-fg);
  background-color: var(--bg-color);
  color: var(--text-fg);
}

ion-toolbar {
  --background: var(--bg-color);
  --color: var(--text-fg);
}

.app-title {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
}

.ds-tab-bar {
  --background: var(--card-bg);
  border-top: 1px solid var(--border-muted);
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  padding-bottom: 8px; /* Safe area spacing */
  padding-top: 4px;
}

.tab-label {
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  margin-top: 4px;
  padding: 2px 6px;
}

/* Ensure selected tab uses the new primary color */
ion-tab-button[aria-selected="true"] {
  color: var(--primary);
}
</style>