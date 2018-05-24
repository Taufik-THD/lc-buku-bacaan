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
          <li style="padding-right:10px;" v-if='checktoken() == true'><a class="waves-effect waves-light btn modal-trigger" data-target="modal2" @click='getMyCart'><i class="material-icons">shopping_cart</i></a></li>
        </ul>
      </div>
    </nav>

    <img src="http://bdfjade.com/data/out/105/6092109-book-wallpaper.jpg" alt="" style="position: flex;">
    <!-- modal -->
    <div id="modal2" class="modal" style="height:700px; text-align:center; padding-top:2%;">
      <div class="container">
        <h3> <u>Cart</u> </h3>
        <div class="container white z-depth-2" style="width:100%;">
          <div id="login" class="col s12">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for='item in MyCart'>
                <tr v-if='item.Qty > 0'>
                  <td>{{ item.name }}</td>
                  <td>Rp. {{ item.price.toLocaleString() }}</td>
                  <td>
                    <input type="text" data-length="1" style="text-align:center; width:25px;" v-bind:value='item.Qty' disabled>
                    <label for="input_text"></label>
                  </td>
                  <td>
                    <a class="btn modal-action modal-close waves-effect waves-green" style="margin-left:25px; text-align:center;" @click='removeQty({item})'><i class="material-icons">remove_shopping_cart</i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="" style="position:inherit; text-align:center; background-color:#004d40;">
          <button type="button" name="button" class="btn modal-action modal-close waves-effect waves-green" style="width:90%; margin-top:1.5%;" @click='checkout'>Checkout</button>
          <a class="btn modal-action modal-close waves-effect waves-green" style="width:90%; margin-top:2%; margin-bottom:2%;">back to menu</a>
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
      MyCart: null
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

    }

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
