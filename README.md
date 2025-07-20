# BusFlow - Sistema de Monitoramento Inteligente de Transporte Público

## 📋 Descrição

O **BusFlow** é um sistema completo de monitoramento inteligente para transporte público que utiliza tecnologias embarcadas (IoT) para contar automaticamente a quantidade de pessoas em ônibus e detectar a presença de passageiros em paradas. O sistema oferece uma solução integrada para otimizar a gestão do transporte público através de dados em tempo real.

## 🎯 Objetivos

- **Monitoramento Automático**: Contagem automática de passageiros entrando e saindo dos ônibus
- **Detecção de Presença**: Identificação de pessoas aguardando em paradas
- **Dados em Tempo Real**: Informações atualizadas sobre ocupação e demanda
- **Interface Web**: Dashboard para visualização e gestão dos dados
- **Aplicativo Mobile**: Captura de imagens para análise adicional

## 🏗️ Arquitetura do Sistema

O projeto é composto por múltiplos componentes que trabalham em conjunto:

### 🔧 Hardware (ESP32)
- **ESP_2Sonares_Onibus**: Sistema de contagem de passageiros usando sensores ultrassônicos
- **ESP_PIR_Parada**: Detecção de presença em paradas usando sensor PIR
- **ESP_screen**: Display OLED para informações locais

### 🌐 Backend (Node.js/TypeScript)
- **API REST**: Servidor Express com endpoints para gestão de dados
- **MQTT Broker**: Comunicação em tempo real entre dispositivos
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Estrutura Modular**: Arquitetura limpa com controllers e use cases

### 🖥️ Frontend (Next.js/React)
- **Dashboard Web**: Interface moderna com Tailwind CSS
- **Componentes Reutilizáveis**: Cards para ônibus e paradas
- **Responsivo**: Design adaptável para diferentes dispositivos

### 📱 Mobile (iOS/SwiftUI)
- **Aplicativo iOS**: Captura de imagens para análise adicional
- **Interface Nativa**: Desenvolvido com SwiftUI

## 🚀 Funcionalidades Principais

### Contagem de Passageiros
- **Sensores Ultrassônicos**: Detectam entrada e saída de pessoas
- **Prevenção de Dupla Contagem**: Lógica para evitar contagens incorretas
- **Timestamp ISO 8601**: Registro preciso de horários
- **Comunicação MQTT**: Envio de dados em tempo real

### Monitoramento de Paradas
- **Sensor PIR**: Detecção de movimento/presença
- **Indicador Visual**: LED para status local
- **Intervalo Configurável**: Verificações a cada 5 segundos
- **Histórico de Detecções**: Armazenamento de dados

### Gestão de Dados
- **CRUD Completo**: Operações para ônibus e paradas
- **Histórico Temporal**: Rastreamento de ocupação ao longo do tempo
- **Relatórios**: Análise de padrões de uso
- **API RESTful**: Integração com sistemas externos

## 📊 Estrutura do Banco de Dados

### Entidades Principais
- **Bus**: Informações dos ônibus (linha, capacidade, placa)
- **BusStop**: Dados das paradas (nome, localização)
- **PeopleHistory**: Histórico de ocupação dos ônibus
- **BusStopHistory**: Histórico de ocupação das paradas
- **LightingHistory**: Registro de detecções de presença

## 🛠️ Tecnologias Utilizadas

### Hardware
- **ESP32**: Microcontrolador principal
- **Sensores HC-SR04**: Ultrassônicos para contagem
- **Sensor PIR**: Detecção de movimento
- **Display OLED SSD1306**: Interface local
- **WiFi**: Conectividade de rede

### Software
- **Backend**: Node.js, TypeScript, Express
- **Frontend**: Next.js, React, Tailwind CSS
- **Mobile**: SwiftUI, iOS
- **Banco**: PostgreSQL, Prisma ORM
- **Comunicação**: MQTT, HTTP/REST
- **Tempo**: NTP Client para sincronização

## 📁 Estrutura do Projeto

```
BusFlow-ESP32/
├── ESP_2Sonares_Onibus/          # Sistema de contagem de ônibus
├── ESP_PIR_Parada/               # Detecção de presença em paradas
├── ESP_screen/                   # Display OLED
├── BusFlow/                      # Backend API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── hardware/         # Integração MQTT
│   │   │   └── software/         # Controllers e Use Cases
│   │   └── server.ts
│   └── prisma/                   # Schema do banco
├── busflow-front/                # Frontend Web
│   └── src/
│       ├── app/                  # Páginas Next.js
│       └── components/           # Componentes React
├── BusFlowCameraApp/             # App iOS
└── libraries/                    # Bibliotecas Arduino
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- Arduino IDE
- Xcode (para app iOS)
- ESP32 DevKit

### Backend
```bash
cd BusFlow
npm install
npm run prisma:generate
npm run dev
```

### Frontend
```bash
cd busflow-front
npm install
npm run dev
```

### Hardware
1. Conecte os sensores aos pinos especificados
2. Configure as credenciais WiFi no código
3. Configure o endereço do servidor MQTT
4. Faça upload do código para o ESP32

## 📡 Endpoints da API

### Ônibus
- `GET /bus` - Listar ônibus
- `POST /bus` - Criar ônibus
- `GET /bus/quantity` - Quantidade de pessoas
- `POST /bus/in` - Registrar entrada
- `POST /bus/out` - Registrar saída

### Paradas
- `GET /bus-stop` - Listar paradas
- `POST /bus-stop` - Criar parada
- `GET /bus-stop/quantity` - Quantidade de pessoas
- `POST /bus-stop/lightDetection` - Detecção de presença

## 🔧 Configuração

### Variáveis de Ambiente
```env
DATABASE_URL="postgresql://user:password@localhost:5432/busflow"
IP_SERVER="192.168.100.43"
```

### Configuração MQTT
- Broker: `192.168.100.43:1883`
- Tópicos: `bus/in`, `bus/out`, `busStop/lightDetection`

## 📈 Monitoramento e Análise

O sistema oferece:
- **Dados em Tempo Real**: Ocupação atual de ônibus e paradas
- **Histórico Temporal**: Análise de padrões de uso
- **Alertas**: Notificações de alta ocupação
- **Relatórios**: Estatísticas de utilização

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Ítalo Monte** - *Desenvolvimento inicial* - [italomonte](https://github.com/italomonte)

## 🙏 Agradecimentos

- Comunidade Arduino/ESP32
- Bibliotecas Adafruit
- Framework Next.js
- Prisma ORM

---

**BusFlow** - Transformando o transporte público através da tecnologia IoT 🚌✨