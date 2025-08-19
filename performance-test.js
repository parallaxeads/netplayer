/**
 * Script de teste de performance para IPTV Player Pro
 * Testa carregamento, memória e responsividade
 */

const fs = require('fs');
const path = require('path');

class PerformanceTest {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      tests: [],
      summary: {
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
  }

  /**
   * Executa todos os testes de performance
   */
  async runAllTests() {
    console.log('🚀 Iniciando testes de performance do IPTV Player Pro...\n');

    await this.testBuildSize();
    await this.testFileStructure();
    await this.testDependencies();
    await this.testCodeQuality();
    await this.testAssets();
    await this.testConfiguration();

    this.generateReport();
  }

  /**
   * Testa tamanho do build
   */
  async testBuildSize() {
    console.log('📦 Testando tamanho do build...');
    
    try {
      const buildPath = path.join(__dirname, 'build');
      const distPath = path.join(__dirname, 'dist');
      
      const buildSize = this.getDirectorySize(buildPath);
      const distSize = this.getDirectorySize(distPath);
      
      const buildSizeMB = (buildSize / 1024 / 1024).toFixed(2);
      const distSizeMB = (distSize / 1024 / 1024).toFixed(2);
      
      console.log(`   Build size: ${buildSizeMB} MB`);
      console.log(`   Dist size: ${distSizeMB} MB`);
      
      // Verificar se o tamanho está dentro dos limites aceitáveis
      const maxBuildSize = 50; // 50 MB
      const maxDistSize = 500; // 500 MB
      
      let status = 'passed';
      let message = 'Tamanhos de build dentro dos limites';
      
      if (buildSizeMB > maxBuildSize) {
        status = 'warning';
        message = `Build size (${buildSizeMB} MB) maior que o recomendado (${maxBuildSize} MB)`;
      }
      
      if (distSizeMB > maxDistSize) {
        status = 'failed';
        message = `Dist size (${distSizeMB} MB) maior que o limite (${maxDistSize} MB)`;
      }
      
      this.addTestResult('Build Size', status, message, {
        buildSizeMB: parseFloat(buildSizeMB),
        distSizeMB: parseFloat(distSizeMB),
        maxBuildSize,
        maxDistSize
      });
      
    } catch (error) {
      this.addTestResult('Build Size', 'failed', `Erro ao verificar tamanho: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Testa estrutura de arquivos
   */
  async testFileStructure() {
    console.log('📁 Testando estrutura de arquivos...');
    
    const requiredFiles = [
      'package.json',
      'public/electron.js',
      'public/preload.js',
      'src/App.js',
      'src/index.js',
      'src/index.css',
      'build/index.html',
      'build/static'
    ];
    
    const requiredDirectories = [
      'src/components',
      'src/services',
      'src/contexts',
      'src/utils',
      'build/static/js',
      'build/static/css'
    ];
    
    let missingFiles = [];
    let missingDirs = [];
    
    // Verificar arquivos obrigatórios
    for (const file of requiredFiles) {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        missingFiles.push(file);
      }
    }
    
    // Verificar diretórios obrigatórios
    for (const dir of requiredDirectories) {
      const dirPath = path.join(__dirname, dir);
      if (!fs.existsSync(dirPath)) {
        missingDirs.push(dir);
      }
    }
    
    let status = 'passed';
    let message = 'Estrutura de arquivos completa';
    
    if (missingFiles.length > 0 || missingDirs.length > 0) {
      status = 'failed';
      message = `Arquivos/diretórios faltando: ${[...missingFiles, ...missingDirs].join(', ')}`;
    }
    
    console.log(`   Arquivos verificados: ${requiredFiles.length}`);
    console.log(`   Diretórios verificados: ${requiredDirectories.length}`);
    console.log(`   Faltando: ${missingFiles.length + missingDirs.length}`);
    
    this.addTestResult('File Structure', status, message, {
      requiredFiles: requiredFiles.length,
      requiredDirectories: requiredDirectories.length,
      missingFiles,
      missingDirs
    });
    
    console.log('');
  }

  /**
   * Testa dependências
   */
  async testDependencies() {
    console.log('📚 Testando dependências...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
      
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});
      
      console.log(`   Dependencies: ${dependencies.length}`);
      console.log(`   DevDependencies: ${devDependencies.length}`);
      
      // Verificar dependências críticas
      const criticalDeps = [
        'react',
        'react-dom',
        'electron',
        'axios',
        'better-sqlite3'
      ];
      
      const missingCritical = criticalDeps.filter(dep => 
        !dependencies.includes(dep) && !devDependencies.includes(dep)
      );
      
      let status = 'passed';
      let message = 'Todas as dependências críticas presentes';
      
      if (missingCritical.length > 0) {
        status = 'failed';
        message = `Dependências críticas faltando: ${missingCritical.join(', ')}`;
      }
      
      // Verificar se há muitas dependências (possível bloat)
      const totalDeps = dependencies.length + devDependencies.length;
      if (totalDeps > 100) {
        status = status === 'failed' ? 'failed' : 'warning';
        message += `. Muitas dependências (${totalDeps})`;
      }
      
      this.addTestResult('Dependencies', status, message, {
        dependencies: dependencies.length,
        devDependencies: devDependencies.length,
        total: totalDeps,
        missingCritical
      });
      
    } catch (error) {
      this.addTestResult('Dependencies', 'failed', `Erro ao verificar dependências: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Testa qualidade do código
   */
  async testCodeQuality() {
    console.log('🔍 Testando qualidade do código...');
    
    try {
      const srcPath = path.join(__dirname, 'src');
      const jsFiles = this.getJSFiles(srcPath);
      
      let totalLines = 0;
      let totalFiles = jsFiles.length;
      let largeFiles = [];
      let emptyFiles = [];
      
      for (const file of jsFiles) {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n').length;
        totalLines += lines;
        
        if (lines > 500) {
          largeFiles.push({ file: path.relative(__dirname, file), lines });
        }
        
        if (lines < 10) {
          emptyFiles.push({ file: path.relative(__dirname, file), lines });
        }
      }
      
      const avgLinesPerFile = Math.round(totalLines / totalFiles);
      
      console.log(`   Arquivos JS: ${totalFiles}`);
      console.log(`   Total de linhas: ${totalLines}`);
      console.log(`   Média por arquivo: ${avgLinesPerFile} linhas`);
      console.log(`   Arquivos grandes (>500 linhas): ${largeFiles.length}`);
      
      let status = 'passed';
      let message = 'Qualidade do código adequada';
      
      if (largeFiles.length > 5) {
        status = 'warning';
        message = `Muitos arquivos grandes (${largeFiles.length})`;
      }
      
      if (avgLinesPerFile > 300) {
        status = 'warning';
        message += `. Média de linhas alta (${avgLinesPerFile})`;
      }
      
      this.addTestResult('Code Quality', status, message, {
        totalFiles,
        totalLines,
        avgLinesPerFile,
        largeFiles: largeFiles.length,
        emptyFiles: emptyFiles.length
      });
      
    } catch (error) {
      this.addTestResult('Code Quality', 'failed', `Erro ao analisar código: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Testa assets e recursos
   */
  async testAssets() {
    console.log('🖼️ Testando assets...');
    
    try {
      const buildStaticPath = path.join(__dirname, 'build', 'static');
      
      if (!fs.existsSync(buildStaticPath)) {
        this.addTestResult('Assets', 'failed', 'Diretório build/static não encontrado');
        return;
      }
      
      const jsFiles = this.getFilesWithExtension(buildStaticPath, '.js');
      const cssFiles = this.getFilesWithExtension(buildStaticPath, '.css');
      
      let totalJSSize = 0;
      let totalCSSSize = 0;
      
      for (const file of jsFiles) {
        totalJSSize += fs.statSync(file).size;
      }
      
      for (const file of cssFiles) {
        totalCSSSize += fs.statSync(file).size;
      }
      
      const jsSizeMB = (totalJSSize / 1024 / 1024).toFixed(2);
      const cssSizeMB = (totalCSSSize / 1024 / 1024).toFixed(2);
      
      console.log(`   Arquivos JS: ${jsFiles.length} (${jsSizeMB} MB)`);
      console.log(`   Arquivos CSS: ${cssFiles.length} (${cssSizeMB} MB)`);
      
      let status = 'passed';
      let message = 'Assets otimizados';
      
      // Verificar se os assets estão muito grandes
      if (parseFloat(jsSizeMB) > 5) {
        status = 'warning';
        message = `JS bundle muito grande (${jsSizeMB} MB)`;
      }
      
      if (parseFloat(cssSizeMB) > 1) {
        status = status === 'failed' ? 'failed' : 'warning';
        message += `. CSS bundle grande (${cssSizeMB} MB)`;
      }
      
      this.addTestResult('Assets', status, message, {
        jsFiles: jsFiles.length,
        cssFiles: cssFiles.length,
        jsSizeMB: parseFloat(jsSizeMB),
        cssSizeMB: parseFloat(cssSizeMB)
      });
      
    } catch (error) {
      this.addTestResult('Assets', 'failed', `Erro ao verificar assets: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Testa configurações
   */
  async testConfiguration() {
    console.log('⚙️ Testando configurações...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
      
      // Verificar configurações do Electron
      const hasElectronMain = packageJson.main === 'public/electron.js';
      const hasElectronBuild = packageJson.build && packageJson.build.appId;
      const hasScripts = packageJson.scripts && 
                        packageJson.scripts['electron'] && 
                        packageJson.scripts['electron-pack'];
      
      console.log(`   Electron main: ${hasElectronMain ? '✓' : '✗'}`);
      console.log(`   Build config: ${hasElectronBuild ? '✓' : '✗'}`);
      console.log(`   Scripts: ${hasScripts ? '✓' : '✗'}`);
      
      let status = 'passed';
      let message = 'Configurações corretas';
      
      if (!hasElectronMain || !hasElectronBuild || !hasScripts) {
        status = 'warning';
        message = 'Algumas configurações podem estar faltando';
      }
      
      this.addTestResult('Configuration', status, message, {
        hasElectronMain,
        hasElectronBuild,
        hasScripts
      });
      
    } catch (error) {
      this.addTestResult('Configuration', 'failed', `Erro ao verificar configurações: ${error.message}`);
    }
    
    console.log('');
  }

  /**
   * Adiciona resultado de teste
   */
  addTestResult(name, status, message, data = {}) {
    this.results.tests.push({
      name,
      status,
      message,
      data,
      timestamp: new Date().toISOString()
    });
    
    this.results.summary[status]++;
    
    const statusIcon = {
      passed: '✅',
      warning: '⚠️',
      failed: '❌'
    };
    
    console.log(`   ${statusIcon[status]} ${name}: ${message}`);
  }

  /**
   * Gera relatório final
   */
  generateReport() {
    console.log('\n📊 Relatório de Performance:');
    console.log('================================');
    
    const { passed, warning, failed } = this.results.summary;
    const total = passed + warning + failed;
    
    console.log(`Total de testes: ${total}`);
    console.log(`✅ Passou: ${passed}`);
    console.log(`⚠️ Avisos: ${warning}`);
    console.log(`❌ Falhou: ${failed}`);
    
    const successRate = ((passed / total) * 100).toFixed(1);
    console.log(`\nTaxa de sucesso: ${successRate}%`);
    
    // Salvar relatório em arquivo
    const reportPath = path.join(__dirname, 'performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\nRelatório salvo em: ${reportPath}`);
    
    // Determinar status geral
    if (failed > 0) {
      console.log('\n🔴 Status: FALHOU - Problemas críticos encontrados');
      process.exit(1);
    } else if (warning > 0) {
      console.log('\n🟡 Status: AVISO - Melhorias recomendadas');
    } else {
      console.log('\n🟢 Status: SUCESSO - Todos os testes passaram');
    }
  }

  // Métodos auxiliares

  getDirectorySize(dirPath) {
    if (!fs.existsSync(dirPath)) return 0;
    
    let size = 0;
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        size += this.getDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    }
    
    return size;
  }

  getJSFiles(dirPath) {
    const jsFiles = [];
    
    if (!fs.existsSync(dirPath)) return jsFiles;
    
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        jsFiles.push(...this.getJSFiles(filePath));
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        jsFiles.push(filePath);
      }
    }
    
    return jsFiles;
  }

  getFilesWithExtension(dirPath, extension) {
    const files = [];
    
    if (!fs.existsSync(dirPath)) return files;
    
    const dirFiles = fs.readdirSync(dirPath);
    
    for (const file of dirFiles) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        files.push(...this.getFilesWithExtension(filePath, extension));
      } else if (file.endsWith(extension)) {
        files.push(filePath);
      }
    }
    
    return files;
  }
}

// Executar testes se chamado diretamente
if (require.main === module) {
  const test = new PerformanceTest();
  test.runAllTests().catch(error => {
    console.error('Erro durante os testes:', error);
    process.exit(1);
  });
}

module.exports = PerformanceTest;

