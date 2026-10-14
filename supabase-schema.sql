-- Supabase schema for Contrata.mz admin panel

-- Admin users
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Produtos (faturacao)
CREATE TABLE IF NOT EXISTS produtos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  preco numeric NOT NULL,
  categoria text,
  created_at timestamptz DEFAULT now()
);

-- Viaturas
CREATE TABLE IF NOT EXISTS viaturas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marca text,
  matricula text,
  lugares integer,
  cargaKg integer,
  rota text,
  transportador text,
  activa boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Viagens e reservas
CREATE TABLE IF NOT EXISTS viagens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  viatura_id uuid REFERENCES viaturas(id) ON DELETE SET NULL,
  origem text,
  destino text,
  data_viagem date,
  preco numeric,
  lugares integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  viagem_id uuid REFERENCES viagens(id) ON DELETE CASCADE,
  passageiro jsonb,
  lugar integer,
  estado text DEFAULT 'confirmada',
  created_at timestamptz DEFAULT now()
);

-- Transportadores
CREATE TABLE IF NOT EXISTS transportadores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nomeEmpresa text,
  responsavel text,
  tel text,
  email text,
  nuit text,
  provincia text,
  rotas text,
  username text UNIQUE,
  password_hash text,
  created_at timestamptz DEFAULT now()
);

-- Encomendas
CREATE TABLE IF NOT EXISTS encomendas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem text,
  destino text,
  remetente jsonb,
  destinatario jsonb,
  descricao text,
  qtd integer,
  peso numeric,
  valor numeric,
  status text DEFAULT 'pendente',
  created_at timestamptz DEFAULT now()
);

-- Contratos
CREATE TABLE IF NOT EXISTS contratos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text,
  partes jsonb,
  valor numeric,
  data_inicio date,
  data_fim date,
  estado text DEFAULT 'ativo',
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_transportadores_username ON transportadores(username);
