import { NextResponse } from "next/server";
import { ClassesService } from "../services/classes.service";

export class ClassesController {
  static async getAll() {
    try {
      const classes = await ClassesService.getAll();
      return NextResponse.json(classes);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao buscar turmas" },
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
      const classItem = await ClassesService.getById(id);
      return NextResponse.json(classItem);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao buscar turma" },
        { status: 500 }
      );
    }
  }

  static async create(req: Request) {
    try {
      const body = await req.json();

      // Validação simples
      const requiredFields = [
        "number",
        "title",
        "subtitle",
        "schedule",
        "description",
        "highlights",
        "whatsapp_message",
      ];
      for (const field of requiredFields) {
        if (body[field] === undefined || body[field] === null || body[field] === "") {
          return NextResponse.json(
            { error: `O campo ${field} é obrigatório.` },
            { status: 400 }
          );
        }
      }

      if (!Array.isArray(body.highlights)) {
        return NextResponse.json(
          { error: "Destaques (highlights) deve ser uma lista de textos." },
          { status: 400 }
        );
      }

      const newClass = await ClassesService.create(body);
      return NextResponse.json(newClass, { status: 201 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao criar turma" },
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

      if (body.highlights && !Array.isArray(body.highlights)) {
        return NextResponse.json(
          { error: "Destaques (highlights) deve ser uma lista de textos." },
          { status: 400 }
        );
      }

      const updatedClass = await ClassesService.update(id, body);
      return NextResponse.json(updatedClass);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao atualizar turma" },
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
      await ClassesService.delete(id);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao excluir turma" },
        { status: 500 }
      );
    }
  }
}
