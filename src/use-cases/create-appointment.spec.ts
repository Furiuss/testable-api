import {describe, expect, it} from 'vitest'
import { Appointment } from '../entities/appointment'
import { InMemmoryAppointments } from '../repositories/in-memory/in-memory-appointments-repository'
import { getFutureDate } from '../test/utils/get-future-date'
import { CreateAppointment } from './create-appointment'

describe("Create an Appointement", () => {
  it("should be able to create an Appointement", () => {
    const appointementsRepository = new InMemmoryAppointments()
    const createAppointement = new CreateAppointment(appointementsRepository)

    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-09')

    expect(createAppointement.execute({
      customer: 'André Messias',
      startsAt,
      endsAt,
    })).resolves.toBeInstanceOf(Appointment)
  })
})

