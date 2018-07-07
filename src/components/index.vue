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
        <!-- flow button -->
        <v-container align-end >
            <v-layout >
                <v-flex xs7 offset-xs5 >
                    <v-speed-dial right absolute >
                        <!-- first button -->
                        <v-btn slot="activator" fab color="red" large>
                        CURD
                        </v-btn>
                        <!-- second button -->
                            <v-btn fab dark color="green" to='/curdtitles'>
                                T
                            </v-btn>
                            <v-btn fab dark color="green" to='/curdnames'>
                                N
                            </v-btn>
                            <v-btn fab dark color="indigo" to='/curdprincipals'>
                                P
                            </v-btn>
                    </v-speed-dial>
                </v-flex>
            </v-layout>
        </v-container>

        <router-view></router-view>
        </v-app>
    </div>
</template>

<script>
export default{

}
</script>

<style scoped>

.test.card{
    margin: 0 auto;
    max-width: 600px;
    width: 100%
}

</style>
