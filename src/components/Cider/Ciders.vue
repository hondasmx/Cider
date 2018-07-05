<template>
  <v-container>
    <v-layout row wrap class="mb-4 mr-1">
      <v-flex xs9>
        <v-card>
          <v-container

            fluid
            style="min-height: 0;"
            grid-list-lg
          >
            <v-layout row wrap>
              <v-flex xs12 v-for="(cider, index) in loadedCiders()" :key="index"
                      v-if="flavourFilter.includes(cider.flavour) && sugarTypeFilter.includes(cider.type)"
                      @click.prevent="onClickCider(cider.ciderId)"
                      style="cursor: pointer;"
              >
                <v-card class="white--text">
                  <v-container fluid grid-list-lg>
                    <v-layout row>
                      <v-flex xs7>
                        <div>
                          <div class="headline">{{cider.title}}</div>
                          <div>{{cider.flavour}} {{cider.type}} сидр</div>
                          <div>Алкоголь - {{cider.alcohol}}%</div>
                        </div>
                      </v-flex>
                      <v-flex xs5>
                        <v-avatar
                          :tile=false
                          :size="150"
                          color="grey lighten-4"
                        >
                          <img :src="cider.photoUrl" alt="avatar">
                        </v-avatar>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-container>
            <v-layout>
              <v-flex xs12>
                <div class="headline">Вкус</div>
                <v-card>
                  <div v-for="(f, index) in flavour">
                    <v-checkbox :label="f['name']" v-model="f['value']"></v-checkbox>
                  </div>
                </v-card>
                <div class="headline">Содержание сахара</div>
                <v-card>
                  <div v-for="(f, index) in sugarType">
                    <v-checkbox :label="f['name']" v-model="f['value']"></v-checkbox>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {flavourType, sugarType} from '@/shared/types';

  export default {
    name: 'Ciders',
    data() {
      return {
        flavours: flavourType,
        flavour: [],
        sugarType: [],
      }
    },
    computed: {
      flavourFilter() {
        let result = [];
        this.flavour.forEach(data => {
          if (data['value']) {
            result.push(data['name'])
          }
        });
        return result
      },
      sugarTypeFilter() {
        let result = [];
        this.sugarType.forEach(data => {
          if (data['value']) {
            result.push(data['name'])
          }
        });
        return result
      }
    },
    methods: {
      loadedCiders() {
        return this.$store.getters.loadedCiders
      },
      onCreateFlavour() {
        flavourType.forEach(data => {
          this.flavour.push({
            name: data,
            value: true,
          })
        })
      },
      onCreateCiderType() {
        sugarType.forEach(data => {
          this.sugarType.push({
            name: data,
            value: true,
          })
        })
      },
      onClickCider(ciderId) {
        this.$router.push("/cider/" + ciderId)
      }
    },
    created() {
      this.onCreateFlavour();
      this.onCreateCiderType();
    },
  }
</script>

<style scoped>

</style>
