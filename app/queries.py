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


score_calcuator_query = '''
	SELECT 
		app_question.id, app_userquestion.user_id , app_question.quiz_id ,
	CASE WHEN app_question.correct_choice = app_userquestion.user_choice 
		THEN '1' 
		ELSE '0' 
	END 
	AS result
	FROM app_question 
	INNER JOIN app_userquestion ON app_userquestion.id = app_question.quiz_id
	where app_question.quiz_id = %s and app_userquestion.user_id = %s
'''
