<template>
  <div class="">

    <div class="container">
      <a class="waves-effect waves-light btn-large" style="width:150px; position:fixed; margin-left:40%; margin-top:30%" @click="goBack()">Back</a>

      <h4 style="margin-top: 10%;"></h4>
      <img :src="detailBuku.picture" style="height:200px; width:200px;">
      <hr>

      <h3 style="color: #44bd32"><u>{{ detailBuku.judul }}</u></h3>

      <p style="font-size: 20px;">Karya : {{ detailBuku.penulis }}</p>

      <hr>
      <h5>Ulasan :</h5>
      <p>{{ detailBuku.ulasan }}</p>
      <br><br><br>

      <div class="input-field col s12">
        <i class="material-icons prefix">feedback</i>
        <textarea id="icon_prefix" type="textarea1" class="materialize-textarea" v-model='text' v-on:keyup.enter='tambahUlasan'></textarea>
        <label for="textarea1">Masukkan ulasan disini !</label>
      </div>
      <hr>
      <h4>semua ulasan :</h4>
      <hr>
      <div class="row">
        <div class="col s12 m12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">From : { pengirim ulasan }</span>
              <hr>
              <p> { komentar } </p>
              <div class="" style="text-align:right;">
                <a class="waves-effect waves-light btn-large"><i class="material-icons">thumb_up</i>{ total up like }</a>
                <a class="waves-effect waves-light btn-large"><i class="material-icons">thumb_down</i>{ total down like }</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created(){
    this.getData()
  },
  data(){
    return {
      detailBuku: '',
      text: ''
    }
  },
  methods: {
    getData(){
      axios({
        method: 'get',
        url: `http://localhost:3000/openbook/${this.$route.params.id}`
      })
      .then((data) => {
        this.detailBuku = data.data[0]
      })
    },

    goBack(){
      this.$router.push('/')
    },

    tambahUlasan(){
      const token = localStorage.getItem('authorization')

      const UlasanBaru = {
        ulasan: this.text,
        token
      }

      axios({
        method: "post",
        url: `http://localhost:3000/ulasan/${this.$route.params.id}`,
        data: UlasanBaru
      })
      .then((data) => {
        // this.comment = ''
        // this.getDetailQuestion()
        // this.getAnswer()
        console.log('sukses tambah ulasan');
      })
    }
  }

}
</script>

<style scoped>
</style>
