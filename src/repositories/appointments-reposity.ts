import { Appointment } from './../entities/appointment';

export interface AppointementsRepository {
  create(appointment: Appointment): Promise<void>;
  findOverLappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>;
}
