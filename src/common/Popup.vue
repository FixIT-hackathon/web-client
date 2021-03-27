<template>
  <transition name="popup-transition">
    <div class="popup" v-if="isShown">
      <div
        class="popup__backdrop"
        @click="closeSelf"
      />
      <div class="popup__content">
        <slot name="content" />
      </div>
    </div>
  </transition>
</template>

<script>
const EVENTS = {
  updateIsShown: 'update:isShown',
}

export default {
  name: 'popup',

  props: {
    isShown: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    closeSelf () {
      this.$emit(EVENTS.updateIsShown, false)
    },
  },
}
</script>

<style lang="scss" scoped>
$z-popup: 10;
$z-backdrop: -1;
.popup {
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  z-index: $z-popup;
}

.popup__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: $z-backdrop;
  background-color: rgba(0, 0, 0, 0.1);
}

.popup__content {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  width: 54rem;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.1);
}

.popup-transition-enter-active {
  animation-duration: 0.2s;

  /* stylelint-disable selector-nested-pattern */
  & > .popup__backdrop {
    animation: popup-keyframes 0.2s ease-in-out;
  }

  & > .popup__content {
    animation: popup-keyframes 0.2s ease-in-out;
  }
  /* stylelint-enable selector-nested-pattern */
}

.popup-transition-leave-active {
  animation-duration: 0.13s;

  /* stylelint-disable selector-nested-pattern */
  & > .popup__backdrop {
    animation: popup-keyframes 0.2s ease-in-out reverse;
  }

  & > .popup__content {
    animation: popup-keyframes 0.2s ease-in-out reverse;
  }
  /* stylelint-enable selector-nested-pattern */
}

@keyframes popup-keyframes {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
