import { AppointementsRepository } from "../repositories/appointments-reposity";
import { Appointment } from "./../entities/appointment";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointementsRepository: AppointementsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointementsRepository.findOverLappingAppointment(
        startsAt,
        endsAt
      );

    if(overlappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }

    const appointment = new Appointment({
      customer,
      endsAt,
      startsAt,
    });

    await this.appointementsRepository.create(appointment);

    return appointment;
  }
}
