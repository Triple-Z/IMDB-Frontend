<template>
  <div id="inspire">
    <v-app>

      <v-content>
        <v-container>
          <!-- 搜索框 -->
          <v-card>
            <v-layout row wrap>
              <v-flex xs10>
                <v-card-text flat>
                  <v-text-field
                    clearable                    
                    color="purple lighten-2" 
                    class="input-group--focused" 
                    label="Advanced Search"
                    placeholder="Advanced Search Names........"                             
                    v-model="query"
                  >

                  </v-text-field>
                </v-card-text>
              </v-flex>
              <!-- search button -->
              <v-flex xs2 >
                <v-card-text>
                  <v-btn color="green" flat @click="advancedSearch()" >
                    <v-icon>search</v-icon>
                  </v-btn>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
          <!-- advanced search expandpanl -->
          <!-- <v-card></v-card> -->
            <v-expansion-panel popout>
              <v-expansion-panel-content>
                <div slot="header">AdvancedSearch</div>
                <v-card>
                  <v-layout>
                    <v-flex xs3>
                      <v-card-text flat>
                        <v-text-field
                          color="red"
                          clearable 
                          placeholder="input nconst"    
                          v-model="nconst"
                        >

                        </v-text-field>
                      </v-card-text>
                    </v-flex>
                    <!--  -->
                    <v-flex xs3>
                      <v-card-text flat>
                        <v-text-field                                                                
                          clearable
                          placeholder="birthYearStart"    
                          v-model="birthYearStart"                            
                          >
                          </v-text-field>
                        </v-card-text>
                    </v-flex>
                    <!--  -->
                    <v-flex xs3>
                      <v-card-text flat>
                        <v-text-field                                                                
                          clearable 
                          placeholder="birthYearEnd"    
                          v-model="birthYearEnd"                            
                          >
                          </v-text-field>
                      </v-card-text>
                    </v-flex>
                    <!--  -->
                    <v-flex xs3>
                      <v-card-text flat>
                        <v-text-field                                                                
                          clearable
                          placeholder="deathYearStart"    
                          v-model="deathYearStart"                            
                          >
                            </v-text-field>
                        </v-card-text>
                    </v-flex>
                    <!--  -->
                    <v-flex xs3>
                      <v-card-text flat>
                        <v-text-field                                                                
                          clearable
                          placeholder="deathYearEnd"    
                          v-model="deathYearEnd"                            
                          >
                            </v-text-field>
                        </v-card-text>
                    </v-flex>
                    <!--  -->
                  </v-layout>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
        </v-container>
        <!-- table part -->
        <v-container>
          <v-data-table
            :headers="headers"
            :items="newItems"                
            hide-actions
            item-key="NConst"
            :loading="loading"
          >            
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="props">
                  <tr @click="expanded(props)" >
                    <td>{{ props.item.PrimaryName }}</td>
                    <td class="text-xs-left" > <a :href=" 'https://www.imdb.com/name/' + props.item.NConst" > {{ props.item.NConst }}</a> </td>
                    <td class="text-xs-center">{{ props.item.BirthYear }}</td>
                    <td class="text-xs-center">{{ props.item.DeathYear }}</td>
                    <td class="text-xs-left">{{ props.item.PrimaryProfession }}</td>
                    <td class="text-xs-left">{{ props.item.KnownForTitles }}</td>  
                  </tr>
              </template>              
          </v-data-table>
        </v-container>
        <!-- pagination -->
        <v-container align-end >
          <div class="text-xs-center" >
            <v-pagination v-model="pagination.page" :length="pagination.pages" @input="next" :total-visible="15" color="red"></v-pagination>
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
      nconst: '',           
      birthYearStart: '',
      birthYearEnd: '',
      deathYearStart: '',
      deathYearEnd: '',

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
        { text: 'KnownForTitles', value: 'KnownForTitles.String', sortable: false }
            
      ]
    }
  },

  methods: {

    advancedSearch () {
      this.loading = true
      if (this.query === '' && this.nconst === '' && this.birthYearStart === '' &&
            this.birthYearEnd === '' && this.deathYearStart === '' && this.deathYearEnd === '') {
        this.axios.get('http://localhost:2333/api/v1/advanced_search/names')
          .then(response => {
            this.querys = response.data
            this.pagination.pages = response.data.total_page
            this.pagination.page = response.data.cur_page
            console.log(response)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      } else if (this.nconst !== '') {
        this.axios.get('http://localhost:2333/api/v1/advanced_search/names', {
          params: {
            nconst: this.nconst
          }
        })
          .then(response => {
            this.querys = response.data
            this.pagination.pages = response.data.total_page
            this.pagination.page = response.data.cur_page
            console.log(response)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      } else {
        this.axios.get('http://localhost:2333/api/v1/advanced_search/names', {
          params: {
            q: this.query,
            nconst: this.nconst,
            birthYearStart: this.birthYearStart,
            birthYearEnd: this.birthYearEnd,
            deathYearStart: this.deathYearStart,
            deathYearEnd: this.deathYearEnd

          }
        })
          .then(response => {
            this.querys = response.data
            this.pagination.pages = response.data.total_page
            this.pagination.page = response.data.cur_page
            console.log(response)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      }
    },

    // pagination function
    next () {
      //  console.log("Page =")
      //  console.log(this.pagination.page)
      this.loading = true
      this.axios.get('http://localhost:2333/api/v1/advanced_search/names', {
        params: {
          q: this.query,
          nconst: this.nconst,
          birthYearStart: this.birthYearStart,
          birthYearEnd: this.birthYearEnd,
          deathYearStart: this.deathYearStart,
          deathYearEnd: this.deathYearEnd,
          page: this.pagination.page
        }
      })
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
    newItems () {
      let data = this.querys.data
      console.log(data)
      if (data != null) {
        for (let key in data) {
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
