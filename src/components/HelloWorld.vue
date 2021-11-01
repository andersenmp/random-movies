<template>
  <div class="hello">
    <v-container class="grey lighten-5">
      <v-row>
        <v-btn @click="pickOne()" color="pink" fixed right fab dark>
          <v-icon>mdi-crystal-ball</v-icon>
        </v-btn>
      </v-row>

      <v-row v-show="isPicked" v-cloak>
        <v-col>
          <v-card>
            <v-img
              :src="randomElement.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
            </v-img>
            <v-card-title v-text="randomElement.title"></v-card-title>
            <v-card-subtitle
              v-text="randomElement.original_title"
            ></v-card-subtitle>
            <div v-show="randomElement.overview != ''">
              <v-divider></v-divider>
              <v-card-text>
                {{ randomElement.overview }}
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row
        v-show="!isPicked"
        v-for="movie in allMovies"
        :key="movie.id"
        v-cloak
      >
        <v-col>
          <v-card>
            <v-img
              :src="movie.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
            </v-img>
            <v-card-title v-text="movie.title"></v-card-title>
            <v-card-subtitle v-text="movie.original_title"></v-card-subtitle>

                  <v-card-actions
                  v-show="movie.overview != ''">
                  <v-btn
                    color="orange lighten-2"
                    text
                    @click="movie.show = !movie.show"
                  >
                    Explore
                  </v-btn>
      
                  <v-spacer></v-spacer>
            
                  <v-btn
                    icon
                    @click="movie.show = !movie.show"
                  >
                    <v-icon>{{ movie.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>
            
                <v-expand-transition>
                  <div v-show="movie.show">
                    <v-divider></v-divider>
                    <v-card-text>
                      {{ movie.overview }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      randomElement: {},
    };
  },
  methods: {
    ...mapActions(["fetchBoxOffice", "toggleView"]),
    pickOne() {
      this.randomElement = this.allMovies[
        Math.floor(Math.random() * this.allMovies.length)
      ];
      this.toggleView(true);
    },
    fetchAllLocalBoxOffice() {
      this.toggleView(false);
      this.fetchBoxOffice();
    },
  },
  computed: mapGetters(["allMovies", "isPicked"]),
  created() {
    this.fetchAllLocalBoxOffice();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
[v-cloak] {
  display: none;
}
</style>
