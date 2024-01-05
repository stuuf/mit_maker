<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 z-30 absolute top-3 left-3 opacity-75 hover:opacity-100 active:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2" @click="toggle">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div v-if="open">
            <div class="w-screen h-screen fixed z-40 top-0 left-0 bg-black opacity-50" @click="toggle"></div>
            <div class="z-50 w-1/2 h-fit absolute rounded-md bg-white opacity-100 shadow-white shadow-lg text-center p-3 font-sans font-extralight top-0 left-0 right-0 bottom-0 m-auto" :style="{ boxShadow: `0px 0px 20px rgba(${shadowColor}, 0.5)`}">
                <h1 class="m-5 font-normal text-3xl">Welcome.</h1>
                <p class="m-5 text-left text-lg">
                    This simple website allows you to anonymously leave a digital record.<br>
                    Each <em>"visit"</em> is recorded through a random 3d shape (some are rarer than others).<br>
                    Optionally, you can also leave a message.<br><br>

                    Sounds simple, but there's a twist...<br>
                    <b>Everyone is able to delete any visit by right clicking.</b><br>

                    Enjoy :) <br>
                </p>
            </div>
        </div>
    </div>
</template>



<script>
    export default {
        name: 'ContextMenu',
        data() {
            return {
                open: false,
            }
        },
        props: ['colorScheme'],
        methods: {
            toggle() {
                this.open = !this.open;
            }
        },

        computed: {
            shadowColor() {
                return `${this.colorScheme[2][0]},${this.colorScheme[2][1]},${this.colorScheme[2][2]}`
            },
        }
   
    }
</script>

<style>


</style>