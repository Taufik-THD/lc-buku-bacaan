<template >
  <div class="container">

    <div class="row">
      <div class="col s12 m3" v-for='item in books'>
        <div class="card teal darken-4">
          <div class="card-image">
            <img :src="item.picture" style="height:200px">
          </div>
          <div class="card-content">
            <p style="color: white">Karya :{{ item.penulis }}</p>
            <hr>
            <router-link :to="{name: 'about', params: {id: item._id}}">
              <span class="card-title" @click='openBook(item._id)'> <a style="cursor:pointer;" >{{ item.judul }}</a> </span>
            </router-link>
            <hr>
            <h6 style="color: white">Penerbit:  {{ item.penerbit }}</h6>
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
    this.getItem()
  },
  data(){
    return {
      email: '',
      password: '',
      formdata: new FormData(),
      judul: '',
      penerbit: '',
      penulis: '',
      gambar: '',
      books: null
    }
  },
  name: 'Homepage',
  methods: {
    getItem(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/'
      })
      .then(data => {
        this.books = data.data
        console.log(this.books);
      })
      .catch(err => {
        console.log(err);
      })
    },

    checktoken(){
      if (!localStorage.hasOwnProperty('authorization')) {
        return false
      } else {
        return true
      }
    },

    openBook(bookId){

      axios({
        method: 'get',
        url: `http://localhost:3000/openbook/${bookId}`
      }).then((data) => {
        console.log(data.data[0]);
      })

    }

  }

}
</script>

<style scoped>
.container{
  border-style: inherit;
  background-color: #f5f6fa;
  margin-top: 50px;
  width: 90%;
}
.modal {
  overflow: hidden;
  width: 35%;
  height: 600px;
  margin-top: 0px;
  padding: 0 0 0 0;
}

h5
{
	font-weight: 400;
}

.container-modal{
	margin: 0 0 0 0;
	width: 455px;
	height: 100%;
}

.tabs .indicator
{
	background-color: #1e2121;
	opacity: 0.3;
}

.form-container
{
	padding: 40px;
	padding-top: 10px;
}

.confirmation-tabs-btn
{
	position: absolute;
}
element.style {
    z-index: 1003;
    display: block;
    opacity: 1;
    top: 1%;
}
</style>
