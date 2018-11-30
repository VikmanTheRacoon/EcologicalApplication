<template>
  <div class="container">
    <h1>Animals in Danger</h1>
    <div class="created">
      <label for="create-post">Add an anial</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create  a post">
      <button v-on:click="createAnimal"> Animal in Danger</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
      <div class="posts-container">
        <div class="post"
        v-for="(animal, index) in animals"
        v-bind:item="animal"
        v-bind:index="index"
        v-bind:key="animal._id"
        v-on:dblclick="deleteAnimal(animal._id)"
        >
        {{`${animal.createdAt.getDate()}/${animal.createdAt.getMonth()}/${animal.createdAt.getFullYear()}`}}
        <p class="text">{{animal.text}}</p>
        </div>
      </div>
  </div>
</template>

<script>
import AnimalService from '../AnimalService'
export default {
  name: "AnimalComponentVue",
  data() {
    return {
      animals: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.animals = await AnimalService.getAnimals();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods:{
    async createAnimal(){
      await AnimalService.insertAnimal(this.text);
      this.animals = await AnimalService.getAnimals();
    },
    async deleteAnimal(id){
      await AnimalService.deleteAnimal(id);
      this.animals = await AnimalService.getAnimals();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
