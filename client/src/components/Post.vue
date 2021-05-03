<template>
  <div class="row justify-center">
    <div class="col-md-11">
      <q-card flat bordered class="q-pa-md q-my-md">
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ getAvatar }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ getUsername }}</q-item-label>
            <q-item-label caption>{{ localDate(post.createdAt) }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-card-section>
          {{ post.details }}
        </q-card-section>

        <q-card-actions>
          <q-btn-group flat>
            <q-btn
              :disabled="clicked.upvote || !user.username"
              color="primary"
              flat
              @click.prevent="createUpvote"
            >
              <q-icon left name="thumb_up" />
              <div>{{ upvote_count }}</div>
            </q-btn>
            <q-btn
              :disabled="clicked.downvote || !user.username"
              color="negative"
              flat
              @click.prevent="createDownvote"
            >
              <q-icon left name="thumb_down" />
              <div>{{ downvote_count }}</div>
            </q-btn>
            <q-btn
              color="blue-grey"
              outlined
              flat
              icon="comment"
              @click.prevent="openComments"
            />
          </q-btn-group>
        </q-card-actions>

        <!-- comments -->
        <Comments v-if="showComments" :postId="post._id" />
      </q-card>
    </div>
  </div>
</template>

<script>
import PostService from '../service/post'
import Comments from 'components/Comments.vue'
import { formatDate } from '../mixins/formatDate'
import { mapState } from 'vuex'

export default {
  name: 'Post',
  props: ['post'],
  components: { Comments },
  mixins: [formatDate],
  data() {
    return {
      clicked: { upvote: false, downvote: false },
      showComments: false,
      upvote_count: this.$props.post.upvote_count,
      downvote_count: this.$props.post.downvote_count
    }
  },
  computed: {
    getAvatar() {
      return this.getUsername[0].toUpperCase()
    },
    getUsername() {
      return this.post.user.username
        ? this.post.user.username
        : this.$q.localStorage.getItem('username')
    },
    ...mapState(['user'])
  },
  methods: {
    openComments() {
      this.showComments = !this.showComments
    },
    createUpvote() {
      if (this.clicked.upvote) return
      this.upvote_count += 1

      const upvoteData = {
        postId: this.$props.post._id,
        userId: this.$q.localStorage.getItem('userId')
      }
      PostService.createUpvote(upvoteData)
        .then(res => {
          this.clicked = { upvote: true, downvote: false }

          if (res.data.changeDownvote) {
            this.downvote_count -= 1
          }
          this.$q.notify(res.data.message)
        })
        .catch(err => {
          this.upvote_count -= 1
          this.$q.notify(
            err.response ? err.response.data.message : err.toString()
          )
        })
    },
    createDownvote() {
      if (this.clicked.downvote) return
      this.downvote_count += 1
      const downvoteData = {
        postId: this.$props.post._id,
        userId: this.$q.localStorage.getItem('userId')
      }
      PostService.createDownvote(downvoteData)
        .then(res => {
          this.clicked = { downvote: true, upvote: false }

          if (res.data.changeUpvote) {
            this.upvote_count -= 1
          }
          this.$q.notify(res.data.message)
        })
        .catch(err => {
          this.downvote_count -= 1
          this.$q.notify(
            err.response ? err.response.data.message : err.toString()
          )
        })
    }
  }
}
</script>

<style></style>
