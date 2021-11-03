<template>
  <div class="hello">
    <v-container class="grey lighten-5">
      <v-row>
        <v-btn @click="pickOne()" color="pink" fixed top right fab dark>
          <v-badge color="green" :content="allMovies.length">
            <v-icon>mdi-crystal-ball</v-icon>
          </v-badge>
        </v-btn>
      </v-row>

      <v-row v-show="isPicked && stop" v-cloak>
        <v-col>
          <v-card>
            <v-img
              :src="randomElement.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              @click.stop="dialog = true"
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

        <v-dialog persistent v-model="dialog">
          <v-card elevation="2">
            <v-card-title class="text-h6" v-show="stop"
              >Do you agree?</v-card-title
            >
            <v-card-text v-text="randomElement.title" v-show="stop">
            </v-card-text>

            <v-card-text v-show="!stop">
              <flip-countdown
                :deadline="dateTimer"
                :showDays="false"
                :showHours="false"
                :stop="stop"
                @timeElapsed="timeElapsedHandler"
                v-show="!stop"
              ></flip-countdown>
            </v-card-text>

            <v-card-text v-show="stop">
              <v-slider
                class="mt-10"
                v-show="stop"
                v-model="minutesDown"
                prepend-icon="mdi-alarm"
                thumb-color="red"
                thumb-label="always"
                max="3"
                min="1"
                step="0.5"
              ></v-slider>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="red darken-1"
                text
                @click="dialog = false"
                v-show="stop"
              >
                Disagree
              </v-btn>

              <v-btn
                class="white--text"
                color="green darken-1"
                depressed
                @click="selectIt(randomElement.id)"
                v-show="stop"
              >
                Agree
              </v-btn>

              <v-btn
                class="white--text"
                color="error"
                depressed
                @click="
                  stop = true;
                  end = false;
                "
                v-show="!stop && !end"
              >
                Stop
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-show="end && !stop" color="red">
            <v-card-title class="white--text">Time is up!</v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="white--text"
                color="error"
                depressed
                @click="closeTimer()"
                v-show="end"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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

            <v-card-actions v-show="movie.overview != ''">
              <v-btn
                color="orange lighten-2"
                text
                @click="movie.show = !movie.show"
              >
                Explore
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="movie.show = !movie.show">
                <v-icon>{{
                  movie.show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
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
import FlipCountdown from "vue2-flip-countdown";

export default {
  name: "HelloWorld",
  data() {
    return {
      randomElement: {},
      dialog: false,
      dateTimer: "2021-12-01 00:00:00",
      stop: true,
      end: false,
      audioFile: new Audio(
        "https://www.soundjay.com/misc/fail-trombone-02.mp3"
      ),
      minutesDown: 1,
    };
  },
  components: { FlipCountdown },
  methods: {
    ...mapActions(["fetchLocalMovies", "toggleView", "selectMovie"]),
    pickOne() {
      this.randomElement =
        this.allMovies[Math.floor(Math.random() * this.allMovies.length)];
      this.toggleView(true);
    },
    selectIt(id) {
      this.selectMovie(id);
      const date = new Date(new Date().getTime() + this.minutesDown * 60000);
      let newDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      this.stop = false;
      this.end = false;
      this.dateTimer = newDate;
      this.overlay = true;
    },
    closeTimer() {
      this.audioFile.pause();
      this.dialog = false;
      this.stop = true;
      this.end = false;
      this.overlay = false;
    },
    timeElapsedHandler() {
      //this.stop = true;
      this.end = true;
      this.audioFile.muted = false;
      this.audioFile.play();
    },
    fetchAllLocalMovies() {
      this.toggleView(false);
      this.fetchLocalMovies();
    },
  },
  computed: mapGetters(["allMovies", "isPicked"]),
  created() {
    this.fetchAllLocalMovies();
    this.audioFile.muted = true;
    this.audioFile.play();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
[v-cloak] {
  display: none;
}
</style>
