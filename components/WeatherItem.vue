<template>
    <div class="weather" @scroll="scrollSlider" ref="weather">
        <NuxtLink
            :to="`/detail/${city.id}`"
            v-for="city in weatherData"
            :key="city.id"
            class="weather__item"
        >
            <div class="weather__item-container">
                <div class="weather__city-name">
                    {{city.name}}
                </div>
                <div class="weather__icon">
                    <img :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`" :alt="city.name">
                </div>
                <div class="weather__degree">
                    {{city.main.temp}}°C 
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
export default {
    name: 'WeatherItem',
    props: {
        weatherData: {}
    },
    methods: {
        scrollSlider (e) {
            const slider = e.target
            const sliderLeft = slider.scrollLeft

            const atSnappingPoint = e.target.scrollLeft % e.target.offsetWidth === 0;
            const timeOut         = atSnappingPoint ? 0 : 150; //see notes

            clearTimeout(e.target.scrollTimeout);
            e.target.scrollTimeout = setTimeout(() => {
                this.$store.commit('updateCityList', {
                    ...this.getCityList,
                    scrollLeft: sliderLeft
                })
            }, timeOut);
        }
    },
    computed: {
        getCityList () {
            return this.$store.getters.getCityList
        }
    },
    mounted () {
        this.$refs.weather.scrollLeft = this.getCityList.scrollLeft
    }
}
</script>

<style lang="sass" scoped>
    .weather
        display: flex
        width: 100%
        height: 100vh
        overflow-x: scroll
        scroll-snap-type: x mandatory

        &__item
            background: linear-gradient(#8dcdba, #eee07a, #f0eebc)
            width: 33.333%
            display: flex
            align-items: center
            justify-content: center
            color: #363c80
            text-align: center
            flex-shrink: 0
            scroll-snap-align: center

        &__city-name
            font-size: 40px
            text-transform: uppercase

        &__degree
            font-size: 24px

    @media (max-width: 500px)
        .weather
            &__item
                width: 50%

    @media (max-width: 350px)
        .weather
            &__item
                width: 100%
</style>
