 -- create schema for work
create schema simpsons;

-- imported data into database using wizard

use simpsons;

select distinct episode_id from episodes;

use simpsons;
-- query for all words and lines by  all characters, staticGraphs.ipynb
select c.name as "character", count(*) as "line_count", sum(word_count)  as "word_count"from characters c join s_lines s on s.character_id=c.char_id group by c.name order by count(*) desc limit 10;

use simpsons;
-- static graph, staticGraphs.ipynb
select season, avg(imdb_rating) "Avg_rating" from episodes group by season;

use simpsons;
-- non simpson family characters lines and words totals, staticGraphs.ipynb
select c.name as "character", count(*) as "line_count", sum(word_count)  as "word_count"from characters c join s_lines s on s.character_id=c.char_id where c.Simpson_fam="False" group by c.name order by count(*) desc limit 10;

-- gender breakdown
select c.gender, count(*) as "line_count"from characters c join s_lines s on s.character_id=c.char_id where c.gender!="u" group by c.gender order by count(*) desc;

use simpsons;
select * from springfield;