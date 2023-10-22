create database if not exists webprog;
use webprog;

grant all privileges on webprog.* to 'webprog'@'localhost';

-- Usereket a login formbol hozzuk letre, alapbol sima felhasznalok lesznek. Vagyis nem tudnak filmet hozzaadni a rendszerhez.



-- ============================================================================
-- ! HOGYAN LESZ EGY USERBOL ADMIN FELHASZNALO (TUDJON HOZZAADNI FILMEKET) ! :
-- ============================================================================

-- 1. MODSZER:
insert into felhasznalo values ("admin","$2b$15$frNIyZ6/4lhbA0ZBZxTXqezOYgoJtnHZp4FSftZZdlQfmHT1NRcy6","1");
-- ENNEK AZ ADMIN USERNEK A PASSWORDJA: asdasdasd

-- 2.MODSZER:
-- Regisztraljunk egy 'admin' usernevu usert, majd futtassuk le ra ezt a mysql kodreszletet:
update felhasznalo set funk='2' where username='admin';
-- Ha mar be volt logolva, akkor lepjen ki s logoljon be ujra.
-- PS.: Mukodik akarmilyen felhasznalonevre



--========================================================================================
--========================================================================================
-- Ha funk == 1 , akkor az illeto tud torolni barmely kommentet (moderator/admin)
--
