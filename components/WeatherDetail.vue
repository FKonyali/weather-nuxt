<template>
    <div class="detail__week" v-if="cityList">
        <div class="detail__item" v-for="(city, index) in cityWeather" :key="index">
            <div class="detail__item-container" v-if="city && index % 8 == 1">
                <div class="detail__icon">
                    <img :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`" :alt="city.weather[0].main">
                </div>
                <div class="detail__degree">
                    {{ kelvinToCelcius(city.main.temp) }}°C 
                </div>
                <div class="detail__day">
                    {{ transformDate(city.dt) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeatherDetail',
    props: {
        cityList: {
            type: Object,
            default: {}
        },
        cityWeather: {
            type: Array,
            default: []
        }
    },
    methods: {
        transformDate (timestamp) {
            const a = new Date(timestamp*1000);
            const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            return days[a.getDay()]
        },
        kelvinToCelcius (kelvin) {
            return ((kelvin)-273.15).toFixed(2);
        }
    }
}
</script>

<style lang="sass" scoped>
    .detail
        &__week
            display: flex
            overflow: auto

        &__item
            &-container
                display: flex
                flex-direction: column
                align-items: center
                justify-content: center
</style>
