<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white q-px-lg">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="text-white">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
            </q-avatar>
            {{ siteName }}
          </router-link>
        </q-toolbar-title>

        <q-btn
          v-if="!registered"
          dense
          flat
          icon="login"
          label="Enter"
          @click="prompt = true"
        />
        <q-btn
          v-else
          dense
          flat
          icon="logout"
          label="Quit"
          @click="quitSession"
        />
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="right" side="right" overlay elevated :width="230">
      <q-list>
        <MenuLink v-for="link in links" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer> -->

    <!-- register modal -->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your Username</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="username" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            @click.prevent="enterSession"
            flat
            label="Enter"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <div class="text-center q-pa-sm">&copy; RAF 2021</div>
    </q-footer>
  </q-layout>
</template>

<script>
// import MenuLink from 'components/MenuLink.vue'

// const links = [{ title: 'Register', icon: 'login', toLink: '/register' }]

export default {
  name: 'MainLayout',
  // components: {},

  data() {
    return {
      siteName: 'MicroBlog',
      prompt: false,
      username: '',
      registered: false
      // links,
      // right: false
    }
  },
  computed: {},
  methods: {
    setRegistered() {
      this.registered = this.$q.localStorage.has('username')
    },
    enterSession() {
      this.$store
        .dispatch('user/enterSession', this.username)
        .then(res => {
          this.setRegistered()
          this.$q.notify('Entered into system!')
        })
        .catch(err =>
          this.$q.notify(
            err.response ? err.response.data.message : err.toString()
          )
        )
    },
    quitSession() {
      this.$store.dispatch('user/quitSession')
      this.registered = false
      this.$q.notify('Left the system!')
    }
  },
  mounted() {
    this.setRegistered()
  }
}
</script>
