select e.season, count(s.*) 
from episodes e 
join s_lines s on e.episode_id=s.episode_id
where s.character_id=2
group by (e.season);

use simpsons;
select "All"
union
select  season from springfield;

use simpsons;
select "All" union select distinct season from episodes;

use simpsons;
create table char_dropdown as 
select c.name from characters c join s_lines s on c.char_id=s.character_id group by c.name order by count(*) desc limit 25;
select character_id, count(*) from s_lines group by character_id order by count(*) desc

use simpsons;
select * from char_dropdown;

use simpsons;
select season as "Season_No", season_episode_no as "Season_Episode_No", title, "" as "line", image_url as "image" from episodes
union
select e.season, e.season_episode_no, e.title, s.normalized_text, e.image_url from episodes e join s_lines s on e.episode_id=s.episode_id limit 500;

use simpsons;
select * from characters where name="Homer Simpson";
use simpsons;
 select e.season, count(*) as "Lines", sum(word_count) as "Words" from s_lines s join characters c on c.char_id=s.character_id join episodes e on e.episode_id=s.episode_id where name="Homer Simpson" group by e.season; 
 
 
 select s.line_id, s.episode_id, s.normalized_text, s.word_count from episodes e join s_lines s on s.episode_id=e.episode_id where e.season=14 and s.character_id=2 order by s.word_count desc;
 
 use simpsons;
 select e.season_episode_no as "Episode"
 , count(*) as "Lines"
  , cast(sum(s.word_count) as unsigned) as "Words" 
 from episodes e 
 left outer join s_lines s 
 on s.episode_id=e.episode_id 
 left outer join characters c 
 on c.char_id=s.character_id 
 where c.name="Dr. Julius Hibbert" 
 and e.season=7
 group by e.season_episode_no;
 
 use simpsons;
 select e.season_episode_no as "Episode"
 , count(s.line_id) as "Lines"
 from episodes e
 left outer join s_lines s
 on e.episode_id=s.episode_id
 where e.season=7
 and s.character_id=332
 group by e.season_episode_no
 
 select * from characters where name like "%ibbert"
 
 select e.season_episode_no as "Episode"
 , s.normalized_text
 from episodes e
 left join s_lines s
 on e.episode_id=s.episode_id
 left join characters c 
 on s.character_id=c.char_id
 and c.name="Dr. Julius Hibbert"
 where e.season=7
 order by e.season_episode_no
 select e.season_episode_no as "Episode", ifnull(a.Lines, 0) as "Lines", ifnull(a.Words, 0) as "Words" from episodes e left join
 (select s.episode_id, count(s.line_id) as "Lines", sum(s.word_count) "Words" from s_lines s join characters c on s.character_id=c.char_id where c.name="Dr. Julius Hibbert" group by s.episode_id) a on e.episode_id=a.episode_id
 where e.season=7 order by e.season_episode_no
 
 select e.season
 , cast(ifnull(sum(a.Lines), 0) as unsigned) as "Lines"
  , cast(ifnull(sum(a.Words), 0) as unsigned) as "Words" 
 from episodes e 
 left join (select s.episode_id, count(s.line_id) as "Lines", sum(s.word_count) "Words" from s_lines s join characters c on s.character_id=c.char_id where c.name="Dr. Julius Hibbert" group by s.episode_id) a on e.episode_id=a.episode_id group by e.season order by e.season asc
 
 use simpsons;
 select count(*) from s_lines;
 
 delete from s_lines where word_count>200;
 
 select * from s_lines where word_count>200;
 
 select * from episodes where season=2
 
 
 use simpsons;
 select * from s_lines;
 
 use simpsons;
 -- select (if s.character_id=1, 1, 0) as char_id, s.normalized_text from s_lines s join episodes e on s.episode_id=e.episode_idand e.season in (1,2);
 select s.normalized_text as text, if(s.character_id=1,"Marge","not") as label  from s_lines s join episodes e on s.episode_id=e.episode_id and e.season in (1,2,3,4);
 select if(1>2,"yes", "no")
 
 select s.character_id, s.normalized_text from s_lines s join episodes e on e.episode_id=s.episode_id where e.season=3
 
