<template>
    <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
      <div class="bg-blue-600 h-2 rounded-full dark:bg-darkBlue" :style="{ width: progress + '%'}"></div>
    </div>
      <div>
        <div v-if="!locDis" class="flex flex-col justify-center items-center lg:text-center screen-full relative h-[58vh] lg:h-[99vh] bg-lightBlue">
          <button @click="back(); this.$router.go(-1);" class="arrow absolute top-5 left-5 text-5xl lg:hidden"> </button>
          <p v-if="this.$store.state.deutsch" class="text-2xl font-bold">Sie haben die Standorterfassung abgelehnt und deshalb ist die Teilnahme an der Untersuchung leider nicht möglich.</p>
          <p v-if="this.$store.state.english" class="text-2xl font-bold">You have declined location tracking and therefore unfortunately cannot participate in the survey.</p>
        </div>
        <div  v-if="locDis" class="flex flex-col items-center justify-center relative h-[100vh] bg-lightBlue space-y-10">
          <div class="flex flex-col items-center justify-center h-[58vh]">
            <button @click="back(); this.$router.go(-1)" class="arrow absolute top-5 left-5 text-5xl lg:hidden"> </button>
            <p v-if="this.$store.state.deutsch" class="lg:py-10 lg:text-xl">ich fühle mich... </p>
            <p v-if="this.$store.state.english" class="lg:py-10 lg:text-xl">i feel... </p>
            <span v-if="this.$store.state.deutsch" class="text-5xl font-bold py-10">{{ adjektiv }} </span>
            <span v-if="this.$store.state.english" class="text-5xl font-bold py-10">{{ adjektivEng }}</span>
            <p v-if="this.$store.state.deutsch" class="lg:py-10 lg:text-xl">1 "stimme gar nicht zu bis 5 "stimme voll zu"</p>
            <p v-if="this.$store.state.english" class="lg:py-10 lg:text-xl">1 "do not agree at all" to 5 "completely agree"</p>
            <button @click="showInfo()" class="lg:hidden absolute top-5 right-0 w-10 h-10 text-white bg-darkBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-4 text-center inline-flex items-center me-2"> i</button>
          </div>
          <div class="h-[40vh] lg:h-[5vh] screen-full flex flex-col lg:flex-row items-center justify-center">
            <button @click="wert(5)" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg text-xl px-5 py-2.5 text-center lg:me-2 mb-2 lg:w-[7vw] lg:h-[7vh] w-[100vw] h-[20vh]">5</button>
            <button @click="wert(4)" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg text-xl px-5 py-2.5 text-center lg:me-2 mb-2 lg:w-[7vw] lg:h-[7vh] w-[100vw] h-[20vh]">4</button>
            <button @click="wert(3)" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg text-xl px-5 py-2.5 text-center lg:me-2 mb-2 lg:w-[7vw] lg:h-[7vh] w-[100vw] h-[20vh]">3</button>
            <button @click="wert(2)" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg text-xl px-5 py-2.5 text-center lg:me-2 mb-2 lg:w-[7vw] lg:h-[7vh] w-[100vw] h-[20vh]">2</button>
            <button @click="wert(1)" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg text-xl px-5 py-2.5 text-center lg:me-2 mb-2 lg:w-[7vw] lg:h-[7vh] w-[100vw] h-[20vh]">1</button>
          </div>
        </div>
      </div>
    <InfoBox v-if="info">
          <template v-slot:body>
            <p v-if="this.$store.state.deutsch" class="relative">
              <button @click="showInfo()" class="absolute top-0 right-0">&#10006;</button>
              Der Fragebogen besteht aus Begriffen, die verschiedene Emotionen oder Stimmungen beschreiben. <br> Bewerten Sie wie intensiv Sie diese Emotion in Bezug auf Ihr aktuelles städtisches Umfeld empfinden. <br>Zur Bewertung verwenden Sie eine Skala von 1 „stimme gar nicht zu“ bis 5 „stimme voll zu“. 
            </p>
            <p v-if="this.$store.state.english" class="relative">
              <button @click="showInfo()" class="absolute top-0 right-0">&#10006;</button>
              The questionnaire consists of terms that describe different emotions or moods. <br> Rate how intensely you feel this emotion in relation to your current urban environment. <br>To rate, use a scale from 1 "not at all" to 5 "completely agree". 
            </p>
          </template>
    </InfoBox> 
</template>
<script>
import Server from '../server';
import InfoBox from '@/components/InfoBox.vue'

