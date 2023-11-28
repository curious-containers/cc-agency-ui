import moment from 'moment';

export default {
    experimentState(batches) {
        if (batches.every(batch => batch.state === 'scheduled')) {
            return 'registered'
        }
        if (batches.every(batch => ['registered', 'scheduled'].includes(batch.state))) {
            return 'scheduled'
        }
        if (batches.some(batch => batch.state === 'processing')) {
            return 'processing'
        }
        if (batches.every(batch => ['succeeded', 'failed', 'cancelled'].includes(batch.state)) && batches.some(batch => batch.state === 'failed')) {
            return 'failed'
        }
        if (batches.every(batch => ['succeeded', 'cancelled'].includes(batch.state)) && batches.some(batch => batch.state === 'succeeded')) {
            return 'succeeded'
        }
        if (batches.every(batch => batch.state === 'cancelled')) {
            return 'cancelled'
        }
        return 'registered'
    },
    formatDate(millis) {
        let date = new Date(millis * 1000)
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
}