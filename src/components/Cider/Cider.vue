<template>
  <v-container v-if="ciderData">
    <v-layout row wrap class="mb-4">
      <v-flex xs3>
        <v-avatar
          :tile=false
          :size="256"
          color="grey lighten-4"
        >
          <img :src="ciderPhoto" alt="avatar">
        </v-avatar>
      </v-flex>

      <v-flex xs9>
        <v-card>
          <v-card-title><h4>{{ciderTitle}}</h4></v-card-title>
          <v-list dense>
            <v-list-tile v-for="(value, name) in ciderPreview" :key="name">
              <v-list-tile-content>{{name}}</v-list-tile-content>
              <v-list-tile-action>{{value}}</v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <!--Описание-->
    <v-layout class="mb-4">
      <v-flex xs12>
        {{ciderDescription}}
      </v-flex>
    </v-layout>

    <v-layout row flex class="mb-4">
      <v-flex xs3 class="mr-4">
        <v-select
          :items="loadedShops()"
          label="Select shop"
          v-model="addShop_shop"
          single-line
          autocomplete
        ></v-select>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          label="Cost"
          v-model="addShop_cost">
        </v-text-field>
      </v-flex>

      <v-flex>
        <v-btn color="success" @click="addShop(addShop_shop, addShop_cost)">
          Add
        </v-btn>
      </v-flex>
    </v-layout>


    <v-layout row flex>
      <v-flex xs12>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="loadedShopsForThisCider"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.shopId }}</td>
              <td class="text-xs-left">{{ props.item.cost }}</td>

            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {

    name: 'Cider',
    props: {
      id: {
        type: String,
      },
    },
    methods: {
      addShop(shop, cost) {
        this.$store.dispatch('addShopForThisCider',
          {
            ciderId: this.id,
            shop: {
              shopId: shop,
              cost: parseInt(cost),
            },
          });
        this.addShop_shop = '';
        this.addShop_cost = '';
      },
      loadedShops() {
        return this.$store.getters.loadedShops
      },
    },
    computed: {
      ciderData() {
        return this.$store.getters.ciderData(this.id)
      },
      ciderPreview() {
        return {
            'Производитель': this.ciderData['developer'],
            'Вкус': this.ciderData['flavour'],
            'Тара': this.ciderData['container'],
            'Объем': this.ciderData['size'],
            'Тип': this.ciderData['type'],
          }
      },
      ciderTitle() {
        return this.ciderData['title']
      },
      ciderDescription() {
        return this.ciderData['description']
      },
      ciderPhoto() {
        return this.ciderData['photoUrl']
      },
      loadedShopsForThisCider() {
        return this.ciderData['shops']
      },
    },
    created() {
      // this.$store.dispatch('getShopForThisCider', this.id)
      // this.$store.dispatch('getCider', this.id)
    },
    data() {
      return {
        headers: [
          {
            text: 'Магазин',
            align: 'left',
            sortable: true,
            value: 'shopId',
          },
          {
            sortable: true,
            text: 'Стоимость',
            value: 'cost',
          },
        ],
        addShop_shop: '',
        addShop_cost: '',

      }
    },

  }
</script>

<style scoped>

</style>
