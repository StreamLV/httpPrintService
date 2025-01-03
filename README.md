# httpPrintService

## Description
A lightweight HTTP server for printing on Windows printers.

---

## Installation Instructions

### Step 1: Install the Service
1. Open the `config.json` file and configure the following:
   - **Port**: The port for the HTTP server (default is `5733`).
   - **Token**: (Optional) Add a token for authentication.
   - **Printer Name**: Specify the printer name to use. Priority is given to the printer passed during a print request. If not specified, the system's default printer will be used.

2. Run `service-install.bat` to install the application as a Windows service.

3. Use the following batch files to manage the service:
   - `service-start.bat`: Start the service.
   - `service-stop.bat`: Stop the service.
   - `service-update.bat`: Update the service.
   - `service-restart.bat`: Restart the service.

4. To uninstall:
   - Stop the service using `service-stop.bat`.
   - Remove the service using `service-uninstall.bat`.
   - Run the uninstaller by executing `unins000.exe`.

---

## API Endpoints

### Printing PDF Files
- **Endpoint**: `POST /api/print/pdf`
- **Example URL**: `http://127.0.0.1:5733/api/print/pdf`

#### Request Body (JSON):
```json
{
  "token": "your-token",
  "printer": "printer-name",
  "pdfBase64": "base64-encoded-pdf-content"
}
```

#### Response Example:
```json
{
  "is_error": false,
  "message": "error-message-if-any",
  "printerName": "printer-name"
}
```

---

## Description (in Ukrainian)

### Опис
Легкий HTTP сервер для друку на принтерах Windows.

---

## Інструкція з встановлення

### Крок 1: Встановлення служби
1. Відкрийте файл `config.json` і налаштуйте наступне:
   - **Порт**: Порт для HTTP сервера (за замовчуванням `5733`).
   - **Токен**: (Необов’язково) Додайте токен для автентифікації.
   - **Ім'я принтера**: Вкажіть ім'я принтера для використання. Пріоритет надається принтеру, переданому під час запиту на друк. Якщо не вказано, буде використано принтер за замовчуванням системи.

2. Запустіть `service-install.bat` для встановлення програми як служби Windows.

3. Використовуйте наступні bat-файли для керування службою:
   - `service-start.bat`: Запуск служби.
   - `service-stop.bat`: Зупинка служби.
   - `service-update.bat`: Оновлення служби.
   - `service-restart.bat`: Перезапуск служби.

4. Для видалення:
   - Зупиніть службу, використовуючи `service-stop.bat`.
   - Видаліть службу за допомогою `service-uninstall.bat`.
   - Запустіть файл видалення програми `unins000.exe`.

---

## API Сервісу

### Запит на друк PDF
- **Endpoint**: `POST /api/print/pdf`
- **Приклад URL**: `http://127.0.0.1:5733/api/print/pdf`

#### Тіло запиту (JSON):
```json
{
  "token": "ваш-токен",
  "printer": "ім'я-принтера",
  "pdfBase64": "base64-закодований-вміст-pdf"
}
```

#### Приклад відповіді:
```json
{
  "is_error": false,
  "message": "текст-помилки-якщо-був",
  "printerName": "ім'я-принтера"
}
```

