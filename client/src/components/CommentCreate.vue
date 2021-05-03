<template>
  <div class="row ">
    <div class="col q-pl-xl q-mt-sm q-ml-md border-left">
      <q-input v-model="details" placeholder="Write a comment" outlined dense>
        <template v-slot:append>
          <q-btn
            @click="$emit('click-create-comment', details)"
            label="Reply"
            type="submit"
            color="primary"
            flat
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentCreate',
  data() {
    return {
      details: ''
    }
  }
}
</script>

<style></style>
