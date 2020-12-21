<template>
  <v-app>
 <!--    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-icon
         class="shrink mr-2"
         :style="onLine ? '' : 'color:red;' "
          transition="scale-transition"
          width="40">
          mdi-movie-open-outline
        </v-icon>
        <h3 v-show="!onLine" style="color:red">Offline</h3>
      </div>
   

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.themoviedb.org/"
        target="_blank"
        text
      >
        <span class="mr-2"></span>
        <v-img
          max-width="50"          
          transition="scale-transition"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        ></v-img>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <Home />

      <v-snackbar app
        v-model="snackWithButtons"
        top
        centered
        timeout="-1"
      >
         {{ snackWithBtnText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            color="#00f500"
            v-bind="attrs"
            @click.stop="refreshApp"
          >
            {{ snackBtnText }}
           <v-icon>mdi-update</v-icon>
          
          </v-btn>
          <v-btn
            icon
            color="red"
            @click="snackWithButtons = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>

    </v-main>
    <v-footer app>
      <FooterNavi />
    </v-footer>
  </v-app>
</template>

<script>
import FooterNavi from '@/components/FooterNavi';
import Home from '@/views/Home';


export default {
  name: 'App',
  components: {
    Home,
    FooterNavi
  },
  data(){
    return {
      onLine: navigator.onLine,
      refreshing: false,
      registration: null,
      snackBtnText: '',
      snackWithBtnText: '',
      snackWithButtons: false,
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
    }
  },
  methods:{
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === 'online';
    },
      showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackBtnText = 'Update';
      this.snackWithBtnText = 'New version available!';
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    },
    
  },
  mounted(){
    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);

  },
  beforeDestroy() {
    window.removeEventListener('online',  this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },
};
</script>
