<template>
<div class="bg-lightBlue h-[100vh]">
    <div class="flex flex-col justify-center items-center h-[50vh] px-5 space-y-5">
        <p v-if="this.$store.state.deutsch" class="text-3xl font-bold text-center">Vielen Dank für Ihre Teilnahme an dieser Umfrage</p>
        <p v-if="this.$store.state.english" class="text-3xl font-bold text-center">Thank you for participating in this survey</p>
        <p v-if="this.$store.state.deutsch" class="lg:text-xl">Ihre Antworten wurden gespeichert</p>
        <p v-if="this.$store.state.english" class="lg:text-xl">Your answers have been saved</p>
    </div>
    <div class="h-[25vh] flex flex-col items-center justify-center px-5">
        <p v-if="this.$store.state.deutsch" class="text-center py-5 lg:text-xl">Die Ergebnisse der Umfrage können Sie auf der Karte sehen.</p>
        <p v-if="this.$store.state.english" class="text-center py-5 lg:text-xl">You can see the results of the survey on the map.</p>
        <router-link v-if="this.$store.state.deutsch" :to="{ name: 'map'}" class="flex items-center justify-center text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:text-xl me-2 mb-2 w-[40vh] h-[8vh]"> Zur Karte </router-link>
        <router-link v-if="this.$store.state.english" :to="{ name: 'map'}" class="flex items-center justify-center text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:text-xl me-2 mb-2 w-[40vh] h-[8vh]"> To the map </router-link>
    </div>
    <div class="h-[25vh] flex flex-col items-center justify-center px-5">
        <p v-if="this.$store.state.deutsch" class="text-center py-5 lg:text-xl">Falls Sie Feedback zu der App geben möchten, können Sie das hier tun.</p>
        <p v-if="this.$store.state.english" class="text-center py-5 lg:text-xl">If you would like to give feedback on the app, you can do so here.</p>
        <button @click="click()" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[40vh] h-[8vh] lg:text-xl">Feedback</button>
    </div>
</div>
</template>
<script>
export default{
    methods: {
        click(){
        window.open('https://limesurvey.imis.uni-luebeck.de/index.php/551661?lang=de');
        }
    }
}


</script>

<style>

</style>