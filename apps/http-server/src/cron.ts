import cron from 'node-cron'
import { deleteProcessedMessage } from './utils/deleteProcessedMessage.js'

cron.schedule("*/5 * * * *" , deleteProcessedMessage)