const apiKey = process.env.API_KEY
const apiRootURL = process.env.API_ROOT_URL

export default {
    weatherCityList (context) {
        const requestOptions = {
            method: 'GET'
        }

        let ReqStatus = ''

        context.commit('updateCityList', {
            ...context.getters.getCityList,
            status: 'PENDING'
        })
        fetch(`${apiRootURL}/box/city?bbox=12,32,15,37,15&appid=${apiKey}`, requestOptions)
            .then(response => {
                ReqStatus = response.status
                return response.json()
            })
            .then(result => {
                if (ReqStatus == 200) {
                    context.commit('updateCityList', {
                        ...context.getters.getCityList,
                        status: 'SUCCESS',
                        ...result
                    })
                } else {
                    context.commit('updateCityList', {
                        ...context.getters.getCityList,
                        status: 'FAILED'
                    })
                }
            })
            .catch(error => {
                console.log('error', error)
                context.commit('updateCityList', {
                    ...context.getters.getCityList,
                    status: 'ERROR',
                    err: error
                })
            })
    },
    weatherCityDetail (context, { cityID }) {
        const requestOptions = {
            method: 'GET'
        }

        let ReqStatus = ''

        context.commit('updateCityDetail', {
            ...context.getters.getCityDetail,
            status: 'PENDING'
        })
        fetch(`${apiRootURL}/forecast?id=${cityID}&appid=${apiKey}`, requestOptions)
            .then(response => {
                ReqStatus = response.status
                return response.json()
            })
            .then(result => {
                if (ReqStatus == 200) {
                    context.commit('updateCityDetail', {
                        ...context.getters.getCityDetail,
                        status: 'SUCCESS',
                        list: {
                            ...context.getters.getCityDetail.list,
                            [cityID]: result
                        }
                    })
                } else {
                    context.commit('updateCityDetail', {
                        ...context.getters.getCityDetail,
                        status: 'FAILED'
                    })
                }
            })
            .catch(error => {
                console.log('error', error)
                context.commit('updateCityDetail', {
                    ...context.getters.getCityDetail,
                    status: 'ERROR',
                    err: error
                })
            })
    }
}
