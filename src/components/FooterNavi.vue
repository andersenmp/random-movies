<template>
  <div >
    
    <v-bottom-navigation
          v-model="value"
          :background-color="color"
          dark
          grow
          absolute
        >
      
      <v-btn  @click="fetchAllLocalMovies()" class="mt-2"> 
          <span>Movies</span>

          <v-icon>mdi-filmstrip</v-icon>
      </v-btn>
      
      <v-btn  @click="fetchAllLocalTv()" class="mt-2" >  
          <span>TV</span>

          <v-icon>mdi-popcorn</v-icon>
       </v-btn>

    </v-bottom-navigation>

  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
// @ is an alias to /src
export default {
  data(){
    return {
      value: 0
    };
  },
  methods: {
    ...mapActions(["fetchLocalTv","fetchLocalMovies", "toggleView"]),
    fetchAllLocalTv(){
      this.toggleView(false);
      this.fetchLocalTv();
    },
    fetchAllLocalMovies(){
      this.toggleView(false);
      this.fetchLocalMovies();
    },
  },
  
  computed: {
    ...mapGetters(["allMovies","isPicked"]),
    color () {
      switch (this.value) {
        case 0: return 'pink'
        case 1: return 'indigo'
        default: return 'pink'
      }
    },
  },
  
}
</script>
