<template>
  <div class="add-collection">
    <transition v-if="show" name="modal">
      <div class="modal-mask">
        <div class="modal-container">
          <form class="pure-form" @submit.prevent="upload">
            <legend>Add a collection to your database!</legend>
            <fieldset>
              <input v-model="name" placeholder="Name" />
            </fieldset>
            <fieldset>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                v-model="description"
                placeholder="Description"
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
                <p>Add</p>
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
  name: "AddCollection",
  props: {
    show: Boolean,
  },
  data() {
    return {
      name: "",
      description: "",
      error: "",
    };
  },
  methods: {
    close() {
      (this.name = ""), (this.description = ""), this.$emit("close");
    },
    async upload() {
      try {
        await axios.post("/api/collections", {
          name: this.name,
          description: this.description,
        });
        this.name = "";
        this.description = "";
        this.$emit("uploadFinished");
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
  },
};
</script>

<style>
</style>