<template>
    <div class="flex flex-col justify-around items-center w-screen mb-16">
        <div class="font-sans text-base font-extralight text-white text-center z-20 transition-all">Out of the last 1000 visits, <b>{{ localPercent.toFixed(2) }}%</b> have been deleted</div>
        <div class="font-sans text-base font-extralight text-white text-center z-20 transition-all">In total, <b>{{ totalPercent.toFixed(2) }}%</b> of visits have been deleted</div>
        <Transition>
            <div class="z-20 flex" v-show="!submitted && !currentDeleted">
                <form @submit.prevent="checkSubmit">
                    <input type="text" ref="msg" class="border w-96 rounded-full h-12 text-center shadow hover:shadow-lg mt-8 p-7 font-sans text-lg" placeholder="Leave a message" maxlength="60"
                        @input="$emit('update:modelValue', $event.target.value)"
                        :style="{ border: `4px solid rgba(${colorScheme[2][0]},${colorScheme[2][1]},${colorScheme[2][2]}, .6)` }">
                    <button type="submit" class="hidden"></button>
                </form>
            </div>
        </Transition>
    </div>
</template>




<script>
    import axios from 'axios'

    export default {
        name: 'MessageField',
        data() {
            return {
                message: '',
                submitted: false
            }
        },
        props: ['colorScheme' , 'localPercent', 'totalPercent', 'currentDeleted'],
        emits: ['update:modelValue', 'submit'],
        methods: {
            checkSubmit() {
                let msg = this.$refs.msg.value;
                if (msg !== '') {
                    this.$emit('submit', msg);
                    this.submitted = true;
                }
            }
        },
   
    }
</script>

<style>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>