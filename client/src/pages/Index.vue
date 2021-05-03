<template>
  <q-page padding class="q-pa-xl">
    <q-ajax-bar color="lime-14" ref="postsLoadingBar" size="5px" skip-hijack />

    <!-- create post -->
    <PostCreate v-if="user.username" />

    <!-- post -->
    <Post v-for="post in post.posts" :key="post._id" :post="post" />
  </q-page>
</template>

<script>
import PostCreate from 'components/PostCreate.vue'
import Post from 'components/Post.vue'
import { mapState } from 'vuex'

export default {
  name: 'PageIndex',
  components: { PostCreate, Post },
  mounted() {
    this.$store.dispatch('post/getPosts', this.$refs.postsLoadingBar)
  },
  computed: {
    ...mapState(['post', 'user'])
  }
}
</script>
