import { NextResponse } from "next/server";
import { ContentsService } from "../services/contents.service";

export class ContentsController {
  static async getAll() {
    try {
      const contents = await ContentsService.getAll();
      return NextResponse.json(contents);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao buscar conteúdos do site" },
        { status: 500 }
      );
    }
  }

  static async upsert(req: Request) {
    try {
      const body = await req.json();

      // Pode receber tanto um único objeto quanto uma lista de objetos
      if (Array.isArray(body)) {
        // Validação da lista
        for (const item of body) {
          const requiredFields = ["section", "key", "value", "type"];
          for (const field of requiredFields) {
            if (!item[field]) {
              return NextResponse.json(
                { error: `Cada item deve conter o campo ${field}.` },
                { status: 400 }
              );
            }
          }
        }
        const updatedContents = await ContentsService.upsertMany(body);
        return NextResponse.json(updatedContents);
      } else {
        // Validação de item único
        const requiredFields = ["section", "key", "value", "type"];
        for (const field of requiredFields) {
          if (!body[field]) {
            return NextResponse.json(
              { error: `O campo ${field} é obrigatório.` },
              { status: 400 }
            );
          }
        }
        const updatedContent = await ContentsService.upsert(body);
        return NextResponse.json(updatedContent);
      }
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Erro ao atualizar conteúdo do site" },
        { status: 500 }
      );
    }
  }
}
