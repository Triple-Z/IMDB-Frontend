<template>
    <div id="inspire">
        <v-app>
            
            <v-content>
                <!-- 搜索框 -->
                <v-container grid-list-md text-xs-center>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex xs>
                                <v-card-text flat>
                                    <v-text-field
                                        clearable
                                        hint="For example,Tom"
                                        persistent-hint
                                        color="purple lighten-2"
                                        label="Search Names"
                                        append-icon="search"
                                        v-model="query"
                                        @keypress.enter="searchNames(query)"
                                        >
                                    </v-text-field>
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-container>
                <!-- 数据表格 -->
                <v-container>
                    <v-layout>
                        <v-flex>
                            <v-data-table
                                :headers="headers"
                                :items="newItems"
                                hide-actions
                                item-key="NConst"
                                :loading="loading"
                                >
                                <!-- 表格内容 -->
                                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                                    <template slot="items" slot-scope="props">
                                        <tr @click="props.expanded = !props.expanded" >
                                            <td>{{ props.item.PrimaryName }}</td>
                                            <td class="text-xs-left" > <a :href=" 'https://www.imdb.com/name/' + props.item.NConst" target="_blank"> {{ props.item.NConst }}</a> </td>
                                            <td class="text-xs-center">{{ props.item.BirthYear }}</td>
                                            <td class="text-xs-center">{{ props.item.DeathYear }}</td>
                                            <td class="text-xs-left">{{ props.item.PrimaryProfession }}</td>
                                            <td class="text-xs-left">{{ props.item.KnownForTitles }}</td>
                                        </tr>
                                    </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>
                </v-container>
                <!-- pagination -->
                <v-container align-end>
                    <div class="text-xs-center" >
                        <v-pagination v-model="pagination.page" :length="pagination.pages" @input="next" :total-visible="15" color="blue" 
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
    searchNames (query) {
      this.loading = true
      if (query === '') {
        this.axios.get('http://localhost:2333/api/v1/search/names')
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
      } else {
        this.axios.get('http://localhost:2333/api/v1/search/names?q=' + query)
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
      }
    },
    // pagination function
    next () {
    //  console.log("Page =")
    //  console.log(this.pagination.page)
      this.loading = true
      this.axios.get('http://localhost:2333/api/v1/search/names?q=' + this.query + '&page=' + this.pagination.page)
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
