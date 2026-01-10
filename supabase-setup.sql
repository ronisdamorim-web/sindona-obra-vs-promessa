# SQL para criar a tabela no Supabase

-- 1. Criar a tabela site_content
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Inserir registro inicial (usando o content.json atual como base)
INSERT INTO site_content (id, content) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '{
    "statusObra": {
      "progressoConstrutora": 15,
      "dataAtualizacao": "17/12/2025",
      "progressoCaixa": 29.96,
      "textoExplicativo": "Os percentuais apresentados provêm de fontes distintas e podem utilizar critérios diferentes de medição de avanço físico.",
      "etapas": {
        "preliminares": 100,
        "terraplanagem": 50,
        "fundacao": 60,
        "estrutura": 9,
        "alvenaria": 0,
        "hidraulica": 2.3,
        "eletrica": 3,
        "demais": 0
      }
    },
    "informacoesProjeto": {
      "status": "Em construção",
      "localizacao": "Bussocaba — Osasco / SP",
      "endereco": "R. Treze de Setembro, 27 – Jaguaribe, Osasco – SP, 06053-050",
      "tipologias": "2 e 3 quartos",
      "tipologiasSub": "(até 1 suíte)",
      "metragens": "50 a 104 m²",
      "torres": "2 Torres",
      "pavimentos": "Térreo + 20 Andares",
      "vagas": "1 a 3 vagas",
      "terreno": "4.830 m²"
    },
    "textos": {
      "avisoLegal": "Este relatório é um material visual independente, sem vínculo institucional ou comercial com a construtora ou com os produtores de conteúdo citados.",
      "footerLegal": "Este relatório é um material visual independente, sem vínculo institucional ou comercial com a construtora ou com os produtores de conteúdo citados. As imagens foram coletadas exclusivamente de fontes públicas, com os devidos créditos aos autores.",
      "textoEncerramento": "Fim do relatório",
      "autoria": "Relatório visual independente desenvolvido por Roni Amorim de Lima.",
      "contato": "roniamorim.ux@gmail.com"
    },
    "comparacoes": [
      {
        "id": "fachada-principal",
        "titulo": "Evolução da Estrutura",
        "promessa": {
          "imagem": "/images/promessa/render_torres.jpg",
          "label": "Perspectiva Artística",
          "fonte": "Imagem promocional — material institucional do empreendimento"
        },
        "realidade": {
          "imagem": "/images/obra-real/estrutura_real.jpg",
          "label": "Obra Real (Dez 2025)",
          "fonte": "Fonte: Wally Nunes (Walisson Nunes) — YouTube • Frame de vídeo público (2025)"
        },
        "analise": "Comparativo direto entre a projeção artística das torres e o estágio atual da estrutura física.",
        "status": "em-execucao"
      },
      {
        "id": "implantacao-lazer",
        "titulo": "Implantação e Canteiro",
        "promessa": {
          "imagem": "/images/promessa/implantacao.jpg",
          "label": "Masterplan (Implantação)",
          "fonte": "Imagem promocional — material institucional do empreendimento"
        },
        "realidade": {
          "imagem": "/images/obra-real/implantacao_real.jpg",
          "label": "Vista Aérea (Drone)",
          "fonte": "Fonte: Wally Nunes (Walisson Nunes) — YouTube • Frame de vídeo público (2025)"
        },
        "analise": "Vista aérea abrangente que permite observar a distribuição do canteiro de obras.",
        "status": "em-execucao"
      }
    ],
    "galerias": {
      "promessa": [],
      "obraReal": []
    }
  }'::jsonb
);

-- 3. Ativar Row Level Security (RLS)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 4. Política: Permitir SELECT público (qualquer um pode ler)
CREATE POLICY "Permitir leitura pública"
ON site_content
FOR SELECT
TO public
USING (true);

-- 5. Política: Permitir UPDATE apenas para usuários autenticados
CREATE POLICY "Permitir atualização para autenticados"
ON site_content
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Criar índice para melhor performance
CREATE INDEX idx_site_content_updated_at ON site_content(updated_at DESC);
