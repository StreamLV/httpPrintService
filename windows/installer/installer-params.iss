; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "HTTP Print Server"
#define MyAppVersion "1.0"
#define MyAppPublisher "Island-Ukraine, LLC."
#define MyAppURL "https://www.island-ukraine.com.com"

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{D49DE59D-9902-42FF-A81C-48742ABAA787}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\HttpPrintServer
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
; Uncomment the following line to run in non administrative install mode (install for current user only.)
;PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
OutputDir=x:\bases\streamlv\koshik\print\httpPrintService\windows\installer\build
OutputBaseFilename=http_print_service_installer
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "ukrainian"; MessagesFile: "compiler:Languages\Ukrainian.isl"

[Files]
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\pdfprintsoftware\*"; DestDir: "{app}\pdfprintsoftware"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\printfiles\*"; DestDir: "{app}\printfiles"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\config.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\http_print_service.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\http_print_service-service.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\http_print_service-service.xml"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\service-install.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\service-refresh.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\service-restart.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\service-start.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\service-stop.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "x:\bases\streamlv\koshik\print\httpPrintService\windows\build\service-uninstall.bat"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

