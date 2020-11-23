<template>
  <div class="home">
    <img alt="Vue logo" :src="photoURL" class="rounded topspace">
    <h1>Bienvenido <span class="capitalizar">{{ displayName }}</span></h1>
    <h4>{{ email }}</h4>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase';

export default {
  name: 'Home',
  data() {
    return {
      photoURL: '',
      displayName: '',
      email: ''
    }
  },
  created() {
    const user = firebase.auth().currentUser;
    this.displayName = user.displayName;
    this.email = user.email;
    this.photoURL = user.photoURL; 
  }
}
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 50%
}

.topspace {
  margin-top: 2rem;
}

.capitalizar {
  text-transform: capitalize;
}
</style>