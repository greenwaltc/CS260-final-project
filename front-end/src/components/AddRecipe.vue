<template>
  <div class="add-recipe">
    <transition v-if="show" name="modal">
      <div class="modal-mask">
        <div class="modal-container">
          <form class="pure-form" @submit.prevent="upload">
            <legend>Add a recipe to your collection!</legend>
            <fieldset>
              <input v-model="name" placeholder="Name" />
            </fieldset>
            <fieldset>
              <textarea
                name="ingredients"
                id="ingredients-textarea"
                cols="30"
                rows="10"
                v-model="ingredients"
                placeholder="Ingredients"
              ></textarea>
            </fieldset>
            <fieldset>
              <textarea
                name="directions"
                id="directions-textarea"
                cols="30"
                rows="20"
                v-model="directions"
                placeholder="Directions"
              ></textarea>
            </fieldset>
            <fieldset>
              <p v-if="error" class="error">{{ error }}</p>
            </fieldset>
            <fieldset class="buttons">
              <button type="button" @click="close" class="pure-button">
                Close
              </button>
              <button
                type="submit"
                class="pure-button pure-button-primary right"
              >
                <p>Add Recipe</p>
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddRecipe",
  props: {
    show: Boolean,
    collection: Object,
  },
  data() {
    return {
      name: "",
      ingredients: "",
      directions: "",
      error: "",
    };
  },
  methods: {
    close() {
      this.name = "";
      this.ingredients = "";
      this.directions = "";
      this.$emit("close");
    },
    async upload() {
      try {
        await axios.post("/api/recipes", {
          collectionID: this.collection._id,
          name: this.name,
          ingredients: this.ingredients,
          directions: this.directions,
        });
        this.name = "";
        this.description = "";
        this.ingredients = "";
        this.directions = "";
        this.$emit("uploadFinished");
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
  },
};
</script>

<style>
#directions-textarea {
  height: 300px !important;
}
</style>