# ⚙️ Manual de Instalação – PkmRPG (Django)

Este guia mostra como configurar o ambiente de desenvolvimento para o PkmRPG usando o framework **Django**.

---

## ✅ Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

* [Python 3.10+](https://www.python.org/downloads/)
* [pip](https://pip.pypa.io/en/stable/)
* [virtualenv (opcional, mas recomendado)](https://virtualenv.pypa.io/)
* [Git](https://git-scm.com/)

---

## 🚀 Passo a passo

### 1. Clone o repositório

```bash
git clone https://github.com/EvertonMachado1/PkmRPG
cd PkmRPG
```

### 2. Crie e ative um ambiente virtual

**Linux/macOS:**

```bash
python3 -m venv env
source env/bin/activate
```

**Windows:**

```bash
python -m venv env
env\Scripts\activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure o banco de dados

Execute as migrações iniciais:

```bash
python manage.py migrate
```

### 5. Crie um superusuário (opcional, para acessar o admin)

```bash
python manage.py createsuperuser
```

### 6. Inicie o servidor de desenvolvimento

```bash
python manage.py runserver
```

Acesse o sistema em: [http://localhost:8000](http://localhost:8000)

---

## 🧪 Ambiente de desenvolvimento

Se desejar criar dados de exemplo, testes ou fixtures para campanhas, personagens e Pokémon, adicione scripts ou comandos personalizados no app `core/management/commands`.

---

## 🛠 Estrutura inicial recomendada (exemplo)

```bash
PkmRPG/
├── core/               # App principal com regras, personagens, Pokémon
├── templates/          # Templates HTML
├── static/             # Arquivos estáticos (CSS, JS, imagens)
├── PkmRPG/             # Configuração principal do projeto Django
├── requirements.txt    # Dependências do projeto
├── manage.py           # Comando principal do Django
└── README.md
```

---
