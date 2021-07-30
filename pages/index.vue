<template>
    <WeatherItem
        :weatherData="getCityList.list"
    />
</template>

<script>
import WeatherItem from '@/components/WeatherItem.vue'
export default {
    name: 'Index',
    components: {
        WeatherItem
    },
    computed: {
        getCityList () {
            return this.$store.getters.getCityList
        }
    },
    created () {
        if (!this.getCityList.list) {
            this.$store.dispatch('weatherCityList')
        }
    }
}
</script>

<style lang="sass">
    
</style>
