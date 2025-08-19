# IPTV Player Pro

Um reprodutor de IPTV profissional para Windows com interface estilo Netflix, desenvolvido com Electron e React.

![IPTV Player Pro](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🎯 Visão Geral

O IPTV Player Pro é uma aplicação desktop moderna que oferece uma experiência premium para assistir conteúdo IPTV. Com uma interface inspirada no Netflix e funcionalidades avançadas, é a solução ideal para usuários que buscam qualidade e praticidade.

### ✨ Características Principais

- **Interface Netflix-Style**: Design moderno e intuitivo
- **Suporte Xtream Codes**: Integração completa com API Xtream Codes
- **Player Avançado**: Suporte a múltiplos formatos (HLS, DASH, MP4, etc.)
- **Navegação Inteligente**: Mouse, teclado e controle remoto
- **Busca Avançada**: Sistema de busca inteligente com filtros
- **Favoritos e Histórico**: Gerenciamento completo de conteúdo
- **Controle Parental**: Sistema de PIN e restrições
- **Multi-perfil**: Suporte a múltiplos usuários

## 🚀 Instalação

### Requisitos do Sistema

- **Sistema Operacional**: Windows 10 ou Windows 11
- **Memória RAM**: Mínimo 4GB, recomendado 8GB
- **Espaço em Disco**: 500MB livres
- **Conexão**: Internet banda larga para streaming

### Download e Instalação

1. Baixe a versão mais recente do [releases](https://github.com/seu-usuario/iptv-player-pro/releases)
2. Execute o instalador `IPTV-Player-Pro-Setup.exe`
3. Siga as instruções do assistente de instalação
4. Inicie o aplicativo pelo menu Iniciar ou atalho na área de trabalho

### Instalação Portável

Para uma versão portável que não requer instalação:

1. Baixe o arquivo `IPTV-Player-Pro-Portable.zip`
2. Extraia para uma pasta de sua escolha
3. Execute `IPTV Player Pro.exe`

## 🔧 Configuração Inicial

### Primeiro Acesso

1. **Abra o IPTV Player Pro**
2. **Configure sua conexão IPTV**:
   - URL do servidor Xtream Codes
   - Nome de usuário
   - Senha
3. **Teste a conexão** e aguarde o carregamento do conteúdo
4. **Explore a interface** e configure suas preferências

### Métodos de Login

#### Login por Credenciais
```
URL: http://seu-servidor.com:8080
Usuário: seu_usuario
Senha: sua_senha
```

#### Login por QR Code
1. Clique em "Login via QR Code"
2. Escaneie o código com seu celular
3. Confirme a autenticação

#### Login por MAC Address
- Configure no painel do provedor
- O player detectará automaticamente

## 📺 Usando o Player

### Interface Principal

A interface é dividida em seções principais:

- **Header**: Navegação e busca
- **Banner**: Conteúdo em destaque
- **Categorias**: TV ao Vivo, Filmes, Séries
- **Continuar Assistindo**: Retomar reprodução
- **Favoritos**: Seus conteúdos salvos

### Reprodução de Conteúdo

#### Controles do Player
- **Espaço**: Play/Pause
- **Setas ←→**: Retroceder/Avançar 10s
- **Setas ↑↓**: Controle de volume
- **F**: Tela cheia
- **M**: Mute/Unmute
- **Esc**: Sair da tela cheia

#### Funcionalidades Avançadas
- **EPG**: Guia de programação para canais
- **Legendas**: Suporte a SRT e legendas embutidas
- **Múltiplos Áudios**: Seleção de faixa de áudio
- **Qualidade**: Ajuste automático ou manual

### Sistema de Busca

#### Busca Simples
1. Digite no campo de busca no header
2. Pressione Enter ou aguarde a busca automática
3. Navegue pelos resultados categorizados

#### Busca Avançada
- **Filtros por tipo**: TV, Filmes, Séries
- **Filtros por gênero**: Ação, Drama, Comédia, etc.
- **Filtros por qualidade**: HD, SD, 4K
- **Filtros por ano**: Conteúdo por período
- **Ordenação**: Relevância, nome, ano, rating

### Favoritos

#### Adicionar aos Favoritos
1. Clique no ícone ⭐ em qualquer conteúdo
2. Escolha a categoria (opcional)
3. O item será salvo automaticamente

#### Gerenciar Favoritos
- **Visualizar**: Acesse a seção "Favoritos"
- **Organizar**: Crie categorias personalizadas
- **Remover**: Clique novamente no ícone ⭐
- **Exportar**: Backup de suas listas

### Histórico

O sistema mantém automaticamente:
- **Posição de parada**: Retome de onde parou
- **Tempo assistido**: Controle seu tempo de tela
- **Conteúdo completo**: Marque como assistido
- **Estatísticas**: Relatórios de visualização

## 🔒 Controle Parental

### Configuração do PIN

1. Acesse **Configurações > Controle Parental**
2. Defina um PIN de 4-6 dígitos
3. Configure as restrições desejadas
4. Salve as configurações

### Tipos de Restrição

#### Por Classificação Etária
- Livre, 10+, 12+, 14+, 16+, 18+
- Bloqueio automático de conteúdo inadequado

#### Por Gênero
- Bloqueie gêneros específicos
- Lista personalizável de gêneros

#### Por Horário
- Defina horários permitidos
- Restrições por dia da semana

#### Por Palavras-chave
- Bloqueie conteúdo com termos específicos
- Lista de palavras proibidas

### Desbloqueio Temporário

- Digite o PIN para acesso temporário
- Desbloqueio por 30 minutos (configurável)
- Bloqueio automático após inatividade

## ⚙️ Configurações

### Configurações Gerais

#### Interface
- **Tema**: Escuro (padrão) ou claro
- **Idioma**: Português, inglês, espanhol
- **Posição das notificações**: Cantos da tela
- **Animações**: Habilitar/desabilitar transições

#### Reprodução
- **Qualidade padrão**: Auto, HD, SD
- **Buffer**: Tamanho do buffer de vídeo
- **Hardware acceleration**: Aceleração por GPU
- **Autoplay**: Reprodução automática

#### Rede
- **Timeout**: Tempo limite para conexões
- **Retry**: Tentativas de reconexão
- **Cache**: Tamanho do cache local
- **Proxy**: Configurações de proxy (se necessário)

### Configurações de Vídeo

#### Qualidade
- **Resolução preferida**: 4K, 1080p, 720p, 480p
- **Bitrate**: Automático ou manual
- **Codec**: Preferências de codec
- **Aspect ratio**: Proporção da tela

#### Áudio
- **Dispositivo de saída**: Seleção de alto-falantes
- **Volume padrão**: Nível inicial de volume
- **Normalização**: Equalização automática
- **Surround**: Suporte a áudio multicanal

### Configurações de Conta

#### Perfil do Usuário
- **Nome**: Identificação do usuário
- **Avatar**: Imagem do perfil
- **Preferências**: Gêneros favoritos
- **Histórico**: Configurações de privacidade

#### Sincronização
- **Backup automático**: Favoritos e histórico
- **Sincronização**: Entre dispositivos (futuro)
- **Exportação**: Backup manual de dados

## 🛠️ Solução de Problemas

### Problemas Comuns

#### Não Consegue Conectar ao Servidor
1. Verifique sua conexão com a internet
2. Confirme as credenciais (URL, usuário, senha)
3. Teste a URL no navegador
4. Contate seu provedor IPTV

#### Vídeo Não Reproduz
1. Verifique se o canal está funcionando
2. Teste com outro canal
3. Reinicie o aplicativo
4. Verifique configurações de firewall

#### Interface Lenta ou Travando
1. Feche outros programas pesados
2. Verifique uso de memória RAM
3. Reinicie o computador
4. Atualize os drivers de vídeo

#### Áudio Sem Som
1. Verifique o volume do sistema
2. Teste outros aplicativos de áudio
3. Verifique dispositivo de saída
4. Reinicie o serviço de áudio do Windows

### Logs e Diagnóstico

#### Localização dos Logs
```
Windows: %APPDATA%\IPTV Player Pro\logs\
```

#### Informações Úteis para Suporte
- Versão do aplicativo
- Sistema operacional
- Mensagens de erro
- Logs do aplicativo
- Configurações de rede

### Contato para Suporte

- **Email**: suporte@iptvplayerpro.com
- **Discord**: [Servidor da Comunidade](https://discord.gg/iptvplayerpro)
- **GitHub**: [Issues](https://github.com/seu-usuario/iptv-player-pro/issues)
- **Documentação**: [Wiki](https://github.com/seu-usuario/iptv-player-pro/wiki)

## 🔄 Atualizações

### Atualizações Automáticas

O IPTV Player Pro verifica automaticamente por atualizações:
- **Verificação**: A cada inicialização
- **Download**: Automático em segundo plano
- **Instalação**: Solicitação de confirmação
- **Reinicialização**: Necessária para aplicar

### Atualizações Manuais

1. Acesse **Ajuda > Verificar Atualizações**
2. Aguarde a verificação
3. Baixe e instale se disponível
4. Reinicie o aplicativo

### Histórico de Versões

#### v1.0.0 (Atual)
- Lançamento inicial
- Interface Netflix-style
- Suporte Xtream Codes completo
- Player avançado com múltiplos formatos
- Sistema de busca inteligente
- Favoritos e histórico
- Controle parental
- Navegação por teclado/mouse/controle

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](CONTRIBUTING.md) para detalhes sobre nosso código de conduta e o processo para enviar pull requests.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Equipe

- **Desenvolvedor Principal**: [Seu Nome](https://github.com/seu-usuario)
- **UI/UX Designer**: [Nome do Designer](https://github.com/designer)
- **Tester**: [Nome do Tester](https://github.com/tester)

## 🙏 Agradecimentos

- Comunidade Electron por fornecer a base para aplicações desktop
- Equipe React por criar uma biblioteca incrível
- Desenvolvedores de bibliotecas de código aberto utilizadas
- Beta testers que ajudaram a melhorar o aplicativo
- Comunidade IPTV por feedback e sugestões

## 📞 Contato

- **Website**: [https://iptvplayerpro.com](https://iptvplayerpro.com)
- **Email**: contato@iptvplayerpro.com
- **Twitter**: [@IPTVPlayerPro](https://twitter.com/IPTVPlayerPro)
- **YouTube**: [Canal Oficial](https://youtube.com/IPTVPlayerPro)

---

**IPTV Player Pro** - Transformando sua experiência de entretenimento digital.

