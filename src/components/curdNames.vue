<template>
  <div id="inspire">
    <v-app>

      <v-content>
        <!-- 搜索框 -->
        <v-container grid-list-md text-xs-center>
          <v-card>
            <v-layout row wrap>
              <v-flex>
                <v-card-text flat>
                  <v-text-field
                    clearable
                    hint="For example,nm00034"
                    persistent-hint
                    color="purple lighten-2"
                    placeholder="Please Input id or nconst"
                    append-icon="search"
                    v-model="query"
                    @keypress.enter="thepage(query)"
                  >

                  </v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
        <!-- search box end -->
        <!-- CURD part start -->
        <v-container grid-list-md text-xs-center>
          <!-- <v-layout md> -->
            <v-toolbar flat color="blue">
              <v-toolbar-title>CRUD Names</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">New names</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <!--  -->
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.primary_name" label="actor name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.nconst" label="nconst"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.birth_year" label="birth_year"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.death_year" label="death_year"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.primary_profession" label="primary_profession"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.known_for_titles" label="known_for_titles"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <!-- save and cancel -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <!-- data table -->            
              <v-data-table
                :headers="headers"
                :items="newItems"
                hide-actions
                item-key="NConst"
                :loading="loading"
              >
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                  <template slot="items" slot-scope="props">
                      <tr @click="props.expanded = !props.expanded" >
                          <td>{{ props.item.PrimaryName }}</td>
                          <td class="text-xs-left" > <a :href=" 'https://www.imdb.com/name/' + props.item.NConst" target="_blank"> {{ props.item.NConst }}</a> </td>
                          <td class="text-xs-center">{{ props.item.BirthYear }}</td>
                          <td class="text-xs-center">{{ props.item.DeathYear }}</td>
                          <td class="text-xs-left">{{ props.item.PrimaryProfession }}</td>
                          <td class="text-xs-left">{{ props.item.KnownForTitles }}</td>

                          <td class="justify-center layout px-0">
                              <v-btn icon class="mx-0" @click="editItem(props.item)">
                                  <v-icon color="teal">edit</v-icon>
                              </v-btn>
                              <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                  <v-icon color="pink">delete</v-icon>
                              </v-btn>
                          </td>                        
                      </tr>
                  </template>   
            </v-data-table>
        </v-container>
        <!-- pagination -->
        <v-container align-end>
          <div class="text-xs-center">
              <v-pagination v-model="pagination.page" :length="pagination.pages" @input="next" :total-visible="15" color="blue" 
              ></v-pagination>
          </div>
        </v-container>
      </v-content>
      <!-- fonter -->
      <v-footer height="auto" class="grey darken-3">
        <v-layout row wrap justify-center>                
          <v-btn color="white" flat to="/">
            Home
          </v-btn>
          <v-flex xs12 py-3 text-xs-center white--text >
             &copy;2018 — <strong>zzz</strong>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: [],
      defaultItem: [],

      query: '',
      querys: [],
      pagination: {
        page: 1,
        pages: 0
      },
      loading: false,
      headers: [
        {
          text: 'Actor Name',
          align: 'left',
          sortable: false,
          value: 'PrimaryName.String'
        },
        { text: 'NConst', value: 'NConst.String', sortable: false },
        { text: 'BirthYear', value: 'BirthYear.Int64', sortable: false },
        { text: 'DeathYear', value: 'DeathYear.Int64', sortable: false },
        { text: 'PrimaryProfession', value: 'PrimaryProfession.String', sortable: false },
        { text: 'KnownForTitles', value: 'KnownForTitles.String', sortable: false },
        { text: 'Actions', value: 'name', sortable: false }
            
      ]
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = item.Id
      console.log('Current id = ' + this.editedIndex)
      this.editedItem = item
      this.editedItem.nconst = this.editedItem.NConst
      this.editedItem.primary_name = this.editedItem.PrimaryName
      this.editedItem.birth_year = this.editedItem.BirthYear
      this.editedItem.death_year = this.editedItem.DeathYear
      this.editedItem.primary_profession = this.editedItem.PrimaryProfession
      this.editedItem.known_for_titles = this.editedItem.KnownForTitles
      // console.log(this.editedItem.nconst)

      console.log(this.editedItem)
      this.dialog = true
    },

    deleteItem (item) {
      const index = item.Id
      confirm('Are you sure you want to delete this item?')
      this.axios.delete('http://localhost:2333/api/v1/names/' + index)            
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      // Manipulate numbers 
      if (this.editedItem.hasOwnProperty('birth_year')) {
        this.editedItem.birth_year = parseInt(this.editedItem.birth_year)
      }
      if (this.editedItem.hasOwnProperty('death_year')) {
        this.editedItem.death_year = parseInt(this.editedItem.death_year)
      }

      if (this.editedIndex > -1) { // update
        this.loading = true
        this.axios.put('http://localhost:2333/api/v1/names/' + this.editedIndex, this.editedItem)
          .then((response) => {
            this.loading = false
            this.editedItem = response.data
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })            
      } else { // create
        this.loading = true
        this.axios.post('http://localhost:2333/api/v1/names', this.editedItem)
          .then((response) => {
            this.loading = false
            this.editedItem = response.data
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      }
      this.close()
    },

    thepage (query) {
      this.loading = true
      if (query === '') { // get titles
        this.axios.get('http://localhost:2333/api/v1/names')
          .then(response => {
            this.querys = response.data
            this.pagination.pages = response.data.total_page
            this.pagination.page = response.data.cur_page
            this.loading = false
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      } else { // get a title
        this.axios.get('http://localhost:2333/api/v1/names/' + query)
          .then(response => {
            this.single = response.data.data
            this.querys = {}
            this.querys.data = []
            this.querys.data.push(this.single)
            this.pagination.pages = 0
            this.pagination.page = 1
            this.loading = false
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    // pagination funciton
    next () {
      //  console.log("Page =")
      //  console.log(this.pagination.page)
      this.loading = true
      this.axios.get('http://localhost:2333/api/v1/names?page=' + this.pagination.page)
        .then(response => {
          this.querys = response.data
          this.pagination.pages = response.data.total_page
          this.pagination.page = response.data.cur_page
          this.loading = false
          console.log(this.pagination.page)
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    newItems () {
      let data = this.querys.data
      console.log(data)
      if (data != null) {
        for (let key in data) {
          if (data[key].Id.Valid) {
            data[key].Id = data[key].Id.Int64
          } else {
            data[key].Id = ''
          }
          if (data[key].PrimaryName.Valid) {
            data[key].PrimaryName = data[key].PrimaryName.String
          } else {
            data[key].PrimaryName = ''
          }
          if (data[key].NConst.Valid) {
            data[key].NConst = data[key].NConst.String
          } else {
            data[key].NConst = ''
          }
          if (data[key].BirthYear.Valid) {
            data[key].BirthYear = data[key].BirthYear.Int64
          } else {
            data[key].BirthYear = ''
          }
          if (data[key].DeathYear.Valid) {
            data[key].DeathYear = data[key].DeathYear.Int64
          } else {
            data[key].DeathYear = ''
          }
          if (data[key].PrimaryProfession.Valid) {
            data[key].PrimaryProfession = data[key].PrimaryProfession.String
          } else {
            data[key].PrimaryProfession = ''
          }
          if (data[key].KnownForTitles.Valid) {
            data[key].KnownForTitles = data[key].KnownForTitles.String
          } else {
            data[key].KnownForTitles = ''
          }
        }
      } else {
        data = []
      }                                   
      console.log(data)
      return data
    }
  }
}
</script>
