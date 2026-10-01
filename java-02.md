# RideShare - Java 2

## 1. Përshkrimi i problemit

Studentët dhe udhëtarët që shkojnë në Kolegjin AAB kanë nevojë për një mënyrë të thjeshtë për të gjetur ose ofruar udhëtime të përbashkëta. Aktualisht, koordinimi i udhëtimeve mund të bëhet përmes mesazheve ose bisedave jo të organizuara, prandaj është e vështirë të dihet se cilat udhëtime janë të disponueshme dhe nëse ka vende të lira.

RideShare është një aplikacion mobil që lidh udhëtarët me shoferët që kanë vende të lira në automjet. Versioni MVP fokusohet te rrjedha kryesore: gjetja e një udhëtimi, publikimi i një udhëtimi dhe dërgimi i kërkesës për një vend.

## 2. Përdoruesit kryesorë

### Arta - udhëtare

Arta është studente dhe kërkon një udhëtim për në Kolegjin AAB. Ajo dëshiron të shohë udhëtimet e disponueshme, të kontrollojë detajet e një udhëtimi dhe të kërkojë një vend.

### Dreni - shofer

Dreni është shofer që udhëton drejt Kolegjin AAB dhe dëshiron të ofrojë udhëtimin e tij për studentët e tjerë. Ai ka **2 vende të lira** dhe e poston udhëtimin në aplikacion.

## 3. Veçoritë kryesore të MVP-së

### 3.1 Kërkimi i udhëtimeve

Udhëtari mund të shohë listën e udhëtimeve të disponueshme dhe të kërkojë udhëtim sipas destinacionit, për shembull: **Kolegji AAB**. Lista shfaq informacionet kryesore, si emrin e shoferit, orën, itinerarin dhe numrin e vendeve të lira.

### 3.2 Postimi i udhëtimit

Shoferi mund të krijojë një udhëtim të ri duke vendosur:

- pikën e nisjes;
- destinacionin;
- datën dhe orën;
- numrin e vendeve të lira.

Në këtë rast, Dreni poston një udhëtim drejt Kolegjit AAB me **2 vende të lira**.

### 3.3 Kërkesa për vend me status "Në pritje"

Udhëtari mund të hapë detajet e një udhëtimi dhe të dërgojë kërkesë për një vend. Pas dërgimit, kërkesa shfaqet me statusin e qartë **"Në pritje"**, që tregon se shoferi ende nuk e ka miratuar ose refuzuar kërkesën.

## 4. Çfarë mbetet jashtë MVP-së

Për ta mbajtur versionin e parë të fokusuar, këto funksionalitete nuk përfshihen në MVP:

- pagesat online;
- chat-i live mes shoferit dhe udhëtarit;
- njoftimet push;
- ndjekja e vendndodhjes me GPS në kohë reale.

Këto mund të shqyrtohen në një version të ardhshëm, pasi të jetë testuar rrjedha bazë e aplikacionit.

## 5. Procesi i testimit

MVP-ja u testua me një koleg duke përdorur skenarin e mëposhtëm:

1. Dreni poston një udhëtim drejt Kolegjit AAB me 2 vende të lira.
2. Arta kërkon udhëtime drejt Kolegjit AAB.
3. Arta hap detajet e udhëtimit të Drenit.
4. Arta dërgon kërkesë për një vend.
5. Aplikacioni shfaq rezultatin e kërkesës.

### Vërejtjet nga testimi

Kolegu e kuptoi lehtë se si të gjente udhëtimin dhe si të dërgonte kërkesën për vend. Megjithatë, pas dërgimit të kërkesës nuk ishte mjaftueshëm e qartë nëse kërkesa ishte dërguar me sukses apo nëse vendi ishte konfirmuar menjëherë.

### Përmirësimi i bërë

U shtua një status i dukshëm me tekstin **"Kërkesa në pritje"** menjëherë pas dërgimit të kërkesës. Ky status e bën të qartë se kërkesa është pranuar nga sistemi, por ende pret përgjigjen e shoferit. Në këtë mënyrë, përdoruesi nuk e ngatërron kërkesën në pritje me një rezervim të konfirmuar.

## 6. Përfundim

RideShare MVP zgjidh një problem të thjeshtë dhe praktik për studentët: gjetjen dhe ofrimin e udhëtimeve drejt Kolegjit AAB. Rrjedha kryesore përfshin kërkimin e udhëtimit, postimin e tij dhe dërgimin e kërkesës me status të qartë **"Në pritje"**. Funksionalitetet më të avancuara do të mund të shtohen në fazat e ardhshme.
