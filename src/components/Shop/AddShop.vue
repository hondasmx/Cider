<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h3 class="primary--text">Add a new Shop to database</h3>
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
                name="address"
                label="address"
                id="address"
                required
                v-model="address">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                name="region"
                label="region"
                id="region"
                :items="regions"
                autocomplete
                required
                v-model="region">
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                :items="shopType"
                label="Shop type"
                v-model="type">

              </v-select>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    name="openTime"
                    id="OpenTime"
                    label="Open time"
                    v-model="openTime">
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    name="closeTime"
                    id="CloseTime"
                    label="Close time"
                    v-model="closeTime">
                  </v-text-field>
                </v-flex>
              </v-layout>

            </v-flex>

          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary"
                     @click.prevent="onCreateShop"
              >Add shop
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {shopType, regions} from '@/shared/types';

  export default {
    name: 'AddShop',
    methods: {
      onCreateShop() {
        let data = {
          address: this.address,
          title: this.title,
          region: this.region,
          shopType: this.type,
          openTime: this.openTime,
          closeTime: this.closeTime,
        };
        this.$store.dispatch('addShop', data)
      },
    },
    data() {
      return {
        address: '',
        region: '',
        title: '',
        closeTime: '',
        openTime: '',
        type: '',
        shopType: shopType,
        regions: regions
      }
    },
  }
</script>

<style scoped>

</style>
