<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h3 class="primary--text">Create a new Meetup</h3>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="Title"
                required
                v-model="title">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="Location"
                required
                v-model="location">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">Upload image</v-btn>
              <input
                type="file"
                style="display: none;"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="200px">
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="Description"
                required
                multi-line
                rows=5 v-model="description">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary"
                     :disabled="!formIsValid"
                     type="submit"
                     @click="onCreateMeetup"
                     router-link to="/meetups"
              >Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose Date + Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
              <p v-if="time != null">time - {{time}}</p>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import moment from 'moment'

  export default {

    name: 'CreateMeetup',
    data() {
      return {
        title: '',
        location: '',
        description: '',
        imageUrl: '',
        date: '',
        time: '11:14',
        image: null
      }
    },
    created: function () {
      const dateTime = moment()
      this.date = dateTime.format('YYYY-MM-DD')
      this.time = dateTime.format('HH:mm')
    },
    computed: {
      formIsValid() {
        return this.title !== ''
          && this.location !== ''
          && this.imageUrl !== ''
          && this.description !== ''
      },
      submittableDateTime() {
        const date = new Date(this.date)
        if (this.time != null) {
          date.setHours(this.time.match(/^(\d+)/)[0]);
          date.setMinutes(this.time.match(/\d+:(\d+)/)[1]);
        }
        return date
      },
    },
    methods: {
      onCreateMeetup() {
        const meetup = {
          location: this.location,
          image: this.image,
          imageUrl: this.imageUrl,
          description: this.description,
          title: this.title,
          date: this.submittableDateTime,
        };
        this.$store.dispatch('createMeetup', meetup);
      },
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(event) {
        const files = event.target.files;
        let fileName = files[0].name;
        if (fileName.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
    },
  }
</script>

<style scoped>

</style>
