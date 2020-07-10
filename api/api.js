import request from './request.api'

export const getHome = () => {
    return request.get('home/index')
}
