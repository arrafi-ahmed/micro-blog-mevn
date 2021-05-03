<template>
  <div class="row justify-center">
    <div class="col-md-11">
      <q-card flat bordered class="q-pa-sm q-mb-md">
        <q-card-section>
          <q-input v-model="details" label="What's on your mind?" autogrow />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            class="q-px-sm"
            label="Post"
            color="primary"
            outline
            @click.prevent="createPost"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCreate',
  data() {
    return {
      details: ''
    }
  },
  methods: {
    createPost() {
      const post = {
        details: this.details,
        user: this.$q.localStorage.getItem('userId')
      }
      this.$store.dispatch('post/createPost', post)
      this.details = ''
    }
  }
}
</script>

<style></style>
