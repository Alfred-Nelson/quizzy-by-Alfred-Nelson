# frozen_string_literal: true

json.quiz @quizzes do |quiz|
  json.extract! quiz, :name, :id
  json.report quiz.attempts do |attempt|
    json.user_name "#{attempt.user.first_name.capitalize} #{attempt.user.last_name.capitalize}"
    json.email attempt.user.email
    json.correct_answer_count attempt.correct_answer_count
    json.incorrect_answer_count attempt.incorrect_answer_count
  end
end
