<template>
  <div class="container">
    <div class="" style="text-align:center; margin-top:50px; margin-bottom:50px;">
      <a class="waves-effect waves-light btn modal-trigger" data-target="modal1" >Add Item</a>
    </div>
    <table class="responsive-table" style="margin-bottom:100px;">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th></th>
        </tr>
      </thead>

      <tbody v-for='data in allData'>
        <tr>
          <td>{{ data.name }}</td>
          <td>{{ data.price }}</td>
          <td>{{ data.stock }}</td>
          <td>
            <a class="btn halfway-fab waves-effect waves-light red" @click='deleteItem({ data })'><i class="material-icons" >delete_forever</i></a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
      <div class="container-modal white z-depth-2">
        <h4 style="text-align:center; padding-top:15px;">Post New Question</h4>
      	<div id="login" class="col s12">
      		<form class="col s12" enctype="multipart/form-data">
      			<div class="form-container">
      				<div class="row">
                <br>
      					<div class="input-field col s12">
      						<input id="text" type="text" v-model='itemName'>
      						<label for="text">Item Name</label>
      					</div>
                <div class="input-field col s12">
                  <input id="text" type="text" v-model='price'>
                  <label for="text">Price</label>
                </div>
                <div class="input-field col s12">
                  <input id="text" type="text" v-model='stock'>
                  <label for="text">Stock</label>
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
                <a class="btn modal-action modal-close waves-effect waves-green" >Cancel</a>
                <button class="btn waves-effect waves-light teal" type="submit" @click='onUpload'>Post</button>
                <br>
                <br>
              </center>
      				<br>
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
    if (!localStorage.hasOwnProperty('role')) {
      window.location.replace('/');
    } else {
      this.getAllData()
    }
  },
  data(){
    return {
      itemName: '',
      price: '',
      stock: '',
      image: '',
      formdata: new FormData(),
      allData: null
    }
  },
  methods: {
    onChange (event) {
      this.image = event.target.files[0]
    },
    onUpload() {
      // upload file
      this.formdata.set('item', this.image)
      this.formdata.set('name', this.itemName)
      this.formdata.set('price', this.price)
      this.formdata.set('stock', this.stock)

      axios.post('http://localhost:3000/upload', this.formdata)
      .then(response => {
        swal({
          title: "Yosh!",
          text: "Successfully add new item",
          icon: "success",
        });
        this.itemName = ''
        this.price = ''
        this.stock = ''
        this.image = ''
        this.location.reload()
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

    getAllData(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/'
      })
      .then(data => {
        this.allData = data.data.data
      })
    },

    deleteItem(event){

      axios({
        method: 'delete',
        url: `http://localhost:3000/${event.data._id}`
      })
      .then(() => {
        this.getAllData()
        this.location.reload()
      })
    }
  }
}
</script>

<style scoped>
.modal {
  overflow: hidden;
  width: 35%;
  height: 500px;
  margin-top: 0px;
  padding: 0 0 0 0;
  max-height: 100%;
}

.container-modal{
  margin: 0 0 0 0;
  width: 455px;
  height: 100%;
}

h5
{
	font-weight: 400;
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
