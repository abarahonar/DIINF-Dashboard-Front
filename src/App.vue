<template>
  <div id="app">
    

    <div id="nav">
    </div>
    <router-view/>
  </div>

</template>


<style lang="scss">

#app {
  //overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#general{
  padding: 30px;
}
#right{
  text-align: right; 
}
#textblock{
  padding: 25px;
  text-align: justify; 
}
p{
  text-align: justify;
  padding: 11px;
}
</style>

