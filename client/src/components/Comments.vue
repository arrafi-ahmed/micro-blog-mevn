<template>
  <div>
    <!-- Create Comment -->
    <CommentCreate v-if="user.username" @click-create-comment="createComment" />

    <!-- Comment -->
    <div v-if="comments.length > 0">
      <Comment
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
      />
    </div>
    <div v-else class="text-center q-pt-sm">
      <q-chip color="red" text-color="white">No comments yet!</q-chip>
    </div>
  </div>
</template>

<script>
import CommentCreate from 'components/CommentCreate.vue'
import Comment from 'components/Comment.vue'
import PostService from '../service/post'
import CommentService from '../service/comment'
import { mapState } from 'vuex'

export default {
  name: 'Comments',
  props: ['postId'],
  components: { CommentCreate, Comment },
  data() {
    return {
      comments: []
    }
  },
  mounted() {
    PostService.getComments(this.postId)
      .then(res => {
        if (res.data.comments) {
          this.comments = res.data.comments
        }
      })
      .catch(err => {
        this.$q.notify(
          err.response ? err.response.data.message : err.toString()
        )
      })
  },
  methods: {
    createComment(commentDetails) {
      const commentData = {
        details: commentDetails,
        post_id: this.$props.postId,
        user_id: this.user.userId
      }
      CommentService.createComment(commentData)
        .then(res => {
          this.comments.unshift(res.data.comment)
          commentDetails = null
        })
        .catch(err => {
          this.$q.notify(
            err.response ? err.response.data.message : err.toString()
          )
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style></style>
