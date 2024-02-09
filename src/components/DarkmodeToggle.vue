<script setup lang="ts">
import { useDarkmode } from '@/composables/useDarkmode';

const { isDarkmodeEnabled, setStoredIsDarkmodeEnabled } = useDarkmode();

async function toggleDarkmode() {
    isDarkmodeEnabled.value = !isDarkmodeEnabled.value;
    setStoredIsDarkmodeEnabled(isDarkmodeEnabled.value);
};
</script>

<template>
    <div class="mode-toggle"  @click="toggleDarkmode">
        <div class="mode-toggle-switch">
            <svg v-if="isDarkmodeEnabled" class="moon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
            </svg>
            <svg v-else class="sun" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
        </div>
    </div>
</template>

<style lang="scss">
.mode-toggle {
    width: 50px;
    height: 28px;
    position: relative;
    border-color: $darkmode-toggle_secondary-color;
    background-color: $darkmode-toggle_primary-color;
    border-width: 1px;
    border-radius: 100px;
    cursor: pointer;
    user-select: none;
    box-sizing: content-box;
}
.mode-toggle-switch {
    width: 22px;
    height: 22px;
    border-radius: 100px;
    background-color: $darkmode-toggle_secondary-color;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: all 128ms ease-in-out;
    display: grid;
    place-items: center;

    & > svg {
        color: $darkmode-toggle_primary-color;

        &.sun {
            height: 17px;
        }

        &.moon {
            height: 15px;
        }
    }
}

.mode-toggle-switch {
  transform: $darkmode-toggle_transform;
}
.darkmode .mode-toggle {
  border: 1px solid black;
  background-color: white;
}
.darkmode .mode-toggle-switch {
  background-color: black;
}
.darkmode .mode-toggle-switch > svg {
  color: white;
}

</style>