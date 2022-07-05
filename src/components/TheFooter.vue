<template>
  <!--Footer-->
  <footer class="bg-white">
    <div class="container mx-auto px-8">
      <div class="w-full flex flex-col md:flex-row py-6">
        <div class="flex-1 mb-6 text-black">
          <a
              class="toggleColour text-gray-700 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
          >
            Private Period Tracker
          </a>
        </div>
        <div class="flex-1">
          <p class="uppercase text-gray-500 md:mb-6">Links</p>
          <ul class="list-reset mb-6">
            <router-link to="sign-up" class="mt-2 inline-block mr-2 md:block md:mr-0">
              <a
                  href="#"
                  class="no-underline hover:underline text-gray-800 hover:text-pink-500"
              >Sign Up</a
              >
            </router-link>
            <router-link to="login" class="mt-2 inline-block mr-2 md:block md:mr-0">
              <a
                  href="#"
                  class="no-underline hover:underline text-gray-800 hover:text-pink-500"
              >Log In</a
              >
            </router-link>
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">

              <router-link to="dashboard"
                  href="#"
                  class="no-underline hover:underline text-gray-800 hover:text-pink-500"
              >Dashboard</router-link
              >
            </li>
            <li class="mt-2 inline-block mr-2 md:block md:mr-0">

              <a
                  href="mailto:heckel.max@gmail.com"
                  class="no-underline hover:underline text-gray-800 hover:text-pink-500"
              >Contact</a
              >
            </li>
          </ul>
        </div>
        <div class="flex-1"></div>
        <div class="flex-1">
          <p class="uppercase text-gray-500 md:mb-6">Donate</p>
          <p class="text-sm">Because this service is provided for free, the hosting bill relies upon donations to keep the lights on.
            Please consider donating and do not give more than you can afford. <a href="https://www.paypal.com/donate/?hosted_button_id=DVB5KRL2Z44N6" class="underline text-pink-500"> Click here to donate.</a></p>

        </div>

      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter"
}
</script>