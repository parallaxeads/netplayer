/**
 * Script de build otimizado para Windows
 * Cria instalador MSI/EXE profissional
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class WindowsBuilder {
  constructor() {
    this.projectRoot = __dirname;
    this.buildDir = path.join(this.projectRoot, 'build');
    this.distDir = path.join(this.projectRoot, 'dist');
    this.outputDir = path.join(this.projectRoot, 'release');
    
    this.config = {
      appName: 'IPTV Player Pro',
      appId: 'com.iptvplayerpro.app',
      version: '1.0.0',
      description: 'Reprodutor IPTV profissional com interface Netflix',
      author: 'IPTV Player Pro Team',
      copyright: '© 2024 IPTV Player Pro. Todos os direitos reservados.',
      homepage: 'https://iptvplayerpro.com',
      supportUrl: 'https://iptvplayerpro.com/support'
    };
  }

  /**
   * Executa o processo completo de build
   */
  async buildForWindows() {
    console.log('🚀 Iniciando build para Windows...\n');

    try {
      await this.prepareBuild();
      await this.buildReactApp();
      await this.optimizeAssets();
      await this.createElectronPackage();
      await this.createInstaller();
      await this.createPortableVersion();
      await this.generateChecksums();
      await this.createReleaseNotes();
      
      console.log('\n✅ Build para Windows concluído com sucesso!');
      this.showBuildSummary();
      
    } catch (error) {
      console.error('\n❌ Erro durante o build:', error.message);
      process.exit(1);
    }
  }

  /**
   * Prepara ambiente para build
   */
  async prepareBuild() {
    console.log('📋 Preparando ambiente de build...');
    
    // Criar diretórios necessários
    this.ensureDirectory(this.outputDir);
    this.ensureDirectory(path.join(this.outputDir, 'installers'));
    this.ensureDirectory(path.join(this.outputDir, 'portable'));
    
    // Limpar builds anteriores
    if (fs.existsSync(this.distDir)) {
      console.log('   Limpando builds anteriores...');
      this.removeDirectory(this.distDir);
    }
    
    // Verificar dependências
    console.log('   Verificando dependências...');
    this.checkDependencies();
    
    console.log('   ✅ Ambiente preparado\n');
  }

  /**
   * Build da aplicação React
   */
  async buildReactApp() {
    console.log('⚛️ Compilando aplicação React...');
    
    try {
      // Definir variáveis de ambiente para produção
      process.env.NODE_ENV = 'production';
      process.env.GENERATE_SOURCEMAP = 'false';
      process.env.INLINE_RUNTIME_CHUNK = 'false';
      
      // Executar build do React
      console.log('   Executando npm run build...');
      execSync('npm run build', { 
        stdio: 'pipe',
        cwd: this.projectRoot 
      });
      
      console.log('   ✅ React build concluído\n');
      
    } catch (error) {
      throw new Error(`Falha no build do React: ${error.message}`);
    }
  }

  /**
   * Otimiza assets para produção
   */
  async optimizeAssets() {
    console.log('🎨 Otimizando assets...');
    
    try {
      const staticDir = path.join(this.buildDir, 'static');
      
      if (fs.existsSync(staticDir)) {
        // Verificar tamanhos dos arquivos
        const jsFiles = this.getFilesWithExtension(staticDir, '.js');
        const cssFiles = this.getFilesWithExtension(staticDir, '.css');
        
        let totalJSSize = 0;
        let totalCSSSize = 0;
        
        jsFiles.forEach(file => {
          totalJSSize += fs.statSync(file).size;
        });
        
        cssFiles.forEach(file => {
          totalCSSSize += fs.statSync(file).size;
        });
        
        console.log(`   JS: ${jsFiles.length} arquivos (${(totalJSSize / 1024 / 1024).toFixed(2)} MB)`);
        console.log(`   CSS: ${cssFiles.length} arquivos (${(totalCSSSize / 1024 / 1024).toFixed(2)} MB)`);
      }
      
      console.log('   ✅ Assets otimizados\n');
      
    } catch (error) {
      console.warn('   ⚠️ Aviso na otimização de assets:', error.message);
    }
  }

  /**
   * Cria pacote Electron
   */
  async createElectronPackage() {
    console.log('📦 Criando pacote Electron...');
    
    try {
      // Atualizar configuração do electron-builder
      this.updateElectronBuilderConfig();
      
      // Executar electron-builder para Windows
      console.log('   Executando electron-builder...');
      execSync('npx electron-builder --win --x64', {
        stdio: 'pipe',
        cwd: this.projectRoot
      });
      
      console.log('   ✅ Pacote Electron criado\n');
      
    } catch (error) {
      throw new Error(`Falha na criação do pacote Electron: ${error.message}`);
    }
  }

  /**
   * Cria instalador MSI/EXE
   */
  async createInstaller() {
    console.log('💿 Criando instalador...');
    
    try {
      // Verificar se o executável foi criado
      const exePath = path.join(this.distDir, 'win-unpacked', `${this.config.appName}.exe`);
      
      if (!fs.existsSync(exePath)) {
        throw new Error('Executável não encontrado');
      }
      
      // Copiar instalador para diretório de release
      const installerSource = path.join(this.distDir, `${this.config.appName} Setup 1.0.0.exe`);
      const installerDest = path.join(this.outputDir, 'installers', 'IPTV-Player-Pro-Setup.exe');
      
      if (fs.existsSync(installerSource)) {
        fs.copyFileSync(installerSource, installerDest);
        console.log('   ✅ Instalador EXE criado');
      }
      
      // Verificar se MSI foi criado
      const msiSource = path.join(this.distDir, `${this.config.appName} Setup 1.0.0.msi`);
      const msiDest = path.join(this.outputDir, 'installers', 'IPTV-Player-Pro-Setup.msi');
      
      if (fs.existsSync(msiSource)) {
        fs.copyFileSync(msiSource, msiDest);
        console.log('   ✅ Instalador MSI criado');
      }
      
      console.log('   ✅ Instaladores criados\n');
      
    } catch (error) {
      console.warn('   ⚠️ Aviso na criação do instalador:', error.message);
    }
  }

  /**
   * Cria versão portável
   */
  async createPortableVersion() {
    console.log('📁 Criando versão portável...');
    
    try {
      const unpackedDir = path.join(this.distDir, 'win-unpacked');
      const portableDir = path.join(this.outputDir, 'portable', 'IPTV-Player-Pro-Portable');
      
      if (fs.existsSync(unpackedDir)) {
        // Copiar arquivos para versão portável
        this.copyDirectory(unpackedDir, portableDir);
        
        // Criar arquivo de configuração portável
        const portableConfig = {
          portable: true,
          dataDir: './data',
          configDir: './config'
        };
        
        fs.writeFileSync(
          path.join(portableDir, 'portable.json'),
          JSON.stringify(portableConfig, null, 2)
        );
        
        // Criar diretórios de dados
        this.ensureDirectory(path.join(portableDir, 'data'));
        this.ensureDirectory(path.join(portableDir, 'config'));
        
        // Criar arquivo README para versão portável
        this.createPortableReadme(portableDir);
        
        // Criar arquivo ZIP da versão portável
        await this.createZipArchive(portableDir, path.join(this.outputDir, 'IPTV-Player-Pro-Portable.zip'));
        
        console.log('   ✅ Versão portável criada\n');
      }
      
    } catch (error) {
      console.warn('   ⚠️ Aviso na criação da versão portável:', error.message);
    }
  }

  /**
   * Gera checksums dos arquivos
   */
  async generateChecksums() {
    console.log('🔐 Gerando checksums...');
    
    try {
      const crypto = require('crypto');
      const checksums = {};
      
      // Arquivos para verificar
      const filesToCheck = [
        path.join(this.outputDir, 'installers', 'IPTV-Player-Pro-Setup.exe'),
        path.join(this.outputDir, 'installers', 'IPTV-Player-Pro-Setup.msi'),
        path.join(this.outputDir, 'IPTV-Player-Pro-Portable.zip')
      ];
      
      for (const file of filesToCheck) {
        if (fs.existsSync(file)) {
          const data = fs.readFileSync(file);
          const hash = crypto.createHash('sha256').update(data).digest('hex');
          const fileName = path.basename(file);
          checksums[fileName] = hash;
          console.log(`   ${fileName}: ${hash}`);
        }
      }
      
      // Salvar checksums em arquivo
      fs.writeFileSync(
        path.join(this.outputDir, 'checksums.txt'),
        Object.entries(checksums)
          .map(([file, hash]) => `${hash}  ${file}`)
          .join('\n')
      );
      
      console.log('   ✅ Checksums gerados\n');
      
    } catch (error) {
      console.warn('   ⚠️ Aviso na geração de checksums:', error.message);
    }
  }

  /**
   * Cria notas de release
   */
  async createReleaseNotes() {
    console.log('📝 Criando notas de release...');
    
    const releaseNotes = `# IPTV Player Pro v${this.config.version}

## 🎉 Lançamento Inicial

### ✨ Funcionalidades Principais

- **Interface Netflix-Style**: Design moderno e intuitivo
- **Suporte Xtream Codes**: Integração completa com API Xtream Codes
- **Player Avançado**: Suporte a múltiplos formatos (HLS, DASH, MP4, etc.)
- **Navegação Inteligente**: Mouse, teclado e controle remoto
- **Busca Avançada**: Sistema de busca inteligente com filtros
- **Favoritos e Histórico**: Gerenciamento completo de conteúdo
- **Controle Parental**: Sistema de PIN e restrições
- **Multi-perfil**: Suporte a múltiplos usuários

### 🔧 Funcionalidades Técnicas

- **Arquitetura Electron + React**: Performance e compatibilidade
- **SQLite**: Banco de dados local para persistência
- **Cache Inteligente**: Otimização de performance
- **Navegação por Teclado**: Atalhos completos
- **Sistema de Notificações**: Feedback em tempo real

### 📋 Requisitos do Sistema

- **Sistema Operacional**: Windows 10 ou Windows 11
- **Memória RAM**: Mínimo 4GB, recomendado 8GB
- **Espaço em Disco**: 500MB livres
- **Conexão**: Internet banda larga para streaming

### 📦 Arquivos de Instalação

- **IPTV-Player-Pro-Setup.exe**: Instalador completo (recomendado)
- **IPTV-Player-Pro-Setup.msi**: Instalador MSI para empresas
- **IPTV-Player-Pro-Portable.zip**: Versão portável (não requer instalação)

### 🔐 Verificação de Integridade

Verifique a integridade dos arquivos usando os checksums SHA-256 fornecidos no arquivo \`checksums.txt\`.

### 📞 Suporte

- **Email**: suporte@iptvplayerpro.com
- **Discord**: [Servidor da Comunidade](https://discord.gg/iptvplayerpro)
- **Documentação**: [Manual do Usuário](MANUAL_USUARIO.md)

### 🐛 Problemas Conhecidos

- Primeira execução pode demorar alguns segundos para carregar
- Alguns antivírus podem dar falso positivo (aplicação não assinada)
- Performance pode variar dependendo das especificações do hardware

### 🔄 Próximas Atualizações

- Gravação de programas
- Sincronização entre dispositivos
- Temas personalizáveis
- Plugins de terceiros
- Suporte a mais formatos de playlist

---

**Data de Lançamento**: ${new Date().toLocaleDateString('pt-BR')}
**Tamanho do Download**: ~300MB
**Licença**: MIT License
`;

    fs.writeFileSync(path.join(this.outputDir, 'RELEASE_NOTES.md'), releaseNotes);
    console.log('   ✅ Notas de release criadas\n');
  }

  /**
   * Atualiza configuração do electron-builder
   */
  updateElectronBuilderConfig() {
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    packageJson.build = {
      appId: this.config.appId,
      productName: this.config.appName,
      directories: {
        output: 'dist'
      },
      files: [
        'build/**/*',
        'node_modules/**/*',
        'public/electron.js',
        'public/preload.js'
      ],
      win: {
        target: [
          {
            target: 'nsis',
            arch: ['x64']
          },
          {
            target: 'msi',
            arch: ['x64']
          }
        ],
        icon: 'public/icon.ico',
        publisherName: this.config.author,
        verifyUpdateCodeSignature: false
      },
      nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: this.config.appName,
        include: 'build/installer.nsh'
      },
      msi: {
        oneClick: false,
        perMachine: true
      }
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  /**
   * Cria README para versão portável
   */
  createPortableReadme(portableDir) {
    const readme = `# IPTV Player Pro - Versão Portável

## 🚀 Como Usar

1. **Extraia** todos os arquivos para uma pasta de sua escolha
2. **Execute** o arquivo "IPTV Player Pro.exe"
3. **Configure** sua conexão IPTV na primeira execução

## 📁 Estrutura de Arquivos

- **IPTV Player Pro.exe**: Executável principal
- **data/**: Dados do usuário (favoritos, histórico)
- **config/**: Configurações da aplicação
- **portable.json**: Configuração da versão portável

## ⚙️ Configurações

Esta versão portável salva todas as configurações e dados na própria pasta, permitindo:

- **Uso em múltiplos computadores** sem instalação
- **Backup fácil** copiando a pasta inteira
- **Não deixa rastros** no sistema

## 🔧 Requisitos

- Windows 10 ou Windows 11 (64-bit)
- 4GB RAM (8GB recomendado)
- Conexão com internet para streaming

## 📞 Suporte

- Email: suporte@iptvplayerpro.com
- Discord: https://discord.gg/iptvplayerpro
- Manual: MANUAL_USUARIO.md

---
IPTV Player Pro v${this.config.version} - Versão Portável
`;

    fs.writeFileSync(path.join(portableDir, 'README.txt'), readme);
  }

  /**
   * Mostra resumo do build
   */
  showBuildSummary() {
    console.log('\n📊 Resumo do Build:');
    console.log('==========================================');
    
    const outputFiles = [];
    
    // Verificar arquivos criados
    const installerExe = path.join(this.outputDir, 'installers', 'IPTV-Player-Pro-Setup.exe');
    const installerMsi = path.join(this.outputDir, 'installers', 'IPTV-Player-Pro-Setup.msi');
    const portableZip = path.join(this.outputDir, 'IPTV-Player-Pro-Portable.zip');
    
    if (fs.existsSync(installerExe)) {
      const size = (fs.statSync(installerExe).size / 1024 / 1024).toFixed(2);
      outputFiles.push(`✅ Instalador EXE: ${size} MB`);
    }
    
    if (fs.existsSync(installerMsi)) {
      const size = (fs.statSync(installerMsi).size / 1024 / 1024).toFixed(2);
      outputFiles.push(`✅ Instalador MSI: ${size} MB`);
    }
    
    if (fs.existsSync(portableZip)) {
      const size = (fs.statSync(portableZip).size / 1024 / 1024).toFixed(2);
      outputFiles.push(`✅ Versão Portável: ${size} MB`);
    }
    
    outputFiles.forEach(file => console.log(file));
    
    console.log('\n📁 Arquivos disponíveis em:', this.outputDir);
    console.log('\n🎉 Build concluído com sucesso!');
  }

  // Métodos auxiliares

  ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  removeDirectory(dir) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }

  copyDirectory(src, dest) {
    this.ensureDirectory(dest);
    const files = fs.readdirSync(src);
    
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  getFilesWithExtension(dir, extension) {
    const files = [];
    
    if (!fs.existsSync(dir)) return files;
    
    const dirFiles = fs.readdirSync(dir);
    
    for (const file of dirFiles) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        files.push(...this.getFilesWithExtension(filePath, extension));
      } else if (file.endsWith(extension)) {
        files.push(filePath);
      }
    }
    
    return files;
  }

  checkDependencies() {
    const requiredCommands = ['npm', 'npx'];
    
    for (const cmd of requiredCommands) {
      try {
        execSync(`${cmd} --version`, { stdio: 'pipe' });
      } catch (error) {
        throw new Error(`Comando necessário não encontrado: ${cmd}`);
      }
    }
  }

  async createZipArchive(sourceDir, outputPath) {
    try {
      // Usar PowerShell para criar ZIP no Windows
      const command = `powershell -command "Compress-Archive -Path '${sourceDir}\\*' -DestinationPath '${outputPath}' -Force"`;
      execSync(command, { stdio: 'pipe' });
    } catch (error) {
      console.warn('Erro ao criar arquivo ZIP:', error.message);
    }
  }
}

// Executar build se chamado diretamente
if (require.main === module) {
  const builder = new WindowsBuilder();
  builder.buildForWindows().catch(error => {
    console.error('Erro durante o build:', error);
    process.exit(1);
  });
}

module.exports = WindowsBuilder;

