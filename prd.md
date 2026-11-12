# PRD — RideShare

**Kursi:** Programimi për Pajisje Mobile · Kolegji AAB · 2026/2027
**Data dhe versioni:** Java 1 · Versioni 1.0 · Drafti fillestar i MVP-së

## 1. Përdoruesi dhe problemi

Studentët që udhëtojnë drejt Kolegjit AAB kanë nevojë të gjejnë transport të përbashkët. Shoferët studentë, nga ana tjetër, mund të kenë vende të lira që mund t’i ofrojnë. Koordinimi përmes mesazheve dhe bisedave të paorganizuara e vështirëson gjetjen e udhëtimeve dhe kuptimin e vendeve të lira.

## 2. Evidenca dhe supozimet

Përshkrimi fillestar i problemit identifikon mesazhet dhe bisedat e paorganizuara si mënyrën aktuale të koordinimit. Kjo është pikënisja e projektit; nuk pretendoj se kam bërë tri intervista të strukturuara. Duhet të flas me udhëtarë dhe shoferë për të vërtetuar nevojën dhe për të kuptuar si duan ta organizojnë udhëtimin.

## 3. Hipoteza e vlerës

Nëse studentët mund të shohin udhëtimet, itinerarin, orën dhe vendet e lira në një aplikacion të vetëm, udhëtarët do ta kenë më të lehtë të gjejnë transport, ndërsa shoferët do të mund t’i ofrojnë vendet e lira. Një status i qartë i kërkesës do ta ndihmojë udhëtarin të dallojë kërkesën në pritje nga vendi i konfirmuar.

## 4. Veçoritë e MVP-së

1. Shoferi publikon një udhëtim me pikën e nisjes, destinacionin, datën/orën dhe numrin e vendeve të lira.
2. Udhëtari sheh listën dhe detajet e udhëtimeve, përfshirë shoferin dhe vendet e lira.
3. Udhëtari kërkon një vend dhe aplikacioni tregon qartë se kërkesa është **Në pritje**.

## 5. Rrjedha kryesore

1. Shoferi publikon udhëtimin dhe vendet e lira.
2. Udhëtari hap listën e udhëtimeve drejt AAB-së.
3. Udhëtari kontrollon itinerarin, orën dhe disponueshmërinë.
4. Udhëtari dërgon kërkesë për një vend.
5. Aplikacioni paraqet statusin e kërkesës; kërkesa në pritje nuk paraqitet si rezervim i konfirmuar.

## 6. Jashtë MVP-së

Pagesat online, biseda e drejtpërdrejtë dhe gjurmimi i vendndodhjes me GPS në kohë reale nuk përfshihen në versionin e parë.

## 7. Kriteret e pranimit dhe prova

- Çdo udhëtim shfaq nisjen, destinacionin, orën, shoferin dhe numrin e vendeve të lira.
- Një udhëtim pa vende të lira nuk lejon dërgimin e kërkesës.
- Pas dërgimit të kërkesës shfaqet **Në pritje**, jo një konfirmim i rremë.
- Një koleg provon rrjedhën nga hapja e listës deri te dërgimi i kërkesës; shënoj ku ngec ose çfarë nuk kupton.

## 8. Rreziku kryesor

Studentët mund të mos kenë besim të ndajnë udhëtimin me persona që nuk i njohin. Duhet të bisedoj me përdoruesit e synuar për të kuptuar çfarë informacioni dhe sigurie presin para se të kërkojnë ose ofrojnë një vend.
