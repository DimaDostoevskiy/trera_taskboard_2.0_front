<template>
  <nav class="navbar">
    <div class="navbar-panel">
      <div class="projects">
        <div class="project-item">project 1</div>
        <div class="project-item">project 2</div>
        <div class="project-item">project 3</div>
      </div>
      <div class="controls">
        <div class="btn-create-proj">Создать проект<img class="add" src="../assets/images/add.png" alt="add" /></div>
      </div>
    </div>
    <div class="current-user">
      current@user.ru
      <img class="gear" src="../assets/images/gear.png" alt="gear" />
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 25px 0;
}
.navbar-panel {
  display: flex;
  align-items: center;

  width: 100%;
  height: 64px;

  border-radius: 8px;
  background-color: var(--color-bg-board);
}
.projects {
  display: flex;
  justify-content: flex-start;
  padding: 0 0 0 12px;
  width: 100%;
  border-radius: 8px;
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
  background-color: var(--color-background-secondary);
  cursor: pointer;
}
.current-user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0 8px;
  padding: 12px 20px;
  height: 64px;
  min-width: fit-content;
  right: 0;
  border-radius: 8px;
  background-color: var(--color-bg-board);
}
.gear {
  margin: 0 8px;
}
.add {
  width:  24px;
  height: 24px;
}

.controls{
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  width: 100%;
}
.btn-create-proj{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 8px 0 0;
  padding: 8px;
  width: fit-content;
  height: 35px;
  border-radius: 8px;
  background-color: var(--color-background-secondary);
  cursor: pointer;

}

</style>
