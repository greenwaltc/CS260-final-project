<template>
  <div class="home">
    <div class="header">
      <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <a class="pure-menu-heading" href="">Recipe Book</a>

        <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-selected">
            <button
              class="pure-button pure-button-primary"
              @click.prevent="showRegisterForm"
            >
              Register
            </button>
          </li>
          <li class="pure-menu-item pure-menu-selected">
            <button
              class="pure-button button-secondary"
              @click.prevent="showLoginForm"
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="splash-container" style="border: 1px solid black">
      <div class="splash">
        <h1 class="splash-head">Digital Recipe Storage</h1>
        <p class="splash-subhead">
          Login to view your recipe collections. Register to begin storing your
          recipes digitally.
        </p>
      </div>
    </div>

    <transition v-if="showLogin || showRegister" name="modal">
      <div class="modal-mask">
        <div class="modal-container">
          <form class="pure-form" @submit.prevent="loginRegister">
            <legend v-if="showLogin">Login</legend>
            <legend v-if="showRegister">Register</legend>
            <fieldset v-if="showRegister">
              <input v-model="fName" placeholder="First Name" />
            </fieldset>
            <fieldset v-if="showRegister">
              <input v-model="lName" placeholder="Last Name" />
            </fieldset>
            <fieldset>
              <input v-model="username" placeholder="Username" />
            </fieldset>
            <fieldset>
              <input
                v-model="password"
                placeholder="Password"
                type="password"
              />
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
                <p v-if="showRegister">Register</p>
                <p v-if="showLogin">Login</p>
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
// @ is an alias to /src

export default {
  name: "LandingPage",
  components: {},
  data() {
    return {
      showLogin: false,
      showRegister: false,
      fName: "",
      lName: "",
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    showLoginForm() {
      this.showLogin = true;
    },
    showRegisterForm() {
      this.showRegister = true;
    },
    close() {
      this.error = "";
      this.showLogin = false;
      this.showRegister = false;
    },
    loginRegister() {
      if (this.showRegister) {
        this.register();
      }
      else {
        this.login();
      }
    },
    async register() {
      this.error = "";
      this.errorLogin = "";
      if (!this.fName || !this.lName || !this.username || !this.password) {
        this.error = "Please enter all required fields.";
        return;
      }
      try {
        let response = await axios.post("/api/users", {
          firstName: this.fName,
          lastName: this.lName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = "";
      if (!this.username || !this.password) {
        this.error = "Please enter required fields.";
        return;
      }
      try {
        let response = await axios.post("/api/users/login", {
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  },
};
</script>

<style>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

/*
 * -- BASE STYLES --
 * Most of these are inherited from Base, but I want to change a few.
 */
body {
  line-height: 1.7em;
  color: #7f8c8d;
  font-size: 13px;
}

h1,
h2,
h3,
h4,
h5,
h6,
label {
  color: #34495e;
}

.pure-img-responsive {
  max-width: 100%;
  height: auto;
}

/*
 * -- LAYOUT STYLES --
 * These are some useful classes which I will need
 */
.l-box {
  padding: 1em;
}

.l-box-lrg {
  padding: 2em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.is-center {
  text-align: center;
}

/*
 * -- PURE FORM STYLES --
 * Style the form inputs and labels
 */
.pure-form label {
  margin: 1em 0 0;
  font-weight: bold;
  font-size: 100%;
}

.pure-form input[type] {
  border: 2px solid #ddd;
  box-shadow: none;
  font-size: 100%;
  width: 100%;
  margin-bottom: 1em;
}

/*
 * -- PURE BUTTON STYLES --
 * I want my pure-button elements to look a little different
 */
.pure-button {
  background-color: #1f8dd6;
  color: white;
  padding: 0.5em 2em;
  border-radius: 5px;
  margin-top: 3px;
}

a.pure-button-primary {
  background: white;
  color: #1f8dd6;
  border-radius: 5px;
  font-size: 120%;
}

.home .header li button {
  margin-left: 5px;
  margin-right: 5px;
}

.button-secondary {
  background-color: #484848;
}

/*
 * -- MENU STYLES --
 * I want to customize how my .pure-menu looks at the top of the page
 */

.home-menu {
  padding: 0.5em;
  text-align: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.home-menu {
  background: #2d3e50;
}
.pure-menu.pure-menu-fixed {
  /* Fixed menus normally have a border at the bottom. */
  border-bottom: none;
  /* I need a higher z-index here because of the scroll-over effect. */
  z-index: 4;
}

.home-menu .pure-menu-heading {
  color: white;
  font-weight: 400;
  font-size: 120%;
}

.home-menu .pure-menu-selected a {
  color: white;
}

.home-menu a {
  color: #6fbef3;
}
.home-menu li a:hover,
.home-menu li a:focus {
  background: none;
  border: none;
  color: #aecfe5;
}

/*
 * -- SPLASH STYLES --
 * This is the blue top section that appears on the page.
 */

.splash-container {
  background: #1f8dd6;
  z-index: 1;
  overflow: hidden;
  /* The following styles are required for the "scroll-over" effect */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed !important;
}

.splash {
  /* absolute center .splash within .splash-container */
  width: 80%;
  height: 50%;
  margin: auto;
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  text-transform: uppercase;
}

/* This is the main heading that appears on the blue section */
.splash-head {
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: 3px solid white;
  padding: 1em 1.6em;
  font-weight: 100;
  border-radius: 5px;
  line-height: 1em;
}

/* This is the subheading that appears on the blue section */
.splash-subhead {
  color: white;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}
.modal-container {
  width: 25%;
  height: max-content;
  margin-top: 80px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.5s ease;
}
/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
/* Form */
form {
  font-size: 11pt;
}
input {
  width: 100%;
}
textarea {
  width: 100%;
  height: 100px;
}
.placeholder {
  background: #f0f0f0;
  width: 200px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}
.placeholder:hover {
  background: #e0e0e0;
}
.fileInput {
  display: none;
}
img {
  width: 200px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}

.modal-mask .modal-container .pure-form button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 0;
}

/* Error */
.error {
  color: red;
}

/* -- Mobile (smartphone) devies --
*/
@media (max-width: 47em) {
  .home-menu {
    display: flex;
    flex-direction: column;
  }
  .modal-container {
    width: 95%;
  }
}

/*
 * -- TABLET (AND UP) MEDIA QUERIES --
 * On tablets and other medium-sized devices, we want to customize some
 * of the mobile styles.
 */
@media (min-width: 48em) {
  /* We increase the body font size */
  body {
    font-size: 16px;
  }

  /* We can align the menu header to the left, but float the
    menu items to the right. */
  .home-menu {
    text-align: left;
  }
  .home-menu ul {
    float: right;
  }

  /* We increase the height of the splash-container */
  /*    .splash-container {
        height: 500px;
    }*/

  /* We decrease the width of the .splash, since we have more width
    to work with */
  .splash {
    width: 50%;
    height: 50%;
  }

  .splash-head {
    font-size: 250%;
  }

  /* We remove the border-separator assigned to .l-box-lrg */
  .l-box-lrg {
    border: none;
  }
}

/*
 * -- DESKTOP (AND UP) MEDIA QUERIES --
 * On desktops and other large devices, we want to over-ride some
 * of the mobile and tablet styles.
 */
@media (min-width: 78em) {
  /* We increase the header font size even more */
  .splash-head {
    font-size: 300%;
  }
}
</style>
