<script setup lang="ts">
import { ref } from 'vue'
import { SHIRTS } from '../data'
import { getGlobalCounter } from '../shared-counter'
import { navigate } from '../location'

const quantities = ref<Record<string, number>>(
  Object.fromEntries(SHIRTS.map(s => [s.id, 1]))
)

function addToCart(id: string) {
  const qty = quantities.value[id] || 1
  const counter = getGlobalCounter()
  counter.set(counter.get() + qty)
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

      <div class="va-card__actions">
        <input
          v-model.number="quantities[shirt.id]"
          type="number"
          min="1"
          class="va-input"
          style="width: 70px;"
        />

        <div class="va-card__buttons">
          <button
            class="va-btn va-btn--primary va-btn--block"
            @click="addToCart(shirt.id)"
          >
            Add to Cart
          </button>
          <button
            class="va-btn va-btn--sm va-btn--block"
            @click="navigate(`/vue/product-details/${shirt.id}`)"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
