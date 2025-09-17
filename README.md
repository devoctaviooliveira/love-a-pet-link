# Pet Adoção 🐾

Uma plataforma completa de adoção de pets que conecta animais que precisam de um lar com famílias amorosas. Desenvolvida com React, TypeScript e Tailwind CSS.

![Pet Adoção](https://lovable.dev/opengraph-image-p98pqg.png)

## ✨ Funcionalidades

- 🏠 **Homepage atrativa** com call-to-action e informações sobre adoção responsável
- 🔍 **Listagem de pets** com filtros por idade, vacinas e busca por texto
- 📋 **Detalhes completos** de cada pet com informações sobre vacinas e instituição
- 📱 **Contato direto** via WhatsApp e email pré-preenchidos
- 🔐 **Sistema de autenticação** para gerenciar pets (CRUD completo)
- 📝 **Formulários acessíveis** para adicionar e editar pets
- 🎨 **Design responsivo** mobile-first com tema aconchegante
- ♿ **Acessibilidade** com labels, alt text e navegação por teclado

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + CSS Modules
- **UI Components**: Shadcn/ui + Radix UI
- **Routing**: React Router DOM
- **State**: React Context + useState
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner Toasts

## 🎯 Páginas e Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Landing page com hero e informações |
| `/pets` | Lista de Pets | Listagem com filtros e busca |
| `/pets/:id` | Detalhes | Informações completas do pet |
| `/pets/new` | Novo Pet | Formulário para adicionar (protegido) |
| `/pets/:id/edit` | Editar Pet | Formulário para editar (protegido) |
| `/login` | Login | Autenticação de usuários |

## 🔐 Credenciais de Demonstração

Para acessar as funcionalidades administrativas:

```
Email: admin@pets.com
Senha: admin123
```

## 🏃‍♂️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd pet-adocao
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

4. **Abra no navegador**
```
http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificar código com ESLint
```

## 🚀 Deploy

### Frontend (Vercel)

1. **Via GitHub** (Recomendado):
   - Conecte seu repositório no [Vercel](https://vercel.com)
   - Configure as variáveis de ambiente se necessário
   - Deploy automático a cada push

2. **Via CLI**:
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Configuração de Domínio Personalizado

No painel do Vercel:
1. Vá em **Project Settings > Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruído

## 📱 Funcionalidades de Contato

### WhatsApp
Os botões "WhatsApp" abrem o aplicativo com mensagem pré-preenchida:
```
Olá! Gostaria de saber mais sobre [Nome do Pet] ([Raça], [Idade] anos) disponível para adoção.
```

### Email
Os botões "Email" abrem o cliente de email com:
- **Assunto**: "Interesse em adoção - [Nome do Pet]"
- **Corpo**: Mensagem formatada sobre interesse no pet

## 🎨 Design System

O projeto utiliza um design system completo com:

- **Cores**: Tons terrosos e aconchegantes (terracota, bege, verde suave)
- **Tipografia**: Sistema hierárquico com fontes legíveis
- **Componentes**: Biblioteca baseada em Shadcn/ui customizada
- **Gradientes**: Backgrounds suaves que reforçam o tema
- **Animações**: Transições suaves para melhor UX

### Personalização

As cores e estilos estão centralizados em:
- `src/index.css` - Variáveis CSS e tokens de design
- `tailwind.config.ts` - Configuração do Tailwind CSS

## ♿ Acessibilidade

- ✅ Labels apropriadas em todos os formulários
- ✅ Alt text descritivo em todas as imagens
- ✅ Navegação por teclado funcional
- ✅ Contraste adequado de cores
- ✅ Estrutura semântica HTML5
- ✅ ARIA labels onde necessário
- ✅ Foco visível em elementos interativos

## 📊 SEO Otimizado

- Meta tags completas (title, description, keywords)
- Open Graph e Twitter Cards configurados
- Structured Data (JSON-LD) para organizações
- URLs semânticas e amigáveis
- Canonical tags configuradas
- Sitemap automático via Vite

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (shadcn)
│   ├── Header.tsx      # Navegação principal
│   ├── PetCard.tsx     # Card de pet
│   └── PetForm.tsx     # Formulário de pet
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Autenticação
├── data/              # Dados mockados
│   └── mockPets.ts    # Base de dados simulada
├── pages/             # Páginas da aplicação
│   ├── Home.tsx       # Landing page
│   ├── Login.tsx      # Autenticação
│   ├── PetsList.tsx   # Lista de pets
│   ├── PetDetail.tsx  # Detalhes do pet
│   ├── PetNew.tsx     # Novo pet
│   └── PetEdit.tsx    # Editar pet
├── types/             # Definições TypeScript
│   └── index.ts       # Interfaces e tipos
├── hooks/             # Hooks customizados
├── lib/               # Utilitários
└── assets/            # Imagens e recursos
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de build**: Verifique se todas as dependências estão instaladas
2. **Imagens não carregam**: Confirme se as imagens estão na pasta `public/` ou `src/assets/`
3. **Rotas não funcionam**: Verifique se o servidor suporta SPA (Single Page Application)

### Logs e Debug

```bash
npm run dev -- --debug    # Modo debug
npm run build -- --debug  # Build com logs detalhados
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 📞 Suporte

- **Email**: suporte@petadocao.com
- **WhatsApp**: (11) 9999-8888
- **Website**: https://pet-adocao.lovable.dev

---

Desenvolvido com ❤️ para conectar pets e famílias através da adoção responsável.