<template>
  <div class="navbar">
    <div class="project-list">
      <div class="project-item">project 1</div>
      <div class="project-item">project 2</div>
      <div class="project-item">project 3</div>
    </div>
    <div class="current-user">
      current@user.ru
      <img class="gear" src="../assets/images/gear.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 20px 0;
}
.project-list {
  display: flex;
  justify-content: flex-start;
  padding: 8px;
  height: 50px;
  width: 100%;
  border-radius: 8px;
  background-color: var(--color-bg-board);
}
.project-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 8px 0 0;
  padding: 8px;
  min-width: 140px;
  height: 35px;
  border-radius: 8px;
  background-color: #f3f3f3;
}
.current-user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  right: 0;
  margin: 0 8px;
  padding: 8px;
  min-width: fit-content;
  height: 50px;
  border-radius: 8px;
  background-color: #f3f3f3;
}
.gear {
  margin: 0 8px;
}
</style>
