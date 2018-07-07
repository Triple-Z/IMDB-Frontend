<template>
    <div>
        <v-app>
        <v-container  >
            <v-layout>
                <v-flex>
                <v-card  >
                    <v-card-media src="https://s1.ax1x.com/2018/06/21/PSJayd.png" height="300px"   >
                        
                    </v-card-media>
                </v-card>
                </v-flex>
                <!-- background logo -->
            </v-layout>
            <v-layout wrap >
                <!-- Search titles names card -->
                    <v-flex xs12 sm6 >
                        <v-card to="/searchTitles">
                            <v-card-text>
                                SearchTitles
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 >
                    <v-card to="/searchNames">
                        <v-card-text  >
                            SearchNames
                        </v-card-text>
                    </v-card>
                    </v-flex>
                <!-- AdvancedSearch titles names card -->
                    <v-flex xs12 sm6 >
                        <v-card to="/advancedsearchtitles">
                            <v-card-text>
                                AdvancedSearchTitles
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 >
                        <v-card to="/advancedsearchnames">
                            <v-card-text  >
                                AdvancedSearchNames
                            </v-card-text>
                        </v-card>
                    </v-flex>
            </v-layout>
        </v-container>
        
        <v-container align-end>
            <v-layout row >
                <v-flex xs1 offset-xs12>
                    <v-dialog v-model="dialog" width="500">
                        <v-btn slot="activator" color="red lighten-2" dark fab> CURD </v-btn>
                        <v-card>
                            <v-card-title class="headline grey lighten-2" primary-title>
                                Notice
                            </v-card-title>

                            <v-card-text>
                                This function is not supported yet due to the security reason. Please wait for the next update.
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue" flat @click="dialog = false">
                                    I Know
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-flex>
            </v-layout>
        </v-container>
        <router-view></router-view>
        </v-app>
    </div>
</template>

<script>
export default{
  data () {
    return {
      dialog: false
    }
  }

}
</script>

<style scoped>

.test.card{
    margin: 0 auto;
    max-width: 600px;
    width: 100%
}

</style>
