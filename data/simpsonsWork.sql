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
 