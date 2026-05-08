<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const todos = ref<string[]>([])
const input = ref('')

function addTodo() {
  if (input.value.trim()) {
    todos.value.push(input.value.trim())
    input.value = ''
  }
}

function removeTodo(i: number) {
  todos.value.splice(i, 1)
}
</script>

<template>
  <div class="va-root">
    <header class="va-header">
      <div class="va-logo">💚</div>
      <div>
        <h1 class="va-title">Vue Micro-Frontend</h1>
        <p class="va-subtitle">Loaded via <code>loadRemote('vue_app/App')</code></p>
      </div>
    </header>

    <div class="va-grid">
      <!-- Counter card -->
      <div class="va-card">
        <h2 class="va-card__title">Reactive Counter</h2>
        <p class="va-card__desc">Vue's reactivity running inside the Angular shell</p>
        <div class="va-counter">
          <button id="vue-decrement" class="va-btn va-btn--ghost" @click="count--">−</button>
          <span class="va-counter__value">{{ count }}</span>
          <button id="vue-increment" class="va-btn va-btn--ghost" @click="count++">+</button>
        </div>
        <button id="vue-reset" class="va-btn va-btn--sm" @click="count = 0">Reset</button>
      </div>

      <!-- Todo card -->
      <div class="va-card">
        <h2 class="va-card__title">Mini To-Do List</h2>
        <p class="va-card__desc">Stateful Vue list — isolated from the shell</p>
        <div class="va-input-row">
          <input
            id="vue-todo-input"
            v-model="input"
            class="va-input"
            placeholder="Add a task…"
            @keydown.enter="addTodo"
          />
          <button id="vue-todo-add" class="va-btn va-btn--primary" @click="addTodo">Add</button>
        </div>
        <ul class="va-todos">
          <li
            v-for="(todo, i) in todos"
            :key="i"
            class="va-todo"
          >
            <span>{{ todo }}</span>
            <button class="va-todo__remove" @click="removeTodo(i)">✕</button>
          </li>
          <li v-if="todos.length === 0" class="va-todo va-todo--empty">
            No tasks yet
          </li>
        </ul>
      </div>

      <!-- Info card -->
      <div class="va-card va-card--info">
        <h2 class="va-card__title">Remote Info</h2>
        <dl class="va-dl">
          <dt>Name</dt><dd>vue_app</dd>
          <dt>Exposed</dt><dd>./App → mfe-entry.ts</dd>
          <dt>Manifest</dt><dd>http://localhost:3001/mf-manifest.json</dd>
          <dt>Shared</dt><dd>vue (singleton)</dd>
          <dt>Plugin</dt><dd>@module-federation/vite</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@700;800&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

.va-root {
  background: #0d1a12;
  min-height: 100%;
  padding: 2rem;
  color: #e2f4ec;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Header */
.va-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.va-logo {
  font-size: 3rem;
  line-height: 1;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { filter: drop-shadow(0 0 12px rgba(66, 184, 131, 0.4)); }
  50%       { filter: drop-shadow(0 0 24px rgba(66, 184, 131, 0.8)); }
}

.va-title {
  font-family: 'Inter Tight', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #42b883;
  margin-bottom: 0.25rem;
}

.va-subtitle {
  font-size: 0.875rem;
  color: #5c8a74;
}

.va-subtitle code {
  background: #142b1e;
  border: 1px solid #1e4030;
  border-radius: 4px;
  padding: 0.1em 0.4em;
  font-size: 0.8125rem;
  color: #42b883;
}

/* Grid */
.va-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .va-grid { grid-template-columns: 1fr; }
}

.va-card--info {
  grid-column: 1 / -1;
}

/* Card */
.va-card {
  background: #111d16;
  border: 1px solid #1e3329;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.va-card:hover {
  border-color: rgba(66, 184, 131, 0.3);
  box-shadow: 0 4px 24px rgba(66, 184, 131, 0.06);
}

.va-card__title {
  font-family: 'Inter Tight', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #e2f4ec;
}

.va-card__desc {
  font-size: 0.875rem;
  color: #5c8a74;
}

/* Counter */
.va-counter {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin: 0.5rem 0;
}

.va-counter__value {
  font-family: 'Inter Tight', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: #42b883;
  min-width: 3ch;
  text-align: center;
}

/* Buttons */
.va-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  font-family: inherit;
}

.va-btn--ghost {
  background: #142b1e;
  color: #e2f4ec;
  border-color: #1e3329;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  font-size: 1.25rem;
}

.va-btn--ghost:hover {
  background: rgba(66, 184, 131, 0.15);
  border-color: rgba(66, 184, 131, 0.3);
  color: #42b883;
}

.va-btn--sm {
  background: #142b1e;
  color: #5c8a74;
  border-color: #1e3329;
  font-size: 0.8125rem;
  padding: 0.375rem 0.875rem;
  align-self: flex-start;
}

.va-btn--primary {
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
  border-color: rgba(66, 184, 131, 0.3);
}

.va-btn--primary:hover {
  background: rgba(66, 184, 131, 0.25);
}

/* Input */
.va-input-row {
  display: flex;
  gap: 0.5rem;
}

.va-input {
  flex: 1;
  background: #142b1e;
  border: 1px solid #1e3329;
  border-radius: 6px;
  padding: 0.5rem 0.875rem;
  color: #e2f4ec;
  font-size: 0.9375rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.va-input:focus {
  border-color: rgba(66, 184, 131, 0.4);
}

.va-input::placeholder {
  color: #3a6a52;
}

/* Todos */
.va-todos {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.va-todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #142b1e;
  border: 1px solid #1e3329;
  border-radius: 6px;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
}

.va-todo--empty {
  color: #3a6a52;
  justify-content: center;
}

.va-todo__remove {
  background: none;
  border: none;
  color: #3a6a52;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}

.va-todo__remove:hover {
  color: #f87171;
  background: rgba(248, 113, 113, 0.1);
}

/* DL info table */
.va-dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1.5rem;
  font-size: 0.875rem;
}

.va-dl dt {
  color: #5c8a74;
  font-weight: 500;
}

.va-dl dd {
  color: #e2f4ec;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  word-break: break-all;
}
</style>
