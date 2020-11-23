<template>
  <div class="login">
      <h1>Sign in</h1>
      <button @click="login">Google</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data() {
        return {};
    },
    methods: {
        login: function() {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
                this.$router.replace('/home');
                console.log(result);
            }).catch((err) => {
                alert('Oops. ' + err.message);
            })
        }
    }
}
</script>

<style scoped>

</style>