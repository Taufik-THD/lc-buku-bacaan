<template >
  <div class="container">

    <div class="row">
      <div class="col s12 m3">
        <div class="card teal darken-4">
          <div class="card-image">
            <img style="height:200px">
          </div>
          <div class="card-content">
            <h5 style="color: white"></h5>
            <p style="color: white"></p>
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
      gambar: ''
    }
  },
  name: 'Homepage',
  methods: {
    getItem(){
      // axios({
      //   method: 'get',
      //   url: 'http://localhost:3000/'
      // })
      // .then(data => {
      //   this.items = data.data.data
      // })
      // .catch(err => {
      //   console.log(err);
      // })
    },

    checktoken(){
      if (!localStorage.hasOwnProperty('authorization')) {
        return false
      } else {
        return true
      }
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
