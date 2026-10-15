import { describe, expect, it } from "vitest";
import { divergencias } from "./comprovativo.server";

const base = { valor: 605, referencia: "ABC123", destinatario: null, data: null, legivel: true };

describe("divergencias", () => {
  it("sem divergência quando valor igual ao total", () => {
    expect(divergencias(base, 605)).toEqual([]);
  });
  it("sinaliza valor diferente do total", () => {
    expect(divergencias({ ...base, valor: 550 }, 605)).toHaveLength(1);
  });
  it("sinaliza referência em falta", () => {
    expect(divergencias({ ...base, referencia: null }, 605)).toHaveLength(1);
  });
});
