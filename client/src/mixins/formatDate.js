export const formatDate = {
  data() {
    return {
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  },
  methods: {
    localDate(date) {
      return (date = new Date(date).toLocaleDateString('en-US', this.options))
    }
  }
}
