<script setup lang="ts">
import { ref } from 'vue'
import { SHIRTS } from '../data'
import { getGlobalCounter } from '../shared-counter'

const quantities = ref<Record<string, number>>(
  Object.fromEntries(SHIRTS.map(s => [s.id, 1]))
)

function addToCart(id: string) {
  const qty = quantities.value[id] || 1
  const counter = getGlobalCounter()
  counter.set(counter.get() + qty)
}

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
</script>

<template>
  <div class="va-grid">
    <div v-for="shirt in SHIRTS" :key="shirt.id" class="va-card">
      <div class="va-logo" style="font-size: 3rem; margin-bottom: 1rem;">{{ shirt.image }}</div>
      <h2 class="va-card__title">{{ shirt.name }}</h2>
      <p class="va-card__desc">{{ shirt.description }}</p>
      <div style="font-size: 1.25rem; font-weight: 800; margin: 1rem 0; color: var(--va-accent);">
        ${{ shirt.price }}
      </div>
      
      <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: auto;">
        <input
          v-model.number="quantities[shirt.id]"
          type="number"
          min="1"
          class="va-input"
          style="width: 70px;"
        />
        <button 
          class="va-btn va-btn--primary" 
          style="flex: 1;" 
          @click="addToCart(shirt.id)"
        >
          Add to Cart
        </button>
      </div>
      <div style="text-align: center; margin-top: 0.5rem;">
        <button 
          class="va-btn va-btn--sm" 
          style="font-size: 0.8125rem; align-self: center;"
          @click="navigate(`/vue/product-details/${shirt.id}`)"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>
