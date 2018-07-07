<template>
  <div id="inspire">
    <v-app>

      <v-content>
        <!-- search box start -->
        <v-container grid-list-md text-xs-center>
          <v-card>
            <v-layout row wrap>
              <v-flex>
                <v-card-text flat>
                  <v-text-field
                    clearable
                    hint="For example,tt000001"
                    persistent-hint
                    color="purple lighten-2"
                    placeholder="Please Input id or tconst of a movie"
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
        <!-- CURD part -->
        <v-container grid-list-md text-xs-center>
          <v-toolbar flat color="green">
            <v-toolbar-title>CRUD Titles</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
             <v-spacer></v-spacer>
             <v-dialog v-model="dialog" max-width="500px">
               <v-btn slot="activator" color="primary" dark class="mb-2">New Title</v-btn>
               <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <!--  -->
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.primary_title" label="Movie name"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.tconst" label="tconst"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.title_type" label="Moive type"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.is_adult" label="adult"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.original_title" label="Movie original name"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.start_year" label="start year"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.end_year" label="end year"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.runtime_minutes" label="Movie time"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.genres" label="Movie fenlei"></v-text-field>
                      </v-flex>
                      <!--  -->
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
          <!-- the main data table -->
          <v-data-table
            :headers="headers"
            :items="newItems"                
            hide-actions
            item-key="TConst"
            :loading="loading"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="props">
                  <tr @click="expanded(props)" >
                      <td>{{ props.item.PrimaryTitle }}</td>
                      <td class="text-xs-right" > <a :href=" 'https://www.imdb.com/title/' + props.item.TConst" > {{ props.item.TConst }}</a> </td>
                      <td class="text-xs-right">{{ props.item.TitleType }}</td>
                      <td class="text-xs-right">{{ props.item.IsAdult }}</td>
                      <td class="text-xs-center">{{ props.item.OriginalTitle }}</td>
                      <td class="text-xs-right">{{ props.item.StartYear }}</td>
                      <td class="text-xs-right">{{ props.item.EndYear }}</td>
                      <td class="text-xs-center">{{ props.item.RuntimeMinutes }}</td>
                      <td class="text-xs-left">{{ props.item.Genres }}</td>
                            
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
                <!-- expand -->
                <template slot="expand" slot-scope="props">
                  <!-- curd  -->
                  <!-- 内层 dialog -->
                  <v-dialog v-model="dialogch" max-width="500px">
                    <v-btn slot="activator" color="primary" dark class="mb-2">New Principals</v-btn>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <!--  -->
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                              <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItemch.tconst" label="tconst"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItemch.ordering" label="ordering"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItemch.nconst" label="nconst"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItemch.category" label="category"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItemch.job" label="job"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItemch.characters" label="characters"></v-text-field>
                              </v-flex>     
                          </v-layout>
                        </v-container>
                      </v-card-text>
                      <!-- the principals save and cancel -->
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="closech">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="savech">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!--  -->
                  <template>
                  <!-- 内层 data table -->
                    <v-data-table dark
                      :headers="principals_headers"
                      :items="principals"
                      :loading="details_loading"
                      class="elevation-1"
                      >
                      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                        <template slot="items" slot-scope="principal_props">
                            <td>{{ principal_props.item.Ordering }}</td>
                            <td class="text-xs-center">{{ principal_props.item.PrimaryName }}</td>
                            <td class="text-xs-center">{{ principal_props.item.Category }}</td>
                            <td class="text-xs-center">{{ principal_props.item.Job }}</td>
                            <td class="text-xs-center">{{ principal_props.item.Characters }}</td>

                            <td class="justify-center layout px-0">
                              <v-btn icon class="mx-0" @click="editItemch(principal_props.item)">
                                  <v-icon color="teal">edit</v-icon>
                              </v-btn>
                              <v-btn icon class="mx-0" @click="deleteItemch(principal_props.item)">
                                  <v-icon color="pink">delete</v-icon>
                              </v-btn>
                            </td>
                        </template>
                    </v-data-table>
                  </template>
                  <!--  -->
                </template>
          </v-data-table>
          <!--  -->
        </v-container>
        <!-- pagination -->
        <v-container align-end>
          <div class="text-xs-center">
              <v-pagination v-model="pagination.page" :length="pagination.pages" @input="next" :total-visible="15" color="red" 
              ></v-pagination>
          </div>
        </v-container>
      </v-content>
      <!-- footer -->
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
      dialogch: false,
      editedIndex: -1,
      editedItem: {},
      editedItemch: {},
      
      principals_data: {},
      expand_id: -1,
      expand_tconst: '',      

      query: '',
      querys: [],
      single: null,
      pagination: {
        page: 1,
        pages: 0
      },
      loading: false,
      details_loading: false,
      headers: [
        {
          text: 'Movie Name',
          align: 'left',
          sortable: false,
          value: 'PrimaryTitle.String'
        },
        { text: 'TConst', value: 'TConst.String', sortable: false },
        { text: 'TitleType', value: 'TitleType.String', sortable: false },
        { text: 'IsAdult', value: 'IsAdult.Bool', sortable: false },
        { text: 'OriginalTitle', value: 'OriginalTitle.String', sortable: false },
        { text: 'StartYear', value: 'StartYear.Int64', sortable: false },
        { text: 'EndYear', value: 'EndYear.Int64', sortable: false },
        { text: 'RuntimeMinutes', value: 'RuntimeMinutes.Int64', sortable: false },
        { text: 'Genres', value: 'Genres.String', sortable: false },
        { text: 'Actions', value: 'name', sortable: false }
            
      ],

      principals_headers: [
        {
          text: 'Ordering',
          align: 'center',
          sortable: false,
          value: 'Ordering'
        },
        { text: 'Primary Name', value: 'PrimaryName', sortable: false, align: 'center' },
        { text: 'Category', value: 'Category', sortable: false, align: 'center' },
        { text: 'Job', value: 'Job', sortable: false, align: 'center' },
        { text: 'Characters', value: 'Characters', sortable: false, align: 'center' },
        { text: 'Actions', value: 'name', sortable: false }
      ]
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },

    dialogch (val) {
      if (val) {
        this.editedItemch.tconst = this.expand_tconst
      }
      val || this.closech()
    }
  },

  methods: {
    expanded (props) {
      props.expanded = !props.expanded
      this.expand_id = props.item.Id
      this.expand_tconst = props.item.TConst
      this.getPrincipals()
    },

    editItemch (item) {
      // principals
      this.editedIndex = item.Id
      this.editedItemch = item
      this.editedItemch.tconst = this.editedItemch.TConst
      // this.editedItem.tconst = this.query //id -> tconst
      this.editedItemch.ordering = this.editedItemch.Ordering
      this.editedItemch.nconst = this.editedItemch.NConst
      this.editedItemch.category = this.editedItemch.Category
      this.editedItemch.job = this.editedItemch.Job
      this.editedItemch.characters = this.editedItemch.Characters
           
      this.dialogch = true
    },

    deleteItemch (item) {
      const index = item.Id
      confirm('Are you sure you want to delete this item?')
      this.axios.delete('http://localhost:2333/api/v1/principals/' + index)
    },

    closech () {
      this.dialogch = false
      setTimeout(() => {
        this.editedItemch = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    savech () {
      if (this.editedItemch.hasOwnProperty('ordering')) {
        this.editedItemch.ordering = parseInt(this.editedItemch.ordering)
      }            

      if (this.editedIndex > -1) { // update
        this.loading = true
        this.axios.put('http://localhost:2333/api/v1/principals/' + this.editedIndex, this.editedItemch)
          .then((response) => {
            this.loading = false
            this.editedItemch = response.data
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })            
      } else { // create
        this.loading = true
        this.axios.post('http://localhost:2333/api/v1/principals/', this.editedItemch)
          .then((response) => {
            this.loading = false
            this.editedItemch = response.data
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      }
      this.closech()
    },
    getPrincipals () {
      this.details_loading = true
      this.axios.get('http://localhost:2333/api/v1/titles/' + this.expand_id + '/details')
        .then(response => {
          this.principals_data = response.data
          console.log(response)
          this.details_loading = false
        })
        .catch(err => {
          console.log(err)
          this.details_loading = false
        })
    },
    // principals part end
    editItem (item) {
      this.editedIndex = item.Id
      this.editedItem = item
      this.editedItem.primary_title = this.editedItem.PrimaryTitle
      this.editedItem.tconst = this.editedItem.TConst
      this.editedItem.title_type = this.editedItem.TitleType
      this.editedItem.is_adult = this.editedItem.IsAdult
      this.editedItem.original_title = this.editedItem.OriginalTitle
      this.editedItem.start_year = this.editedItem.StartYear
      this.editedItem.end_year = this.editedItem.EndYear
      this.editedItem.runtime_minutes = this.editedItem.RuntimeMinutes
      this.editedItem.genres = this.editedItem.Genres

      this.dialog = true
    },
    deleteItem (item) {
      const index = item.Id
      confirm('Are you sure you want to delete this item?')
      this.axios.delete('http://localhost:2333/api/v1/titles/' + index)            
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedItem.hasOwnProperty('start_year')) {
        this.editedItem.start_year = parseInt(this.editedItem.start_year)
      }
      if (this.editedItem.hasOwnProperty('end_year')) {
        this.editedItem.end_year = parseInt(this.editedItem.end_year)
      }
      if (this.editedItem.hasOwnProperty('runtime_minutes')) {
        this.editedItem.runtime_minutes = parseInt(this.editedItem.runtime_minutes)
      }
      if (this.editedItem.hasOwnProperty('is_adult')) {
        if (this.editedItem.is_adult === 'true' || this.editedItem.is_adult === '1') {
          this.editedItem.is_adult = true
        } else {
          this.editedItem.is_adult = false
        }
      }

      if (this.editedIndex > -1) { // update
        this.loading = true
        this.axios.put('http://localhost:2333/api/v1/titles/' + this.editedIndex, this.editedItem)
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
        this.axios.post('http://localhost:2333/api/v1/titles', this.editedItem)
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
        this.axios.get('http://localhost:2333/api/v1/titles')
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
        this.axios.get('http://localhost:2333/api/v1/titles/' + query)
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
    // pagination function
    next () {
    //  console.log("Page =")
    //  console.log(this.pagination.page)
      this.loading = true
      this.axios.get('http://localhost:2333/api/v1/titles?page=' + this.pagination.page)
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
          if (data[key].PrimaryTitle.Valid) {
            data[key].PrimaryTitle = data[key].PrimaryTitle.String
          } else {
            data[key].PrimaryTitle = ''
          }
          if (data[key].TConst.Valid) {
            data[key].TConst = data[key].TConst.String
          } else {
            data[key].TConst = ''
          }
          if (data[key].TitleType.Valid) {
            data[key].TitleType = data[key].TitleType.String
          } else {
            data[key].TitleType = ''
          }
          if (data[key].IsAdult.Valid) {
            data[key].IsAdult = data[key].IsAdult.Bool
          } else {
            data[key].IsAdult = ''
          }
          if (data[key].OriginalTitle.Valid) {
            data[key].OriginalTitle = data[key].OriginalTitle.String
          } else {
            data[key].OriginalTitle = ''
          }
          if (data[key].StartYear.Valid) {
            data[key].StartYear = data[key].StartYear.Int64
          } else {
            data[key].StartYear = ''
          }
          if (data[key].EndYear.Valid) {
            data[key].EndYear = data[key].EndYear.Int64
          } else {
            data[key].EndYear = ''
          }
          if (data[key].RuntimeMinutes.Valid) {
            data[key].RuntimeMinutes = data[key].RuntimeMinutes.Int64
          } else {
            data[key].RuntimeMinutes = ''
          }
          if (data[key].Genres.Valid) {
            data[key].Genres = data[key].Genres.String
          } else {
            data[key].Genres = ''
          }
        }
      } else {
        data = []
      }
      console.log(data)
      return data
    },

    principals () {
      let data = this.principals_data.data
      console.log(data)
      if (data != null) {
        for (let key in data) {
          if (data[key].Id.Valid) {
            data[key].Id = data[key].Id.Int64
          } else {
            data[key].Id = 0
          }
          if (data[key].PrimaryName.Valid) {
            data[key].PrimaryName = data[key].PrimaryName.String
          } else {
            data[key].PrimaryName = ''
          }
          if (data[key].Category.Valid) {
            data[key].Category = data[key].Category.String
          } else {
            data[key].Category = ''
          }
          if (data[key].Ordering.Valid) {
            data[key].Ordering = data[key].Ordering.Int64
          } else {
            data[key].Ordering = ''
          }
          if (data[key].Job.Valid) {
            data[key].Job = data[key].Job.String
          } else {
            data[key].Job = ''
          }
          if (data[key].Characters.Valid) {
            data[key].Characters = data[key].Characters.String
          } else {
            data[key].Characters = ''
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
