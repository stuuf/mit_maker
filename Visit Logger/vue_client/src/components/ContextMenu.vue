<template>
    <div>
        <div class="fixed w-screen h-screen z-30 top-0 left-0" @click="$emit('cancel')">
        </div>
        <div class="z-40 w-60 h-40 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-white shadow-white shadow-lg absolute text-center p-3 border border-red-400 font-sans font-extralight" :style="{ boxShadow: `0px 0px 20px rgba(${shadowColor}, 0.5)`, top: `${top}px`, left: `${left}px`}">
                <h1 class="m-3">Are you sure you want to delete this visit?</h1>
                <button class="w-20 h-10 rounded-full bg-red-600 font-sans text-white m-3 hover:bg-red-500 active:scale-110 transition-all" @click="$emit('confirm')">Delete</button>
                <button class="w-20 h-10 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-100 active:scale-110 transition-all font-sans m-3" @click="$emit('cancel')">Cancel</button>
        </div>
    </div>
</template>



<script>
    export default {
        name: 'ContextMenu',
        data() {
            return {
            }
        },
        props: ['colorScheme' , 'top', 'left', 'scale'],
        emits: ['confirm', 'cancel'],
        methods: {
            
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