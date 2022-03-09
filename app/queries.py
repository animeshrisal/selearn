user_lesson_list_query = '''select
	app_lesson.id as id,
	app_lesson.name,
	app_lesson.order,
	app_lesson.description,
	completed,
	completed_at,
	lesson_id,
	user_id
from
	app_lesson
left outer join app_userlesson on
	app_lesson.id = app_userlesson.lesson_id
where
	app_lesson.classroom_id = %s order by app_lesson.order'''

user_lesson_query = '''select
	app_lesson.id as id,
	app_lesson.name,
	app_lesson.order,
	app_lesson.description,
    app_lesson.body,
	app_userlesson.completed as completed,
	completed_at,
	lesson_id,
	user_id
from
	app_lesson
left outer join app_userlesson on
	app_lesson.id = app_userlesson.lesson_id
where
	app_lesson.id = %s'''


student_quiz_list = '''
	select
		app_quiz.id as id,
		app_quiz.name as name,
		app_quiz.classroom_id as classroom_id,
		app_quiz.created_at as created_at,
		app_quiz.state as state,
		app_userquiz."result" as "result",
		app_userquiz.score as score
	from
		app_quiz
	left outer join app_userquiz on
		app_quiz.id = app_userquiz.quiz_id
	where app_quiz.state = 1 and app_quiz.classroom_id = %s;
'''

quiz_user_choices_query = '''
select
		app_question.id as id,
		case
			when app_question.correct_choice = app_userquestion.user_choice 
    then '1'
		else '0'
	end 
  as result
from
		app_question
inner join app_userquestion on
		app_userquestion.question_id = app_question.id
where
		app_question.quiz_id = %s
	and app_userquestion.user_id = %s

'''

user_score_result_query = '''
	select
		1 as id,
		count(result) as score
	from
		(
			select
					app_question.id as question,
					case
						when app_question.correct_choice = app_userquestion.user_choice 
				then '1'
					else '0'
				end 
			as result
			from
					app_question
			inner join app_userquestion on
					app_userquestion.question_id = app_question.id
			where
					app_question.quiz_id = %s
				and app_userquestion.user_id = %s

	) as user_quiz
	where
		result = '1'
	group by
		result
'''
