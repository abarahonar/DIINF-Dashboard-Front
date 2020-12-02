<template>
<div class="LandingAdmin">
  <NabBarUser v-bind:photoURL="photoURL" v-bind:displayName="displayName"
     />
    <v-container class="grey lighten-6">
    
    <v-app id="generalPage">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        
        md="8"
      >
      <br><br>
      <h1>Aplicaciones del sistema </h1>
      
      
        <v-card
          v-scroll.self
          class="overflow-y"
          
    
          outlined
          tile
          height = 428px
          max-width = 760px 
          
        >
        <v-card-text>

         <v-row dense>   
          <v-col
          v-for="a in apps"
          :key="a.name"
          :cols= 4
        >

          <v-card 
          outlined
          max-width = 260px >
          <br>
          
           {{ a.name }}<br>
          <v-btn
              color=#EA7600
              fab
              x-small
              dark
              @click="goto(a.url)"
            >
              <v-icon>mdi-note</v-icon>
            </v-btn>
            <a :href="a.url">
            <v-btn
              color=#EA7600
              fab
              x-small
              dark
            >
              <v-icon>mdi-wrench</v-icon>
            </v-btn>
            </a>

          <br><br>
          </v-card>
          
         
         
         </v-col>                 
          </v-row>
         
          
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
      
      
     
        <br><br><br><br>
         
        


         <v-divider></v-divider><br>
          
          
              <div class="textblock">
            Lorem Ipsum is simply dummy text of the printingase of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versionsf the printing and  of Lorem Ipsum.
<br>
            Lorem Ipsum  is simply dummy text of the printingase of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versionsf the printing and  of Lorem Ipsum.
<br><br><br>
      <v-btn
            class="ma-2"
            color=#002F6C
            dark
          >
            Gestion Usuarios
          </v-btn>
<br><br><br><br>
<v-divider></v-divider><br>
        </div>

          

         <br>
         

          
         
      </v-col>
    </v-row>
    </v-app>
  </v-container>
</div>
</template>

<script>
import firebase from 'firebase';
import axios from "axios";
import NabBarUser from '@/components/NabBarUser.vue'


export default {
  name: 'Home',
  components: {
        //MenuUser,
        NabBarUser
  },
  data() {
    return {
      apps: [],
      flex: '3',
      photoURL: '',
      displayName: '',
      email: '',
      aplicaciones: [
        {
          nombre: 'Aplicacion 1', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 2', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 3', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/icone-youtube-branco-png-6.png'
        },
        {
          nombre: 'Aplicacion 4', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 5', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 6', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 7', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 8', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 9', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 10', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        },
        {
          nombre: 'Aplicacion 11', logo: 'UWU', direccion: 'http://vaibs.com.mx/wp-content/uploads/2020/05/mail.png'
        }
        
      ],
      
    }
  },
  created() {
    const user = firebase.auth().currentUser;
    this.displayName = user.displayName;
    this.email = user.email;
    this.photoURL = user.photoURL; 
  },
    mounted () {
    axios.get('http://localhost:80/list-apps',
    ).then(response => this.apps = response.data);
  },
    methods: {
        goto(item) {
            this.item = item;
            this.$router.push({path: item});
            
            
        },
    }

    
}

</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 50%
}

.topspace {
  margin-top: 2rem;
  margin-bottom: -15px;
}

.capitalizar {
  text-transform: capitalize;
}

.size{
  height: 25px;
  width: 25px;
}

.overflow-y{
  overflow-y: auto;
}
</style>
