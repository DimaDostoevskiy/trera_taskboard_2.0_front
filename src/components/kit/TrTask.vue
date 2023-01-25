<template>
  <div class="task">
    <div class="task-name">
      Task Header
    </div>
    <div class="task-summery">
      task-summery task-summery task-summery task-summery task-summery
      task-summery task-summery task-summery task-summery task-summery
    </div>
    <div class="task-description">
      task-description task-description task-description task-description
      task-description task-description task-description task-description
      task-description task-description task-description
    </div>
    <div class="task-footer">
      Task Footer
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>

.task {
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: 100%;
  height: fit-content;
  border-radius: 8px;
  background-color: rgb(42,42,42);
}

.task-name {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
}

.task-summery {
}

.task-description {
}

.task-footer {
  margin: 12px auto;
  height: 16px;
}
</style>