import { NextResponse } from "next/server";
import { EventsService } from "../services/events.service";

export class EventsController {
  static async getAll() {
    try {
      const events = await EventsService.getAll();
      return NextResponse.json(events);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao buscar eventos" },
        { status: 500 }
      );
    }
  }

  static async getById(id: string) {
    try {
      if (!id) {
        return NextResponse.json(
          { error: "ID é obrigatório" },
          { status: 400 }
        );
      }
      const event = await EventsService.getById(id);
      return NextResponse.json(event);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao buscar evento" },
        { status: 500 }
      );
    }
  }

  static async create(req: Request) {
    try {
      const body = await req.json();

      // Validação simples
      const requiredFields = ["date_day", "date_month", "date_year", "title", "location", "type"];
      for (const field of requiredFields) {
        if (!body[field]) {
          return NextResponse.json(
            { error: `O campo ${field} é obrigatório.` },
            { status: 400 }
          );
        }
      }

      const newEvent = await EventsService.create(body);
      return NextResponse.json(newEvent, { status: 201 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao criar evento" },
        { status: 500 }
      );
    }
  }

  static async update(id: string, req: Request) {
    try {
      if (!id) {
        return NextResponse.json(
          { error: "ID é obrigatório" },
          { status: 400 }
        );
      }
      const body = await req.json();
      const updatedEvent = await EventsService.update(id, body);
      return NextResponse.json(updatedEvent);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao atualizar evento" },
        { status: 500 }
      );
    }
  }

  static async delete(id: string) {
    try {
      if (!id) {
        return NextResponse.json(
          { error: "ID é obrigatório" },
          { status: 400 }
        );
      }
      await EventsService.delete(id);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao excluir evento" },
        { status: 500 }
      );
    }
  }
}
