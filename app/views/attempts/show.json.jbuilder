json.attempt do
  json.extract! @attempt, :no_of_correct_answers
  json.attempted @attempt.attempt_answers do |question|
    json.extract! question, :question_id, :marked_answer_id, :correct_answer_id
  end
end
