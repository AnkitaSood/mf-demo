<script setup lang="ts">
import { computed } from 'vue'
import { SHIRTS } from '../data'

const props = defineProps<{
  id: string
}>()

const shirt = computed(() => SHIRTS.find(s => s.id === props.id))

function back() {
  window.history.pushState({}, '', '/vue/products')
  window.dispatchEvent(new PopStateEvent('popstate'))
}
</script>

<template>
  <div v-if="shirt" class="va-card va-card--info">
    <div class="va-header" style="margin-bottom: 2rem;">
      <div class="va-logo" style="font-size: 4rem;">{{ shirt.image }}</div>
      <div>
        <h1 class="va-title">{{ shirt.name }}</h1>
        <p class="va-subtitle">Pokemon Shirt #{{ shirt.id }}</p>
      </div>
    </div>
    
    <div class="va-grid">
      <div class="va-card">
        <h2 class="va-card__title">Description</h2>
        <p class="va-card__desc">{{ shirt.description }}</p>
      </div>
      
      <div class="va-card">
        <h2 class="va-card__title">Details</h2>
        <dl class="va-dl">
          <dt>Price</dt><dd>${{ shirt.price }}</dd>
          <dt>Material</dt><dd>{{ shirt.material }}</dd>
          <dt>Sizes</dt><dd>{{ shirt.sizeRange }}</dd>
        </dl>
      </div>
    </div>
    
    <button 
      class="va-btn va-btn--primary" 
      style="margin-top: 2rem; align-self: flex-start;"
      @click="back"
    >
      ← Back to Shirts
    </button>
  </div>
  <div v-else class="va-card">
    Shirt not found
  </div>
</template>
