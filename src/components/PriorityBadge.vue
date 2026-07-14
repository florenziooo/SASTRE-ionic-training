<template>
  <ion-badge :color="color" class="p-1 tracking-wider">{{ label }}</ion-badge>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonBadge } from '@ionic/vue';

const props = defineProps<{ priority: 'low' | 'medium' | 'high' }>();

const COLORS = { low: 'success', medium: 'warning', high: 'danger' } as const;

const color = computed(() => COLORS[props.priority]);
const label = computed(() => props.priority.toUpperCase());
</script>
