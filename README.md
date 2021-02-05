# AukroCypressTest
==================================================
===== Aukro - Senior QA Specialista - test A =====
==================================================


=== Vytvořte automatizovaný test dle následujícího scénáře ===

- Vstupte na stránku https://aukro.cz/
- Projděte kategorie nejvyšší úrovně v levém menu (Sběratelství, Zlaté mince, ...) než naleznete první vyhovující kategorii (viz body níže)
- V každé kategorii využijte filtrování "Parametry nabídky", kde zvolte možnost "Bezpečná aukro platba"
- Pří průchodu kategorií nalezněte první z nich, která obsahuje VÍCE NEŽ 4 nabídky (tzn. 5 a více nabídek)
- Pro všechny nabídky na stránce proveďte následující:
	- Zkontrolujte, že všechny nabídky na stránce mají u sebe modrý odznáček "Bezpečná Aukro platba"
- Klikněte na PROSTŘEDNÍ nabídku z výpisu, čímž přejdete na detail nabídky (pokud je seznam nabídek sudý, zvolte nabídku náhodně)
- Na detailu nabídky proveďte následující:
	- Zkontrolujte, že nabídka má modrý odznáček "Bezpečná Aukro platba" jak nahoře vedle názvu, tak v boxíku dopravy a platby (napravo dole vedle hlavního obrázku)
	- Zjistěte, jestli se jedná o "Kup teď" nabídku (nabídka typická pro eshopy, ihned si ji vložím do košíku, zaplatím a je má) nebo o aukci. Způsob zjištění je čistě na vás.
		- Pokud se jedná o "Kup teď" nabídku, vložím ji do košíku a zkontroluji, jestli se do košíku správně vložila (lze využít košík v hlavičce)
		- Pokud se jedná o "Aukci", přihodím aktuální nabízenou hodnotu + 20%. Ověřím, že jsem byl přesměrován na přihlašovací stránku
		- Pokud se jedná o nabídku, která umožňuje jak "Kup teď" tak aukci, vyberu si scénář testu náhodně (tzn. že test náhodně zvolí jestli protestuje "Kup teď" nebo "Aukci")

=== Věci, na které si dát pozor ===

- V kategorii po čase vyskočí modál s nabídkou newsletteru aukcí za 1 korunu. Test by tedy měl obsahovat handling situace, kdy se modál zobrazí. Žádaným chováním je ZAVŘENÍ daného modálního okna za využití křížku v pravém horním rohu


=== Poznámky k realizaci ===

- K implementaci využijte cypress (https://www.cypress.io/) 
- Pokud selže jediná kontrola, selže celý test s vypovídající chybovou hláškou
- Navrhněte strukturu testu tak, aby bylo co nejsnazší testovací scénář obohatit či vytvořit další podobný
- Preferovaným jazykem pro realizaci je Typescript, využití vanilla javascriptu je také možné
- V testu složitější konstrukce komentujte tak, aby bylo zjevné co daná část kódu dělá bez nutnosti bližší investigace
- Výsledný projekt s testem nahrajte na některé gitové úložiště (github, gitlab, bitbucket), nastavte repozitář jako veřejný (či veřejný pouze přes odkaz) a odkaz na něj nám zašlete
