<template>
  <div class="dashboard disable-scroll">
    <div class="dashboard-content disable-scroll">
      <div class="collection-menu">
        <div id="collections-menu-label">COLLECTIONS</div>

        <div
          class="menu-item"
          v-for="collection in collections"
          :key="collection._id"
          @click="selectCollection(collection)"
        >
          {{ collection.name }}
        </div>
        <div
          id="add-collection-button"
          @click.prevent="showAddCollectionMulter"
        >
          NEW COLLECTION
        </div>
        <div @click.prevent="logout" id="logout-button">LOGOUT</div>
      </div>

      <div class="collection-container disable-scroll">
        <collection-container
          v-if="selectedCollection"
          :collection="selectedCollection"
        />
        <h1 v-else>Select a collection from the left menu</h1>
      </div>
    </div>

    <!-- Stuff for adding a new collection -->
    <add-collection
      :show="showAddCollection"
      @close="close"
      @uploadFinished="uploadFinished"
    />
  </div>
</template>

<script>
import AddCollection from "@/components/AddCollection.vue";
import CollectionContainer from "@/components/CollectionContainer.vue";
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    AddCollection,
    CollectionContainer,
  },
  data() {
    return {
      showAddCollection: false,
      showAddRecipe: false,
      collections: null,
      selectedCollection: null,
    };
  },
  created() {
    this.getCollections();
  },
  methods: {
    showAddCollectionMulter() {
      this.showAddCollection = true;
    },
    close() {
      this.showAddCollection = false;
      this.showAddRecipe = false;
    },
    uploadFinished() {
      this.close();
      this.getCollections();
    },
    async getCollections() {
      try {
        let response = await axios.get("/api/collections");
        this.collections = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    selectCollection(collection) {
      this.selectedCollection = collection;
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  },
};
</script>

<style>
.dashboard {
  height: 100vh; /* Fills the entire vertical length of the web browser */
  margin-top: -60px;
}

/* Page orientation */

/* Collection menu  */

/*
 * -- DESKTOP (AND UP) MEDIA QUERIES --
 * On desktops and other large devices, we want to over-ride some
 * of the mobile and tablet styles.
 */
@media (min-width: 78em) {
  .disableScroll {
    overflow-y: hidden;
    overflow-x: hidden;
  }
  /* Change page direction to horizontal */
  .dashboard-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  }

  /* Collection Menu */
  .collection-menu {
    width: 250px;
    height: 100%;
    position: fixed;
    background: #191818;
    overflow: auto; /* Enables scrolling within div */
    box-shadow: 2px 0px 15px 0px rgb(87, 86, 86);
  }

  #collections-menu-label {
    color: white;
    padding: 0.6em 0.6em 0.6em 0.6em;
    background: #1f8dd6;
    font-size: 125%;
  }

  .collection-menu .menu-item {
    color: rgb(187, 185, 185);
    border: none;
    padding: 0.6em 0.6em 0.6em 0.6em;
  }

  .collection-menu .menu-item:hover,
  .collection-menu .menu-item:focus {
    background: #333;
  }

  #add-collection-button {
    color: white;
    background: #1f8dd6;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 0.4em 0.4em 0.4em 0.4em;
    border-radius: 3px;
  }

  #add-collection-button:hover,
  #add-collection-button:focus {
    background: #166296;
  }

  #logout-button {
    width: 90%;
    margin-left: 5%;
    color: rgb(231, 228, 228);
    border: none;
    background: rgb(63, 62, 62);
    margin-bottom: 10px;
    padding: 0.4em 0.4em 0.4em 0.4em;
    border-radius: 3px;
  }

  #logout-button:hover,
  #logout-button:focus {
    background: #204e6d;
  }

  /* Collection container */
  .collection-container {
    width: 100%;
    background: rgb(241, 241, 241);
    margin-left: 250px;
    /* border: 3px solid red; */
  }
}
</style>