export default {
  components:{
    InfoBox
  },
  data() {
    return {
        adjektiv: AdjektiveShort[0],
        adjektivEng: AdjektiveShortEng[0],
        adjektive: AdjektiveShort,
        adjektiveEng: AdjektiveShortEng,
        info: false,
        progress: 5,
        storeAdj: '',
        locDis: true
    }
  },
  methods: {
    wert(n){
        wert = n;
        this.nextAdj()
        this.makeProgress()
    },
    nextAdj(){
        if(PAadj.includes(AdjektiveShort[n]) || PAadj.includes(AdjektiveShortEng[n])){
          werte.push(wert)
          PM.push(wert);
          var sum = PM.reduce((a, b) => a + b, 0);
          pAvg = (sum / PM.length) || 0; 
        }if(NAadj.includes(AdjektiveShort[n]) || NAadj.includes(AdjektiveShortEng[n])){
          werte.push(wert)
          NM.push(wert);
          var sum = NM.reduce((a, b) => a + b, 0);
          nAvg = (sum / NM.length) || 0;
        }
        n++
        this.adjektiv = AdjektiveShort[n]
        this.adjektivEng = AdjektiveShortEng[n]
        if(n > 9){
            this.$router.push({ name: 'endpage'})
            // box around lubeck 
            if(lat >= 53.757643 && lat <= 53.996065 && lng >= 10.529022 && lng <= 10.910797){
              console.log('post')
              Server.insertPost(lat, lng, pAvg, nAvg, werte[0], werte[1], werte[2], werte[3], werte[4], werte[5], werte[6], werte[7], werte[8], werte[9])
            }
        }
    },
    showInfo(){
        this.info = !this.info;
    },
    makeProgress(){
      if(this.progress < 100){
        this.progress += (100/AdjektiveShort.length);
      }
    },
    back(){
      var curAdj;
      if(this.$store.state.english){
        curAdj = this.adjektivEng
      }else{
        curAdj = this.adjektiv
      }
      this.$store.commit('umfBack', curAdj)
    },
    getLocation(){
      const successCallback = (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        document.querySelectorAll('button').forEach(element => {
          element.disabled = false;})
        };
  
      const errorCallback = (error) => {
        console.log(error);
        document.querySelectorAll('button').forEach(element => {
        element.disabled = true;
        });
      };
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },
  },
  mounted(){
    if(this.$store.state.curAdj != ''){
      if(this.$store.state.english){
        this.adjektivEng = this.$store.state.curAdj
        this.progress = AdjektiveShort.indexOf(this.$store.state.curAdj)*10
      }
      else{
        this.adjektiv = this.$store.state.curAdj
        this.progress = AdjektiveShort.indexOf(this.$store.state.curAdj)*10
      }
    }
    this.getLocation()
    navigator.permissions.query({name: "geolocation"})
                       .then((PermissionStatus) =>{
                        PermissionStatus.onchange = () => {
                          if(PermissionStatus.state == 'denied'){
                            this.locDis = false;
                          }else{this.locDis = true}
                          this.getLocation()
                        }
                        })
    window.addEventListener('popstate', () => {
      this.back()
    });

  }
}
var n = 0;
var wert = 0;
var werte = [];
var PM = [];
var NM = [];
var lat;
var lng;
var pAvg;
var nAvg;
const PAadj = ["Aktiv","Interessiert","Freudig erregt","Stark","Angeregt","Stolz","Begeistert","Wach","Entschlossen","Aufmerksam", "active", "inspired", "alert", "determined", "attentive"];
const NAadj = ["Bekümmert","Verärgert","Schuldig","Erschrocken","Feindselig","Gereizt","Beschämt","Nervös","Durcheinander","Ängstlich", "upset", "hostile", "ashamed", "nervous", "afraid"];
//const Adjektive = ["Aktiv","Bekümmert","Interessiert","Freudig erregt","Verärgert","Stark","Schuldig","Erschrocken","Feindselig","Angeregt","Stolz","Gereizt","Begeistert","Beschämt","Wach","Nervös","Entschlossen","Aufmerksam","Durcheinander","Ängstlich"];
const AdjektiveShort = ["Aktiv", "Verärgert", "Feindselig", "Angeregt", "Beschämt", "Wach", "Nervös", "Entschlossen", "Aufmerksam", "Ängstlich"];
const AdjektiveShortEng = ["active", "upset", "hostile", "inspired", "ashamed", "alert", "nervous", "determined", "attentive", "afraid"];



</script>
<style>
.arrow {
  display: block;
  margin: 10px auto;
  width: 15px;
  height: 15px;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  transform: rotate(-45deg);
}
</style>