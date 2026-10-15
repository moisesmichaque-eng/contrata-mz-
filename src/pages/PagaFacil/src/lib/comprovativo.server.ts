import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch } from "./run-id.server";

const schema = z.object({
  valor: z.number().nullable().describe("Valor transferido em MT"),
  referencia: z.string().nullable().describe("ID/referência da transação M-Pesa"),
  destinatario: z.string().nullable(),
  data: z.string().nullable(),
  legivel: z.boolean(),
});

export type Extracao = z.infer<typeof schema>;

export async function extrairComprovativo(imageDataUrl: string): Promise<Extracao> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("Lovable AI não configurado");
  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    output: Output.object({ schema }),
    maxRetries: 0,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Este é um comprovativo M-Pesa (Moçambique). Extrai o valor transferido em MT (número), a referência/ID da transação, o destinatário e a data. Usa null se não for visível. legivel=false se a imagem não for um comprovativo.",
          },
          { type: "image", image: imageDataUrl },
        ],
      },
    ],
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return await result.output;
}

export function divergencias(ext: Extracao, esperado: number): string[] {
  const d: string[] = [];
  if (!ext.legivel) d.push("Imagem não parece um comprovativo M-Pesa legível");
  if (ext.valor == null) d.push("Valor não encontrado no comprovativo");
  else if (Math.abs(ext.valor - esperado) > 0.5)
    d.push(`Valor pago (${ext.valor} MT) difere do total do pedido (${esperado} MT)`);
  if (!ext.referencia) d.push("Referência da transação não encontrada");
  return d;
}
