<template>
  <div class="screen-full flex flex-col justify-center relativ h-[60vh] bg-lightBlue">
    <p class="text-center text-5xl font-bold" v-if="this.$store.state.deutsch"> Optionen</p>
    <p class="text-center text-5xl font-bold" v-if="this.$store.state.english"> Options</p>
    <button @click="back()" class="arrow absolute top-5 left-5 text-5xl lg:hidden"> </button>
  </div>
  <div class="flex flex-col items-center justify-center h-[40vh] bg-lightBlue">   
        <button v-if="this.$store.state.deutsch" @click="info()" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg px-5 py-2.5 text-center mb-2 w-[100vw] h-[10vh] lg:w-[50vh] lg:bg-darkBlue lg:text-white lg:text-2xl">Informationen</button>
        <button v-if="this.$store.state.deutsch" @click="daten()" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg px-5 py-2.5 text-center mb-2 w-[100vw] h-[10vh] lg:w-[50vh] lg:bg-darkBlue lg:text-white lg:text-2xl">Datenschutz</button>
        <button v-if="this.$store.state.deutsch" @click="sprachen()" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg px-5 py-2.5 text-center mb-2 w-[100vw] h-[10vh] lg:w-[50vh] lg:bg-darkBlue lg:text-white lg:text-2xl">Sprache wählen</button>
        <button v-if="this.$store.state.english" @click="info()" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg px-5 py-2.5 text-center mb-2 w-[100vw] h-[10vh] lg:w-[50vh] lg:bg-darkBlue lg:text-white lg:text-2xl">Information</button>
        <button v-if="this.$store.state.english" @click="daten()" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg px-5 py-2.5 text-center mb-2 w-[100vw] h-[10vh] lg:w-[50vh] lg:bg-darkBlue lg:text-white lg:text-2xl">Data protection</button>
        <button v-if="this.$store.state.english" @click="sprachen()" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg px-5 py-2.5 text-center mb-2 w-[100vw] h-[10vh] lg:w-[50vh] lg:bg-darkBlue lg:text-white lg:text-2xl">Language</button>
        <button @click="click()" class="hover:bg-darkBlue hover:text-white border border-darkBlue bg-white font-medium rounded-lg px-5 py-2.5 text-center mb-2 w-[100vw] h-[10vh] lg:w-[50vh] lg:bg-darkBlue lg:text-white lg:text-2xl">Feedback</button>
  </div>
  <InfoBox v-if="divOpen">
    <template v-slot:body>
      <div v-if="information" class="relative w-full">
        <button @click="this.divOpen = !this.divOpen" class="absolute top-0 right-0">&#10006;</button>
        <p v-if="this.$store.state.deutsch">  
          <b>1. Ziel der Studie/Umfrage</b><br>

          Es ist kein Geheimnis, dass bei Stadtbewohner*innen vermehrt psychische Erkrankungen auftreten. 
          Das Ziel dieser Befragung ist daher zu erforschen, wo die Stadt sowohl negative als auch positive Emotionen in ihren Bewohner*innen auslöst. 
          Die gesammelten Daten sollen helfen, zu zeigen, welche Bereiche der Stadt positive oder negative Emotionen auslösen. 
          So kann langfristig zu einer Verbesserung der psychischen Gesundheit und der Lebensqualität der Stadtbewohner*innen beigetragen werden. 
          Ein weiteres Ziel ist die Erstellung einer Stimmungskarte Lübecks anhand der über den Fragebogen erhobenen Daten. 
          <br><br>
          <b>2. Ablauf</b><br>

          Sie werden mit der App Angaben zu Ihrem emotionalen Befinden machen. 
          Dazu beantworten Sie einen Fragebogen, dessen Beantwortung etwa [DAUER] Minuten in Anspruch nehmen wird.
          Die App erfasst gleichzeitig Ihren Standort. 
          <br><br>
          <b>3. Nutzen</b><br>

          Die erfassten Daten und die an diesen Daten ableitbaren Faktoren, die einen Einfluss auf den emotionalen Zustand von Stadtbewohner*innen haben, sollen für die Entwicklung von Verbesserungspotenzialen genutzt werden. 
          So soll es ermöglicht werden, Daten zu generieren, die beispielsweise von den Stadtplaner*innen genutzt werden können.
          <br><br>
          <b>4. Rechte</b><br>

          Die Teilnahme ist freiwillig und Sie haben jederzeit, ohne Angabe von Gründen, das Recht, die Teilnahme abzubrechen. 
          Es entstehen Ihnen daraus keinerlei Nachteile.
          Da die Daten lediglich anonymisiert erfasst, gespeichert und verarbeitet werden, ist eine Zuordnung zu einer Person nicht möglich. 
          Dementsprechend kann eine nachträgliche Löschung oder Übertragung Ihrer individuellen Daten an Sie nicht erfolgen. 
        </p>
        <p v-if="this.$store.state.english"> 
          <b>1. Aim of the study/survey</b><br>

          It is no secret that mental illnesses are becoming more common among city dwellers.
          The aim of this survey is therefore to research where the city triggers both negative and positive emotions in its residents.
          The data collected should help to show which areas of the city trigger positive or negative emotions.
          This can contribute to improving the mental health and quality of life of city dwellers in the long term.
          Another aim is to create a mood map of Lübeck based on the data collected via the questionnaire.
          <br><br>
          <b>2. Process</b><br>

          You will use the app to provide information about your emotional state.
          To do this, you will answer a questionnaire that will take about [DURATION] minutes to complete.
          The app will simultaneously record your location.
          <br><br>
          <b>3. Benefits</b><br>

          The data collected and the factors that can be derived from this data and that have an influence on the emotional state of city dwellers should be used to develop potential for improvement.
          This should make it possible to generate data that can be used by city planners, for example.
          <br><br>

          <b>4. Rights</b><br>

          Participation is voluntary and you have the right to cancel participation at any time without giving reasons.
          You will not suffer any disadvantages as a result.
          As the data is only collected, stored and processed anonymously, it is not possible to assign it to a person.
          Accordingly, your individual data cannot be subsequently deleted or transferred to you.
        </p>
      </div>
      <div v-if="datenschutz" class="relative w-full">
        <button @click="this.divOpen = !this.divOpen" class="absolute top-0 right-0">&#10006;</button>
        <p v-if="this.$store.state.deutsch"> 
          <b>Datenschutzinformationen</b><br>
          Diese Umfrage befasst sich mit den Auswirkungen, die das Leben in der Stadt auf das emotionale Wohlbefinden haben kann. Sie hat den Zweck, den emotionalen Zustand an dem Ort, an dem sich der Teilnehmer befindet, zu erfassen. 
          Sie wird im Rahmen der Bachelorarbeit „Die emotionale Stadt: Konzeption eines Tools zur Untersuchung der Einflüsse der Stadt auf das emotionale Wohlbefinden der Bewohner*innen“ an der Universität zu Lübeck durchgeführt.
          <br>
          Die Teilnahme an der Umfrage erfordert keine Registrierung und es müssen keine Kontaktdaten angegeben werden. 
          Sie werden während der Umfrage lediglich aufgefordert, der Erfassung Ihres Standortes zuzustimmen. Die erhobenen Daten werden anonymisiert und streng vertraulich behandelt. Sie werden auf einem Server der Universität zu Lübeck gespeichert.
          <br>
          Sie können die Teilnahme jederzeit abbrechen oder Ihre Einwilligung widerrufen, ohne dass daraus Nachteile entstehen.
          <br>
          Die erhobenen Daten werden ausschließlich im Rahmen der angegebenen Forschungszwecke verwendet. Es erfolgt keine Weitergabe der Daten an Dritte. 
          Die Ergebnisse der Umfrage können in anonymisierter Form veröffentlicht werden.
          <br>
          Die Beantwortung der Umfrage dauert etwa 5 Minuten.
          <br>
          Sollten Sie Fragen zur Umfrage oder zum Umgang mit Ihren Daten haben, wenden Sie sich bitte an philip.laatz@student.uni-luebeck.de.
          <br>
          Mit dem Bestätigen von Einwilligen erklären sie, dass die obenstehenden Informationen zur Kenntnis genommen wurden und sie der Teilnahme und der Verarbeitung ihrer Daten im Rahmen dieser Forschungsarbeit einwilligen.
        </p>
        <p v-if="this.$store.state.english"> 
          <b>Data protection information</b><br>
          This survey looks at the effects that life in the city can have on emotional well-being. Its purpose is to record the emotional state of the place where the participant is located.
          It is being carried out as part of the bachelor's thesis "The emotional city: conception of a tool for investigating the influences of the city on the emotional well-being of residents" at the University of Lübeck.
          <br>
          Participation in the survey does not require registration and no contact details need to be provided.
          During the survey you will only be asked to agree to the recording of your location. The data collected is anonymized and treated as strictly confidential. They are stored on a server of the University of Lübeck.
          <br>
          You can cancel participation or withdraw your consent at any time without any disadvantages.
          <br>
          The data collected will only be used for the stated research purposes. The data will not be passed on to third parties.
          The results of the survey can be published in anonymized form.
          <br>
          The survey takes about 5 minutes to answer.
          <br>
          If you have any questions about the survey or how your data is handled, please contact philip.laatz@student.uni-luebeck.de.
          <br>
          By confirming your consent, you declare that you have read the above information and that you consent to participate and to the processing of your data as part of this research.
        </p>
      </div>
       <div v-if="sprache" class="relative w-full flex flex-col items-center justify-center">
        <button @click="this.divOpen = !this.divOpen" class="absolute top-0 right-0">&#10006;</button>
        <p v-if="this.$store.state.deutsch">Wählen Sie eine Sprache. <br><br></p>
        <p v-if="this.$store.state.english"> Choose a language. <br><br></p>
        <button @click="this.$store.commit('deutsch'); this.divOpen = false" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[40%]">Deutsch</button>
        <button @click="this.$store.commit('english'); this.divOpen = false" class="text-white border border-blue-700 bg-darkBlue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[40%]">English</button>
       </div>
    </template>
  </InfoBox> 
</template>

<script>
import InfoBox from '@/components/InfoBox.vue'

export default {
  components:{
    InfoBox
  },
  data() {
    return {
      divOpen: false,
      information: false,
      datenschutz: false,
      sprache: false,
    }
  },
  methods: {
   info(){
    this.divOpen = true;
    this.information = true;
    this.datenschutz = false, this.sprache = false;
   },
   daten(){
    this.divOpen = true;
    this.datenschutz = true;
    this.information = false, this.sprache = false;
   },
   sprachen(){
    this.divOpen = true 
    this.sprache = true;
    this.information = false, this.datenschutz = false;
   },
   back(){
    if(this.$store.state.map == true){
      this.$router.push({name: 'map'})
    }else{this.$router.go(-1);}
   },
   click(){
        window.open('https://limesurvey.imis.uni-luebeck.de/index.php/551661?lang=de');
        }
  },
  mounted(){
  }
}

</script>
<style>
.arrow {
  display: block;
  margin: auto;
  width: 15px;
  height: 15px;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  transform: rotate(-45deg);
}
</style>
