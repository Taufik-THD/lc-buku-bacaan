<template lang="html">
  <div>
    <nav class="header">
      <div class="nav-wrapper" style="text-align:right; background-color:#dfe6e9;">
        <label style="font-size:25px; color:#2d3436; margin-right:15px;"> <b>Bacaan Baik.</b> </label>
        <ul class="left hide-on-med-and-down">
          <li><a class="waves-effect waves-light btn modal-trigger" data-target="modal1" v-if='checktoken() == false'>Login</a></li>
          <li><a class="waves-effect waves-light btn modal-trigger" data-target="modal3" v-if='checktoken() == false'>Register</a></li>
          <li>
            <router-link :to="{name: 'home'}">
              <a v-if='checktoken() == true' @click='logout'>Logout</a>
            </router-link>
          </li>
          <li><a class="waves-effect waves-light modal-trigger" data-target="modal2"  v-if='checktoken() == true' >Add Book</a></li>
        </ul>
      </div>
    </nav>

    <!-- login -->
    <div id="modal1" class="modal">
      <div class="container-modal white z-depth-2">
      	<ul class="tabs teal">
      		<li class="tab col s3"><a class="white-text active" href="#login" >login</a></li>
      	</ul>
      	<div id="login" class="col s12" style="width:100%;">
      		<form class="col s12">
      			<div class="form-container">
      				<div class="row">
                <br>
      					<div class="input-field col s12">
      						<input id="email" type="email" class="validate" v-model='email'>
      						<label for="email">Email</label>
      					</div>
      				</div>
      				<div class="row">
      					<div class="input-field col s12">
      						<input id="password" type="password" class="validate" v-model='password'>
      						<label for="password">Password</label>
      					</div>
      				</div>
      				<br>
      				<center>
                <a class="btn modal-action modal-close waves-effect waves-green" >Cancel</a>
      					<button class="btn waves-effect waves-light teal" type="submit" @click='login($event)'>Connect</button>
      					<br>
      					<br>
      				</center>
      			</div>
      		</form>
      	</div>
      </div>
    </div>

    <div class="container">
      <div id="modal3" class="modal">
        <div class="container-modal white z-depth-2">
          <ul class="tabs teal">
            <li class="tab col s3"><a class="white-text" href="#register" >register</a></li>
          </ul>
          <div id="register" class="col s12">
            <form class="col s12">
              <div class="form-container">
                <div class="row">
                  <br>
                  <div class="input-field col s12">
                    <input type="email" class="validate" v-model='email'>
                    <label for="email">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input  type="password" class="validate" v-model='password'>
                    <label for="password">Password</label>
                  </div>
                </div>
                <center>
                  <a class="btn modal-action modal-close waves-effect waves-green" >Cancel</a>
                  <button class="btn waves-effect waves-light teal" type="submit" @click='register'>Submit</button>
                  <br>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <img src="" alt="" style="position: flex;">
    <!-- modal -->
        <div id="modal2" class="modal">
          <div class="container-modal white z-depth-2">
            <ul class="tabs teal">
              <li class="tab col s3"><a class="white-text" href="#register" >add new book</a></li>
            </ul>
            <div id="register" class="col s12">
              <div class="container">

                <form class="col s12">
                  <div class="form-container">
                    <div class="row">
                      <br>
                      <div class="input-field col s12">
                        <input type="text" v-model='judul'>
                        <label for="judul">Judul</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s12">
                        <input  type="text" class="validate" v-model='penerbit'>
                        <label for="penerbit">Penerbit</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s12">
                        <input  type="text" v-model='penulis'>
                        <label for="penulis">Penulis</label>
                      </div>
                    </div>
                    <div class="file-field input-field">
                      <div class="btn">
                        <span>File</span>
                        <input type="file" multiple @change="onChange">
                      </div>
                      <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files">
                      </div>
                    </div>
                    <center>
                      <a class="btn modal-action modal-close waves-effect waves-green" style="margin-bottom:20px; margin-right:10px;">Cancel</a>
                      <button class="btn waves-effect waves-light teal" type="submit" @click='onUpload' style="margin-bottom:20px;">Post</button>
                      <br>
                    </center>
                  </div>
                </form>

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
    this.checktoken()
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
  methods: {
    checktoken(){
      if (!localStorage.hasOwnProperty('authorization')) {
        return false
      } else {
        return true
      }
    },

    login(event){
      event.preventDefault()

      const user = {
        email: this.email,
        password: this.password
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: user
      })
      .then((response) => {
        user.email = ''
        user.password = ''

        const token = JSON.stringify(response.data.jwtToken)

        localStorage.setItem('authorization', token);
        location.reload();

      })
      .catch(err => {
        this.email=''
        this.password=''
        swal({
          text: "email/password is wrong!",
          icon: "error",
        });
      })
    },

    register(event){
      event.preventDefault()

      const user = {
        email: this.email,
        password: this.password
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: user
      })
      .then((response) => {
        this.email = ''
        this.password = ''
        swal({
          title: "Yosh!",
          text: "Successfully register your account",
          icon: "success",
        });
      })
      .catch(err => {
        this.email=''
        this.password=''
        swal({
          text: "email is already exists",
          icon: "error",
        });
      })

    },

    logout(){

      swal("Are you sure?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {

        if (accept) {
          localStorage.removeItem('authorization');
          location.reload();
        }

      })

    },

    onChange (event) {
      this.gambar = event.target.files[0]
    },
    onUpload() {

      // upload file
      this.formdata.set('item', this.gambar)
      this.formdata.set('judul', this.judul)
      this.formdata.set('penerbit', this.penerbit)
      this.formdata.set('penulis', this.penulis)

      axios.post('http://localhost:3000/upload', this.formdata)
      .then(response => {
        swal({
          title: "Yosh!",
          text: "Successfully add new item",
          icon: "success",
        });
        this.judul = ''
        this.penerbit = ''
        this.penulis = ''
        this.image = ''
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      })

    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (event) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(file);
    },

  }
}
</script>

<style scoped>
.header{
  position: absolute;
  width: 100%;
}
img{
  margin-top: 20px;
  height: 500px;
  width: 100%;
}
</style>
