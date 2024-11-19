<template>
  <main>
    <div id="homepage" v-if="home && this.$store.state.deutsch && !isBigger()"> 
      <div class="relative flex flex-col items-center justify-center h-[80vh] bg-lightBlue overflow-auto  space-y-4">
            <p class="text-xl font-bold w-[65vw]">Danke für die Teilnahme </p>
            <p class="w-[65vw]">Sie werden mit der App Angaben zu Ihrem emotionalen Befinden machen. <br>
            Dazu beantworten Sie einen Fragebogen, dessen Beantwortung etwa 5 Minuten in Anspruch nehmen wird. Sie werden während der Umfrage lediglich aufgefordert, der Erfassung Ihres Standortes zuzustimmen.
            </p>
            <p class="w-[65vw]">
              Der Fragebogen besteht aus Begriffen, die verschiedene Emotionen oder Stimmungen beschreiben. 
              Bewerten Sie wie intensiv Sie diese Emotion in Bezug auf Ihr aktuelles städtisches Umfeld empfinden. 
              Zur Bewertung verwenden Sie eine Skala von 1 „gar nicht“ bis 5 „äußerst“.
            </p>
             <router-link :to="{ name: 'settings'}" class="absolute top-0 right-0 text-3xl"> &#9881; </router-link>
      </div>
      <div class="h-[20vh] flex items-center justify-center bg-lightBlue">
          <router-link :to="{ name: 'umfrage'}" class="flex items-center justify-center text-xl text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center me-2 mb-2 w-[60vw] h-[15vh]">Beginnen </router-link>
      </div>
    </div>
    <div id="homepage" v-if="home && this.$store.state.english && !isBigger()"> 
      <div class="relative flex flex-col items-center justify-center h-[80vh] bg-lightBlue overflow-auto  space-y-4">
            <p class="text-xl font-bold w-[65vw]">Thank you for participating </p>
            <p class="w-[65vw]">You will use the app to provide information about your emotional state. <br>
              To do this, you will answer a questionnaire that will take approximately 5 minutes to complete. During the survey you will only be asked to agree to the recording of your location.
            </p>
            <p class="py-2 w-[65vw]">
              The questionnaire consists of terms that describe different emotions or moods.
              Rate how intensely you feel this emotion in relation to your current urban environment.
              To rate, use a scale from 1 "not at all" to 5 "extremely".
            </p>
             <router-link :to="{ name: 'settings'}" class="absolute top-0 right-0 text-3xl"> &#9881; </router-link>
      </div>
      <div class="h-[20vh] flex items-center justify-center bg-lightBlue">
          <router-link :to="{ name: 'umfrage'}" class="flex items-center justify-center text-xl text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center me-2 mb-2 w-[60vw] h-[15vh]">Begin </router-link>
      </div>
    </div>
    <div v-if="intro || home && isBigger()">
          <div class="flex flex-col items-center justify-center screen-full h-[70vh] lg:h-[90vh] bg-lightBlue ">
            <div v-if="this.$store.state.deutsch" class="py-10  w-[65vw]"><p class="text-3xl font-bold">Willkommen zur Emotionserfassung</p>
              <p class="py-5">im Rahmen der Bachelorarbeit „Die emotionale Stadt: Konzeption eines
                Tools zur Untersuchung der Einflüsse der Stadt auf das emotionale Wohlbefinden ihrer Bewohner"</p>
            </div>
            <div v-if="this.$store.state.english" class="py-10 w-[65vw]"><p class="text-3xl font-bold">Welcome to Emotion Capture</p>              
              <p class="py-5">as part of the bachelor thesis "The emotional city: conception of a
                tool for investigating the influences of the city on the emotional well-being of its residents"</p>
            </div>
            <router-link :to="{ name: 'settings'}" class="absolute top-0 right-0 text-3xl"> &#9881; </router-link>
            <div v-if="this.$store.state.deutsch" class="relative flex flex-col items-center justify-center bg-lightBlue overflow-auto  space-y-4">
            <p class="text-xl font-bold w-[65vw] hidden lg:block">Danke für die Teilnahme </p>
            <p class="w-[65vw] hidden lg:block">Sie werden mit der App Angaben zu Ihrem emotionalen Befinden machen. <br>
            Dazu beantworten Sie einen Fragebogen, dessen Beantwortung etwa 5 Minuten in Anspruch nehmen wird. Sie werden während der Umfrage lediglich aufgefordert, der Erfassung Ihres Standortes zuzustimmen.
            </p>
            <p class="w-[65vw] hidden lg:block">
              Der Fragebogen besteht aus Begriffen, die verschiedene Emotionen oder Stimmungen beschreiben. 
              Bewerten Sie wie intensiv Sie diese Emotion in Bezug auf Ihr aktuelles städtisches Umfeld empfinden. 
              Zur Bewertung verwenden Sie eine Skala von 1 „gar nicht“ bis 5 „äußerst“.
            </p> 
            </div>
            <div v-if="this.$store.state.english" class="relative flex flex-col items-center justify-center bg-lightBlue overflow-auto  space-y-4">
            <p class="text-xl font-bold w-[65vw] hidden lg:block">Thank you for participating </p>
            <p class="w-[65vw] hidden lg:block">You will use the app to provide information about your emotional state. <br>
              To do this, you will answer a questionnaire that will take approximately 5 minutes to complete. During the survey you will only be asked to agree to the recording of your location.
            </p>
            <p class="py-2 w-[65vw] hidden lg:block">
              The questionnaire consists of terms that describe different emotions or moods.
              Rate how intensely you feel this emotion in relation to your current urban environment.
              To rate, use a scale from 1 "not at all" to 5 "extremely".
            </p>
            </div> 
          </div>
            <div class="screen-full h-[30vh] lg:h-[10vh] flex flex-col lg:flex-row items-center justify-center lg:relative bg-lightBlue lg:space-x-20">
                <button v-if="this.$store.state.deutsch" @click="weiter1()" class="text-xl text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[60vw] lg:w-[20vw] h-[10vh] lg:h-[8vh] ">Weiter</button>
                <router-link :to="{ name: 'map'}" v-if="this.$store.state.deutsch" class="flex items-center justify-center text-xl text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center me-2 mb-2  w-[60vw] lg:w-[20vw] h-[10vh] lg:h-[8vh] "> Ergebnisse </router-link>
                <button v-if="this.$store.state.english" @click="weiter1()" class="text-xl text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[60vw] lg:w-[20vw] h-[10vh] lg:h-[8vh]">Start</button>
                <router-link :to="{ name: 'map'}" v-if="this.$store.state.english" class="flex items-center justify-center text-xl text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center me-2 mb-2  w-[60vw] lg:w-[20vw] h-[10vh] lg:h-[8vh] "> Results </router-link>
            </div>
    </div>
        <InfoBox v-if="weiter"><template v-slot:body> 
          <h1 v-if="this.$store.state.deutsch" class="text-center font-bold text-2xl pt-10">Einwilligungserklärung</h1>
                <h1 v-if="this.$store.state.english" class="text-center font-bold text-2xl pt-10">Declaration of consent</h1>
                <p v-if="this.$store.state.deutsch" class=" pt-5 pb-8">
                Ich freue mich sehr über Ihr Interesse, an dieser Umfrage teilzunehmen. <br>

                Diese Umfrage befasst sich mit den Auswirkungen, die das Leben in der Stadt auf das emotionale Wohlbefinden haben kann. Sie hat den Zweck, den emotionalen Zustand bezogen auf den Ort, an dem sich der Teilnehmer befindet, zu erfassen. Sie wird im Rahmen der Bachelorarbeit „Die emotionale Stadt: Konzeption eines Tools zur Untersuchung der Einflüsse der Stadt auf das emotionale Wohlbefinden der Bewohner*innen“ an der Universität zu Lübeck durchgeführt.<br>

                Die Teilnahme an der Umfrage erfordert keine Registrierung und es müssen keine Kontaktdaten angegeben werden. Sie werden während der Umfrage lediglich aufgefordert, der Erfassung Ihres Standortes zuzustimmen. Die erhobenen Daten werden anonymisiert und streng vertraulich behandelt. Sie werden auf einem Server der Universität zu Lübeck gespeichert. <br>
                Sie können die Teilnahme jederzeit abbrechen, ohne dass daraus Nachteile entstehen. <br>
                Die erhobenen Daten werden ausschließlich im Rahmen der angegebenen Forschungszwecke verwendet. Es erfolgt keine Weitergabe der Daten an Dritte. Die Ergebnisse der Umfrage können in anonymisierter Form veröffentlicht werden. <br>

                Die Beantwortung der Umfrage dauert etwa 5 Minuten. <br>

                Sollten Sie Fragen zur Umfrage oder zu dem Umgang mit Ihren Daten haben, wenden Sie sich bitte an philip.laatz@student.uni-luebeck.de.<br>

                Mit dem Bestätigen von Einwilligen erklären sie, dass die obenstehenden Informationen zur Kenntnis genommen wurden und sie der Teilnahme und der Verarbeitung ihrer Daten im Rahmen dieser Forschungsarbeit einwilligen.<br>
                </p>
                <p v-if="this.$store.state.english" class=" pt-5 pb-8">
                  I am very pleased that you are interested in taking part in this survey. <br>

                  This survey deals with the effects that life in the city can have on emotional well-being. Its purpose is to capture the emotional state at the location where the participant is situated.. It is being carried out as part of the bachelor's thesis "The emotional city: conception of a tool for investigating the influences of the city on the emotional well-being of residents" at the University of Lübeck.<br>

                  Participation in the survey does not require registration and no contact details need to be provided. During the survey you will only be asked to agree to the recording of your location. The data collected is anonymized and treated as strictly confidential. They are stored on a server of the University of Lübeck.<br>
                  You can cancel participation at any time without this resulting in any disadvantages. <br>
                  The data collected will only be used for the stated research purposes. The data will not be passed on to third parties. The results of the survey can be published in anonymized form. <br>

                  Answering the survey takes about 5 minutes. <br>

                  If you have any questions about the survey or how your data is handled, please contact philip.laatz@student.uni-luebeck.de.<br>

                  By confirming your consent, you declare that you have read the above information and that you consent to participate and to the processing of your data as part of this research.<br>
                </p>
              <div class="w-full flex flex-col lg:flex-row items-center justify-center">
              <button v-if="this.$store.state.deutsch" @click="akzeptieren()" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[60%] lg:w-[30%]">Akzeptieren</button>
              <button v-if="this.$store.state.deutsch" @click="ablehnen()" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none foc us:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[60%] lg:w-[30%]">Ablehnen</button>
              <button v-if="this.$store.state.english" @click="akzeptieren()" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[60%] lg:w-[30%]">Accept</button>
              <button v-if="this.$store.state.english" @click="ablehnen()" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[60%] lg:w-[30%]">Decline</button>
             </div>
        </template></InfoBox>
  </main>
</template>
<script>
import InfoBox from '@/components/InfoBox.vue'

export default {
  components: {
    InfoBox
  },
  data() {
    return {
      weiter: false,
      home: this.$store.state.einW,
      intro: this.$store.state.intro,
    }
  },
  methods: {
    akzeptieren() {
      this.$store.commit('intro')
      this.weiter = false;
      this.$store.commit('accept');
      this.intro = this.$store.state.intro;
      this.home = this.$store.state.einW;
      if(this.isBigger()){
        this.$router.push({ name: 'umfrage'})
      }
    },
    ablehnen(){
      // gehe zur Endpage;
      this.weiter = false;
    },
    weiter1(){
      if(!this.$store.state.einW){this.weiter = true;}
      else{this.$router.push({ name: 'umfrage'})}
      
    },
    isBigger(){
      return (document.documentElement.clientWidth > 1024);
    }
  }
}
</script>
<style>

</style>


