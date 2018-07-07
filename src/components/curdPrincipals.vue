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
                    hint="For example,3295656"
                    persistent-hint
                    color="purple lighten-2"
                    placeholder="Please Input id ..."
                    append-icon="search"
                    v-model="query"
                    @keypress.enter="getprincipals(query)"
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
          <v-toolbar flat color="red">
            <v-toolbar-title>CRUD Principals</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
              <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <!--  -->
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.ordering" label="ordering"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.tconst" label="tconst"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.nconst" label="nconst"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.category" label="category"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.job" label="job"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.characters" label="characters"></v-text-field>
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
            :headers="principals_headers"
            :items="principals"
            :loading="loading"
            class="elevation-1"
            hide-actions
            >
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.Ordering }}</td>
                  <td class="text-xs-center">{{ props.item.TConst }}</td>
                  <td class="text-xs-center">{{ props.item.NConst }}</td>
                  <td class="text-xs-center">{{ props.item.Category }}</td>
                  <td class="text-xs-center">{{ props.item.Job }}</td>
                  <td class="text-xs-center">{{ props.item.Characters }}</td>

                  <td class="justify-center layout px-0">
                      <v-btn icon class="mx-0" @click="editItem(props.item)">
                          <v-icon color="teal">edit</v-icon>
                      </v-btn>
                      <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                          <v-icon color="pink">delete</v-icon>
                      </v-btn>
                  </td>
                </template>
          </v-data-table>
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
      editedIndex: -1,
      editedItem: [],
      query: '',            
      querys: [],
      principals_data: [],
      single: null,
      loading: false,
      principals_headers: [
        {
          text: 'Ordering',
          align: 'center',
          sortable: false,
          value: 'Ordering'
        },
        { text: 'TConst', value: 'TConst', sortable: false, align: 'center' },
        { text: 'NConst', value: 'NConst', sortable: false, align: 'center' },
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
    }
  },

  methods: {
    editItem (item) {
      this.editedIndex = item.Id
      this.editedItem = item
      this.editedItem.ordering = this.editedItem.Ordering
      this.editedItem.tconst = this.editedItem.TConst
      this.editedItem.nconst = this.editedItem.NConst
      this.editedItem.category = this.editedItem.Category            
      this.editedItem.job = this.editedItem.Job
      this.editedItem.characters = this.editedItem.Characters
            
      this.dialog = true
    },
    deleteItem (item) {
      const index = item.Id
      confirm('Are you sure you want to delete this item?')
      this.axios.delete('http://localhost:2333/api/v1/principals/' + index)            
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedItem.hasOwnProperty('ordering')) {
        this.editedItem.ordering = parseInt(this.editedItem.ordering)
      }

      if (this.editedIndex > -1) { // update
        this.loading = true
        this.axios.put('http://localhost:2333/api/v1/principals/' + this.editedIndex, this.editedItem)
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
        this.axios.post('http://localhost:2333/api/v1/principals', this.editedItem)
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

    getprincipals (query) {          
      if (query === '') {
        alert('输入不能为空')
          .catch(err => {
            console.log(err)
          })
      } else {
        this.axios.get('http://localhost:2333/api/v1/principals/' + query)
          .then(response => {
            //    this.principals_data = response.data;
            this.single = response.data.data
            this.querys = {}
            this.querys.data = []
            this.querys.data.push(this.single)
            this.principals_data.push(this.querys.data)
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    principals () {
      let data = this.querys.data
      console.log(data)
      if (data != null) {
        for (let key in data) {                
          if (data[key].Category.Valid) {
            data[key].Category = data[key].Category.String
          } else {
            data[key].Category = ''
          }
          if (data[key].TConst.Valid) {
            data[key].TConst = data[key].TConst.String
          } else {
            data[key].TConst = ''
          }
          if (data[key].NConst.Valid) {
            data[key].NConst = data[key].NConst.String
          } else {
            data[key].NConst = ''
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
