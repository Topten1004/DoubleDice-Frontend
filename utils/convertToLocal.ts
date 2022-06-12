import moment from 'moment-timezone'

export const handleUTCConvertToLocalTime = (time: string) => {
  let localTOpen
  localTOpen = moment.utc(moment.unix(Number(time)).format('YYYY-MM-DD HH:mm:ss')).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
  return localTOpen
}