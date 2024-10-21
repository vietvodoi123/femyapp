import axiosClient from './Fetcher'

export const SendOtpApi = {
  sendOtp(body) {
    return axiosClient.post('/send-otp', body)
  },
  verifyOtp(body) {
    return axiosClient.post('verify-otp', body)
  },
}
