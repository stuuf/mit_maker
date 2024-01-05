<template>
    <div class="font-sans text-5xl font-extralight text-white text-center m-10 z-20" :style="{ textShadow: `0px 0px 20px rgba(${shadowColor}, 0.5)` }">
        <h1 id="greeting" class="text-9xl font-bold m-7 wrapper">{{ generateGreeting }},</h1>
        <span id="sentence" class="wrapper">This website has been visited</span>&ensp;

        <span id="counter" class="bg-clip-text font-bold text-7xl transition-all inline-block" :style="{ textShadow: `none`, filter: 'brightness(1.3)',
        backgroundImage: `linear-gradient(45deg, rgb(${colorScheme[3][0]},${colorScheme[3][1]},${colorScheme[3][2]}), 
        rgb(${colorScheme[4][0]},${colorScheme[4][1]},${colorScheme[4][2]})`, 
        backgroundClip: 'text', color: 'rgba(255, 255, 255, 0'}">{{ counter }}</span>
        &ensp;<span id="end" class="wrapper">times</span>
    </div>
</template>



<script>
    import axios from 'axios'

    export default {
        name: 'Header',
        props: [
            'counter',
            'colorScheme'
        ],
        data() {
            return {

            }
        },
        methods: {
            
            animation() {
                
                let textWrappers = document.querySelectorAll('.wrapper');
                
                for (let i = 0; i < textWrappers.length; i++) {
                    textWrappers[i].innerHTML = textWrappers[i].textContent.replace(/\S/g, "<span class='l opacity-0 inline-block'>$&</span>");
                }


                let timeline = anime.timeline({
                })
                timeline.add({
                    targets: '#greeting .l',
                    opacity: [0, 1],
                    scale: [0.7, 1],
                    easing: 'easeInOutQuad',
                    duration: 600,
                    delay: anime.stagger(100),
                }, 0);

                timeline.add({
                    targets: '#sentence .l',
                    opacity: [0, 1],
                    scale: [0.7, 1],
                    easing: 'easeInOutQuad',
                    duration: 600,
                    delay: anime.stagger(50),
                }, 2000);

                timeline.add({
                    targets: '#counter',
                    opacity: [0, 1],
                    easing: 'easeInOutSine',
                    duration: 1000,
                }, 3200);

                

                timeline.add({
                    targets: '#end .l',
                    opacity: [0, 1],
                    scale: [0.7, 1],
                    easing: 'easeInOutQuad',
                    duration: 600,
                    delay: anime.stagger(50),
                }, 4000);

            },

            bruhAnimation() {
                var count = document.querySelector('#counter');

                var obj = {
                    prop: 0,
                }

                anime({
                    targets: obj,
                    prop: [0, this.counter],
                    easing: 'easeInOutSine',
                    duration: 2000,
                    delay: 3200,
                    update: function() {
                        count.textContent = Math.floor(obj.prop);
                    }
                });
            },
            
        },
        computed: {
            time_s() {
                if (this.counter === 1)
                    return 'time'
                else
                    return 'times'
            },

            shadowColor() {
                return `${this.colorScheme[2][0]},${this.colorScheme[2][1]},${this.colorScheme[2][2]}`
            },

            generateGreeting() {
                let greetings = {
                    English: 'Hello',
                }

                let keys = Object.keys(greetings);
                let randomKey = keys[Math.floor(keys.length * Math.random())];
                return greetings[randomKey]

            },
        },

        mounted() {
            this.animation();
            this.bruhAnimation();
        },

     
    }
</script>