<template>
  <div class="container disable-scroll">
    <div class="collection-banner">
      <div class="collection-info">
        <div class="collection-name">{{ collectionName }}</div>
        <div class="collection-description">{{ collectionDescription }}</div>
      </div>
      <div class="collection-recipes">
        <div
          class="collection-recipe-banner-item"
          v-for="recipe in recipes"
          :key="recipe._id"
          @click.prevent="selectRecipe(recipe)"
        >
          {{ recipe.name }}
        </div>
        <button type="button" @click="addRecipe" class="pure-button">
          + NEW RECIPE
        </button>
      </div>
    </div>

    <div class="recipe-info">
      <div class="recipe-title-view" v-if="selectedRecipe">
        <div id="recipe-title">
          <h2>~~~ {{ selectedRecipe.name }} ~~~</h2>
          <div id="recipe-title-bottom-border"></div>
        </div>
      </div>

      <div class="recipe-content-view" v-if="selectedRecipe">
        <div id="recipe-ingredients">
          <h3>INGREDIENTS</h3>
          <p style="white-space: pre-line">{{ selectedRecipe.ingredients }}</p>
        </div>
        <div id="recipe-content-divider" />
        <div id="recipe-directions">
          <h3>DIRECTIONS</h3>
          <p style="white-space: pre-line">{{ selectedRecipe.directions }}</p>
        </div>
        
      </div>

      <div class="recipe-buttons">
        <button
          v-if="selectedRecipe"
          class="pure-button"
          id="edit-button"
          @click.prevent="showEditRecipe"
        >
          EDIT
        </button>
        <button
          v-if="selectedRecipe"
          class="pure-button"
          id="delete-button"
          @click.prevent="showDeleteRecipe"
        >
          DELETE
        </button>
      </div>
    </div>

    <add-recipe
      :show="show"
      :collection="collection"
      @close="close"
      @uploadFinished="uploadFinished"
    />

    <edit-recipe
      :show="showEdit"
      :recipe="selectedRecipe"
      @close="close"
      @uploadFinished="uploadFinished"
    />

    <transition v-if="showDelete" name="modal">
      <div class="modal-mask">
        <div class="modal-container" id="delete-modal">
          <div class="delete-content">
            Are you sure?
            <div class="delete-buttons">
              <button @click.prevent="close">No</button>
              <button @click="deleteRecipe">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AddRecipe from "./AddRecipe.vue";
import EditRecipe from "./EditRecipe.vue";
import axios from "axios";
export default {
  components: { AddRecipe, EditRecipe },
  name: "CollectionContainer",
  props: {
    collection: Object,
  },
  data() {
    return {
      show: false,
      showEdit: false,
      showDelete: false,
      recipes: [],
      selectedRecipe: null,
      origRecipe: null,
    };
  },
  created() {
    this.getRecipes();
  },
  watch: {
    show: function (n, o) {
      console.log(n + o);
      this.getRecipes();
    },
  },
  computed: {
    collectionName() {
      return this.collection.name;
    },
    collectionDescription() {
      return this.collection.description;
    },
  },
  methods: {
    addRecipe() {
      console.log("Adding recipe");
      this.show = true;
    },
    showEditRecipe() {
      this.showEdit = true;
    },
    showDeleteRecipe() {
      this.showDelete = true;
    },
    close() {
      this.show = false;
      this.showEdit = false;
      this.showDelete = false;
    },
    selectRecipe(recipe) {
      console.log("selecting recipe");
      this.selectedRecipe = recipe;
      console.log(this.selectedRecipe);
    },
    async deleteRecipe() {
      console.log("deleting recipe");
      try {
        await axios.delete("/api/recipes/" + this.selectedRecipe._id);
        this.selectedRecipe = null;
        this.uploadFinished();
      } catch (e) {
        console.log(e);
      }
    },
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes/" + this.collection._id);
        this.recipes = response.data;
      } catch (e) {
        console.log(e);
      }
    },
    uploadFinished() {
      this.getRecipes();
      this.close();
    },
  },
};
</script>

<style>
.container {
  height: 100%;
}

/* .disable-scroll {
  overflow: hidden;
} */

/* Collection Banner */
.collection-banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #808080;
  margin-bottom: 2.5em;
}

.collection-info {
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.collection-banner .collection-name {
  color: white;
  font-weight: 900;
  font-size: 200%;
  margin-bottom: 20px;
}

.collection-banner .collection-description {
  color: white;
  font-size: 20px;
  max-width: 700px;
  padding: 5px;
}

.collection-recipes {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: auto;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to top,
    #191818,
    #1f1e1e,
    #252424,
    #2b2a2a,
    #313030,
    #313030,
    #313030,
    #313030,
    #2b2a2a,
    #252424,
    #1f1e1e,
    #191818
  );
  color: white;
  box-shadow: 0px 0px 15px 0px rgb(87, 86, 86);
}

.collection-recipe-banner-item {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  max-width: 300px;
  border-radius: 3px;
}

.collection-recipe-banner-item:hover,
.collection-recipe-banner-item:focus {
  background: #494747;
}

.collection-recipes button {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 8px;
  padding-right: 8px;
}

/* Recipe view */
.recipe-info {
  /* height: 100%; */
  overflow: auto;
  background: rgb(241, 241, 241);
}

.recipe-title-view {
  max-width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
}

#recipe-title-bottom-border {
  border: 1px solid rgb(168, 168, 168);
}

.recipe-content-view {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#recipe-ingredients,
#recipe-directions {
  max-width: 35%;
  padding: 50px;
  padding-top: 0px;
}

#recipe-ingredients h3,
#recipe-directions h3 {
  text-align: center;
  margin: 0;
}

#recipe-ingredients {
  text-align: left;
}

#recipe-content-divider {
  border: 1px solid rgb(168, 168, 168);
}

/* Modification buttons */
.recipe-buttons {
  display: flex;
  position: absolute;
  left: 300px;
  margin-top: 0px;
}

#edit-button,
#delete-button {
  margin: 15px;
  box-shadow: 0px 0px 5px 0px rgb(87, 86, 86);
}

#edit-button {
  background: rgb(25, 150, 25);
}

#delete-button {
  background: rgb(194, 44, 44);
}

#edit-button:hover {
  background: rgb(22, 95, 22);
}

#delete-button:hover {
  background: rgb(134, 40, 40);
}

/* Delete modal */
#delete-modal {
  margin: auto auto;
}

.delete-buttons {
  display: flex;
  justify-content: space-around;
}
</style>