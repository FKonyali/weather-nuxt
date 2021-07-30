<template>
    <div class="detail">
        <div class="detail__container" v-if="getCityDetail.status === 'SUCCESS'">
            <div class="detail__city-name" v-if="getCityDetailListNoParam">
                {{ getCityDetailList.city.name }}
            </div>
            <WeatherDetail
                :cityList="getCityDetailListNoParam"
                :cityWeather="getCityDetailList.list"
            />
        </div>
    </div>
</template>

<script>
import WeatherDetail from '../../components/WeatherDetail.vue'
export default {
    components: { 
        WeatherDetail 
    },
    name: 'Detail',
    data () {
        return {
            routeID: this.$route.params.id
        }
    },
    created () {
        if ((this.getCityDetail.list && this.getCityDetail.list[this.routeID]) === undefined) {
            this.$store.dispatch('weatherCityDetail', { cityID: this.routeID })
        }
    },
    computed: {
        getCityDetail () {
            return this.$store.getters.getCityDetail
        },
        getCityDetailListNoParam () {
            return this.getCityDetail.list
        },
        getCityDetailList () {
            return this.getCityDetail.list[this.routeID]
        }
    }
}
</script>

<style lang="sass" scoped>
    .detail
        background: linear-gradient(#8dcdba, #eee07a, #f0eebc)
        min-height: 100vh
        padding: 20%
        color: #363c80

        &__city-name
            font-size: 40px
            text-transform: uppercase
            margin-bottom: 15px

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