use simpsons;
 select * from characters
 
 select s.normalized_text as text, if(s.character_id=1,"Marge","not") as label  from s_lines s join episodes e on s.episode_id=e.episode_id and e.season in (1,2,3) and c.character_id in (1,2,8,9);
 
 
 case when s.character_id=1 then "Marge" when s.character_id=2 then "Homer" when s.character_id=8 then "Bart" when s.character_id=9 then "Lisa"
 
 select s.normalized_text as text, case when s.character_id=1 then "Marge" when s.character_id=2 then "Homer" when s.character_id=8 then "Bart" when s.character_id=9 then "Lisa" end as label  from s_lines s join episodes e on s.episode_id=e.episode_id and e.season in (1,2,3) and s.character_id in (1,2,8,9);
 
 select s.normalized_text, s.character_id from s_lines s join episodes e on s.episode_id=e.episode_id and e.season in (1) and s.character_id in (1,2,8,9); 
 
select label, count(*) from (
select s.normalized_text as text, case when s.character_id=1 then "Marge" when s.character_id=2 then "Homer" when s.character_id=8 then "Bart" when s.character_id=9 then "Lisa" end as label  from s_lines s join episodes e on s.episode_id=e.episode_id and e.season in (1,2,3) and s.character_id in (1,2,8,9)
  ) a group by label;
use simpsons;
select label, count(*) from 
((select s.normalized_text as text, "Marge" as label from s_lines s join episodes e on s.episode_id=e.episode_id where s.character_id=1 limit 1000, 2500) union (select s.normalized_text as text, "Homer" as label from s_lines s join episodes e on s.episode_id=e.episode_id where s.character_id=2 limit 1000, 2500) union (select s.normalized_text as text, "Bart" as label from s_lines s join episodes e on s.episode_id=e.episode_id where s.character_id=8 limit 1000, 2500) union (select s.normalized_text as text, "Lisa" as label from s_lines s join episodes e on s.episode_id=e.episode_id where s.character_id=9 limit 1000, 2500)) a group by label

select * from s_lines where character_id in (1,2,8,9) order by episode_id desc








select s.character_id from s_lines s group by s.character_id order by count(*) desc limit 40


