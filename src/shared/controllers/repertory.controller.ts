import { NextResponse } from "next/server";
import { RepertoryService } from "../services/repertory.service";

export class RepertoryController {
  static async getAll() {
    try {
      const items = await RepertoryService.getAll();
      return NextResponse.json(items);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao buscar repertório" },
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
      const item = await RepertoryService.getById(id);
      return NextResponse.json(item);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao buscar espetáculo" },
        { status: 500 }
      );
    }
  }

  static async create(req: Request) {
    try {
      const body = await req.json();

      // Validação
      const requiredFields = ["title", "subtitle", "image_url"];
      for (const field of requiredFields) {
        if (!body[field]) {
          return NextResponse.json(
            { error: `O campo ${field} é obrigatório.` },
            { status: 400 }
          );
        }
      }

      const newItem = await RepertoryService.create(body);
      return NextResponse.json(newItem, { status: 201 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao criar espetáculo" },
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
      const updatedItem = await RepertoryService.update(id, body);
      return NextResponse.json(updatedItem);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao atualizar espetáculo" },
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
      await RepertoryService.delete(id);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao excluir espetáculo" },
        { status: 500 }
      );
    }
  }
}
