<template>
  <div class="add-recipe">
    <transition v-if="show" name="modal">
      <div class="modal-mask">
        <div class="modal-container">
          <form class="pure-form" @submit.prevent="upload">
            <legend>Edit this recipe!</legend>
            (Note: changes need to be saved to be permanent)
            <fieldset>
              <input v-model="recipe.name" placeholder="Name" />
            </fieldset>
            <fieldset>
              <textarea
                name="ingredients"
                id="ingredients-textarea"
                cols="30"
                rows="10"
                v-model="recipe.ingredients"
                placeholder="Ingredients"
              ></textarea>
            </fieldset>
            <fieldset>
              <textarea
                name="directions"
                id="directions-textarea"
                cols="30"
                rows="20"
                v-model="recipe.directions"
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
                <p>Update Recipe</p>
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
  name: "EditRecipe",
  props: {
    show: Boolean,
    recipe: Object,
  },
  data() {
    return {
      error: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async upload() {
      try {
          console.log(this.recipe);
        await axios.put("/api/recipes", {
          id: this.recipe._id,
          name: this.recipe.name,
          ingredients: this.recipe.ingredients,
          directions: this.recipe.directions
        });
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