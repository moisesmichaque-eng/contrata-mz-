import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

// Igual EasyPay - upload do PDF
export async function uploadContrato(pdfBlob: Blob, nome: string) {
  const path = `${Date.now()}-${nome}.pdf`
  const { data, error } = await supabase.storage.from('contratos').upload(path, pdfBlob)
  if (error) throw error
  const { data: url } = supabase.storage.from('contratos').getPublicUrl(path)
  return url.publicUrl
}

// Tabela contratos - igual pedidos
export async function salvarContrato(dados: any, pdfUrl: string) {
  const { data, error } = await supabase.from('contratos').insert({
    dados, pdf_url: pdfUrl, status: 'pago', tipo: 'domestica'
  }).select().single()
  if (error) throw error
  return data
}
