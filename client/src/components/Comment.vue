<template>
  <div class="row ">
    <div class="col q-pl-xl q-ml-md border-left">
      <q-card flat bordered class="q-mt-md">
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ getAvatar }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ getUsername }}</q-item-label>
            <q-item-label caption>{{
              localDate(comment.createdAt)
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-card-section>
          {{ comment.details }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../mixins/formatDate'

export default {
  name: 'Comment',
  mixins: [formatDate],
  props: ['comment'],
  computed: {
    getAvatar() {
      return this.getUsername[0].toUpperCase()
    },
    getUsername() {
      return this.comment.user_id.username
        ? this.comment.user_id.username
        : this.$q.localStorage.getItem('username')
    }
  }
}
</script>

<style></style>
