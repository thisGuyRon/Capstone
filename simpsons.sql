create schema simpsons;

-- imported data into database using wizard

use simpsons;

select distinct episode_id from episodes;

use simpsons;
select c.name as "character", count(*) as "line_count", sum(word_count)  as "word_count"from characters c join s_lines s on s.character_id=c.char_id group by c.name order by count(*) desc limit 10;

use simpsons;
select season, avg(imdb_rating) "Avg_rating" from episodes group by season;

use simpsons;
select episode_id, imdb_rating from episodes;

use simpsons;
select * from characters;
select c.name as "character", count(*) as "line_count", sum(word_count)  as "word_count"from characters c join s_lines s on s.character_id=c.char_id where c.Simpson_fam="False" group by c.name order by count(*) desc limit 10;

select c.gender;


use simpsons;
select e.season, count(*) 
from episodes e 
join s_lines s on e.episode_id=s.episode_id
where s.character_id=2
group by (e.season);

use simpsons;
select e.season, count(*) from episodes e join s_lines s on e.episode_id=s.episode_id where s.character_id=2 group by (e.season);

use simpsons;
select e.season, sum(s.word_count) 
from episodes e 
join s_lines s on e.episode_id=s.episode_id
where s.character_id=2
group by (e.season);

use simpsons;
select e.episode_id, count(*) as "line_count" 
from episodes e 
join s_lines s on e.episode_id=s.episode_id
where s.character_id=2
group by (e.episode_id);