select s.character_id, count(*) from s_lines s where s.character_id in 
(2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by character_id

create table m_learning1
select t.character_id, t.gender, t.line_count, t.word_count, 
ifnull(s1.s1_lines,0), ifnull(s1.s1_words,0), 
ifnull(s2.s2_lines,0), ifnull(s2.s2_words,0),
ifnull(s3.s3_lines,0), ifnull(s3.s3_words,0),
ifnull(s4.s4_lines,0), ifnull(s4.s4_words,0),
ifnull(s5.s5_lines,0), ifnull(s5.s5_words,0),
ifnull(s6.s6_lines,0), ifnull(s6.s6_words,0),
ifnull(s7.s7_lines,0), ifnull(s7.s7_words,0),
ifnull(s8.s8_lines,0), ifnull(s8.s8_words,0), 
ifnull(s9.s9_lines,0), ifnull(s9.s9_words,0),
ifnull(s10.s10_lines,0), ifnull(s10.s10_words,0),
ifnull(s11.s11_lines,0), ifnull(s11.s11_words,0),
ifnull(s12.s12_lines,0), ifnull(s12.s12_words,0),
ifnull(s13.s13_lines,0), ifnull(s13.s13_words,0),
ifnull(s14.s14_lines,0), ifnull(s14.s14_words,0),
ifnull(s15.s15_lines,0), ifnull(s15.s15_words,0),
ifnull(s16.s16_lines,0), ifnull(s16.s16_words,0),
ifnull(s17.s17_lines,0), ifnull(s17.s17_words,0),
ifnull(s18.s18_lines,0), ifnull(s18.s18_words,0),
ifnull(s19.s19_lines,0), ifnull(s19.s19_words,0),
ifnull(s20.s20_lines,0), ifnull(s20.s20_words,0),
ifnull(s21.s21_lines,0), ifnull(s21.s21_words,0),
ifnull(s22.s22_lines,0), ifnull(s22.s22_words,0),
ifnull(s23.s23_lines,0), ifnull(s23.s23_words,0),
ifnull(s24.s24_lines,0), ifnull(s24.s24_words,0),
ifnull(s25.s25_lines,0), ifnull(s25.s25_words,0),
ifnull(s26.s26_lines,0), ifnull(s26.s26_words,0) from
(select s.character_id, c.gender, count(*) as "line_count", sum(s.word_count) as "word_count" from s_lines s join characters c on c.char_id=s.character_id where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id, c.gender) t
left join 
(select s.character_id, count(*) as s1_lines, sum(s.word_count) as s1_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=1 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s1 on t.character_id=s1.character_id
left join 
(select s.character_id, count(*) as s2_lines, sum(s.word_count) as s2_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=2 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s2 on t.character_id=s2.character_id
left join
(select s.character_id, count(*) as s3_lines, sum(s.word_count) as s3_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=3 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s3 on t.character_id=s3.character_id
left join
(select s.character_id, count(*) as s4_lines, sum(s.word_count) as s4_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=4 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s4 on t.character_id=s4.character_id
left join
(select s.character_id, count(*) as s5_lines, sum(s.word_count) as s5_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=5 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s5 on t.character_id=s5.character_id
left join
(select s.character_id, count(*) as s6_lines, sum(s.word_count) as s6_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=6 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s6 on t.character_id=s6.character_id
left join
(select s.character_id, count(*) as s7_lines, sum(s.word_count) as s7_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=7 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s7 on t.character_id=s7.character_id
left join
(select s.character_id, count(*) as s8_lines, sum(s.word_count) as s8_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=8 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s8 on t.character_id=s8.character_id
left join
(select s.character_id, count(*) as s9_lines, sum(s.word_count) as s9_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=9 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s9 on t.character_id=s9.character_id
left join
(select s.character_id, count(*) as s10_lines, sum(s.word_count) as s10_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=10 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s10 on t.character_id=s10.character_id
left join
(select s.character_id, count(*) as s11_lines, sum(s.word_count) as s11_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=11 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s11 on t.character_id=s11.character_id
left join
(select s.character_id, count(*) as s12_lines, sum(s.word_count) as s12_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=12 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s12 on t.character_id=s12.character_id
left join
(select s.character_id, count(*) as s13_lines, sum(s.word_count) as s13_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=13 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s13 on t.character_id=s13.character_id
left join
(select s.character_id, count(*) as s14_lines, sum(s.word_count) as s14_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=14 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s14 on t.character_id=s14.character_id
left join
(select s.character_id, count(*) as s15_lines, sum(s.word_count) as s15_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=15 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s15 on t.character_id=s15.character_id
left join
(select s.character_id, count(*) as s16_lines, sum(s.word_count) as s16_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=16 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s16 on t.character_id=s16.character_id
left join
(select s.character_id, count(*) as s17_lines, sum(s.word_count) as s17_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=17 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s17 on t.character_id=s17.character_id
left join
(select s.character_id, count(*) as s18_lines, sum(s.word_count) as s18_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=18 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s18 on t.character_id=s18.character_id
left join
(select s.character_id, count(*) as s19_lines, sum(s.word_count) as s19_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=19 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s19 on t.character_id=s19.character_id
left join
(select s.character_id, count(*) as s20_lines, sum(s.word_count) as s20_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=20 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s20 on t.character_id=s20.character_id
left join
(select s.character_id, count(*) as s21_lines, sum(s.word_count) as s21_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=21 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s21 on t.character_id=s21.character_id
left join
(select s.character_id, count(*) as s22_lines, sum(s.word_count) as s22_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=22 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s22 on t.character_id=s22.character_id
left join
(select s.character_id, count(*) as s23_lines, sum(s.word_count) as s23_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=23 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s23 on t.character_id=s23.character_id
left join
(select s.character_id, count(*) as s24_lines, sum(s.word_count) as s24_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=24 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s24 on t.character_id=s24.character_id
left join
(select s.character_id, count(*) as s25_lines, sum(s.word_count) as s25_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=25 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s25 on t.character_id=s25.character_id
left join
(select s.character_id, count(*) as s26_lines, sum(s.word_count) as s26_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=26 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s26 on t.character_id=s26.character_id
-- left join
-- (select s.character_id, count(*) as s27_lines, sum(s.word_count) as s27_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=27 where s.character_id in (2,1,8,9,15,17,3,11,31,25,71,139,101,165,208,14,211,170,40,332,22,18,140,153,1078,404,240,119,801,10,52,38,33,144,91,699,442,568,145,192) group by s.character_id) s27 on t.character_id=s27.character_id

select s.character_id from s_lines s  join characters c on s.character_id=c.char_id  and c.gender="m" group by character_id order by count(*) desc limit 20


1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153


create table m_learning2
select t.character_id, t.gender, t.line_count, t.word_count, 
ifnull(s1.s1_lines,0), ifnull(s1.s1_words,0), 
ifnull(s2.s2_lines,0), ifnull(s2.s2_words,0),
ifnull(s3.s3_lines,0), ifnull(s3.s3_words,0),
ifnull(s4.s4_lines,0), ifnull(s4.s4_words,0),
ifnull(s5.s5_lines,0), ifnull(s5.s5_words,0),
ifnull(s6.s6_lines,0), ifnull(s6.s6_words,0),
ifnull(s7.s7_lines,0), ifnull(s7.s7_words,0),
ifnull(s8.s8_lines,0), ifnull(s8.s8_words,0), 
ifnull(s9.s9_lines,0), ifnull(s9.s9_words,0),
ifnull(s10.s10_lines,0), ifnull(s10.s10_words,0),
ifnull(s11.s11_lines,0), ifnull(s11.s11_words,0),
ifnull(s12.s12_lines,0), ifnull(s12.s12_words,0),
ifnull(s13.s13_lines,0), ifnull(s13.s13_words,0),
ifnull(s14.s14_lines,0), ifnull(s14.s14_words,0),
ifnull(s15.s15_lines,0), ifnull(s15.s15_words,0),
ifnull(s16.s16_lines,0), ifnull(s16.s16_words,0),
ifnull(s17.s17_lines,0), ifnull(s17.s17_words,0),
ifnull(s18.s18_lines,0), ifnull(s18.s18_words,0),
ifnull(s19.s19_lines,0), ifnull(s19.s19_words,0),
ifnull(s20.s20_lines,0), ifnull(s20.s20_words,0),
ifnull(s21.s21_lines,0), ifnull(s21.s21_words,0),
ifnull(s22.s22_lines,0), ifnull(s22.s22_words,0),
ifnull(s23.s23_lines,0), ifnull(s23.s23_words,0),
ifnull(s24.s24_lines,0), ifnull(s24.s24_words,0),
ifnull(s25.s25_lines,0), ifnull(s25.s25_words,0),
ifnull(s26.s26_lines,0), ifnull(s26.s26_words,0) from
(select s.character_id, c.gender, count(*) as "line_count", sum(s.word_count) as "word_count" from s_lines s join characters c on c.char_id=s.character_id where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id, c.gender) t
left join 
(select s.character_id, count(*) as s1_lines, sum(s.word_count) as s1_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=1 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s1 on t.character_id=s1.character_id
left join 
(select s.character_id, count(*) as s2_lines, sum(s.word_count) as s2_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=2 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s2 on t.character_id=s2.character_id
left join
(select s.character_id, count(*) as s3_lines, sum(s.word_count) as s3_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=3 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s3 on t.character_id=s3.character_id
left join
(select s.character_id, count(*) as s4_lines, sum(s.word_count) as s4_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=4 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s4 on t.character_id=s4.character_id
left join
(select s.character_id, count(*) as s5_lines, sum(s.word_count) as s5_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=5 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s5 on t.character_id=s5.character_id
left join
(select s.character_id, count(*) as s6_lines, sum(s.word_count) as s6_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=6 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s6 on t.character_id=s6.character_id
left join
(select s.character_id, count(*) as s7_lines, sum(s.word_count) as s7_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=7 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s7 on t.character_id=s7.character_id
left join
(select s.character_id, count(*) as s8_lines, sum(s.word_count) as s8_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=8 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s8 on t.character_id=s8.character_id
left join
(select s.character_id, count(*) as s9_lines, sum(s.word_count) as s9_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=9 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s9 on t.character_id=s9.character_id
left join
(select s.character_id, count(*) as s10_lines, sum(s.word_count) as s10_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=10 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s10 on t.character_id=s10.character_id
left join
(select s.character_id, count(*) as s11_lines, sum(s.word_count) as s11_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=11 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s11 on t.character_id=s11.character_id
left join
(select s.character_id, count(*) as s12_lines, sum(s.word_count) as s12_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=12 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s12 on t.character_id=s12.character_id
left join
(select s.character_id, count(*) as s13_lines, sum(s.word_count) as s13_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=13 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s13 on t.character_id=s13.character_id
left join
(select s.character_id, count(*) as s14_lines, sum(s.word_count) as s14_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=14 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s14 on t.character_id=s14.character_id
left join
(select s.character_id, count(*) as s15_lines, sum(s.word_count) as s15_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=15 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s15 on t.character_id=s15.character_id
left join
(select s.character_id, count(*) as s16_lines, sum(s.word_count) as s16_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=16 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s16 on t.character_id=s16.character_id
left join
(select s.character_id, count(*) as s17_lines, sum(s.word_count) as s17_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=17 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s17 on t.character_id=s17.character_id
left join
(select s.character_id, count(*) as s18_lines, sum(s.word_count) as s18_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=18 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s18 on t.character_id=s18.character_id
left join
(select s.character_id, count(*) as s19_lines, sum(s.word_count) as s19_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=19 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s19 on t.character_id=s19.character_id
left join
(select s.character_id, count(*) as s20_lines, sum(s.word_count) as s20_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=20 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s20 on t.character_id=s20.character_id
left join
(select s.character_id, count(*) as s21_lines, sum(s.word_count) as s21_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=21 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s21 on t.character_id=s21.character_id
left join
(select s.character_id, count(*) as s22_lines, sum(s.word_count) as s22_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=22 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s22 on t.character_id=s22.character_id
left join
(select s.character_id, count(*) as s23_lines, sum(s.word_count) as s23_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=23 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s23 on t.character_id=s23.character_id
left join
(select s.character_id, count(*) as s24_lines, sum(s.word_count) as s24_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=24 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s24 on t.character_id=s24.character_id
left join
(select s.character_id, count(*) as s25_lines, sum(s.word_count) as s25_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=25 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s25 on t.character_id=s25.character_id
left join
(select s.character_id, count(*) as s26_lines, sum(s.word_count) as s26_words from s_lines s join episodes e on e.episode_id=s.episode_id and e.season=26 where s.character_id in (1,9,40,22,10,192,464,1975,308,414,309,118,591,785,3057,4539,1875,6127,5947,1336,2,8,15,17,3,11,31,25,71,139,101,165,208,14,211,170,332,18,140,153) group by s.character_id) s26 on t.character_id=s26.character_id