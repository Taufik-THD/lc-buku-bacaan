<template >
  <div class="container">

    <div class="row">
      <div class="col s12 m3" v-for='data in items'>
        <div class="card teal darken-4">
          <div class="card-image">
            <img :src="data.picture" style="height:200px">
            <a class="btn-floating halfway-fab waves-effect waves-light red" @click='addToCart({ data })' v-if='data.stock > 0 && checktoken() == true'><i class="material-icons">add_shopping_cart</i></a>
          </div>
          <div class="card-content">
            <h5 style="color: white">{{ data.name }}</h5>
            <p style="color: white">Rp. {{ data.price.toLocaleString() }}</p>
            <h4 v-if='data.stock == 0' style="color:red;">Stok Habis</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Punya Register Login -->
    <div id="modal1" class="modal">
      <div class="container-modal white z-depth-2">
      	<ul class="tabs teal">
      		<li class="tab col s3"><a class="white-text active" href="#login" >login</a></li>
      	</ul>
      	<div id="login" class="col s12">
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
      items: null,
      cart: null,
      ItemId: '',
      itemName: '',
      itemQty: 0,
      cartAll: []
    }
  },
  name: 'Homepage',
  methods: {
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

        if (response.data.role == 'admin') {
          localStorage.setItem('authorization', token);
          localStorage.setItem('role', "admin");
          this.$router.push('/admin')
          location.reload();
        } else {
          localStorage.setItem('authorization', token);
          location.reload();
        }

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

    getItem(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/'
      })
      .then(data => {
        this.items = data.data.data
      })
      .catch(err => {
        console.log(err);
      })
    },

    getMyCart(){

      axios({
        method: 'get',
        url: 'http://localhost:3000/cart'
      })
      .then(data => {
        console.log(data);
      })

    },

    addToCart(event){

      if (!localStorage.hasOwnProperty('authorization')) {
        return false
      } else {
        this.ItemId = event.data._id
        this.itemName = event.data.name
        const token = localStorage.getItem('authorization')

        const item = {
          ItemId: this.ItemId,
          name: this.itemName,
          price: event.data.price,
          token
        }

        axios({
          method: 'post',
          url: 'http://localhost:3000/addToCart',
          data: item
        })
        .then(success => {
          console.log('success');
        })
      }

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
