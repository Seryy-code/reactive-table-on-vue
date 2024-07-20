<template>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/edit">Редактирование</router-link> |
    <router-link to="/about">Описание</router-link>
  </nav>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
body {
  background: url(./assets/bg.jpg) no-repeat fixed;
  background-size: cover;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  width: 90%;

  min-height: 80vh;
  padding-bottom: 50px;
  margin: 10vh auto 0 auto;
  backdrop-filter: blur(10px);
}

nav {
  text-align: left;
  padding: 30px;
}

nav a {
  outline: 2px solid;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px 10px;
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #8795b5;
}
</style>
