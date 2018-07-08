<template>
    <div id="inspire">
        <v-app>
            
            <v-content>
                <v-container grid-list-md text-xs-center>
                    <!-- 搜索框 -->
                    <v-card>
                        <v-layout row wrap>
                            <v-flex xs>
                                <v-card-text flat>
                                    <v-text-field
                                        clearable
                                        hint="For example,ironman"
                                        persistent-hint
                                        color="purple lighten-2"
                                        label="Search Titles"
                                        append-icon="search"
                                        v-model="query"
                                        @keypress.enter="searchTitles(query)"
                                        >
                                    </v-text-field>
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-container>
                <!-- 表格 -->
                <v-container>
                    <v-layout>
                        <v-flex>
                            <v-data-table
                                :headers="headers"
                                :items="newItems"                
                                hide-actions
                                item-key="TConst"
                                :loading="loading"
                                >
                                <!-- 表格内容 -->
                                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                                    <template slot="items" slot-scope="props">
                                        <tr @click="expanded(props)" >
                                            <td>{{ props.item.PrimaryTitle }}</td>
                                            <td class="text-xs-center" > <a :href=" 'https://www.imdb.com/title/' + props.item.TConst" target="_blank"> {{ props.item.TConst }}</a> </td>
                                            <td class="text-xs-center">{{ props.item.TitleType }}</td>
                                            <td class="text-xs-center">{{ props.item.IsAdult }}</td>
                                            <td class="text-xs-left">{{ props.item.OriginalTitle }}</td>
                                            <td class="text-xs-center">{{ props.item.StartYear }}</td>
                                            <td class="text-xs-center">{{ props.item.EndYear }}</td>
                                            <td class="text-xs-center">{{ props.item.RuntimeMinutes }}</td>
                                            <td class="text-xs-left">{{ props.item.Genres }}</td>
                                        </tr>
                                    </template>
                                    <!-- Expand content -->
                                    <template slot="expand" slot-scope="props">                                        
                                        <v-card xs8 >                                            
                                            <template>
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
                                                        </template>
                                                </v-data-table>
                                                <!-- Expand table end -->
                                            </template>
                                        </v-card>
                                    </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>
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
      query: '',
      querys: [],
      principals_data: [],
      expand_id: -1,
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
        { text: 'Genres', value: 'Genres.String', sortable: false }
            
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
        { text: 'Characters', value: 'Characters', sortable: false, align: 'center' }
      ]
    }
  },

  methods: {
    //   principals messages
    expanded (props) {
      props.expanded = !props.expanded
      this.expand_id = props.item.Id
      this.getPrincipals()
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

    searchTitles (query) {
      this.loading = true
      if (query === '') {
        this.axios.get('http://localhost:2333/api/v1/search/titles')
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
        this.axios.get('http://localhost:2333/api/v1/search/titles?q=' + query)
          .then(response => {
            this.querys = response.data
            this.pagination.pages = response.data.total_page
            this.pagination.page = response.data.cur_page
            console.log(this.pagination.page)
            console.log(response)
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
          })
      }
    },
    // 翻页
    next () { 
      //  console.log("Page =")
      //  console.log(this.pagination.page)
      this.loading = true
      this.axios.get('http://localhost:2333/api/v1/search/titles?q=' + this.query + '&page=' + this.pagination.page)
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

    // computed principals
    principals () {
      let data = this.principals_data.data
      console.log(data)
      if (data != null) {
        for (let key in data) {
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

<style scoped>

</style>
