# 🛠️ Instalação e Configuração do Ambiente

Este documento descreve os passos para configurar o ambiente de banco de dados MySQL para o sistema, incluindo instalação no Windows e Linux (Ubuntu), configuração para acesso remoto via VPN (Hamachi) e uso do PHPMyAdmin para gerenciamento.

---

## 📌 Requisitos

- MySQL Server instalado localmente
- PHPMyAdmin (opcional, mas recomendado)
- Hamachi (para conexão VPN entre máquinas)
- Node.js (para executar o backend do sistema)

---

## 💾 Instalação do MySQL

### ![alt text](image-2.png) Windows

1. Acesse o site oficial: https://dev.mysql.com/downloads/installer/

2. Baixe o instalador completo: **MySQL Installer (Windows x86, 32-bit, MSI Installer)**

3. Execute o instalador e escolha a opção **"Developer Default"**.

4. No processo de instalação:
   - Altamente recomendado criar uma senha para o usuário `root`
   - Crie o usuário adicional `gm` com a mesma senha (`12345678`)
   - Habilite o serviço MySQL para iniciar automaticamente

5. Após instalado, o MySQL será acessível localmente pela porta padrão `3306`.

---

### ![alt text](image-4.png) Linux (Ubuntu)

Execute os seguintes comandos no terminal:

```bash
sudo apt update
sudo apt install mysql-server
````

Após a instalação:

1. Verifique se o serviço está ativo:

   ```bash
   sudo systemctl status mysql
   ```

2. Acesse o console MySQL:

   ```bash
   sudo mysql
   ```

3. Execute os comandos a seguir para configurar o ambiente:
   - Altamente recomendado criar uma senha para o usuário `root`

```sql
-- Criar banco de dados
CREATE DATABASE pkm;

-- Criar usuário com senha
CREATE USER 'gm'@'%' IDENTIFIED BY '12345678';

-- Conceder permissões
GRANT ALL PRIVILEGES ON pkm.* TO 'gm'@'%';
FLUSH PRIVILEGES;
EXIT;
```

---

## ⚙️ Ajustes no MySQL para permitir acesso remoto

### Linux (Ubuntu)

1. Edite o arquivo:

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

2. Altere a linha:

```ini
bind-address = 127.0.0.1
```

Para:

```ini
bind-address = 0.0.0.0
```

3. Reinicie o serviço:

```bash
sudo systemctl restart mysql
```

---

## 🧰 Acessar e Gerenciar pelo PHPMyAdmin

Acesse via navegador:

```
http://localhost/phpmyadmin
```

Use o login:

* **Usuário**: `gm`
* **Senha**: `12345678`

---