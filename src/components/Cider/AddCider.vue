<template>
  <v-container>
    <v-layout row wrap class="mb-4">
      <v-flex xs12>
        <h3 class="primary--text align-center">Add a new type of Cider</h3>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
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
                name="developer"
                label="Developer"
                id="Developer"
                required
                v-model="developer">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="alcohol"
                label="Alcohol"
                id="Alcohol"
                required
                v-model="alcohol">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                name="flavour"
                :items="flavourType"
                label="Flavour"
                single-line
                autocomplete
                v-model="flavour">
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                name="sugarType"
                :items="sugarType"
                label="Cider type"
                single-line
                autocomplete
                v-model="type">
              </v-select>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                name="containerType"
                :items="containerType"
                label="Container"
                single-line
                autocomplete
                v-model="container">
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="photo"
                label="Photo url"
                id="Photo"
                required
                v-model="photoUrl">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="size"
                label="Size, l"
                id="Size"
                required
                v-model="size">
              </v-text-field>
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
                     type="submit"
                     @click="onAddCider"
                     router-link to="/addcider"
              >Add Cider
              </v-btn>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {containerType, flavourType, sugarType} from '../../shared/types'

  export default {
    name: 'AddCider',
    methods: {
      onAddCider() {
        let data = {
          title: this.title,
          developer: this.developer,
          alcohol: this.alcohol,
          flavour: this.flavour,
          type: this.type,
          description: this.description,
          size: this.size,
          container: this.container,
          photoUrl: this.photoUrl,
          shops: []
        }
        console.log(data)
        this.$store.dispatch('addCider', data)
      },
    },
    data() {
      return {
        title: '',
        developer: '',
        alcohol: '',
        flavour: '',
        type: '',
        description: '',
        size: '',
        container: '',
        photoUrl: '',
        flavourType: flavourType,
        containerType: containerType,
        sugarType: sugarType,
      }
    },
  }
</script>

<style scoped>

</style>
