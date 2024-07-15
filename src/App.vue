<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/edit">Edit</router-link> |
    <router-link to="/about">About</router-link>
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
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 90%;

  min-height: 95vh;
  margin: 5vh auto 0 auto;
  backdrop-filter: blur(15px);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
